import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Support multiple emails: comma-separated list
const NOTIFICATION_EMAILS = process.env.NOTIFICATION_EMAIL
  ? process.env.NOTIFICATION_EMAIL.split(",")
      .map((e) => e.trim())
      .filter(Boolean)
  : [];

// Resend rate limit: 2 requests/second. Send sequentially with delay + retry.
const RATE_LIMIT_DELAY_MS = 600; // ~1.7 emails/sec to stay safely under 2/sec
const MAX_RETRIES = 2;

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  html: string;
}

/**
 * Send a single email with retry on rate-limit (429) errors.
 * Returns true if sent successfully, false otherwise.
 */
async function sendWithRetry(
  payload: EmailPayload,
  label: string
): Promise<boolean> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await resend.emails.send(payload);

      // Resend returns { data, error } — a 429 comes as error in body, not a thrown error
      if (result.error) {
        const isRateLimit =
          "statusCode" in result.error && result.error.statusCode === 429;

        if (isRateLimit && attempt < MAX_RETRIES) {
          const waitMs = 1000 * (attempt + 1); // 1s, then 2s
          console.warn(
            `[Email] Rate limited sending to ${payload.to} (${label}), retrying in ${waitMs}ms (attempt ${attempt + 1}/${MAX_RETRIES})`
          );
          await delay(waitMs);
          continue;
        }

        console.error(
          `[Email] Failed to send to ${payload.to} (${label}):`,
          result.error
        );
        return false;
      }

      console.log(
        `[Email] Sent to ${payload.to} (${label}): id=${result.data?.id}`
      );
      return true;
    } catch (error) {
      console.error(
        `[Email] Exception sending to ${payload.to} (${label}):`,
        error
      );
      return false;
    }
  }
  return false;
}

/**
 * Send emails sequentially with rate-limit-safe delays.
 * Returns { sent, failed } counts.
 */
async function sendEmailsSequentially(
  emails: EmailPayload[],
  label: string
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < emails.length; i++) {
    // Wait between sends to respect rate limit (skip delay before the first one)
    if (i > 0) await delay(RATE_LIMIT_DELAY_MS);

    const success = await sendWithRetry(emails[i], label);
    if (success) sent++;
    else failed++;
  }

  console.log(
    `[Email] ${label}: ${sent}/${emails.length} sent successfully${failed > 0 ? `, ${failed} failed` : ""}`
  );
  return { sent, failed };
}

interface RsvpNotificationData {
  guests: {
    name: string;
    isAttending: boolean | null;
    email?: string | null;
    contactNumber?: string | null;
    foodAllergies?: string | null;
  }[];
}

export async function sendRsvpNotification(data: RsvpNotificationData) {
  console.log(
    "[Email] sendRsvpNotification called with",
    data.guests.length,
    "guest(s)"
  );

  if (!process.env.RESEND_API_KEY || NOTIFICATION_EMAILS.length === 0) {
    console.warn(
      "[Email] RESEND_API_KEY or NOTIFICATION_EMAIL not set, skipping notification"
    );
    return;
  }

  console.log("[Email] Sending admin notifications to:", NOTIFICATION_EMAILS);

  const attending = data.guests.filter((g) => g.isAttending === true);
  const declining = data.guests.filter((g) => g.isAttending === false);
  const pending = data.guests.filter((g) => g.isAttending === null);

  const attendingList = attending
    .map(
      (g) =>
        `<li>
          <strong>${g.name}</strong>
          ${g.email ? `<br/>Email: ${g.email}` : ""}
          ${g.contactNumber ? `<br/>Contact: ${g.contactNumber}` : ""}
          ${g.foodAllergies ? `<br/>Food Allergies: <em>${g.foodAllergies}</em>` : ""}
        </li>`
    )
    .join("");

  const decliningList = declining
    .map((g) => `<li><strong>${g.name}</strong></li>`)
    .join("");

  const pendingList = pending
    .map((g) => `<li><strong>${g.name}</strong></li>`)
    .join("");

  const subject = attending.length
    ? `🎉 RSVP Update: ${attending.map((g) => g.name).join(", ")} confirmed!`
    : declining.length
      ? `RSVP Update: ${declining.map((g) => g.name).join(", ")} declined`
      : `RSVP Update: ${pending.map((g) => g.name).join(", ")} pending`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #722F37; border-bottom: 2px solid #722F37; padding-bottom: 8px;">
        RSVP Notification
      </h2>
      
      <p style="color: #555; font-size: 14px;">
        A guest has submitted/updated their RSVP on the wedding website.
      </p>

      ${
        attending.length > 0
          ? `
        <h3 style="color: #16a34a;">✅ Attending (${attending.length})</h3>
        <ul style="line-height: 1.8;">${attendingList}</ul>
      `
          : ""
      }

      ${
        declining.length > 0
          ? `
        <h3 style="color: #dc2626;">❌ Not Attending (${declining.length})</h3>
        <ul style="line-height: 1.8;">${decliningList}</ul>
      `
          : ""
      }

      ${
        pending.length > 0
          ? `
        <h3 style="color: #d97706;">⏳ Pending (${pending.length})</h3>
        <ul style="line-height: 1.8;">${pendingList}</ul>
      `
          : ""
      }

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">
        Sent from quieandmiko.com • ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}
      </p>
    </div>
  `;

  const from =
    process.env.RESEND_FROM_EMAIL ||
    "Quie & Miko Wedding RSVP <onboarding@resend.dev>";

  const emails: EmailPayload[] = NOTIFICATION_EMAILS.map((email) => ({
    from,
    to: email,
    subject,
    html
  }));

  try {
    await sendEmailsSequentially(emails, "Admin notification");
  } catch (error) {
    console.error("[Email] Failed to send RSVP notification:", error);
    // Don't throw - email failure shouldn't break the RSVP submission
  }
}

// Send confirmation email to guests who submitted the RSVP
export async function sendGuestConfirmation(data: RsvpNotificationData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set, skipping guest confirmation");
    return;
  }

  // Collect email addresses from attending guests who provided them
  const guestEmails = data.guests
    .filter((g) => g.isAttending && g.email?.trim())
    .map((g) => g.email as string);

  if (guestEmails.length === 0) {
    console.log("[Email] No guest emails to send confirmation to");
    return;
  }

  console.log("[Email] Sending guest confirmation to:", guestEmails);

  const attending = data.guests.filter((g) => g.isAttending === true);
  const declining = data.guests.filter((g) => g.isAttending === false);
  const pending = data.guests.filter((g) => g.isAttending === null);

  const attendingList = attending
    .map((g) => `<li><strong>${g.name}</strong></li>`)
    .join("");

  const decliningList = declining
    .map((g) => `<li><strong>${g.name}</strong></li>`)
    .join("");

  const pendingList = pending
    .map((g) => `<li><strong>${g.name}</strong></li>`)
    .join("");

  const subject = "✅ RSVP Confirmed - Quie & Miko's Wedding";

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fefcf7;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #722F37; font-size: 28px; margin: 0;">Quie & Miko</h1>
        <p style="color: #8B6F47; font-size: 14px; margin-top: 4px;">May 22, 2026</p>
      </div>

      <div style="background: white; border-radius: 8px; padding: 24px; border: 1px solid #e5e5e5;">
        <h2 style="color: #722F37; margin-top: 0;">Thank You for Your RSVP! 🎉</h2>
        
        <p style="color: #555; line-height: 1.6;">
          We've received your response and are thrilled to have you celebrate with us!
        </p>

        ${
          attending.length > 0
            ? `
          <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 12px 16px; margin: 16px 0;">
            <h3 style="color: #16a34a; margin: 0 0 8px 0; font-size: 16px;">✅ Confirmed Attendance</h3>
            <ul style="margin: 0; padding-left: 20px; color: #555;">${attendingList}</ul>
          </div>
        `
            : ""
        }

        ${
          declining.length > 0
            ? `
          <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 12px 16px; margin: 16px 0;">
            <h3 style="color: #dc2626; margin: 0 0 8px 0; font-size: 16px;">❌ Unable to Attend</h3>
            <ul style="margin: 0; padding-left: 20px; color: #555;">${decliningList}</ul>
          </div>
        `
            : ""
        }

        ${
          pending.length > 0
            ? `
          <div style="background: #fffbeb; border-left: 4px solid #d97706; padding: 12px 16px; margin: 16px 0;">
            <h3 style="color: #d97706; margin: 0 0 8px 0; font-size: 16px;">⏳ Pending Response</h3>
            <ul style="margin: 0; padding-left: 20px; color: #555;">${pendingList}</ul>
          </div>
        `
            : ""
        }

        ${
          attending.length > 0
            ? `
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
            <h3 style="color: #722F37; font-size: 16px;">Wedding Details</h3>
            <p style="color: #555; margin: 8px 0;">
              <strong>Date:</strong> May 22, 2026<br/>
              <strong>Ceremony:</strong> 1:30PM | Diocesan Shrine and Parish of Saint Pio of Pietrelcina<br/>
              <strong>Venue:</strong> 4:00PM | Pintô Art Museum</p>
            <p style="color: #999; font-size: 13px; margin-top: 16px;">
              If you need to update your RSVP, please use your QR/RSVP code to access the RSVP page again.
            </p>
          </div>
        `
            : `
          <p style="color: #555; margin-top: 16px;">
            We're sorry you won't be able to join us. We'll miss you! 💕
          </p>
        `
        }
      </div>

      <div style="text-align: center; margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          Sent from <a href="https://quieandmiko.com" style="color: #722F37;">quieandmiko.com</a>
        </p>
        <p style="color: #999; font-size: 12px; margin: 4px 0 0 0;">
          ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}
        </p>
      </div>
    </div>
  `;

  const from =
    process.env.RESEND_FROM_EMAIL || "Quie & Miko <onboarding@resend.dev>";

  const emails: EmailPayload[] = guestEmails.map((email) => ({
    from,
    to: email,
    subject,
    html
  }));

  try {
    await sendEmailsSequentially(emails, "Guest confirmation");
  } catch (error) {
    console.error("[Email] Failed to send guest confirmation:", error);
    // Don't throw - email failure shouldn't break the RSVP submission
  }
}

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Support multiple emails: comma-separated list
const NOTIFICATION_EMAILS = process.env.NOTIFICATION_EMAIL
  ? process.env.NOTIFICATION_EMAIL.split(",")
      .map((e) => e.trim())
      .filter(Boolean)
  : [];

interface RsvpNotificationData {
  guests: {
    name: string;
    isAttending: boolean;
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
  console.log("[Email] NOTIFICATION_EMAILS parsed:", NOTIFICATION_EMAILS);
  console.log("[Email] Raw env:", process.env.NOTIFICATION_EMAIL);

  if (!process.env.RESEND_API_KEY || NOTIFICATION_EMAILS.length === 0) {
    console.warn(
      "[Email] RESEND_API_KEY or NOTIFICATION_EMAIL not set, skipping notification"
    );
    console.warn("[Email] API Key exists:", !!process.env.RESEND_API_KEY);
    console.warn("[Email] Notification emails:", NOTIFICATION_EMAILS);
    return;
  }

  console.log("[Email] Sending admin notifications to:", NOTIFICATION_EMAILS);

  const attending = data.guests.filter((g) => g.isAttending);
  const declining = data.guests.filter((g) => !g.isAttending);

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

  const subject = attending.length
    ? `🎉 RSVP Update: ${attending.map((g) => g.name).join(", ")} confirmed!`
    : `RSVP Update: ${declining.map((g) => g.name).join(", ")} declined`;

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

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">
        Sent from quieandmiko.com • ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}
      </p>
    </div>
  `;

  try {
    // Send individual emails to each admin to avoid bulk send issues
    const results = await Promise.allSettled(
      NOTIFICATION_EMAILS.map((email) =>
        resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Wedding RSVP <onboarding@resend.dev>",
          to: email,
          subject,
          html
        })
      )
    );

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(
          `[Email] Admin notification sent to ${NOTIFICATION_EMAILS[index]}:`,
          result.value
        );
      } else {
        console.error(
          `[Email] Failed to send to ${NOTIFICATION_EMAILS[index]}:`,
          result.reason
        );
      }
    });

    const successCount = results.filter((r) => r.status === "fulfilled").length;
    console.log(
      `[Email] RSVP notification: ${successCount}/${NOTIFICATION_EMAILS.length} sent successfully`
    );
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

  const attending = data.guests.filter((g) => g.isAttending);
  const declining = data.guests.filter((g) => !g.isAttending);

  const attendingList = attending
    .map((g) => `<li><strong>${g.name}</strong></li>`)
    .join("");

  const decliningList = declining
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
          attending.length > 0
            ? `
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
            <h3 style="color: #722F37; font-size: 16px;">Wedding Details</h3>
            <p style="color: #555; margin: 8px 0;">
              <strong>Date:</strong> May 22, 2026<br/>
              <strong>Ceremony:</strong> 1:00PM | Diocesan Shrine and Parish of Saint Pio of Pietrelcina<br/>
              <strong>Venue:</strong> 4:00PM | Pintô Art Museum</p>
            <p style="color: #999; font-size: 13px; margin-top: 16px;">
              If you need to update your RSVP, please use your QR code to access the RSVP page again.
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

  try {
    // Send individual emails to avoid exposing email addresses
    const results = await Promise.allSettled(
      guestEmails.map((email) =>
        resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Quie & Miko <onboarding@resend.dev>",
          to: email,
          subject,
          html
        })
      )
    );

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(
          `[Email] Guest confirmation sent to ${guestEmails[index]}:`,
          result.value
        );
      } else {
        console.error(
          `[Email] Failed to send guest confirmation to ${guestEmails[index]}:`,
          result.reason
        );
      }
    });

    const successCount = results.filter((r) => r.status === "fulfilled").length;
    console.log(
      `[Email] Guest confirmation: ${successCount}/${guestEmails.length} sent successfully`
    );
  } catch (error) {
    console.error("[Email] Failed to send guest confirmation:", error);
    // Don't throw - email failure shouldn't break the RSVP submission
  }
}

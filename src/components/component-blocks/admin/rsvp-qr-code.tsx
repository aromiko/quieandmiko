"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/classnames";
import { Download, QrCode, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useRef, useState } from "react";

interface RsvpQrCodeProps {
  guestName: string;
  rsvpCode: string;
  generateLink: (code: string) => Promise<string>;
}

export default function RsvpQrCode({
  guestName,
  rsvpCode,
  generateLink
}: RsvpQrCodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const hdQrRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(async () => {
    setLoading(true);
    const generatedUrl = await generateLink(rsvpCode);
    if (generatedUrl !== "#") {
      setUrl(generatedUrl);
      setIsOpen(true);
    }
    setLoading(false);
  }, [rsvpCode, generateLink]);

  const handleDownload = useCallback(() => {
    if (!hdQrRef.current) return;

    const canvas = hdQrRef.current.querySelector("canvas");
    if (!canvas) return;

    // Create a new canvas with white background and padding
    const paddedCanvas = document.createElement("canvas");
    const padding = 120;
    paddedCanvas.width = canvas.width + padding * 2;
    paddedCanvas.height = canvas.height + padding * 2 + 100; // Extra space for code

    const ctx = paddedCanvas.getContext("2d");
    if (!ctx) return;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

    // Draw QR code
    ctx.drawImage(canvas, padding, padding);

    // Add RSVP code below
    ctx.fillStyle = "#1f1f1f";
    ctx.font = "bold 60px monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      rsvpCode,
      paddedCanvas.width / 2,
      canvas.height + padding + 80
    );

    // Download
    const link = document.createElement("a");
    link.download = `RSVP-QR-${rsvpCode}-HD.png`;
    link.href = paddedCanvas.toDataURL("image/png");
    link.click();
  }, [rsvpCode]);

  const handleDownloadHD = useCallback(() => {
    if (!hdQrRef.current) return;

    const canvas = hdQrRef.current.querySelector("canvas");
    if (!canvas) return;

    // Create a new canvas with transparent background and padding
    const paddedCanvas = document.createElement("canvas");
    const padding = 120;
    paddedCanvas.width = canvas.width + padding * 2;
    paddedCanvas.height = canvas.height + padding * 2 + 100; // Extra space for code

    const ctx = paddedCanvas.getContext("2d");
    if (!ctx) return;

    // Transparent background (no fillRect)
    // Draw QR code
    ctx.drawImage(canvas, padding, padding);

    // Add RSVP code below
    ctx.fillStyle = "#1f1f1f";
    ctx.font = "bold 60px monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      rsvpCode,
      paddedCanvas.width / 2,
      canvas.height + padding + 80
    );

    // Download
    const link = document.createElement("a");
    link.download = `RSVP-QR-${rsvpCode}-HD.png`;
    link.href = paddedCanvas.toDataURL("image/png");
    link.click();
  }, [rsvpCode]);

  const handleCopyLink = useCallback(async () => {
    if (url) {
      await navigator.clipboard.writeText(url);
    }
  }, [url]);

  return (
    <>
      <Button
        onClick={handleOpen}
        disabled={!rsvpCode || loading}
        variant="ghost"
        size="sm"
        title="Show QR Code"
      >
        <QrCode className="size-4" />
      </Button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className={cn(
              "relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl",
              "animate-in fade-in zoom-in-95 duration-200"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 rounded-full p-1 hover:bg-neutral-100"
            >
              <X className="size-5 text-neutral-500" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center space-y-4">
              <h3 className="font-serif text-lg font-semibold">{guestName}</h3>

              {/* QR Code Display */}
              <div className="rounded-lg border border-neutral-200 bg-white p-4">
                {url && (
                  <QRCodeCanvas
                    value={url}
                    size={300}
                    level="H"
                    includeMargin={false}
                  />
                )}
              </div>

              {/* Hidden HD canvas for HD download */}
              <div ref={hdQrRef} className="hidden">
                {url && (
                  <QRCodeCanvas
                    value={url}
                    size={900}
                    level="H"
                    includeMargin={false}
                  />
                )}
              </div>

              {/* URL Preview */}
              <p className="max-w-full truncate text-xs text-neutral-500">
                {url}
              </p>

              {/* Actions */}
              <div className="flex w-full flex-col gap-2">
                <Button onClick={handleCopyLink} variant="outline">
                  Copy Link
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="mr-2 size-4" />
                    HD (White)
                  </Button>
                  <Button onClick={handleDownloadHD} className="flex-1">
                    <Download className="mr-2 size-4" />
                    HD (Transparent)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

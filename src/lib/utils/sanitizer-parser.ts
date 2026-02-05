import HTMLReactParser from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

// Configure DOMPurify hook once on module load to avoid repeated setup
let isHookConfigured = false;

function configureDOMPurifyHook() {
  if (isHookConfigured) return;

  // ISSUE: DOMPurify does not allow and removes 'target' attribute for security purposes upon sanitization.
  // FIX: Add a hook before sanitizing html where all <a> tags with 'target' attribute will be set with '_blank'. Also added the rel='noopener noreferrer' by default for security purposes in case an external link is used. Reference: https://github.com/cure53/DOMPurify/issues/317
  DOMPurify.addHook("afterSanitizeAttributes", function (node: Element) {
    // Set all anchor tags owning target to target=_blank
    if (node.tagName === "A" && "target" in node) {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    }
  });

  isHookConfigured = true;
}

export const sanitizeAndParse = (htmlString: string) => {
  if (!htmlString) return null;

  configureDOMPurifyHook();

  const sanitizedHtml = DOMPurify.sanitize(htmlString, {
    ADD_ATTR: ["target", "rel"]
  });
  return HTMLReactParser(sanitizedHtml);
};

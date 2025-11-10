import Link from "next/link";

interface BasicMediaLinkProps {
  url?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export function BasicMediaLink({
  url,
  isExternal,
  children
}: BasicMediaLinkProps) {
  const linkClassName =
    "flex items-center justify-center transition-opacity duration-300 ease-in-out hover:opacity-50";

  if (url) {
    if (isExternal) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {children}
        </a>
      );
    } else {
      return (
        <Link href={url} className={linkClassName}>
          {children}
        </Link>
      );
    }
  }

  return children;
}

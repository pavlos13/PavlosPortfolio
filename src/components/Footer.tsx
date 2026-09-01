interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <footer
      className="flex justify-between px-4 sm:px-6 lg:px-14 py-5 sm:py-6 pb-10 border-t border-hair font-mono text-[11px] text-[#3E4658]"
      role="contentinfo"
    >
      <span>
        {initials} — {name.toUpperCase()}
      </span>
      <span>© {currentYear}</span>
    </footer>
  );
}

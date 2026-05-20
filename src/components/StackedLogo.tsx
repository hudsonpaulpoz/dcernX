import logoMark from "@/assets/dcernx-mark.png";

/** DcernX mark — uses brand PNG, inverts in dark mode for white-on-dark surfaces */
export const StackedLogo = ({
  size = 16,
  className = "",
}: {
  size?: number;
  color?: string; // kept for backwards-compat, ignored
  className?: string;
}) => (
  <img
    src={logoMark}
    alt="DcernX"
    width={size}
    height={size}
    className={`select-none dark:invert ${className}`}
    style={{ width: size, height: size }}
    draggable={false}
  />
);

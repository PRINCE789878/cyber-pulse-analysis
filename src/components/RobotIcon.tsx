interface RobotIconProps {
  size?: number;
  className?: string;
}

export function RobotIcon({ size = 64, className = "" }: RobotIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antenna */}
      <line x1="32" y1="4" x2="32" y2="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="3" r="2" fill="currentColor" className="animate-pulse" />
      {/* Head */}
      <rect x="14" y="12" width="36" height="28" rx="6" stroke="currentColor" strokeWidth="2" fill="oklch(0.16 0.03 25)" />
      {/* Eyes */}
      <g className="animate-blink">
        <circle cx="24" cy="25" r="3" fill="currentColor" />
        <circle cx="40" cy="25" r="3" fill="currentColor" />
      </g>
      {/* Mouth grid */}
      <rect x="22" y="32" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
      <line x1="27" y1="32" x2="27" y2="36" stroke="currentColor" strokeWidth="1" />
      <line x1="32" y1="32" x2="32" y2="36" stroke="currentColor" strokeWidth="1" />
      <line x1="37" y1="32" x2="37" y2="36" stroke="currentColor" strokeWidth="1" />
      {/* Body */}
      <rect x="18" y="42" width="28" height="16" rx="3" stroke="currentColor" strokeWidth="2" fill="oklch(0.16 0.03 25)" />
      <circle cx="26" cy="50" r="2" fill="currentColor" />
      <circle cx="38" cy="50" r="2" fill="currentColor" />
      {/* Side arms */}
      <line x1="14" y1="46" x2="10" y2="50" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="46" x2="54" y2="50" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

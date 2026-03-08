type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "text-base gap-1",
  md: "text-xl gap-2",
  lg: "text-3xl md:text-4xl gap-3",
};

const iconSizes: Record<Size, number> = {
  sm: 16,
  md: 24,
  lg: 36,
};

function PaintbrushIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L13 10l4.37-4.37a2.12 2.12 0 1 0 3-3Z" />
      <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
    </svg>
  );
}

export function WatermarkOverlay({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: Size;
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <span
        className={`font-display font-semibold -rotate-45 flex items-center whitespace-nowrap text-stone-500/50 ${sizeClasses[size]}`}
      >
        <PaintbrushIcon size={iconSizes[size]} />
        SoftHue Studios
      </span>
    </div>
  );
}

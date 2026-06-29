"use client";

export function HoneypotField() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      defaultValue=""
      className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );
}

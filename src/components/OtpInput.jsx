import { useRef } from "react";

/**
 * Four single-digit inputs that auto-advance forward on entry and
 * backward on backspace — same UX as the Stitch export, rewired from
 * direct DOM manipulation (querySelectorAll + manual focus calls) to
 * refs, which is the React-idiomatic way to imperatively focus a
 * specific element.
 *
 * `value` is the full code as a string (e.g. "1234" or "12" if only
 * half-entered); `onChange` receives the updated full string. Kept as
 * one string rather than an array of 4 separate values so the parent
 * page can just do `value.length === 4` to check completeness, same
 * as the original .join('') logic.
 */
export default function OtpInput({ value, onChange, length = 4 }) {
  const inputRefs = useRef([]);

  const digits = value.padEnd(length, " ").split("").map((d) => (d === " " ? "" : d));

  const handleChange = (index, rawValue) => {
    const digit = rawValue.replace(/[^0-9]/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    onChange(nextDigits.join("").trimEnd());

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-stack-lg">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="otp-input w-14 h-16 text-center text-headline-md font-bold border border-outline-variant rounded-lg bg-surface-bright focus:outline-none focus:ring-0 transition-all"
        />
      ))}
    </div>
  );
}

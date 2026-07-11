import { useState, useEffect, useCallback } from "react";

/**
 * Counts down from `seconds` to 0, exposing the remaining time and a
 * `restart` function (for "Resend Code"). Mirrors the Stitch export's
 * vanilla setInterval logic, just moved into a proper React hook with
 * cleanup — the previous version would have kept ticking even after
 * the component unmounted, since the interval was never cleared on
 * navigation away from the page.
 */
export default function useCountdown(seconds) {
  const [remaining, setRemaining] = useState(seconds);
  const [cycle, setCycle] = useState(0); // bumped by restart() to start a fresh countdown

  useEffect(() => {
    setRemaining(seconds);
    if (seconds <= 0) return;

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [seconds, cycle]);

  const restart = useCallback(() => setCycle((c) => c + 1), []);

  const formatted = `00:${remaining < 10 ? `0${remaining}` : remaining}`;

  return { remaining, formatted, isFinished: remaining <= 0, restart };
}

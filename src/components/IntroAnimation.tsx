import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "motion/react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const TAGLINE = "PAVITHRAN G — AI / ML DEVELOPER";

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [visible, setVisible] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => String(Math.round(latest)).padStart(2, "0"));

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const t = window.setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 400);
      return () => window.clearTimeout(t);
    }

    // Counter sweep 0 → 100
    const controls = animate(count, 100, {
      duration: 1.4,
      delay: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });

    // Trigger handoff just before curtain finishes
    const handoff = window.setTimeout(() => onComplete(), 3000);
    // Unmount overlay shortly after
    const unmount = window.setTimeout(() => setVisible(false), 3300);

    return () => {
      controls.stop();
      window.clearTimeout(handoff);
      window.clearTimeout(unmount);
    };
  }, [count, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Grain + radial pulse backdrop */}
          <div className="intro-grain" aria-hidden="true" />
          <div className="intro-pulse" aria-hidden="true" />

          {/* Curtains */}
          <motion.div
            className="intro-curtain intro-curtain-top"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ delay: 2.2, duration: 1.0, ease: [0.86, 0, 0.07, 1] }}
          />
          <motion.div
            className="intro-curtain intro-curtain-bottom"
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ delay: 2.2, duration: 1.0, ease: [0.86, 0, 0.07, 1] }}
          />

          {/* Center stack */}
          <div className="intro-stack">
            {/* Monogram PG */}
            <motion.svg
              className="intro-monogram"
              viewBox="0 0 200 120"
              width="160"
              height="96"
              fill="none"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
              aria-hidden="true"
            >
              {/* P */}
              <motion.path
                d="M30 110 L30 15 L70 15 Q95 15 95 40 Q95 65 70 65 L30 65"
                stroke="hsl(var(--accent-ice))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1.1, ease: "easeInOut" }}
              />
              {/* G */}
              <motion.path
                d="M180 35 Q175 15 150 15 Q120 15 120 60 Q120 110 150 110 Q180 110 180 80 L180 65 L155 65"
                stroke="hsl(var(--accent-ice))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.1, ease: "easeInOut" }}
              />
            </motion.svg>

            {/* Counter + progress line */}
            <motion.div
              className="intro-counter-row"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <motion.span className="intro-counter">{rounded}</motion.span>
              <div className="intro-progress-track">
                <motion.div
                  className="intro-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="intro-counter intro-counter-end">100</span>
            </motion.div>

            {/* Tagline */}
            <div className="intro-tagline" aria-label={TAGLINE}>
              {TAGLINE.split("").map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 1.6 + i * 0.025,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroAnimation;

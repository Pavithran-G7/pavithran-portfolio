import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function MotionSection({ children, className = "", id, delay = 0 }: MotionSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px 0px -50px 0px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 1, y: 56, scale: 0.985 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 56, scale: 0.985 }}
      transition={{
        duration: 1.05,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}

interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function MotionItem({ children, className = "", delay = 0, direction = "up", style, onClick, onMouseMove, onMouseLeave }: MotionItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-30px 0px -30px 0px" });

  const initialX = direction === "left" ? -50 : direction === "right" ? 50 : 0;
  const initialY = direction === "up" ? 40 : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: initialY }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  style?: React.CSSProperties;
}

export function StaggerContainer({ children, className = "", style }: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-30px 0px -30px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerChildVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

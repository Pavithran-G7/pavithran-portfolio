import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";

interface TimelineCardData {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
  badge?: string;
  badgeVariant?: "pursuing" | "completed";
  icon?: string;
  initial?: string;
  meta?: { label: string; value: string }[];
}

interface ScrollTimelineProps {
  items: TimelineCardData[];
  accentColor?: "ice" | "mint" | "amber";
}

function TimelineCard({ item, index, totalItems }: { item: TimelineCardData; index: number; totalItems: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px 0px -80px 0px" });
  const isLeft = index % 2 === 0;

  return (
    <div className="scroll-timeline-item" ref={ref}>
      {/* Connector dot */}
      <motion.div
        className="timeline-dot"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="timeline-dot-ping"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={isInView ? { scale: 2.5, opacity: 0 } : { scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        className={`timeline-card ${isLeft ? "timeline-card--left" : "timeline-card--right"}`}
        initial={{ 
          opacity: 0, 
          x: isLeft ? -60 : 60, 
          y: 30,
          rotateY: isLeft ? -8 : 8,
          scale: 0.92 
        }}
        animate={isInView ? { 
          opacity: 1, 
          x: 0, 
          y: 0,
          rotateY: 0,
          scale: 1 
        } : { 
          opacity: 0, 
          x: isLeft ? -60 : 60, 
          y: 30,
          rotateY: isLeft ? -8 : 8,
          scale: 0.92 
        }}
        transition={{ 
          duration: 0.8, 
          delay: 0.1, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        whileHover={{ 
          y: -6, 
          scale: 1.02,
          transition: { duration: 0.3 } 
        }}
      >
        <div className="timeline-card-glow" />
        <div className="timeline-card-inner">
          {/* Header */}
          <div className="timeline-card-header">
            {item.initial && (
              <div className="timeline-card-icon">
                {item.initial}
              </div>
            )}
            <div className="timeline-card-header-text">
              <motion.div 
                className="timeline-card-date"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {item.date}
              </motion.div>
              <h3 className="timeline-card-title">{item.title}</h3>
              <p className="timeline-card-subtitle">{item.subtitle}</p>
            </div>
          </div>

          {/* Meta row */}
          {item.meta && item.meta.length > 0 && (
            <div className="timeline-card-meta">
              {item.meta.map((m, i) => (
                <motion.span 
                  key={i} 
                  className="timeline-meta-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  {m.value}
                </motion.span>
              ))}
            </div>
          )}

          {/* Description or bullets */}
          {item.description && (
            <p className="timeline-card-desc">{item.description}</p>
          )}
          {item.bullets && item.bullets.length > 0 && (
            <ul className="timeline-card-bullets">
              {item.bullets.map((b, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  {b}
                </motion.li>
              ))}
            </ul>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="timeline-card-tags">
              {item.tags.map((t, i) => (
                <motion.span 
                  key={t} 
                  className="timeline-tag"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          )}

          {/* Status badge */}
          {item.badge && (
            <motion.div 
              className={`timeline-badge ${item.badgeVariant || "completed"}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {item.badgeVariant === "pursuing" ? "● " : "✓ "}
              {item.badge}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function ScrollTimeline({ items }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 100, damping: 30 }
  );

  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div className="scroll-timeline" ref={containerRef}>
      {/* Animated center line */}
      <div className="timeline-line-track">
        <motion.div
          className="timeline-line-fill"
          style={{ height: lineHeight, opacity: lineOpacity }}
        />
      </div>

      {/* Timeline items */}
      {items.map((item, i) => (
        <TimelineCard key={i} item={item} index={i} totalItems={items.length} />
      ))}
    </div>
  );
}

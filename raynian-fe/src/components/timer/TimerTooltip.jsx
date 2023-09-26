import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TimerTooltip = ({ type, container, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [background] = useState(() => {
    let backgroundColor = "bg-gray-900"; // Default color

    switch (type) {
      case "start":
        backgroundColor = "bg-green-500";
        break;
      case "stop":
        backgroundColor = "bg-red-400";
        break;
      case "skip":
        backgroundColor = "bg-yellow-500";
        break;
      case "pause":
        backgroundColor = "bg-blue-500";
        break;
      case "settings":
        backgroundColor = "bg-neutral-400";
        break;
      // Add more cases for other types if needed

      default:
        break;
    }

    return backgroundColor;
  });

  const tooltipAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
    transition: { duration: 0.1 },
    style: { pointerEvents: "none" },
  };

  const tooltipTextAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    // Add event listeners to the container (skipRef in this case)
    const containerElement = container.current;
    if (containerElement) {
      containerElement.addEventListener("mouseenter", handleMouseEnter);
      containerElement.addEventListener("mouseleave", handleMouseLeave);
    }

    // Clean up event listeners on component unmount
    return () => {
      if (containerElement) {
        containerElement.removeEventListener("mouseenter", handleMouseEnter);
        containerElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [container, type]);

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className={`tooltip-right ${background} select-none`}
          {...tooltipAnimation}
        >
          <motion.p
            className="align whitespace-nowrap text-white"
            {...tooltipTextAnimation}
          >
            {text}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimerTooltip;

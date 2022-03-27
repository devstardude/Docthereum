import { animate, AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Counter = ({ from, to }) => {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      repeat:true,
      duration: 5,
      onUpdate(value) {
        ref.current.textContent = value.toFixed(1);
      },
    });
    return () => controls.stop();
  }, [from, to]);

  return (
    <AnimatePresence>
      <motion.p ref={ref} />
    </AnimatePresence>
  );
};

export default Counter;

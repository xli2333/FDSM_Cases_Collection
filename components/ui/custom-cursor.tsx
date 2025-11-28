"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  // Initialize off-screen to prevent flash
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  
  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 350, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      // Check if mouse is inside the special area
      const isInsideArea = target.closest('.special-cursor-area');

      if (isInsideArea) {
        if (!isActive) {
           setIsActive(true);
           document.body.style.cursor = 'none';
        }
      } else {
        if (isActive) {
           setIsActive(false);
           document.body.style.cursor = 'auto';
        }
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.style.cursor = 'auto'; // Cleanup
    };
  }, [mouseX, mouseY, isActive]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex will-change-transform"
      style={{ 
        x, 
        y, 
        translateX: '-50%', 
        translateY: '-50%', 
        opacity: isActive ? 1 : 0 
      }}
    >
      {/* This div is the actual cursor "body" */}
      <motion.div
        className="relative rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center backdrop-blur-sm"
        style={{ width: 160, height: 160 }} // Adjusted size (approx 2/3 of previous 250px)
        initial={{ scale: 0.5 }}
        animate={{
          scale: isActive ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
         {/* Optional: Add some inner detail or remove text if pure mask effect is desired */}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
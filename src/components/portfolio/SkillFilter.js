import React from "react";
import { motion } from "framer-motion";

export default function SkillFilter({ categories, activeCategory, onFilter }) {
  return (
    <div className="flex gap-4 border-b border-neutral-800 pb-4 overflow-x-auto whitespace-nowrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilter(category)}
          className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
            activeCategory === category ? "text-white" : "text-neutral-500 hover:text-white"
          }`}
        >
          {category}
          {activeCategory === category && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full mt-4"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

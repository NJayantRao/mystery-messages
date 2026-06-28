import React from "react";

const FloatingMessages = () => {
  return (
    <div className="mt-14 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
      {[
        {
          text: "You inspire everyone around you ✨",
          color: "#8B5CF6",
          bg: "#F5F3FF",
        },
        {
          text: "Your kindness is rare 💙",
          color: "#3B82F6",
          bg: "#EFF6FF",
        },
        {
          text: "That talk changed my perspective 🎯",
          color: "#EC4899",
          bg: "#FDF2F8",
        },
        {
          text: "I look up to you every day 🌟",
          color: "#10B981",
          bg: "#F0FDF4",
        },
        {
          text: "You're stronger than you think 💪",
          color: "#F59E0B",
          bg: "#FFFBEB",
        },
      ].map((pill, i) => (
        <span
          key={i}
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border"
          style={{
            backgroundColor: pill.bg,
            color: pill.color,
            borderColor: pill.color + "33",
          }}
        >
          {pill.text}
        </span>
      ))}
    </div>
  );
};

export default FloatingMessages;

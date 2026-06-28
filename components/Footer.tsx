import { MessageCircle } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
      <div className="flex items-center gap-2 font-bold text-gray-900">
        <MessageCircle className="w-4 h-4" style={{ color: "#8B5CF6" }} />
        Mystery Messages
      </div>
      <p className="text-xs">
        © {new Date().getFullYear()} Mystery Messages. Say what you feel.
      </p>
      <div className="flex gap-6 text-xs">
        <a href="#" className="hover:text-gray-900 transition-colors">
          Privacy
        </a>
        <a href="#" className="hover:text-gray-900 transition-colors">
          Terms
        </a>
        <a href="#" className="hover:text-gray-900 transition-colors">
          Contact
        </a>
      </div>
    </div>
  );
};

export default Footer;

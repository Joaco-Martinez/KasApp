import React, { useState } from "react";
import { Share } from "react-feather";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
    >
      <Share size={16} />
      {copied ? "¡Copiado!" : "Compartir"}
    </button>
  );
}
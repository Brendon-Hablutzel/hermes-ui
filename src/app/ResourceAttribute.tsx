"use client";

import { useState } from "react";

const ResourceAttribute = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  const [showCopy, setShowCopy] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard === undefined) {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      } else {
        await navigator.clipboard.writeText(value);
      }
    } catch (e) {
      console.error(e);
      setCopyError(true);
      await new Promise((resolve) => setTimeout(resolve, 650));
      setCopyError(false);
      return;
    }

    setShowCopy(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setShowCopy(false);
  };

  return (
    <div className="bg-gray-100 rounded-lg px-2 py-1 text-xs sm:text-sm flex justify-between gap-3">
      <span>{name}</span>
      <button
        className="text-right font-mono overflow-ellipsis overflow-hidden whitespace-nowrap hover:cursor-pointer"
        title="click to copy"
        onClick={handleCopy}
      >
        {showCopy ? "copied!" : copyError ? "error" : value}
      </button>
    </div>
  );
};

export default ResourceAttribute;

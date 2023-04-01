import React from "react";

interface AIXLogoProps {
  label: string;
}

export const AIXLogo: React.FC<AIXLogoProps> = ({ label }) => {
  return (
    <a className="flex gap-2 items-center" href="/">
      <div className="h-12 w-12 rounded-full bg-slate-900 text-slate-50 font-sans text-lg flex items-center justify-center">
        AIX
      </div>
      <p className="text-xl">{label}</p>
    </a>
  );
};

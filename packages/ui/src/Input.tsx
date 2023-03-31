import React from "react";
import { BaseComponent } from "./core";
import { type Message } from "./Output";
import { cn } from "./Utils";

interface AIXInputProps extends BaseComponent {
  placeholder?: string;
  value: string;
  icon?: React.ReactElement;
  onChange: (value: string) => void;
  onSend: (msg: Message) => void;
}

export const AIXInput: React.FC<AIXInputProps> = ({
  className,
  placeholder = "Chat with your assistant",
  value,
  icon,
  onChange,
  onSend,
}) => {
  const handleSend = () => {
    onSend({
      content: value,
      role: "user",
    });
  };

  return (
    <div className={cn("w-full flex", className)}>
      <input
        className="w-full bg-transparent p-2 outline-none"
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={placeholder}
      />
      <div
        className="w-12 h-12 bg-slate-900 text-slate-50 rounded-md flex items-center justify-center text-xl cursor-pointer"
        onClick={handleSend}
      >
        {icon}
      </div>
    </div>
  );
};

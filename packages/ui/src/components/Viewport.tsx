import React from "react";
import { BaseComponent } from "../core";
import { cn } from "../Utils";

interface ViewportProps extends BaseComponent {}

export const Viewport: React.FC<ViewportProps> = ({ className, children }) => {
  return <div className={cn("", className)}>{children}</div>;
};

import { Utils } from "@aix/ui";
import { cn } from "@aix/ui/src/Utils";
import React from "react";
import { BaseComponent } from "~/utils/types";

interface HeroProps extends BaseComponent {}

const Hero: React.FC<HeroProps> = ({ children, className }) => {
  return (
    <div
      className={Utils.cn(
        "w-full min-h-[42rem] flex justify-center items-center bg-slate-100 rounded-md my-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Hero;

import { Utils } from "@aix/ui";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BaseComponent } from "~/utils/types";

interface CardProps extends BaseComponent {
  title: string;
  image: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  description,
  className,
}) => {
  return (
    <div
      className={Utils.cn(
        "aspect-square w-full flex items-center justify-end bg-slate-100 rounded-md flex-col",
        className
      )}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative flex bottom-0 bg-slate-900/10 backdrop-blur w-full h-20 rounded-b-md p-3">
        <div className="w-4/5 flex items-start justify-center flex-col">
          <h3 className="text-xl font-bold text-slate-50">{title}</h3>
          {!!description && (
            <p className="text-sm text-slate-50">{description}</p>
          )}
        </div>
        <div className="w-1/5 h-full flex items-center justify-center">
          <div className="border w-fit p-2 rounded-full border-slate-50/50 text-slate-50 flex justify-center items-center text-xl cursor-pointer hover:bg-slate-50/20 hover:text-slate-100">
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import { AIXLogo } from "@aix/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Route = {
  label: string;
  url: string;
};

interface HeaderProps {
  menu: Route[];
}

const Header: React.FC<HeaderProps> = ({ menu }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full">
      <AIXLogo label="Shop" />
      <nav>
        <ul className="flex gap-3">
          {menu.map((menuItem: Route) => (
            <li className={router.asPath === menuItem.url ? "font-bold" : ""}>
              <Link href={menuItem.url}>{menuItem.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;

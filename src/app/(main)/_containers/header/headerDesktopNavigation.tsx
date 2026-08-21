import Link from "next/link";

import { STATIC_NAV_LINKS } from "@/constant/navLinks";

import MegaMenu from "./megaMenu";

const StaticLinks = () => {
  return (
    <>
      {STATIC_NAV_LINKS.map(({ label, link }) => (
        <li key={link + label}>
          <Link href={link}>{label}</Link>
        </li>
      ))}
    </>
  );
};

const HeaderDesktopNavigation = () => {
  return (
    <nav className="flex-auto max-md:hidden justify-center flex relative mega-menu-wrapper">
      <ul className="flex lg:gap-8 gap-4 *:hover:text-secondary-500 h-full *:items-center *:flex">
        <MegaMenu />
        <StaticLinks />
      </ul>
    </nav>
  );
};

export default HeaderDesktopNavigation;

import { STATIC_NAV_LINKS } from "@/constant/navLinks";

import MobileMenu, { MenuItemLink } from "./mobileMenu";

const StaticLinks = () => {
  return (
    <>
      {STATIC_NAV_LINKS.map(({ label, link }) => (
        <MenuItemLink key={label + link} href={link}>
          {label}
        </MenuItemLink>
      ))}
    </>
  );
};

const HeaderMobileNavigation = () => {
  return (
    <MobileMenu>
      <StaticLinks />
    </MobileMenu>
  );
};

export default HeaderMobileNavigation;

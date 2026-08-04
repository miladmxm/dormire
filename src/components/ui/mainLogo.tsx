import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/logo.png";

const MainLogo = ({
  className,
  linkedToHome = true,
}: {
  className?: string;
  linkedToHome?: boolean;
}) => {
  if (linkedToHome) {
    return (
      <Link href="/" className={className}>
        <Image loading="eager" alt="logo" src={logo} />
      </Link>
    );
  }

  return <Image className={className} alt="logo" src={logo} />;
};

export default MainLogo;

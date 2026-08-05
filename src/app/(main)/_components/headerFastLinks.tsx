import Link from "next/link";

import Cart from "@/assets/icons/cart.svg";
import Like from "@/assets/icons/like.svg";
import Profile from "@/assets/icons/profile.svg";
import { getUserCart } from "@/features/cart/dal/query";
import { getSession } from "@/lib/auth";

import OpenAuthDealog from "./openAuthDealog";

const UserFastLinks = async () => {
  const auth = await getSession();
  let cartCount = 0;

  if (auth?.user?.id) {
    const cart = await getUserCart();
    cartCount = cart?.items.length || 0;
  }

  return (
    <div className="flex min-w-max gap-2 [&_svg]:size-full *:size-4 md:size-5 *:hover:text-secondary-500 text-primary-900">
      {auth?.user ? (
        <>
          <Link
            aria-label="حساب کاربری"
            data-testid="profile-link"
            href="/profile"
          >
            <Profile />
          </Link>
          <Link href="#like">
            <Like />
          </Link>
          <Link href={"/cart" as any} className="relative">
            <Cart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary-500 center text-white text-[10px] size-4 rounded-full z-30 leading-none">
                {cartCount > 99 ? "99+" : cartCount.toLocaleString("fa")}
              </span>
            )}
          </Link>
        </>
      ) : (
        <OpenAuthDealog />
      )}
    </div>
  );
};

export default UserFastLinks;

import { AnimatePresence, hover, motion, useMotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useEffectEvent, useRef } from "react";

import type { Category, CategoryTree } from "@/services/product/type";

import ArrowToLeft from "@/assets/icons/arrowToLeft.svg";
import heroCategoryBackground from "@/assets/images/heroCategoryBackground.jpg";
import DefaultImage from "@/components/ui/defaultImage";
import SeparatorLine from "@/components/ui/separatorLine";
import { cn } from "@/lib/utils";

import { useMainLayoutContext } from "../../../_context";
import { useMegaMenuStore } from "./store";

const ParentMenuItem = ({ name, id, thumbnail }: Category) => {
  const { activeId, setActiveIndex } = useMegaMenuStore();
  const isActive = activeId === id;
  return (
    <li className="group relative isolate">
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="bg-linear-to-r from-transparent from-10% to-90% via-45% via-thready-400/50 to-transparent absolute inset-y-0 -z-10"
            exit={{ opacity: 0, insetInline: "100%" }}
            initial={{ opacity: 0, insetInline: "100%" }}
            animate={{ opacity: 1, insetInline: "0" }}
          />
        )}
      </AnimatePresence>
      <button
        onClick={() => setActiveIndex(id)}
        className="flex size-full gap-6 py-4 px-6 items-center"
        type="button"
      >
        <div className="w-12 h-10">
          <DefaultImage
            height={40}
            width={50}
            image={thumbnail}
            className="size-full object-contain"
          />
        </div>
        <strong className="font-bold text-primary-900">{name}</strong>
      </button>
      <SeparatorLine
        className={cn("flex items-center justify-end group-last:hidden", {
          "to-thready-800/30": isActive,
        })}
      >
        <AnimatePresence>
          {isActive && (
            <motion.span
              exit={{ x: "-100%", opacity: 0 }}
              initial={{ x: "200%" }}
              animate={{ x: "0%" }}
              className="group-last:hidden text-thready-500"
            >
              <ArrowToLeft className="size-2" />
            </motion.span>
          )}
        </AnimatePresence>
      </SeparatorLine>
    </li>
  );
};

const ParentMenu = () => {
  const { productCategories } = useMainLayoutContext();
  const setActiveIndex = useMegaMenuStore((store) => store.setActiveIndex);
  const setFirstItem = useEffectEvent(() =>
    setActiveIndex(productCategories[0]?.id),
  );
  useEffect(() => {
    setFirstItem();
  }, []);
  return (
    <ul className="grid auto-rows-fr">
      {productCategories.map((item) => {
        return <ParentMenuItem key={item.id} {...item} />;
      })}
    </ul>
  );
};

const SubCategoryLinks = ({ categories }: { categories: CategoryTree[] }) => {
  return (
    <ul className="pt-8 ps-4">
      {categories.map(({ name, slug }) => (
        <li key={slug}>
          <Link
            className="text-primary-900 hover:text-secondary-500 w-full block py-2 px-4"
            href={`/products/${slug}`}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const ChildMenu = () => {
  const activeId = useMegaMenuStore((store) => store.activeId);

  const { productCategories } = useMainLayoutContext();
  const activeCategory = productCategories.find(({ id }) => id === activeId);
  if (!activeCategory || !activeCategory.children?.length) return null;
  const activeCategoryChildren = activeCategory.children;

  return (
    <div className="flex gap-4 items-stretch flex-auto relative">
      <AnimatePresence>
        {activeCategoryChildren.map(({ id, name, children }, i) => (
          <motion.div
            exit={{
              y: "20%",
              position: "absolute",
              width: `33%`,
              opacity: 0,
              insetInlineStart: `${i * (100 / activeCategoryChildren.length)}%`,
            }}
            initial={{
              y: "-10%",
              opacity: 0,
            }}
            animate={{ y: 0, opacity: 1 }}
            className="flex-1/3 flex inset-y-0"
            key={id}
          >
            <div className="flex-auto">
              <strong className="font-bold py-2 ps-4 block text-thready-800">
                {name}
              </strong>
              <SeparatorLine />
              <SubCategoryLinks categories={children || []} />
            </div>
            {activeCategoryChildren.length - 1 !== i && (
              <SeparatorLine variant="horizontal" size="2" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      {activeCategory.thumbnail && (
        <div className="flex-1/4">
          <Image
            alt="hero bg"
            src={heroCategoryBackground}
            className="size-full rounded-3xl opacity-25"
          />
          <motion.div layout className="absolute -bottom-5 inset-e-0 w-1/3">
            <DefaultImage image={activeCategory.thumbnail} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  return (
    <div className="flex gap-6">
      <ParentMenu />
      <ChildMenu />
    </div>
  );
};

const MegaMenu = () => {
  const productsItemInNavRef = useRef<HTMLAnchorElement>(null);
  const top = useMotionValue(10);
  const setTop = useEffectEvent((t: number) => top.set(t));
  useEffect(() => {
    hover(productsItemInNavRef.current, () => {
      if (productsItemInNavRef.current) {
        const { bottom } = productsItemInNavRef.current.getBoundingClientRect();
        setTop(bottom);
      }
    });
  }, []);
  return (
    <li className="cursor-pointer product-nav-trigger">
      <Link
        href="/shop"
        className="flex h-full items-center"
        ref={productsItemInNavRef}
      >
        محصولات
      </Link>
      <motion.div
        style={{ top }}
        className="mega-menu pt-4 container w-full fixed inset-x-0 top-20 transition-all duration-300 invisible pointer-events-none opacity-0 translate-y-10 -z-10"
      >
        <div className="p-8 xl:p-10 rounded-6xl bg-primary-25 shadow-lg-gray h-full">
          <Menu />
        </div>
      </motion.div>
    </li>
  );
};

export default MegaMenu;

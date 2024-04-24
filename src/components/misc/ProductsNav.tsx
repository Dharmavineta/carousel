"use client";
import { CaseSensitiveIcon, Play, Ruler, Space, Target } from "lucide-react";
import React from "react";
import PageLink from "./PageLink";
import { usePathname } from "next/navigation";

const pageLinks = [
  {
    id: 1,
    label: "Overview",
    icon: Target,
    link: "/",
  },
  {
    id: 2,
    label: "Media",
    icon: Play,
    link: "/media",
  },
  {
    id: 3,
    label: "Size-Chart",
    icon: Ruler,
    link: "/size",
  },
  {
    id: 4,
    label: "Attributes",
    icon: Space,
    link: "/attributes",
  },
  {
    id: 5,
    label: "Text",
    icon: CaseSensitiveIcon,
    link: "/text",
  },
];

const ProductsNav = () => {
  return (
    <div className="flex justify-between py-5">
      <div className="flex gap-x-8 ">
        {pageLinks.map((page, i, arr) => (
          <PageLink
            icon={page.icon}
            id={page.id}
            label={page.label}
            link={page.link}
            key={page.id}
          />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default ProductsNav;

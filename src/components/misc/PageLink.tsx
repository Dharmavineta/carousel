import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

type pageLinkProps = {
  id: number;
  label: string;
  icon: LucideIcon;
  link: string;
};

const PageLink: FC<pageLinkProps> = ({ icon, id, label, link }) => {
  const pathName = usePathname();

  return (
    <Link
      href={link}
      className={cn("text-sm", pathName === link && "text-sky-600")}
    >
      {label}
    </Link>
  );
};

export default PageLink;

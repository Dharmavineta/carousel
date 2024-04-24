import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5 px-5 lg:px-10 shadow-sm">
      <Link href={"/"}>
        <h1 className="font-bold">Logo</h1>
      </Link>
      <div className="flex gap-x-4">
        <Button className=" text-gray-700" variant={"link"}>
          Products
        </Button>
        <Button className="font-normal text-gray-500" variant={"link"}>
          Home
        </Button>
        <Button className="font-normal text-gray-500" variant={"link"}>
          Products
        </Button>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src="https://unsplash.com/photos/man-wearing-henley-top-portrait-7YVZYZeITc8"
            alt="profile_pic"
          />
          <AvatarFallback>KR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;

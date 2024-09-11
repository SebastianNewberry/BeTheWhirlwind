"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { signOutUserAction } from "./actions";
import { User } from "@/db/schema";

const Navbar = ({
  className,
  authStatus,
}: {
  className?: string;
  authStatus?: User;
}) => {
  const [active, setActive] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const handleBurgerToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex w-[100%] flex-row justify-between items-center m-auto px-36 py-5 min-h-[100px] sticky z-[40]">
        <Link className="text-2xl cursor-pointer min-w-[100px]" href="/">
          <img
            src="/WhirlwindLogo.png"
            alt="Whirlwind Logo"
            width={"100px"}
            height={"100px"}
          />
        </Link>
        {authStatus ? (
          <>
            <div className="flex md:hidden relative z-[50] ">
              <Sheet onOpenChange={handleBurgerToggle}>
                <SheetTrigger>
                  <div className="flex flex-col justify-between w-6 h-4 cursor-pointer">
                    <div
                      className={`w-full h-0.5 bg-black transition-transform transform origin-center ${
                        isOpen
                          ? "rotate-45 translate-y-[7px]"
                          : "rotate-0 translate-y-0"
                      }`}
                    ></div>
                    <div
                      className={`w-full h-0.5 bg-black transition-opacity ${
                        isOpen ? "opacity-0" : "opacity-100"
                      }`}
                    ></div>
                    <div
                      className={`w-full h-0.5 bg-black transition-transform transform origin-center ${
                        isOpen
                          ? "-rotate-45 -translate-y-[7px]"
                          : "rotate-0 translate-y-0"
                      }`}
                    ></div>
                  </div>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader className="h-full">
                    <SheetTitle>
                      <div className="flex flex-col">
                        <img
                          src="/WhirlwindLogo.png"
                          width={"100px"}
                          height={"100px"}
                          alt="Whirlwind Logo"
                        />
                      </div>
                    </SheetTitle>
                    <SheetDescription className="h-full">
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-start flex-col gap-5 mt-5">
                          <div className="flex flex-col gap-5">
                            <h1 className="font-medium text-xl text-black">
                              Businesses
                            </h1>
                            <div className="ml-5 mb-5 flex flex-col gap-3">
                              <Link href={"/feed"} className="block">
                                Feed
                              </Link>
                              <Link href={"/businesses/map"} className="block">
                                Map of All Businesses
                              </Link>
                              <Link
                                href={"/businesses/overview"}
                                className="block"
                              >
                                Overview of All Businesses
                              </Link>
                              <Link href={"/businesses/add"} className="block">
                                Add a New Business
                              </Link>
                            </div>
                          </div>
                          <div className="flex justify-start flex-col gap-5">
                            <div className="flex flex-col gap-5">
                              <h1 className="font-medium text-xl text-black">
                                Posts
                              </h1>
                              <div className="ml-5 mb-5 flex flex-col gap-3">
                                <Link href={"/feed"} className="block">
                                  Create a New Post
                                </Link>
                                <Link
                                  href={"/businesses/map"}
                                  className="block"
                                >
                                  View All Blog Posts
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start flex-col gap-5">
                            <div className="flex flex-col gap-5">
                              <h1 className="font-medium text-xl text-black">
                                Profile
                              </h1>
                              <div className="ml-5 mb-5 flex flex-col gap-3">
                                <Link href={"/profile/view"} className="block">
                                  View Profile
                                </Link>
                                <Link href={"/profile/edit"} className="block">
                                  Edit Profile
                                </Link>
                                <Link
                                  href={"/profiles/search"}
                                  className="block"
                                >
                                  Search for Other Profiles
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-full p-4 gap-3">
                          <ProductItem
                            title={authStatus.name || ""}
                            description={authStatus.email || ""}
                            src={authStatus.image || "/blank_profile_pic.png"}
                          ></ProductItem>
                          <Button
                            onClick={async () => await signOutUserAction()}
                            className="w-full"
                            variant={"destructive"}
                          >
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <div className={cn("hidden md:block ", className)}>
              <Menu setActive={setActive}>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Businesses"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/feed">Feed</HoveredLink>
                    <HoveredLink href="/map">Map Of All Businesses</HoveredLink>
                    <HoveredLink href="/business/overview">
                      Overview of Businesses
                    </HoveredLink>
                    <HoveredLink href="/add/business">
                      Add a New Business
                    </HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Posts">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/posts/view">View Posts</HoveredLink>
                    <HoveredLink href="/posts/create">
                      Create a Post
                    </HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Profile">
                  <div className="flex flex-col space-y-4 text-sm">
                    <ProductItem
                      title={authStatus.name || ""}
                      description={authStatus.email || ""}
                      src={authStatus.image || "/blank_profile_pic.png"}
                    ></ProductItem>
                    <HoveredLink href="/profile/edit ">
                      Edit Profile
                    </HoveredLink>
                    <HoveredLink href="/profile/view">View Profile</HoveredLink>
                    <HoveredLink href="/profiles/search">
                      Search for other Profiles
                    </HoveredLink>
                    <Button
                      onClick={async () => await signOutUserAction()}
                      variant={"destructive"}
                    >
                      Sign Out
                    </Button>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <>
            <div className="flex md:hidden ">
              <Sheet onOpenChange={handleBurgerToggle}>
                <SheetTrigger>
                  <div className="flex flex-col justify-between w-6 h-4 cursor-pointer">
                    <div
                      className={`w-full h-0.5 bg-gray-700 transition-transform transform origin-center ${
                        isOpen
                          ? "rotate-45 translate-y-[7px]"
                          : "rotate-0 translate-y-0"
                      }`}
                    ></div>
                    <div
                      className={`w-full h-0.5 bg-gray-700 transition-opacity ${
                        isOpen ? "opacity-0" : "opacity-100"
                      }`}
                    ></div>
                    <div
                      className={`w-full h-0.5 bg-gray-700 transition-transform transform origin-center ${
                        isOpen
                          ? "-rotate-45 -translate-y-[7px]"
                          : "rotate-0 translate-y-0"
                      }`}
                    ></div>
                  </div>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>
                      <div className="flex flex-col">
                        <img
                          src="/WhirlwindLogo.png"
                          width="100px"
                          height="100px"
                        />
                      </div>
                    </SheetTitle>
                    <SheetDescription>
                      <div className="flex justify-start flex-col gap-5 mt-5">
                        <div className="flex flex-col gap-5">
                          <h1 className="font-medium text-xl text-black">
                            Businesses
                          </h1>
                          <div className="ml-5 mb-5 flex flex-col gap-3">
                            <Link href={"/feed"} className="block">
                              Feed
                            </Link>
                            <Link href={"/businesses/map"} className="block">
                              Map of All Businesses
                            </Link>
                            <Link
                              href={"/businesses/overview"}
                              className="block"
                            >
                              Overview of All Businesses
                            </Link>
                            <Link href={"/businesses/add"} className="block">
                              Add a New Business
                            </Link>
                          </div>
                        </div>
                        <div className="flex justify-start flex-col gap-5">
                          <div className="flex flex-col gap-5">
                            <h1 className="font-medium text-xl text-black">
                              Posts
                            </h1>
                            <div className="ml-5 mb-5 flex flex-col gap-3">
                              <Link href={"/feed"} className="block">
                                Create a New Post
                              </Link>
                              <Link href={"/businesses/map"} className="block">
                                View All Blog Posts
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-start flex-col gap-5">
                          <div className="flex flex-col gap-5">
                            <h1 className="font-medium text-xl text-black">
                              Login/Register
                            </h1>
                            <div className="ml-5 mb-5 flex flex-col gap-3">
                              <Link href={"/sign-in"} className="block">
                                Sign In
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <div className={cn("hidden md:block relative z-500", className)}>
              <Menu setActive={setActive}>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Businesses"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/feed">Feed</HoveredLink>
                    <HoveredLink href="/map">Map Of All Businesses</HoveredLink>
                    <HoveredLink href="/business/overview">
                      Overview of Businesses
                    </HoveredLink>
                    <HoveredLink href="/add/business">
                      Add a New Business
                    </HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Posts">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/posts/view">View Posts</HoveredLink>
                    <HoveredLink href="/posts/create">
                      Create a Post
                    </HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Login/Register"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/sign-in">Sign In</HoveredLink>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;

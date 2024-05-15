import React from "react";

import { Play, Search, TextAlignJustified } from "akar-icons";

const Navbar = () => {
  const Button = ({ text }: { text: string }) => {
    return (
      <button
        type="button"
        className="p-2 flex text-white rounded-md gap-2 drop-shadow-sm border-gray-500 bg-gray-900 text-lg-sm text-xs items-center"
      >
        <Play />
        <span className="text-left">
          Get it on <br /> {text}
        </span>
      </button>
    );
  };
  return (
    <div className="pl-5 pr-4 flex lg:flex-row flex-col lg:items-center items-start bg-black text-white justify-between gap-5 py-4 lg:py-0">
      <div className="flex gap-4">
        <span className="flex items-center gap-4 cursor-pointer">
          <TextAlignJustified className="transition-all hover:scale-110 duration-200" />
          Explore
        </span>
        <span className="flex items-center gap-4 cursor-pointer">
          <Search className="transition-all hover:scale-110 duration-200" />
          Search
        </span>
      </div>

      <div className="flex flex-col items-lg-center items-start">
        <span className="xl:text-5xl lg:text-2xl sm:text-xl">
          Indo-Asian News Service
        </span>
        <span className="header-date">Monday,Aug 08, 2022</span>
      </div>

      <div className="lg:flex hidden flex-col gap-2 p-2">
        <div className="flex justify-between">
          <Button text="Play Store" />
          <Button text="App Store" />
        </div>

        <button
          type="button"
          className="bg-[#00B1CD] text-white px-[47px] py-[10px]"
        >
          download the ians app
        </button>
      </div>
    </div>
  );
};

export default Navbar;

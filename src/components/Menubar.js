import { IconBack, IconLogo, IconSearch } from "@/resources/icons";
import React, { useRef } from "react";
import SearchTab from "./SearchTab";

const Menubar = () => {
  const menubar_ref = useRef(null);
  const bg_ref = useRef(null);

  const toggleMenubar = () => {
    menubar_ref.current.classList?.toggle("translate-x-[-120%]");
    bg_ref.current.classList?.remove("opacity-100");
    bg_ref.current.classList?.add("opacity-0");
  };

  return (
    <>
      <section
        className="min-h-[100vh] pl-5 pr-10 py-8 bg-violet-300 absolute z-50 transition-all opacity-100"
        ref={menubar_ref}
      >
        {/* searchbar */}
        <div className="bg-white flex h-16 rounded-2xl overflow-hidden">
          <button className="px-4 border-r-2 transition-all hover:bg-[#f0f5fc] ">
            <IconLogo />
          </button>
          <label htmlFor="search-input" className="flex w-full justify-between">
            <input
              id="search-input"
              type="text"
              placeholder="What are you playing today?"
              className="text-violet-600 p-4 outline-none w-full font-bold text-[22px] leading-none"
            />
            <div className="flex items-center px-4 cursor-pointer">
              <IconSearch />
            </div>
          </label>
        </div>

        {/* search tab */}
        <div className="flex gap-[10px] mt-4">
          {Array(6)
            .fill(0)
            .map((item, index) => (
              <SearchTab key={index} />
            ))}
        </div>

        <button
          className="bg-white rounded-full h-16 w-16 flex items-center justify-center absolute top-0 right-0 translate-x-[50%] translate-y-8 shadow-xxl hover:translate-y-7 transition-all"
          onClick={toggleMenubar}
        >
          <IconBack className="mr-1" />
        </button>
      </section>

      {/* background */}
      <div
        className="bg-blur-500 w-full min-h-[100vh] fixed z-40 opacity-100 transition-all"
        ref={bg_ref}
      ></div>
    </>
  );
};

export default Menubar;

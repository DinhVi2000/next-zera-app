import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { IconBack, IconLogo, IconSearch, IconX } from "@/resources/icons";
import { MODAL_NAME } from "@/utils/constant";

import { sleep } from "@/utils/helper";

import ScrollContainer from "react-indiana-drag-scroll";
import GameTile from "../game/GameTile";
import SearchTab from "./SearchTab";

import "react-indiana-drag-scroll/dist/style.css";

const DURATION = 500;

const Menubar = () => {
  const menubar_ref = useRef(null);
  const bg_ref = useRef(null);

  const { openModal } = useModalContext();

  const [searchValue, setSearchValue] = useState("");

  const handleChangeInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCloseMenubar = () => {
    menubar_ref.current.classList?.add("translate-x-[-120%]");
    bg_ref.current.classList?.add("opacity-0-important");
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useOnClickOutside(menubar_ref, handleCloseMenubar);

  useEffect(() => {
    sleep(1).then(() => {
      menubar_ref.current.classList?.remove("translate-x-[-120%]");
      bg_ref.current.classList?.add("opacity-100");
    });
  }, []);

  return (
    <>
      <section
        className={`min-h-[100vh] max-w-[684px] px-5 py-8 bg-[#c4b5fd80] fixed z-50 transition-all opacity-100 translate-x-[-120%] duration-${DURATION}`}
        ref={menubar_ref}
      >
        {/* searchbar */}
        <div className="pr-8">
          <div className="bg-white flex h-16 rounded-2xl overflow-hidden">
            <button className="px-4 border-r-2 transition-all hover:bg-[#f0f5fc] ">
              <IconLogo />
            </button>
            <label
              htmlFor="search-input"
              className="flex w-full justify-between"
            >
              <input
                id="search-input"
                type="text"
                value={searchValue}
                onChange={(e) => handleChangeInput(e)}
                placeholder="What are you playing today?"
                className="text-violet-600 p-4 outline-none w-full font-bold text-[22px] leading-none"
              />
              <div className="flex items-center px-4 cursor-pointer">
                {searchValue ? (
                  <div
                    className="bg-violet-200 h-[26px] rounded-[5px] p-[5px] flex items-center group"
                    onClick={() => setSearchValue("")}
                  >
                    <IconX></IconX>
                    <div className="text-violet-900 font-bold w-0 overflow-hidden group-hover:w-10 group-hover:ml-1 transition-all duration-200">
                      Clear
                    </div>
                  </div>
                ) : (
                  <div>
                    <IconSearch />
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
        {/* search tab */}
        <ScrollContainer>
          <div className="flex gap-[10px] mt-4 mb-7 whitespace-nowrap ">
            {Array(19)
              .fill(0)
              .map((item, index) => (
                <SearchTab key={index} />
              ))}
          </div>
        </ScrollContainer>

        <button
          className="bg-white rounded-full h-16 w-16 flex items-center justify-center absolute top-0 right-0 translate-x-[50%] translate-y-8 shadow-xxl hover:translate-y-7 transition-all"
          onClick={handleCloseMenubar}
        >
          <IconBack className="mr-1" />
        </button>

        {/* popular */}
        <div className="text-white mb-7">
          <p className="text-2xl font-bold mb-4">Popular this week</p>
          <div className="flex gap-4">
            {Array(6)
              .fill(0)
              .map((e, i) => (
                <GameTile key={i} size={1} />
              ))}
          </div>
        </div>

        {/* recently */}
        <div className="text-white">
          <p className="text-2xl font-bold mb-4">Recently played</p>
          <div className="flex gap-4">
            {Array(6)
              .fill(0)
              .map((e, i) => (
                <GameTile key={i} size={1} isRecently />
              ))}
          </div>
        </div>
      </section>

      {/* background */}
      <div
        className="bg-blur-500 backdrop-blur-[5px] w-full min-h-[100vh] fixed overflow-hidden z-40 opacity-100 transition-all"
        ref={bg_ref}
      ></div>
    </>
  );
};

export default Menubar;

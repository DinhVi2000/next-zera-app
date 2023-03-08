import { IconLogo, IconSearch, IconX } from "@/resources/icons";
import React, { memo } from "react";

const SearchBar = ({ searchValue, setSearchValue, onChangeInput }) => {
  return (
    <div className="pr-8">
      <div className="bg-white flex h-16 rounded-2xl overflow-hidden">
        <button className="px-4 border-r-2 transition-all hover:bg-[#f0f5fc] ">
          <IconLogo className="w-7 h-full" />
        </button>
        <label htmlFor="search-input" className="flex w-full justify-between">
          <input
            id="search-input"
            type="text"
            value={searchValue}
            onChange={(e) => onChangeInput(e)}
            placeholder="What are you playing today?"
            className="text-violet-800 p-4 outline-none w-full font-bold text-[22px] leading-none placeholder:text-violet-300"
          />
          <div className="flex items-center px-4 cursor-pointer">
            {searchValue ? (
              <div
                className="bg-violet-200 h-[26px] w-[26px] rounded-[5px] py-[5px] flex items-center group overflow-hidden text-violet-900 font-bold
                                hover:w-[75px] transition-all duration-200"
                onClick={() => setSearchValue("")}
              >
                <IconX className="shrink-0 mx-[5px]"></IconX>Clear
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
  );
};

export default memo(SearchBar);

import { useModalContext } from "@/context/modal-context";
import { IconLogo, IconSearch, IconX } from "@/resources/icons";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import Link from "next/link";
import React, { Fragment, memo } from "react";

const SearchBar = ({
  searchValue,
  setSearchValue,
  onChangeInput,
  searchStatus,
}) => {
  const { openModal } = useModalContext();

  return (
    <div className="pr-8 relative w-full max-w-[650px] mr-10 z-50">
      <div className="bg-white w-full flex h-16 rounded-2xl overflow-hidden">
        <button
          className="px-4 border-r-2 transition-all hover:bg-[#f0f5fc]"
          onClick={() => openModal(MODAL_NAME.NONE)}
        >
          <Link href={"/"}>
            <IconLogo className="w-7 h-full" />
          </Link>
        </button>
        {/* input */}
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
              <Fragment>
                {searchStatus === STATUS.IN_PROGRESS ? (
                  <div className="w-5 h-5 border-[3px] border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <div
                    className="bg-violet-200 h-[26px] w-[26px] rounded-[5px] py-[5px] flex items-center group overflow-hidden text-violet-900 font-bold
                                hover:w-[75px] transition-all duration-200"
                    onClick={() => setSearchValue("")}
                  >
                    <IconX className="shrink-0 mx-[5px]"></IconX>Clear
                  </div>
                )}
              </Fragment>
            ) : (
              <div>
                <IconSearch className="w-6 h-6 text-violet-500" />
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default memo(SearchBar);

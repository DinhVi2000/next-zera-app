/* eslint-disable no-console */
import React, { Fragment, useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { IconBack, IconLogo, IconSearch, IconX } from "@/resources/icons";
import { MODAL_NAME, STATUS } from "@/utils/constant";

import { sleep } from "@/utils/helper";

import GameItem from "../game/GameItem";
import ScrollContainer from "react-indiana-drag-scroll";
import SearchTab from "../search/SearchTab";
import SearchBar from "@/components/search/SearchBar";
import SearchResult from "@/components/search/SearchResult";

import { useDebounce } from "@/hooks/useDebounced";
import { useToast } from "@chakra-ui/react";

import "react-indiana-drag-scroll/dist/style.css";

import { getGamesByKeySearch } from "@/services/game.service";

const DURATION = 500;

const SUGGESTS_SEARCH = [
  ".io games",
  "car games",
  "game for girls",
  "shooting games",
  "motorbike games",
  "po",
];

const Menubar = () => {
  const menubar_ref = useRef(null);
  const bg_ref = useRef(null);

  const { openModal } = useModalContext();

  const toast = useToast();

  const [searchValue, setSearchValue] = useState("");
  const [gamesResult, setGamesResult] = useState();

  const debouncedSearchTerm = useDebounce(searchValue, 1000);

  const handleChangeInput = (e) => {
    setGamesResult(undefined);
    setSearchValue(e.target.value);
  };

  const handleCloseMenubar = () => {
    menubar_ref.current.classList?.add("translate-x-[-120%]");
    bg_ref.current.classList?.add("opacity-0-important");
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  const handleSearchGame = async () => {
    setGamesResult(undefined);
    try {
      const res = await getGamesByKeySearch(debouncedSearchTerm);
      setGamesResult(res);
    } catch (error) {
      toast({
        title: "ERROR",
        variant: "left-accent",
        description: error?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useOnClickOutside(menubar_ref, handleCloseMenubar);

  useEffect(() => {
    sleep(1).then(() => {
      menubar_ref.current.classList?.remove("translate-x-[-120%]");
      bg_ref.current.classList?.add("opacity-100");
    });
  }, []);

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    handleSearchGame();
  }, [debouncedSearchTerm]);

  return (
    <>
      <section
        className={`min-h-[100vh] max-w-[684px] w-full px-5 py-8 bg-[#c4b5fd80] fixed z-50 transition-all opacity-100 translate-x-[-120%] duration-${DURATION}`}
        ref={menubar_ref}
      >
        {/* searchbar */}
        <SearchBar
          searchValue={searchValue}
          onChangeInput={handleChangeInput}
          setSearchValue={setSearchValue}
        />

        {/* search tab */}
        {searchValue ? (
          <SearchResult games={gamesResult} />
        ) : (
          <ScrollContainer>
            <div className="flex gap-[10px] mt-4 mb-7 whitespace-nowrap ">
              {SUGGESTS_SEARCH.map((item, index) => (
                <SearchTab
                  key={index}
                  setSearchValue={(e) => {
                    setGamesResult(undefined);
                    setSearchValue(e);
                  }}
                  value={item}
                />
              ))}
            </div>
          </ScrollContainer>
        )}

        <button
          className="bg-white rounded-full h-16 w-16 flex items-center justify-center absolute top-0 right-0 translate-x-[50%] translate-y-8 shadow-xxl hover:translate-y-7 transition-all"
          onClick={handleCloseMenubar}
        >
          <IconBack className="mr-1" />
        </button>

        <section className=" transition-all">
          {(!gamesResult ||
            !searchValue.trim() ||
            gamesResult?.length === 0) && (
            <Fragment>
              {/* popular */}
              <div className="text-white mb-7 transition-all">
                <p className="text-2xl font-bold mb-4">Popular this week</p>
                <div className="flex gap-4">
                  {Array(6)
                    .fill(0)
                    .map((e, i) => (
                      <GameItem key={i} size={1} />
                    ))}
                </div>
              </div>

              {/* recently */}
              <div className="text-white  transition-all">
                <p className="text-2xl font-bold mb-4">Recently played</p>
                <div className="flex gap-4">
                  {Array(6)
                    .fill(0)
                    .map((e, i) => (
                      <GameItem key={i} size={1} isRecently />
                    ))}
                </div>
              </div>
            </Fragment>
          )}
        </section>
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

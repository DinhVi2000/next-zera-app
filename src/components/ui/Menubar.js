/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { Fragment, useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { IconBack } from "@/resources/icons";
import { GAMES_IMAGES, MODAL_NAME, STATUS } from "@/utils/constant";

import { notifyErrorMessage, sleep } from "@/utils/helper";

import GameItem from "../game/GameItem";
import ScrollContainer from "react-indiana-drag-scroll";
import SearchTab from "../search/SearchTab";
import SearchBar from "@/components/search/SearchBar";
import SearchResult from "@/components/search/SearchResult";

import { useDebounce } from "@/hooks/useDebounced";

import "react-indiana-drag-scroll/dist/style.css";

import { getGamesByKeySearch } from "@/services/game.service";
import { useAuthContext } from "@/context/auth-context";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";

const DURATION = 500;

const Menubar = () => {
  const menubar_ref = useRef(null);
  const bg_ref = useRef(null);

  const toast = useToast();
  const { get } = useApi();

  const { openModal } = useModalContext();

  const [searchValue, setSearchValue] = useState("");
  const [gamesResult, setGamesResult] = useState();
  const [searchStatus, setSearchStatus] = useState(STATUS.NOT_START);
  const [popularGames, setPopularGames] = useState();

  const { userInfo } = useAuthContext();
  const {
    gameIndex: { categories },
  } = useSelector(({ game }) => game) ?? {};

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

  useOnClickOutside(menubar_ref, handleCloseMenubar);

  useEffect(() => {
    document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
    sleep(1).then(() => {
      menubar_ref.current.classList?.remove("translate-x-[-120%]");
      bg_ref.current.classList?.add("opacity-100");
    });

    // get(apiURL.get.popular_game).then((data) => console.log("data", data));

    return () => {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) return;
    setGamesResult(undefined);
    setSearchStatus(STATUS.IN_PROGRESS);
    getGamesByKeySearch(debouncedSearchTerm)
      .then((data) => {
        setSearchStatus(STATUS.SUCCESS);
        setGamesResult(data);
      })
      .catch((e) => {
        setSearchStatus(STATUS.FAIL);
        notifyErrorMessage(toast, e);
      });
  }, [debouncedSearchTerm]);

  return (
    <>
      <section
        className={`h-full max-w-[684px] w-full px-5 py-8 bg-[#c4b5fd80] fixed z-50 
                    transition-all opacity-100 translate-x-[-120%] duration-${DURATION}`}
        ref={menubar_ref}
      >
        <div className="relative w-full h-full">
          {/* searchbar */}
          <SearchBar
            searchValue={searchValue}
            onChangeInput={handleChangeInput}
            setSearchValue={setSearchValue}
            searchStatus={searchStatus}
            setSearchStatus={setSearchStatus}
          />

          {/* search tab */}
          {searchValue.trim() && <SearchResult results={gamesResult} />}
          {!searchValue.trim() && (
            <section className="modal-scroll absolute h-full w-full top-0 py-[64px] overflow-y-scroll overflow-x-hidden">
              <div className="search-tab-wrapper relative">
                <ScrollContainer>
                  <div className="flex gap-[10px] mt-4 mb-7  whitespace-nowrap ">
                    {categories?.map((e, i) => (
                      <SearchTab
                        key={i}
                        setSearchValue={(e) => {
                          setGamesResult(undefined);
                          setSearchValue(e);
                        }}
                        value={e?.label}
                      />
                    ))}
                  </div>
                </ScrollContainer>
              </div>

              <section className=" transition-all">
                <Fragment>
                  {/* popular */}
                  <div className="text-white mb-7 transition-all">
                    <p className="text-2xl font-bold mb-4">Popular this week</p>
                    <div className="flex flex-wrap gap-4">
                      {GAMES_IMAGES.slice(0, 6).map((e, i) => (
                        <GameItem
                          key={i}
                          size={1}
                          thumbnail={e}
                          className="w-[94px] h-[94px]"
                          slug={e?.slug}
                          superslug={e?.superslug}
                        />
                      ))}
                    </div>
                  </div>

                  {/* recently */}
                  <div className="text-white  transition-all">
                    <p className="text-2xl font-bold mb-4">Recently played</p>
                    <div className="flex flex-wrap gap-4">
                      {userInfo?.recentlyPlayed?.rows?.map((e, i) => (
                        <GameItem
                          key={i}
                          size={1}
                          isRecently
                          thumbnail={e?.thumbnail}
                          title={e?.title}
                          className="w-[94px] h-[94px]"
                          slug={e?.slug}
                          superslug={e?.superslug}
                        />
                      ))}
                    </div>
                  </div>
                </Fragment>
              </section>
            </section>
          )}
        </div>
        {/* back button */}
        <button
          className="bg-white rounded-full h-16 w-16 flex items-center justify-center absolute top-0 right-0 translate-x-[50%] translate-y-8 shadow-xxl hover:translate-y-7 transition-all"
          onClick={handleCloseMenubar}
        >
          <IconBack className="mr-1 w-5 text-violet-500" />
        </button>
      </section>

      {/* background */}
      <div
        className="bg-blur-500 h-full backdrop-blur-[5px] w-full min-h-[100vh] fixed overflow-hidden z-40 opacity-100 transition-all"
        ref={bg_ref}
      ></div>
    </>
  );
};

export default Menubar;

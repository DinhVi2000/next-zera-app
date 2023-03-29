/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import "react-indiana-drag-scroll/dist/style.css";
import React, { Fragment, memo, useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { useAuthContext } from "@/context/auth-context";

import { IconBack } from "@/resources/icons";
import { MODAL_NAME, STATUS } from "@/utils/constant";

import { notifyErrorMessage, sleep, toggleScroll } from "@/utils/helper";

import GameItem from "@/components/game/GameItem";
import SearchTab from "@/components/search/SearchTab";
import SearchBar from "@/components/search/SearchBar";
import SearchResult from "@/components/search/SearchResult";
import ScrollContainer from "react-indiana-drag-scroll";

import { getGamesByKeySearch } from "@/services/game.service";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useDebounce } from "@/hooks/useDebounced";
import { useApi } from "@/hooks/useApi";

import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

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
    toggleScroll();
    sleep(1).then(() => {
      menubar_ref.current.classList?.remove("translate-x-[-120%]");
      bg_ref.current.classList?.add("opacity-100");
    });

    get(apiURL.get.popular_game).then((data) => setPopularGames(data));

    return () => toggleScroll();
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
    <Fragment>
      <section
        className={`h-full max-w-[684px] w-full px-5 py-8 bg-[#c4b5fd80] fixed z-60 
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

          {/* content */}
          {searchValue.trim() && <SearchResult results={gamesResult} />}
          {!searchValue.trim() && (
            <section className="modal-scroll absolute h-full w-full top-0 py-[64px] overflow-y-scroll overflow-x-hidden">
              <SearchTabGrid
                categories={categories}
                setGamesResult={setGamesResult}
                setSearchValue={setSearchValue}
              />
              <section className="transition-all">
                <PopularGameGrid list={popularGames} />
                <RecentlyGameGrid />
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
    </Fragment>
  );
};

const PopularGameGrid = memo(function Component({ list }) {
  return (
    <div className="text-white mb-7 transition-all">
      <p className="text-2xl font-bold mb-4">Popular this week</p>
      <ScrollContainer>
        <div className="flex mt-2 px-2 gap-4">
          {/* grid */}
          {list?.map(({ game_detail }, i) => (
            <GameItem
              key={i}
              size={1}
              thumbnail={game_detail?.thumbnail}
              className="w-[94px] h-[94px]"
              slug={game_detail?.slug}
              superslug={game_detail?.superslug}
              title={game_detail?.title}
            />
          ))}

          {/* loading */}
          {!list &&
            Array(6)
              .fill(0)
              .map((e, i) => (
                <div
                  key={i}
                  className="w-[94px] h-[94px] skeleton-shine rounded-2xl"
                ></div>
              ))}
        </div>
      </ScrollContainer>
    </div>
  );
});

const RecentlyGameGrid = memo(function Component() {
  const { userInfo } = useAuthContext();

  const { recentlyPlayed } = userInfo ?? {};

  return (
    <div className="text-white  transition-all">
      <p className="text-2xl font-bold mb-4">Recently played</p>
      <div className="flex flex-wrap gap-4">
        {/* list */}
        {recentlyPlayed?.map((e, i) => (
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

        {/* loading */}
        {!recentlyPlayed &&
          Array(6)
            .fill(0)
            .map((e, i) => (
              <div
                key={i}
                className="w-[94px] h-[94px] skeleton-shine rounded-2xl"
              ></div>
            ))}
      </div>
    </div>
  );
});

const SearchTabGrid = memo(function Component({
  categories,
  setGamesResult,
  setSearchValue,
}) {
  return (
    <div className="search-tab-wrapper relative">
      <ScrollContainer>
        <div className="flex gap-[10px] mt-4 mb-7 whitespace-nowrap ">
          {categories?.map((e, i) => (
            <SearchTab
              key={i}
              onChangeTab={(e) => {
                setGamesResult(undefined);
                setSearchValue(e);
              }}
              value={e?.label}
            />
          ))}
        </div>
      </ScrollContainer>
    </div>
  );
});

export default Menubar;

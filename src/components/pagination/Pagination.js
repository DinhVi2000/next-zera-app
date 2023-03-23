/* eslint-disable react-hooks/exhaustive-deps */
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IconNext, IconPre } from "@/resources/icons";
import React, { useMemo } from "react";
import ReactPaginate from "react-paginate";

function Pagination({
  items,
  onPageChange,
  itemsPerPage,
  // marginPagesDisplayed = 3,
  // pageRangeDisplayed = 3,
  ...props
}) {
  const pageCount = Math.floor(items?.length / itemsPerPage) + 1;

  const isMatchPC = useMediaQuery("(min-width: 990px)");
  const isMatchTablet = useMediaQuery(
    "(min-width: 550px) and (max-width: 990px)"
  );
  const isMatchMobile = useMediaQuery("(max-width: 550px)");

  const paginateDisplayedByScreenSize = [
    {
      value: isMatchPC,
      marginPagesDisplayed: 3,
      pageRangeDisplayed: 3,
    },
    {
      value: isMatchTablet,
      marginPagesDisplayed: 2,
      pageRangeDisplayed: 2,
    },
    {
      value: isMatchMobile,
      marginPagesDisplayed: 1,
      pageRangeDisplayed: 1,
    },
  ];

  const { marginPagesDisplayed, pageRangeDisplayed } =
    useMemo(
      () => paginateDisplayedByScreenSize.find((e) => !!e?.value),
      [isMatchMobile, isMatchTablet, isMatchPC]
    ) ?? {};

  return (
    <>
      {pageCount > 1 && (
        <ReactPaginate
          {...props}
          className="text-white flex-center mt-5 gap-1"
          activeClassName="text-[#F472B6]"
          previousLinkClassName="bg-gradient-tgp rounded-[5px] p-1 w-8 h-8 flex-center"
          nextLinkClassName="bg-gradient-tgp rounded-[5px] p-1 w-8 h-8 flex-center"
          pageLinkClassName="flex-center p-1 w-8 h-8 hover:bg-[#00000085] hover:rounded-[5px]"
          previousLabel={<IconPre />}
          nextLabel={<IconNext />}
          breakLabel="..."
          breakClassName="w-8"
          onPageChange={onPageChange}
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          disableInitialCallback={true}
        />
      )}
    </>
  );
}

export default Pagination;

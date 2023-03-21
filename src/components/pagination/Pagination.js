import { IconNext, IconPre } from "@/resources/icons";
import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({
  items,
  onPageChange,
  itemsPerPage,
  marginPagesDisplayed = 3,
  pageRangeDisplayed = 3,
  ...props
}) {
  const pageCount = Math.floor(items?.length / itemsPerPage) + 1;

  return (
    <>
      {pageCount > 1 && (
        <ReactPaginate
          {...props}
          className="text-white flex-center mt-5"
          activeClassName="text-[#F472B6]"
          previousLinkClassName="bg-[#4C1D95] rounded-[5px] p-1 w-8 h-8 flex-center"
          nextLinkClassName="bg-[#4C1D95] rounded-[5px] p-1 w-8 h-8 flex-center"
          pageLinkClassName="flex-center p-1 w-8 h-8 mx-2 hover:bg-[#00000085] hover:rounded-[5px]"
          previousLabel={<IconPre />}
          nextLabel={<IconNext />}
          breakLabel="..."
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

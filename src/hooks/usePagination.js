import { useEffect, useState } from "react";

export const usePagination = (itemsPerPage, items) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);

  useEffect(() => {
    setItemOffset(0);
  }, [items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length;
    setItemOffset(newOffset);
  };
  return { currentItems, handlePageClick };
};

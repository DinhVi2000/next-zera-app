import React, { memo } from "react";

const SearchTab = ({ setSearchValue, value }) => {
  return (
    <div
      onClick={() => setSearchValue(value)}
      className="bg-white rounded-[20px] flex-center h-9 py-2 px-5 font-bold text-xs cursor-pointer select-none transition-all hover:bg-violet-500 hover:text-white shadow-xxl uppercase"
    >
      {value}
    </div>
  );
};

export default memo(SearchTab);

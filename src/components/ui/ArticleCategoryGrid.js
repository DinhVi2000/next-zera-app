import React from "react";

const ArticleCategoryGrid = () => {
  return (
    <div className="grid-category mt-[126px]">
      <div
        className="text-white min-h-[94px] rounded-2xl flex items-center justify-center text-lg font-bold"
        style={{
          background:
            "linear-gradient(180deg, #C4B5FD 0%, #979BFF 0.01%, #EF36C6 100%)",
          gridRowStart: "span 1",
          gridColumnStart: "span 4",
        }}
      >
        Articles
      </div>
    </div>
  );
};

export default ArticleCategoryGrid;

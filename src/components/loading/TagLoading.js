import { getRandom } from "@/utils/helper";
import React, { Fragment, memo } from "react";

const TagLoading = ({ list }) => {
  const witdhs = [28, 32, 36, 40, 44];

  return (
    <Fragment>
      {!list && (
        <div className="flex flex-wrap gap-3">
          {Array(20)
            .fill(0)
            .map((e, i) => (
              <div
                key={i}
                className={`h-[32px] w-${getRandom(
                  witdhs
                )} rounded-[20px] skeleton-shine`}
              ></div>
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default memo(TagLoading);

"use client";

import Masonry from "react-masonry-css";
import React from "react";

const breakpointColumnsObj = {
  default: 2,
  1100: 2,
  700: 1,
  sm: 1,
};
const MasonryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {children}
    </Masonry>
  );
};

export default MasonryLayout;

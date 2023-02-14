import React from "react";

import Footer from "@/components/ui/Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

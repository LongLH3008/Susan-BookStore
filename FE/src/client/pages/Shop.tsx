import React from "react";
import Nav from "../components/page/shop/Headershop";
import Left from "../components/page/shop/Fillter";
import Right from "../components/page/shop/Productshop";
import Breadcrumb from "../components/reuse/breadcrumb/breadcrumb.tsx";

type Props = {};

const Shop = (props: Props) => {
  return (
    <>
      <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
        <Breadcrumb title="Shop" />
        <Nav />

        <div className="grid grid-cols-12 gap-8">
          <Left />
          <Right />
        </div>
      </div>
    </>
  );
};

export default Shop;

import React from "react";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
      <div className="grid grid-cols-12 gap-4 my-10">
        <div className="col-span-6">
          <img
            src="https://susan-demo.myshopify.com/cdn/shop/files/0d6f4828835899.55d4a5402cb87.jpg?v=1613590896"
            alt=""
          />
        </div>
        <div className="col-span-6">
          <div>
            <h1 className="pb-5 font-bold text-4xl">
              WELCOME TO <span className="text-[#00BFC5]">SUSAN.</span>
            </h1>
            <p className="text-[#707070]">
              Eposi provide how all this mistaken idea of denouncing pleasure
              and sing pain was born an will give you a complete account of the
              system, and expound the actual teachings of the eat explorer of
              the truth, the mer of human.
            </p>
          </div>
          <div>
            <h4 className="py-3 font-bold ">WIN BEST ONLINE SHOP AT 2022</h4>
            <p className="text-[#707070]">
              Eposi provide how all this mistaken idea of denouncing pleasure
              and sing pain was born an will give you a complete account of the
              system, and expound the actual teachings of the eat explorer of
              the truth, the mer of human.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

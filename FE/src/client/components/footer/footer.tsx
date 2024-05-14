import * as img from "@/assets/img";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] bg-[#F4F4F4] text-[#707070] text-[14px]">
      <div className="grid lg:grid-cols-2 gap-4 py-[80px] md:py-[100px]">
        <div className="*:text-secondary">
          <img src={img.Logo} alt="" />
          <div className="footer-text pt-6 w-5/6 *:mb-4 text-secondary">
            <p>
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla
              facilisis.
            </p>
            <p>Address : No. 96, Jecica City, NJ 07305, New York, USA</p>
            <p>Phone : +1 222 3333 578</p>
            <p>Email : support@example.com</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 ">
          <div className="grid *:pb-5 *:sm:pb-9">
            <p className="font-bold text-[#292929] text-[16px]">
              Business Hours
            </p>
            <p>Mon - Fri: 8AM - 10PM</p>
            <p>Sat: 9AM-8PM</p>
            <p>Sun: Closed</p>
          </div>
          <div className="grid *:pb-4">
            <p className="font-bold text-[#292929] text-[16px] mb-4">
              Footer Menu
            </p>
            <Link to="/" className="hover:text-[#00BFC5]">
              Home
            </Link>
            <Link to="/" className="hover:text-[#00BFC5]">
              Shop
            </Link>
            <Link to="/" className="hover:text-[#00BFC5]">
              Blog
            </Link>
            <Link to="/" className="hover:text-[#00BFC5]">
              About
            </Link>
            <Link to="/" className="hover:text-[#00BFC5]">
              Contact
            </Link>
          </div>
          <div className="grid *:pb-4">
            <p className="font-bold text-[#292929] text-[16px] mb-4">
              Extras Menu
            </p>
            <Link to="/" className="hover:text-[#00BFC5]">
              About Us
            </Link>
            <Link to="/" className="hover:text-[#00BFC5]">
              Our Office
            </Link>
            <Link to="/" className="hover:text-[#00BFC5]">
              Delivery
            </Link>
            <Link to="/" className="hover:text-[#00BFC5]">
              Our Store
            </Link>
            <Link to="/" className="hover:text-[#00BFC5]">
              Guarantee
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:justify-between sm:grid sm:grir-cols-12 sm:gap-4 border-t border-zinc-200 *:py-2 py-5 ">
        <div className="*:text-secondary  min-[320px]:text-center ">
          <p className="">
            Copyright & Copy
            <Link to="/" className="px-2 text-[#00BFC5]">
              Susan
            </Link>
            All Rights Reserved.
          </p>
        </div>

        <div className="flex justify-end *:text-secondary *:cursor-pointer *:px-6 min-[320px]:justify-center  *:text-[16px]">
          <i className="hover:text-[#00BFC5] fa-brands fa-twitter"></i>
          <i className="hover:text-[#00BFC5] fa-brands fa-instagram"></i>
          <i className="hover:text-[#00BFC5] fa-brands fa-google"></i>
          <i className="hover:text-[#00BFC5] fa-brands fa-linkedin-in"></i>
          <i className="hover:text-[#00BFC5] fa-brands fa-pinterest"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;

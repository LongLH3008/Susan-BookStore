import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-secondary">
        <div className="container mx-auto md:px-5 min-[320px]:px-10">
          <div className="grid lg:grid-cols-2 gap-4 mb-32 pt-24">
            <div className="*:text-secondary">
              <img src={Logo} alt="" />
              <div className="footer-text pt-6 w-5/6 *:mb-4 text-secondary">
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate
                  velit esse molestie consequat, vel illum dolore eu feugiat
                  nulla facilisis.
                </p>
                <p>Address : No. 96, Jecica City, NJ 07305, New York, USA</p>
                <p>Phone : +1 222 3333 578</p>
                <p>Email : support@example.com</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 ">
              <ul className="">
                <li className="font-bold text-xl mb-4">Business Hours</li>
                <li className=" mb-9 text-secondary">
                  <a href="#">Mon - Fri: 8AM - 10PM</a>
                </li>
                <li className=" mb-9 text-secondary">
                  <a href="#">Sat: 9AM-8PM</a>
                </li>
                <li className=" mb-9 text-secondary">
                  <a href="#">Sun: Closed</a>
                </li>
              </ul>
              <ul className="">
                <li className="font-bold text-xl mb-4">Footer Menu</li>
                <li className="mb-4 text-secondary">
                  <a href="#">Home</a>
                </li>
                <li className="mb-4 text-secondary">
                  <a href="#">Shop</a>
                </li>
                <li className="mb-4 text-secondary">
                  <a href="#">Blog</a>
                </li>
                <li className="mb-4 text-secondary">
                  <a href="#">About</a>
                </li>
                <li className="mb-4 text-secondary">
                  <a href="#">Contact</a>
                </li>
              </ul>
              <ul className="">
                <li className="font-bold text-xl mb-4">Extras Menu</li>
                <li className="mb-4 text-secondary">
                  <a href="#">About Us</a>
                </li>
                <li className="mb-4 text-secondary">
                  <a href="#">Our Office</a>
                </li>
                <li className="mb-4 text-secondary">
                  <a href="#">Delivery</a>
                </li>
                <li className="mb-4 text-secondary">
                  <a href="#">Our Store</a>
                </li>
                <li className="mb-4 text-secondary">
                  <a href="#">Guarantee</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:flex lg:justify-between sm:grid sm:grir-cols-12 sm:gap-4 border-t-2 border-red-500 py-7 ">
            <div className="*:text-secondary  min-[320px]:text-center">
              <p className="">
                Copyright & Copy
                <a href="#" className="px-2 text-primary">
                  Susan
                </a>
                All Rights Reserved.
              </p>
            </div>

            <div className="flex *:text-xl *:text-secondary *:px-6   min-[320px]:justify-center">
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-linkedin-in"></i>
              <i className="fa-brands fa-pinterest"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

type Props = {};

const LayoutClient = (props: Props) => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutClient;

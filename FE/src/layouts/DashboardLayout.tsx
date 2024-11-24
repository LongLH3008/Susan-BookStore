import { Outlet } from "react-router-dom";
import Aside from "../components/(dashboard)/Aside";
import { OrderProvider } from "@/common/hooks/useOrder";
const DashboardLayout = () => {
  return (
    <div className="flex items-start">
      <Aside />
      <div className="w-full overflow-y-scroll h-screen p-10 bg-[#D6DaED]">
        <OrderProvider>
          <Outlet />
        </OrderProvider>
      </div>
    </div>
  );
};

export default DashboardLayout;

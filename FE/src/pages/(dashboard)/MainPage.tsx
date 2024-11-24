import useOrder from "@/common/hooks/useOrder";
import CardBoard from "../../components/(dashboard)/CardBoard";
import ColumnChart from "../../components/(dashboard)/Charts/ColumnChart";
import LineChart from "../../components/(dashboard)/Charts/LineChart";
export default function MainPage() {
  const { DataOrders } = useOrder();

  return (
    <div className="p-0 mb-20 h-auto dark:bg-gray-800">
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            <li className="flex justify-center">
              <CardBoard
                icon={"fa-solid fa-dollar-sign"}
                title={"Tổng doanh thu"}
                amount={100}
                color={"bg-[#3681ab] "}
              />
            </li>
            <li className="flex justify-center">
              <CardBoard
                icon={"fa-solid fa-cart-shopping"}
                title={"Tổng số đơn hàng"}
                amount={DataOrders?.data?.metadata?.total}
                color={"bg-[#989bbe]"}
              />
            </li>
            <li className="flex justify-center">
              <CardBoard
                icon={"fa-solid fa-boxes-stacked"}
                title={"Tổng số sách đã bán"}
                amount={100}
                color={"bg-[#7fbbb2]"}
              />
            </li>
          </ul>

          <ul className="grid grid-cols-2  gap-10">
            <li>
              <LineChart />
            </li>
            <li>
              <ColumnChart />
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <ColumnChart />
        </div>
      </div>
    </div>
  );
}

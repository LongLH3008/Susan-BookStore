import CardBoard from "../../components/(dashboard)/CardBoard";
import ColumnChart from "../../components/(dashboard)/Charts/ColumnChart";
import LineChart from "../../components/(dashboard)/Charts/LineChart";
export default function MainPage() {
  return (
    <div className="p-0 mb-20 h-auto dark:bg-gray-800">
      {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
				<p className="text-2xl font-bold text-gray-800 dark:text-gray-50">Main DashBoard</p>
			</div> */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <li className="flex justify-center">
          <CardBoard
            icon={"fa-regular fa-user"}
            title={"Tổng doanh thu"}
            amount={100}
            color={"bg-[#3681ab] "}
          />
        </li>
        <li className="flex justify-center">
          <CardBoard
            icon={"fa-solid fa-layer-group"}
            title={"Tổng số đơn hàng"}
            amount={10}
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
        <li className="flex justify-center">
          <CardBoard
            icon={"fa-solid fa-boxes-stacked"}
            title={"Products"}
            amount={100}
            color={"bg-[#6e7753]"}
          />
        </li>
        <li className="flex justify-center">
          <CardBoard
            icon={"fa-solid fa-cart-shopping"}
            title={"Orders"}
            amount={100}
            color={"bg-blue-500"}
          />
        </li>
      </ul>

      <ul className="flex flex-row flex-wrap justify-center gap-12">
        <li>
          <LineChart />
        </li>
        <li>
          <ColumnChart />
        </li>
      </ul>
    </div>
  );
}

import PageLayout from "../layouts/PageLayout"
import LineChart from "../components/Charts/LineChart";
import ColumnChart from "../components/Charts/ColumnChart";
import CardBoard from "../components/CardBoard";
const MainPage = () => {
    return (
        <PageLayout>
            <div className="p-0 sm:ml-64 mb-20 h-auto dark:bg-gray-800">
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                        Main DashBoard
                    </p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    <li className="flex justify-center">
                        <CardBoard icon={"fa-regular fa-user"} title={"User"} amount={100} color={'bg-red-600'} />
                    </li>
                    <li className="flex justify-center">
                        <CardBoard icon={"fa-solid fa-layer-group"} title={"Categories"} amount={10} color={'bg-green-600'} />
                    </li>
                    <li className="flex justify-center">
                        <CardBoard icon={"fa-solid fa-boxes-stacked"} title={"Products"} amount={100} color={'bg-yellow-600'} />
                    </li>
                    <li className="flex justify-center">
                        <CardBoard icon={"fa-solid fa-cart-shopping"} title={"Orders"} amount={100} color={'bg-blue-600'} />
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
        </PageLayout>);
}

export default MainPage
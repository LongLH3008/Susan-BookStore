import { Link, useNavigate } from "react-router-dom";
const Aside = (props) => {
    const navigate = useNavigate();

    const onLogout = () => {
        if(confirm('Do you want to logout ?')){
            localStorage.clear();
            location.reload();
            navigate('/login')
        }
    }
    return (
        <aside id="logo-sidebar" className={` ${(props.showState) ? '-translate-x-full' : ""} fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0  dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                <li>
                        <Link to={'/admin'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <i className="w-5 fa-solid fa-house"></i>

                            <span className="flex-1 ms-3 whitespace-nowrap">Main Dashboard</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/users'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i className="fa-solid fa-user"></i>
                            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/categories'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i className="w-5 fa-solid fa-layer-group"></i>
                            <span className="flex-1 ms-3 whitespace-nowrap">Categories</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/products'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i className="fa-solid fa-boxes-stacked"></i>
                            <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/orders'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i className="fa-solid fa-cart-shopping"></i>
                            <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={onLogout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i className="w-5 fa-solid fa-right-from-bracket"></i>
                            <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Aside
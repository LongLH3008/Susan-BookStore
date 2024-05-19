import PageLayout from "../../layouts/PageLayout";
import Table from "../../components/Table";
import {useForm} from 'react-hook-form';
import { useLocation } from "react-router-dom";


const CategoriesPage = () => {
    const header = {
        attributes: ["Category Name"],
        path: "categories"
    };
    const { register, handleSubmit, reset } = useForm(); 

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const page = queryParams.get('page');



    return (
        <PageLayout>
            <div className="px-10 sm:ml-64 h-auto dark:bg-gray-800">
                <div className="flex flex-col items-center justify-center h-48 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                        Categories Page DashBoard
                    </p>
                </div>
                <form className="max-w-sm mx-auto mb-4">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                        <input  type="text" id="name" {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New category" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                </form>
                {/* {isLoading ? <h1>Loading data table...</h1> : (<Table header={header} data={data?.categories} onDelete={onDelete} total={data?.total} total_pages={data?.total_pages} current_page={page}/>)} */}
                
            </div>
        </PageLayout>


    )
}
export default CategoriesPage
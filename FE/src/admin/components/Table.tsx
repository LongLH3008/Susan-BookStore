import React from 'react'
import { Link } from 'react-router-dom'

const Table = (props) => {


    const handleDelete = async (id) => {
        if (confirm(`Are you sure to delete this ? `)) {
            try {
                await props?.onDelete(id);
            } catch (error) {
                console.error(error);

            }
        }
        return;
    }

    const elements = [];

    for (let index = 0; index < props?.total_pages; index++) {
        elements.push(
            <li key={index}>
                <Link to={`/${props?.header?.path}?page=${+index + 1}`} className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{index + 1}</Link>
            </li>);
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        {props?.header?.attributes?.map(e => (
                            <th scope="col" className="px-6 py-3">
                                {e}
                            </th>
                        ))}

                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props?.data?.map(e => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {e?.name}
                            </th>

                            {e?.price && <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {e?.price}
                            </th>}

                            {e?.category && <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {e?.category}
                            </th>}

                            {e?.attribute && <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    {e?.attribute && (
        <div className="relative group">
            <button
                id="dropdownLeftButton"
                className="mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                <svg className="w-2.5 h-2.5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                </svg>
                Show more
            </button>

            <div id={e?.attribute?.key} className="z-10 absolute bg-white divide-x divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 hidden group-hover:block bottom-full -left-1">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Size
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {e?.attribute?.map((attr, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 px-6">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: attr?.color }}></div>
                                    </div>
                                </td>
                                <td className="w-4 px-6">
                                    <div className="flex items-center">
                                        {attr?.size}
                                    </div>
                                </td>
                                <td className="w-4 px-6">
                                    <div className="flex items-center">
                                        {attr?.stock}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )}
</th>

                            }
                            {e?.image && <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img className='w-10 h-10' src={e?.image} alt="" />
                            </th>}
                            <td className="px-6 py-4">
                                <Link to={`/${props?.header?.path}/edit/${e?._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                <button onClick={() => handleDelete(e?._id)} className='font-medium ml-2 text-red-600 dark:text-red-500 hover:underline'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex m-4 items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-{props?.data?.length} of {props?.total}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <Link to={`/${props?.header?.path}?page=${(props?.current_page > 1) ? +props?.current_page - 1 : 1}`} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
                    </li>
                    {elements}

                    <li>
                        <Link to={`/${props?.header?.path}?page=${(props?.current_page < props?.total_pages) ? +props?.current_page + 1 : +props?.total_pages}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default Table
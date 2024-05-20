import PageLayout from "../../layouts/PageLayout";
import Table from "../../components/Table";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import useSWR from "swr";
import { useState, useEffect } from "react";




const ProductsPage = () => {

    const header = {
        attributes: ["Products name", "Price", "Category", "Attributes", "Image"],
        path: "products"
    };
    const { register, handleSubmit, reset, control } = useForm();
    const [isShowModalAttr, setShowModalAttr] = useState(false);
    const [isShowModalDes, setShowModalDes] = useState(true);




    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');


    return (
        <PageLayout>
            <div className="p-0 sm:ml-64  h-[100%] dark:bg-gray-800">
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                        Products Page DashBoard
                    </p>
                </div>
                
                {/* {isLoading ? <h1>Loading data table...</h1> : (<Table header={header} data={data?.products} onDelete={onDelete} total={data?.total} total_pages={data?.total_pages} />)} */}

            </div>
        </PageLayout>

    )
}

export default ProductsPage
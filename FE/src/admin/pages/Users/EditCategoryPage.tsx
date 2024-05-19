import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const EditUsersPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [data, setData] = useState();
    const { register, handleSubmit, setValue } = useForm();


  return (
    <PageLayout>
      <div className="px-10 sm:ml-64">
        <div className="flex flex-col items-center justify-center h-48 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
            Edit Categories Page DashBoard
          </p>
        </div>
        <form className="max-w-sm mx-auto mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
            <input
              {...register("name")} // Đăng ký input với react-hook-form
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Update category"
              required
            />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
          <Link to={'/categories'} className="mx-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Go back</Link>
        </form>
      </div>
    </PageLayout>
  )
}

export default EditUsersPage
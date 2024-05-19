import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-200 dark:bg-gray-800 text-center py-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50"><i className="fa-solid fa-ban"></i> 404 - Page Not Found</h1>
        </div>
        <div className="p-4">
          <p className="text-gray-700 dark:text-gray-300">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <p className="mt-4"><Link to={"/"} className="text-blue-500 hover:underline">Go to Home Page</Link></p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NotFound
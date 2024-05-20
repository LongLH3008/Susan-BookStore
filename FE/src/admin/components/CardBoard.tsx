const CardBoard = (props) => {
    return (
        <div className="w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
            <p className={`flex items-center rounded-t-lg ${props?.color}  p-4 text-gray-50`}>
                <i className={`${props?.icon} mr-2 font-bold`}></i><h5 className=" text-xl font-semibold tracking-tight dark:text-white">{props?.title}</h5>
            </p>
            <div className="px-4 pb-4">
                <p className="my-3 font-bold text-gray-600 dark:text-gray-300">Amount : {props?.amount}</p>
                <p className="inline-flex font-medium items-center text-blue-600 hover:underline">
                    See our guideline
                </p>
            </div>

        </div>

    )
}

export default CardBoard
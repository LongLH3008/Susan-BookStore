const CardBoard = (props: any) => {
	return (
		<div className="max-w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
			<div className={`flex items-center rounded-t-lg   p-4 text-gray-700`}>
				<i className={`${props?.icon} mr-2 font-bold`}></i>
				<h5 className=" text-sm font-semibold tracking-tight dark:text-white">{props?.title}</h5>
			</div>
			<div className="px-4 pb-4">
				<p className=" text-2xl font-bold text-gray-600 dark:text-gray-300">{props?.amount}</p>
			</div>
		</div>
	);
};

export default CardBoard;

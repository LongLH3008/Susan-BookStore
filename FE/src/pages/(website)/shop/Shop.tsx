import React, { useState } from "react";
import Nav from "./_components/Headershop.tsx";
import Right from "./_components/Productshop.tsx";
import Breadcrumb from "../../../components/(website)/breadcrumb/breadcrumb.tsx";
import Pagination from "./_components/pagination.tsx";
import Left from "./_components/Fillter.tsx";

type Props = {};

const Shop = (props: Props) => {
	const [viewMode, setViewMode] = useState(null);
	const [itemsToShow, setItemsToShow] = useState(4);
	const [sortBy, setSortBy] = useState("manual");
	const [currentPage, setCurrentPage] = useState(1);

	const totalItems = 37;

	const handleViewChange = (mode: any) => {
		setViewMode(mode);
	};

	const handleItemsToShowChange = (event: any) => {
		setItemsToShow(parseInt(event.target.value, 10));
		setCurrentPage(1);
	};

	const handleSortByChange = (event: any) => {
		setSortBy(event.target.value);
	};

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
	};

	return (
		<>
			<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%]">
				<Breadcrumb title="Shop" />
				<Nav
					viewMode={viewMode}
					handleViewChange={handleViewChange}
					itemsToShow={itemsToShow}
					handleItemsToShowChange={handleItemsToShowChange}
					sortBy={sortBy}
					handleSortByChange={handleSortByChange}
					totalItems={totalItems}
					itemsPerPage={itemsToShow}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
				<div className="grid grid-cols-12 gap-8">
					<Left />
					<Right
						totalItems={totalItems}
						itemsToShow={itemsToShow}
						currentPage={currentPage}
						onPageChange={handlePageChange}
						viewMode={viewMode}
					/>
				</div>
			</div>
		</>
	);
};

export default Shop;

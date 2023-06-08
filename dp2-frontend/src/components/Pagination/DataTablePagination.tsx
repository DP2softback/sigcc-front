import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import Icon from "../Icon/Icon";

const DataTablePagination = ({
	itemPerPage,
	totalItems,
	paginate,
	currentPage,
	showItemPerPage,
	onChangeRowsPerPage,
	setShowItemPerPage,
	...props
}) => {
	// define the initial page numbers
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
		pageNumbers.push(i);
	}

	const paginationNumber = () => {
		if (pageNumbers.length <= 5) {
			return pageNumbers;
		} else if (pageNumbers.length >= 5 && currentPage <= 4) {
			return [1, 2, 3, 4, 5, "...", pageNumbers[pageNumbers.length - 1]];
		} else if (
			pageNumbers.length >= 5 &&
			currentPage >= pageNumbers[pageNumbers.length - 4]
		) {
			return [
				1,
				"...",
				pageNumbers[pageNumbers.length - 5],
				pageNumbers[pageNumbers.length - 4],
				pageNumbers[pageNumbers.length - 3],
				pageNumbers[pageNumbers.length - 2],
				pageNumbers[pageNumbers.length - 1]
			];
		} else if (
			pageNumbers.length > 5 &&
			currentPage > 4 &&
			currentPage < pageNumbers[pageNumbers.length - 4]
		) {
			return [
				1,
				"...",
				currentPage - 1,
				currentPage,
				currentPage + 1,
				"...",
				pageNumbers[pageNumbers.length - 1]
			];
		}
	};

	let paginationItems = paginationNumber();

	// function for going to prev page
	const prevPage = () => {
		paginate(currentPage - 1);
	};

	// function for going to next page
	const nextPage = () => {
		paginate(currentPage + 1);
	};

	// this use effect runs when you select item from select box on data table
	useEffect(() => {
		onChangeRowsPerPage(showItemPerPage);
		setShowItemPerPage(showItemPerPage);
	}, [showItemPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="pagination-wrap">
			<Pagination className="pagination-s1 flex-wrap">
				<Pagination.Item
					disabled={currentPage - 1 === 0 ? true : false}
					onClick={(ev) => {
						ev.preventDefault();
						prevPage();
					}}>
					<Icon name="chevron-left" />
				</Pagination.Item>
				{paginationItems.map((item) => {
					return (
						<Pagination.Item
							disabled={isNaN(item)}
							className={`${currentPage === item ? "active" : ""}`}
							key={item}
							onClick={(ev) => {
								ev.preventDefault();
								paginate(item);
							}}>
							{item}
						</Pagination.Item>
					);
				})}
				<Pagination.Item
					disabled={pageNumbers[pageNumbers.length - 1] === currentPage}
					onClick={(ev) => {
						ev.preventDefault();
						nextPage();
					}}>
					<Icon name="chevron-right" />
				</Pagination.Item>
			</Pagination>
			<div className="pagination-info small">
				Showing {itemPerPage * (currentPage - 1) + 1} to{" "}
				{totalItems > itemPerPage * currentPage
					? itemPerPage * currentPage
					: totalItems}{" "}
				of {totalItems} entries
			</div>
		</div>
	);
};
export default DataTablePagination;

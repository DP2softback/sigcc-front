import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import { Button } from "react-bootstrap";

import DataTablePagination from "@components/Pagination/DataTablePagination";

// export file component
const Export = ({ data }) => {
	const fileName = "user-data";

	const exportCSV = () => {
		const exportType = exportFromJSON.types.csv;
		exportFromJSON({ data, fileName, exportType });
	};

	const exportExcel = () => {
		const exportType = exportFromJSON.types.xls;
		exportFromJSON({ data, fileName, exportType });
	};

	return (
		<div className="export-options d-flex align-items-center me-2">
			<div className="export-title small me-2">Export</div>
			<div className="btn-group">
				<Button variant="outline-light" onClick={() => exportCSV()}>
					CSV
				</Button>
				<Button variant="outline-light" onClick={() => exportExcel()}>
					Excel
				</Button>
			</div>
		</div>
	);
};

// expanded component in mobile view
const expandedComponent = ({ data }) => {
	return (
		<ul className="data-details p-3 gap gy-1 border-bottom small">
			<li>
				<span className="data-title text-base fw-medium me-2">Name:</span>
				<span className="data-text text-light">{data.name}</span>
			</li>
			<li>
				<span className="data-title text-base fw-medium me-2">Age:</span>
				<span className="data-text text-light">{data.age}</span>
			</li>
			<li>
				<span className="data-title text-base fw-medium me-2">Position:</span>
				<span className="data-text text-light">{data.position}</span>
			</li>
			<li>
				<span className="data-title text-base fw-medium me-2">Company:</span>
				<span className="data-text text-light">{data.company}</span>
			</li>
			<li>
				<span className="data-title text-base fw-medium me-2">Start Date:</span>
				<span className="data-text text-light">{data.startDate}</span>
			</li>
			<li>
				<span className="data-title text-base fw-medium me-2">Salary:</span>
				<span className="data-text text-light">{data.salary}</span>
			</li>
		</ul>
	);
};

interface CustomCheckboxProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	onClick: React.MouseEventHandler<HTMLInputElement>;
}

// custom checkbox
const CustomCheckbox: React.FC = ({ onClick, ...rest }: any, ref: any) => (
	<div className="form-check" id={rest.name}>
		<input
			type="checkbox"
			className="form-check-input"
			ref={ref}
			onClick={onClick}
			{...rest}
		/>
	</div>
);

const customCheckbox: React.ReactNode = <CustomCheckbox />;

const DataTableComponent: React.FC<any> = ({
	data,
	columns,
	className,
	expandableRows,
	actions,
	tableClassName,
	selectableRows,
	...props
}) => {
	const [tableData, setTableData] = useState(data);
	const [searchText, setSearchText] = useState("");
	const [showItemPerPage, setShowItemPerPage] = useState(10);
	const [mobileView, setMobileView] = useState(false);

	// filter items by name
	useEffect(() => {
		const filteredData = data.filter((item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase())
		);

		setTableData(data);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);

	// function to change the table design view to expanable under 1200 px
	const viewChange = () => {
		if (window.innerWidth < 960 && expandableRows) {
			setMobileView(true);
		} else {
			setMobileView(false);
		}
	};

	useEffect(() => {
    console.log(data)
		window.addEventListener("load", viewChange);
		window.addEventListener("resize", viewChange);
		return () => {
			window.removeEventListener("resize", viewChange);
		};
    
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="data-table-wrapper">
			<div className="data-table-top">
				<div className="data-table-search">
					<input
						className="form-control"
						placeholder="Search by name"
						type="text"
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</div>
				<div className="data-table-action-wrap">
					{actions && <Export data={data} />}
					<div className="data-table-select">
						<select
							className="form-select"
							onChange={(e) => setShowItemPerPage(Number(e.target.value))}
							value={showItemPerPage}>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="25">25</option>
						</select>
						<span className="text">Per page</span>
					</div>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={data}
				className={tableClassName}
				noDataComponent={<div className="p-2">There are no records found.</div>}
				sortIcon={<div className="data-table-sorter"></div>}
				pagination
				expandableRowsComponent={expandedComponent}
				expandableRows={mobileView}
				selectableRows={selectableRows}
				// selectableRowsComponent={customCheckbox}
				paginationComponent={({
					rowsPerPage,
					rowCount,
					onChangePage,
					onChangeRowsPerPage,
					currentPage
				}) => (
					<div className="data-table-bottom">
						<DataTablePagination
							showItemPerPage={showItemPerPage}
							itemPerPage={rowsPerPage}
							totalItems={rowCount}
							paginate={onChangePage}
							currentPage={currentPage}
							onChangeRowsPerPage={onChangeRowsPerPage}
							setShowItemPerPage={setShowItemPerPage}
						/>
					</div>
				)}
			/>
		</div>
	);
}

export default DataTableComponent;

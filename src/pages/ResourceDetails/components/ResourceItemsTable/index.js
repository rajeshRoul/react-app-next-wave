import DropdownButton from "components/DropdownButton";
import SearchBar from "components/SearchBar";
import classes from "./resourceItemsTable.module.scss";
import SortIcon from "assets/icons/SortIcon.svg";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";
import CheckBox from "components/Checkbox";
import { useState } from "react";
import Button from "components/Button";
import Pagination from "components/Pagination";

const columnHelper = createColumnHelper();

const ResourceItemsTable = ({ resourceItems }) => {
    const [selectedRows, setSelectedRows] = useState({});
    const [selectedRowsCount, setSelectedRowsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const toggleRowClick = (id) => {
        setSelectedRows(prev => {
            let newData = { ...prev };
            if (prev[id]) {
                setSelectedRowsCount(prev => prev - 1);
                newData[id] = false;
            } else {
                setSelectedRowsCount(prev => prev + 1);
                newData[id] = true;
            }
            return newData;
        })
    }

    const columns = [
        columnHelper.accessor("id", {
            cell: ({ getValue }) => (
                <div>
                    <CheckBox
                        checked={Boolean(selectedRows[getValue()])}
                        onClick={() => toggleRowClick(getValue())} />
                </div>
            ),
            header: () => ""
        }),
        columnHelper.accessor("title", {
            cell: ({ getValue }) => <div>{getValue()}</div>,
            header: () => "Title"
        }),
        columnHelper.accessor("description", {
            header: () => "Description",
            cell: ({ getValue }) => <div className={classes.description}>{getValue()}</div>
        }),
        columnHelper.accessor("link", {
            header: () => "Link",
            cell: ({ getValue }) => (
                <div>
                    <a href={getValue()} target="_blank" rel="noopener noreferrer" className={classes.link}>
                        {getValue()}
                    </a>
                </div>
            )
        })
    ];

    const table = useReactTable({
        data: resourceItems,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className={classes.container}>
            <div className={classes.tableHeaderCtr}>
                <div className={classes.tableTitle}>
                    Items
                </div>
                <div className={classes.headerInnerCtr}>
                    <SearchBar />
                    <DropdownButton menuItems={filterItems} >
                        <div className={classes.sortBtn}>
                            <img src={SortIcon} alt="" />
                            <div>Sort</div>
                        </div>
                    </DropdownButton>
                </div>
            </div>
            <div className={classes.tableCtr}>
                <table className={classes.table}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={classes.footerCtr}>
                <div className={classes.actionBtnCtr}>
                    <Button
                        variant={Boolean(selectedRowsCount) ? "green" : "disabled"}>
                        Add Item
                    </Button>
                    <Button
                        variant={Boolean(selectedRowsCount) ? "disabled" : "red"}>
                        Delete
                    </Button>
                </div>
                <Pagination currentPage={currentPage} onChange={setCurrentPage} totalPages={10} />
            </div>
        </div>
    )
}

const filterItems = [
    {
        label: "Recently Added",
        value: "Recently Added"
    },
    {
        label: "Ascending",
        value: "Ascending"
    },
    {
        label: "Descending",
        value: "Descending"
    }
]

export default ResourceItemsTable;
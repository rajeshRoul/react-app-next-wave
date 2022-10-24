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
import { useEffect, useMemo, useState } from "react";
import Button from "components/Button";
import Pagination from "components/Pagination";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const columnHelper = createColumnHelper();

const ResourceItemsTable = ({ resourceItems, setResourceItems }) => {
    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState({});
    const [selectedRowsCount, setSelectedRowsCount] = useState(0);
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    const { id } = useParams();
    const navigate = useNavigate();

    const pagination = useMemo(() => ({
        pageIndex,
        pageSize,
    }), [pageIndex, pageSize])

    const toggleRowClick = (id) => {
        let selectedCount = 0;
        setSelectedRows(prev => {
            let newData = { ...prev };
            if (prev[id]) {
                selectedCount = -1;
                newData[id] = false;
            } else {
                selectedCount = 1;
                newData[id] = true;
            }
            return newData;
        })
        setSelectedRowsCount(prev => prev + selectedCount);
    }

    const handleDelete = () => {
        if (Boolean(selectedRowsCount)) {
            setResourceItems(resourceItems.filter((row) => !selectedRows[row.id]));
            setSelectedRowsCount(0);
            setSelectedRows({});
            toast.success("Items Deleted Successfully")
        }
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
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        pageCount: Math.ceil((resourceItems?.length || 1) / 6),
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        manualPagination: true,
    });

    const updateTableData = () => {
        let filteredItems = resourceItems?.filter(
            (item) => item?.title?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        switch (sortBy.value) {
            // Recently Added
            case sortOptions[0].value:
                filteredItems?.sort(({ createdAt: a }, { createdAt: b }) => (Date.parse(b) - Date.parse(a)))
                break;
            // Ascending
            case sortOptions[1].value:
                filteredItems?.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    if (a.description < b.description) return -1;
                    if (a.description > b.description) return 1;
                    return 0;
                })
                break;
            // Descending
            case sortOptions[2].value:
                filteredItems?.sort((a, b) => {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    if (a.description > b.description) return -1;
                    if (a.description < b.description) return 1;
                    return 0;
                })
        }
        const sliceIndex = pageIndex * 6
        setTableData(filteredItems.slice(sliceIndex, sliceIndex + 6));
    }

    useEffect(() => {
        updateTableData();
    }, [resourceItems, sortBy, searchText, pageIndex])

    return (
        <div className={classes.container}>
            <div className={classes.tableHeaderCtr}>
                <div className={classes.tableTitle}>
                    Items
                </div>
                <div className={classes.headerInnerCtr}>
                    <SearchBar onChange={setSearchText} />
                    <DropdownButton
                        activeItem={sortBy}
                        onChange={setSortBy}
                        menuItems={sortOptions} >
                        <div className={classes.sortBtn}>
                            <img src={SortIcon} alt="" />
                            <div>Sort</div>
                        </div>
                    </DropdownButton>
                </div>
            </div>
            <div className={classes.tableCtr}>
                <table className={classes.table} cellSpacing="0">
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
                            <tr key={row.id} className={Boolean(selectedRows[row?.original?.id]) ? classes.activeRow : ""}>
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
                        onClick={() => navigate(`/resources/view/${id}/add-item`)}
                        variant={Boolean(selectedRowsCount) ? "disabled" : "green"}>
                        Add Item
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant={Boolean(selectedRowsCount) ? "red" : "disabled"}>
                        Delete
                    </Button>
                </div>
                <Pagination
                    currentPage={table.getState().pagination.pageIndex + 1}
                    onChange={(page) => table.setPageIndex(page - 1)}
                    totalPages={table.getPageCount()} />
            </div>
        </div>
    )
}

const sortOptions = [
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
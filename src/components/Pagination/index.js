import classes from "./pagination.module.scss";
import LeftArrowIcon from "assets/icons/LeftArrowIcon.svg";
import RightArrowIcon from "assets/icons/RightArrowIcon.svg";
import { useEffect, useState } from "react";

const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    onChange = () => { }
}) => {
    const [pagesArray, setPagesArray] = useState([]);

    const initPagesData = () => {
        let pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; ++i) {
                pages.push({ type: pageTypes.page, content: i })
            }
        } else {
            if (currentPage <= 1 || currentPage > (totalPages - 1)) {
                pages = [
                    { type: pageTypes.page, content: 1 },
                    { type: pageTypes.page, content: 2 },
                    { type: pageTypes.ellipsis, content: "..." },
                    { type: pageTypes.page, content: totalPages - 1 },
                    { type: pageTypes.page, content: totalPages }
                ]
            } else if (currentPage <= 3) {
                pages = [
                    { type: pageTypes.page, content: 1 },
                    { type: pageTypes.page, content: 2 },
                    { type: pageTypes.page, content: 3 },
                    { type: pageTypes.ellipsis, content: "..." },
                    { type: pageTypes.page, content: totalPages }
                ]
            } else if (currentPage > totalPages-3) {
                pages = [
                    { type: pageTypes.page, content: 1 },
                    { type: pageTypes.ellipsis, content: "..." },
                    { type: pageTypes.page, content: totalPages-2 },
                    { type: pageTypes.page, content: totalPages-1 },
                    { type: pageTypes.page, content: totalPages }
                ]
            } else {
                pages = [
                    { type: pageTypes.page, content: 1 },
                    { type: pageTypes.ellipsis, content: "..." },
                    { type: pageTypes.page, content: currentPage },
                    { type: pageTypes.ellipsis, content: "..." },
                    { type: pageTypes.page, content: totalPages }
                ]
            }
        }
        setPagesArray(pages)
    }

    const changePage = (page) => {
        if (page.type === pageTypes.page && currentPage !== page.content) {
            onChange(page.content);
        }
    }

    useEffect(() => {
        if(currentPage <= 0 || currentPage > totalPages){
            onChange(1);
            return;
        }
        if (totalPages && currentPage) {
            initPagesData();
        }
    }, [currentPage, totalPages])

    return (
        <div className={classes.container}>
            <div
                className={`${classes.pageItem} ${currentPage === 1 ? classes.disabled : ""}`}
                onClick={() => onChange(currentPage > 1 ? currentPage - 1 : 1)}>
                <img src={LeftArrowIcon} alt="Previous Page" />
            </div>
            {pagesArray.map((page, index) => (
                <div
                    onClick={() => changePage(page)}
                    className={`${classes.pageItem} ${classes[page.type]} ${currentPage === page.content ? classes.active : ""}`}
                    key={`page-${index}`}>
                    {page.content}
                </div>
            ))}
            <div
                className={`${classes.pageItem} ${currentPage === totalPages ? classes.disabled : ""}`}
                onClick={() => onChange(currentPage < totalPages ? currentPage + 1 : totalPages)}>
                <img src={RightArrowIcon} alt="Next Page" />
            </div>
        </div>
    )
}

const pageTypes = {
    page: "page",
    ellipsis: "ellipsis"
}

export default Pagination;
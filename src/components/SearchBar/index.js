import classes from "./searchBar.module.scss";
import SearchIcon from "assets/icons/SearchIcon.svg";
import { useEffect, useState } from "react";

const SearchBar = ({
    onChange = () => { },
    placeholder = "",
    className,
    style = {},
    ...props
}) => {
    const [searchText, setSearchText] = useState("");
    const [finalText, setFinalText] = useState("");

    const onSearchTextChange = (event) => {
        setSearchText(event.target.value);
        const timeOutId = setTimeout(() => setFinalText(event.target.value), 1000);
        return () => clearTimeout(timeOutId);
    }

    useEffect(() => onChange(finalText), [finalText])

    return (
        <div className={`${classes.container} ${className}`} style={style}>
            <img src={SearchIcon} alt="" />
            <input
                type="text"
                value={searchText}
                onChange={onSearchTextChange}
                placeholder={placeholder}
                {...props} />
        </div>
    )
}

export default SearchBar;
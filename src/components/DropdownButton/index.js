import classes from "./dropdownButton.module.scss";

const DropdownButton = ({
    children,
    activeItem,
    onChange = () => { },
    menuItems = [],
    ...props
}) => {
    return (
        <div className={classes.container} {...props}>
            {children}
            <div className={classes.menuCtr}>
                {menuItems?.map((menu, index) => (
                    <div
                        key={`menuItem-${index}`}
                        onClick={() => onChange(menu)}
                        className={`${classes.menuItem} ${activeItem?.value === menu?.value ? classes.active : ""}`}>
                        {menu.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DropdownButton;
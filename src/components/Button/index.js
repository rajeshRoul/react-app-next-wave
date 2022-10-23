import classes from "./button.module.scss";

const variants = {
    green: "#2DCA73",
    blue: "#0B69FF",
    red: "#FF0B37",
    disabled: "#D7DFE9"
}

const Button = ({ children, variant = "blue", style = {}, ...props }) => {
    return (
        <button
            className={classes.container}
            style={{
                backgroundColor: variants[variant],
                ...style
            }}
            {...props}>
            {children}
        </button>
    )
}

export default Button;
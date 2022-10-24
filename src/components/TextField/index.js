import classes from "./textField.module.scss"

const TextField = ({
    label = "",
    styles = {},
    ...props
}) => {
    return (
        <div className={classes.container}>
            {label &&
                <div className={classes.label}>
                    {label}
                </div>}
            <input
                className={classes.inputField}
                {...props} />
        </div>
    )
}

export default TextField;
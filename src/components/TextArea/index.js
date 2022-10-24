import classes from "./textArea.module.scss"

const TextArea = ({
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
            <textarea
                className={classes.inputField}
                {...props} />
        </div>
    )
}

export default TextArea;
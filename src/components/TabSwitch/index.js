import classes from "./tabSwitch.module.scss";

const TabSwitch = ({ tabs, activeTab, onChange = () => { } }) => {
    return (
        <div className={classes.container}>
            {
                tabs.map((tab, index) => (
                    <div
                        key={`tab${index}${tab.value}`}
                        onClick={() => onChange(tab)}
                        className={`${classes.tab} ${activeTab?.value === tab.value ? classes.active : ""}`}>
                        {tab.label}
                    </div>
                ))
            }
        </div>
    )
}

export default TabSwitch;
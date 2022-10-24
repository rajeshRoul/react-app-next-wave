import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>Page Not Found</h1>
            <br />
            <Link to="/resources">Go To Resources</Link>
        </div>
    )
}

export default NotFound;
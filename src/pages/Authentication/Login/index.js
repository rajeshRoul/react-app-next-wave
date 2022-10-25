import Button from "components/Button";
import TextField from "components/TextField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationAPI from "ServerConnect/AuthenticationAPI";
import classes from "../authentication.module.scss";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isLoggedIn = useSelector((store) => store?.user?.isLoggedIn);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: email?.trim()?.toLowerCase(),
            password
        }
        AuthenticationAPI.loginUser(payload);
    }

    useEffect(() => {
        if (isLoggedIn)
            navigate("/resources");
    }, [isLoggedIn])

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <div className={classes.card}>
                    <div className={classes.formFieldsCtr}>
                        <div className={classes.titleText} >Log In</div>
                        <TextField
                            type="email"
                            label="Email"
                            required={true}
                            value={email}
                            maxLength={30}
                            pattern="^[^ ].+[^ ]$"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter Email" />
                        <TextField
                            type="password"
                            label="Password"
                            required={true}
                            value={password}
                            minLength={8}
                            maxLength={30}
                            pattern="^[^ ].+[^ ]$"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter Password" />
                        <Button type="submit">
                            Log In
                        </Button>
                        <div className={classes.existingUser}>New User ? <Link to="/signup">Sign Up</Link></div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
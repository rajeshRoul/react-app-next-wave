import Button from "components/Button";
import TextField from "components/TextField";
import classes from "../authentication.module.scss";
import UserIcon from "assets/icons/UserIcon.svg";
import EditIcon from "assets/icons/EditIcon.svg";
import { useEffect, useRef, useState } from "react";
import AuthenticationAPI from "ServerConnect/AuthenticationAPI";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUp = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isLoggedIn = useSelector((store) => store?.user?.isLoggedIn);

    const onFileSelected = (e) => {
        if (e?.target?.files?.[0])
            setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            image,
            fullName: fullName.trim(),
            email: email?.trim()?.toLowerCase(),
            password
        }
        const res = AuthenticationAPI.signupUser(payload);
        if (res) navigate("/login");
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
                        <div className={classes.titleText} >Sign Up</div>
                        <div className={classes.nameFieldCtr}>
                            <div className={classes.profilePicCtr} onClick={() => inputRef.current.click()}>
                                <img
                                    src={image || UserIcon}
                                    alt="Upload Profile Picture"
                                    className={classes.profilePic} />
                                <img
                                    src={EditIcon}
                                    alt="Edit Profile Pic"
                                    className={classes.editButton} />
                                <input type="file" ref={inputRef} onChange={onFileSelected} />
                            </div>
                            <TextField
                                type="text"
                                label="Full Name"
                                required={true}
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                placeholder="Enter Full Name" />
                        </div>

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
                            Sign Up
                        </Button>
                        <div className={classes.existingUser}>Existing User ? <Link to="/login">Log In</Link></div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
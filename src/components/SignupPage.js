import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../services/auth.service";

const SignupPage = () => {
    const [username, usernamechange] = useState("");
    const [password, passwordchange] = useState("");
    const [confirmPassword, confirmPasswordchange] = useState("");
    const [email, emailchange] = useState("");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter the value in ";
        if (username === null || username === "") {
            isproceed = false;
            errormessage += " username";
        }
        if (password === null || password === "") {
            isproceed = false;
            errormessage += " Password";
        }
        if (confirmPassword === null || confirmPassword === "") {
            isproceed = false;
            errormessage += " Confirm Password";
        }
        if (email === null || email === "") {
            isproceed = false;
            errormessage += " Email";
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            } else {
                isproceed = false;
                toast.warning("Please enter the valid email");
            }
            if (password !== confirmPassword) {
                isproceed = false;
                toast.warning("Password and Confirm Password are not same");
            }
        }
        return isproceed;
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (IsValidate()) {
            let signupData = {
                username,
                email,
                password,
            };
            AuthService.signup(signupData)
                .then((res) => {
                    if (res[0] === 201) {
                        toast.success("Registered successfully.");
                        navigate("/login");
                    } else {
                        toast.error(res[1]["msg"]);
                    }
                })
                .catch((err) => {
                    toast.error("Failed :" + err.message);
                });
        }
    };
    return (
        <div className="row">
            <div
                className="offset-lg-3 col-lg-6"
                style={{ marginTop: "100px" }}
            >
                <form onSubmit={handlesubmit} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Registeration</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>
                                    Username <span className="errmsg">*</span>
                                </label>
                                <input
                                    value={username}
                                    onChange={(e) =>
                                        usernamechange(e.target.value)
                                    }
                                    className="form-control"
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>
                                    Email <span className="errmsg">*</span>
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) =>
                                        emailchange(e.target.value)
                                    }
                                    className="form-control"
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>
                                    Password <span className="errmsg">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        passwordchange(e.target.value)
                                    }
                                    className="form-control"
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>
                                    Confirm Password{" "}
                                    <span className="errmsg">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        confirmPasswordchange(e.target.value)
                                    }
                                    className="form-control"
                                ></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Signup
                            </button>{" "}
                            |
                            <Link className="btn btn-success" to={"/login"}>
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;

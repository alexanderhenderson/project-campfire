import React, { useState, useRef } from 'react'
import { useToken } from './Authorization'


export default function Signup() {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        state: ""
    })

    const [signupTest, setSignupTest] = useState(true)
    const { username, password, first_name, last_name, email, city } = userData;
    // eslint-disable-next-line no-unused-vars
    const [token, login, logout, signup] = useToken();
    // List of US states for sign up form
    const USStates = useRef([
        { name: "Alabama", abb: "AL" }, { name: "Alaska", abb: "AK" }, { name: "Arizona", abb: "AZ" },
        { name: "Arkansas", abb: "AR" }, { name: "California", abb: "CA" }, { name: "Colorado", abb: "CO" }, { name: "Connecticut", abb: "CT" },
        { name: "Delaware", abb: "DE" }, { name: "District of Columbia", abb: "DC" }, { name: "Florida", abb: "FL" }, { name: "Georgia", abb: "GA" },
        { name: "Hawaii", abb: "HI" }, { name: "Idaho", abb: "ID" }, { name: "Illinois", abb: "IL" }, { name: "Indiana", abb: "IN" },
        { name: "Iowa", abb: "IA" }, { name: "Kansas", abb: "KS" }, { name: "Kentucky", abb: "KY" }, { name: "Louisiana", abb: "LA" },
        { name: "Maine", abb: "ME" }, { name: "Montana", abb: "MT" }, { name: "Nebraska", abb: "NE" }, { name: "Nevada", abb: "NV" },
        { name: "New Hampshire", abb: "NH" }, { name: "New Jersey", abb: "NJ" }, { name: "New Mexico", abb: "NM" }, { name: "New York", abb: "NY" },
        { name: "North Carolina", abb: "NC" }, { name: "North Dakota", abb: "ND" }, { name: "Ohio", abb: "OH" }, { name: "Oklahoma", abb: "OK" },
        { name: "Oregon", abb: "OR" }, { name: "Maryland", abb: "MD" }, { name: "Massachusetts", abb: "MA" }, { name: "Michigan", abb: "MI" },
        { name: "Minnesota", abb: "MN" }, { name: "Mississippi", abb: "MS" }, { name: "Missouri", abb: "MO" }, { name: "Pennsylvania", abb: "PA" },
        { name: "Rhode Island", abb: "RI" }, { name: "South Carolina", abb: "SC" }, { name: "South Dakota", abb: "SD" }, { name: "Tennessee", abb: "TN" },
        { name: "Texas", abb: "TX" }, { name: "Utah", abb: "UT" }, { name: "Vermont", abb: "VT" }, { name: "Virginia", abb: "VA" },
        { name: "Washington", abb: "WA" }, { name: "West Virginia", abb: "WV" }, { name: "Wisconsin", abb: "WI" }, { name: "Wyoming", abb: "WY" },
    ])


    const changeHandler = e => {
        setUserData({ ...userData, [e.target.name]: [e.target.value] });
    }
    console.log(userData)


    const submitHandler = e => {
        e.preventDefault();

        async function signupWithTest() {
            let test = await signup(
                userData.username[0],
                userData.password[0],
                userData.email[0],
                userData.first_name[0],
                userData.last_name[0],
                userData.city[0],
                userData.state[0],
            )

            if (test === false) {
                setSignupTest(false)
            } else {
                setSignupTest(true)
            }
        }
        signupWithTest()
    }


    let SignupFailed = function Waiting() {
        return (
            <div>
            </div>
        )
    }
    if (signupTest === false) {
        SignupFailed = function Failed() {
            return (
                <div className="alert alert-danger" role="alert">
                    <h4>Username Is Taken. Please Try Again.</h4>
                </div>
            )
        }
    }


    return (
        <div className="container px-4 py-4 text-center">
            <div className="row gx-5">
                <div className="col">
                    <div className="card shadow">
                        <div className="card body px-4 py-4">
                            <form onSubmit={submitHandler}>
                                <h3 align="center">Sign Up</h3>
                                <div>
                                    <SignupFailed />

                                    <div className="form-floating mb-2">
                                        <div className="row">
                                            <div className="col">
                                                <input className="form-control"
                                                    type="text"
                                                    name="first_name"
                                                    value={first_name}
                                                    onChange={changeHandler}
                                                    placeholder="First Name"
                                                    required />
                                            </div>
                                            <div className="col">
                                                <input className="form-control"
                                                    type="text"
                                                    name="last_name"
                                                    value={last_name}
                                                    onChange={changeHandler}
                                                    placeholder="Last Name"
                                                    required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="form-floating mb-2">
                        <label>First Name</label>
                        <input className="form-control"
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            required />
                    </div>
                    <div className="form-floating mb-2">
                        <label>Last Name</label>
                        <input className="form-control"
                            type="text"
                            name="last_name"
                            value={last_name}
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            required />
                    </div> */}
                                </div>
                                <div className="form-floating mb-2">
                                    <label>Username</label>
                                    <input className="form-control"
                                        type="text"
                                        value={username}
                                        name="username"
                                        onChange={changeHandler}
                                        placeholder="Enter Username"
                                        required />
                                </div>
                                <div className="form-floating mb-2">
                                    <label>Password</label>
                                    <input className="form-control"
                                        type="password"
                                        value={password}
                                        name="password"
                                        onChange={changeHandler}
                                        placeholder="Enter Password"
                                        required
                                    />
                                </div>
                                <div className="form-floating mb-2">
                                    <label>Email</label>
                                    <input className="form-control"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={changeHandler}
                                        placeholder="Enter Email"
                                        required />
                                </div>


                                <div className="form-floating mb-2">
                                    <label>City</label>
                                    <input className="form-control"
                                        type="text"
                                        name="city"
                                        value={city}
                                        onChange={changeHandler}
                                        placeholder="Enter City"
                                        required />
                                </div>

                                <div className="form-floating mb-2">
                                    <select name="state" className="form-control">
                                        <option value="">Select State</option>
                                        {USStates.current.map(state => (
                                            <option key={state.abb} value={state.abb}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor="state" className="form-floating-label">State</label>
                                </div>

                                {/* <div class="col">
                            <input className="form-control"
                                type="text"
                                name="state"
                                value={state}
                                onChange={changeHandler}
                                placeholder="State"
                                required />
                        </div> */}

                                <button type="submit" className="btn btn-primary">Sign Up</button>
                                <p className="forgot-password text-right">
                                    Already Signed Up? <a href={`Login`}>Log In</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

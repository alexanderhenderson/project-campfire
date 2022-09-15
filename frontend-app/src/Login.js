import React from "react";
import { useState } from "react";
import { useToken } from "./Authorization";

export default function LogIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [, login] = useToken();
	const [loginResponse, setLoginResponse] = useState(true);

	async function onSubmit() {
		const result = await login(username, password);

		// set loginresponse to see if user is logged in, or if login failed
		if (result.status === 200 || result.status === undefined) {
			console.log(result.status);
			console.log("Successful Login");
			setLoginResponse(true);
		} else {
			setLoginResponse(false);
		}

		console.log(await result);
		console.log(await result.slice(22, -1));
		console.log(await (result.slice(22, -1) === "authenticated"));

		if ((await result) == null || (await result.slice(22, -1)) === "authenticated") {
			setUsername("");
			setPassword("");
		}
	}

	return (
		<div className="container px-4 py-4 text-center">
			<div className="row gx-5">
				<div className="col">
					<div className="card shadow">
						<div className="card body px-4 py-4">
							<form>
								<h1> Log in </h1>
								<div className="form-floating mb-2">
									<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" />
									<label htmlFor="username"> Username </label>
								</div>
								<div className="form-floating mb-2">
									<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" />
									<label htmlFor="password"> Password </label>
								</div>
								<p className="fs-5" hidden={loginResponse ? true : false}>
									Failed to log in - Check Username or Password
								</p>
								<button type="button" className="btn btn-primary" onClick={onSubmit}>
									Log in
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

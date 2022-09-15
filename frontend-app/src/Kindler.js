import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Kindler() {
	// eslint-disable-next-line no-unused-vars
	const [username, setUsername] = useState("");
	// const [userList, setUserList] = useState([]);
	const [KindlerList, SetKindlerData] = useState([]);

	useEffect(() => {
		const UserInfoRequest = async () => {
			const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
			const response = await fetch(url, { credentials: "include" });

			if (response.ok) {
				const data = await response.json();
				console.log("Logged in user data: ", data);
				setUsername(data);
			}
		};

		const KindlerData = async () => {
			const url = `${process.env.REACT_APP_USERS}/users/api/kindler`;
			const response = await fetch(url, { credentials: "include" });

			if (response.ok) {
				const data = await response.json();
				console.log("kindler data: ", data);

				// adding additional key-value pair so that we can
				// track who has been added to a clients friend list
				for (let friend of data) {
					friend.friend = false;
				}

				SetKindlerData(data);
			}
		};

		UserInfoRequest();
		KindlerData();
	}, []);

	async function onClick(friendID, objectNum) {
		console.log("clicked obejctnum: ", objectNum);

		const url = `${process.env.REACT_APP_USERS}/users/api/friend/`;
		const params = {
			method: "put",
			body: friendID,
			credentials: "include",
		};
		const response = await fetch(url, params);

		if (response.status === 200) {
			let kindlerState = [...KindlerList];
			kindlerState[objectNum].friend = true;
			SetKindlerData(kindlerState);
		}
	}

	return (
		<>
			<div>
				<img className="mw-100" src="/bestMountains.png" alt="Max-width 100%"></img>
				<div className="px-4 py-5 my-5 text-center">
					<h1 className="display-5 fw-bold">The Campfire Kindler</h1>
					<div className="col-lg-6 mx-auto">
						<div className="lead mb-4">Gather around the campfire with new friends!</div>
					</div>
					{KindlerList.length > 0 ? (
						<div className="row">
							{KindlerList.slice(0).map((KindlerUser, index) => {
								return (
									<div className="col-sm-4" key={KindlerUser.id}>
										<div className="card mb-3 shadow">
											<img className="crop-image" src={KindlerUser?.profile_photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPJFBrPoazCA8scTIXSLI6fwQHWFI-VhSkQ&usqp=CAU"} alt="" />
											<div className="card-body ">
												<h5 className="card-title">{KindlerUser.username}</h5>
												{!KindlerUser?.friend ? (
													<button
														type="button"
														className="btn btn-warning"
														onClick={() => {
															onClick(KindlerUser?.id, index);
														}}
													>
														{" "}
														Add to Friend's List{" "}
													</button>
												) : (
													<div>
														<h6 className="card-text">
															How to contact {KindlerUser?.username}: {KindlerUser?.email}
														</h6>
														<div style={{ padding: 5 }}>
															<h5 className="card-subtitle text-muted"> {KindlerUser?.username} added to friends list! </h5>
														</div>
													</div>
												)}
											</div>
											<div className="card-footer">
												{KindlerUser.city}-{KindlerUser.state}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div>
							<img className="mw-100" src="/MuchWow.png" alt="Max-width 100%"></img>
							<h2 className="card-text">Wow! You are already friends with everybody!</h2>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

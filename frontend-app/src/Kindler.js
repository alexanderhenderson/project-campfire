import React from "react";
import { useState } from "react";
// import { useToken } from "./Authorization";
import { useEffect } from "react";

// import { getUserInfo } from './Authorization'; // testing don't leave in imports

// its a match!

export default function Kindler() {
	const [username, setUsername] = useState("");
	// const [userList, setUserList] = useState([]);
	const [KindlerList, SetKindlerData] = useState([]);

	useEffect(() => {
		// const url = `${process.env.REACT_APP_USERS}/users/`
		// const userFetch = fetch (url, {
		//   credentials: "include",
		//   }).then(response => response.json()).then(data => {
		//     console.log("Promise Chain Data loaded: ", data);
		//     setUserList(data);
		//     console.log("State userlist?: ", userList)
		//     return null
		//   })

		// console.log("Userlist state: ", userList)
		// console.log("Userfetch test: ", userFetch)

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

				// adding additional key-value pair so that when a
				// a freind is added we can change the button to reflect
				// that change
				for (let friend of data) {
					friend.friend = false;
					//console.log(friend)
				}

				SetKindlerData(data);
				console.log("Userdata: ", username);
				console.log("kindler data 0: ", data[0]);
				console.log("kindler data 1-9: ", data.slice(1, 10));
			}
		};

		UserInfoRequest();
		KindlerData();
		//UserListRequest()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// <h1> { username || "loading" } is logged in </h1>
	// <h1> { userList?.users?.[0].id || " loading " } - </h1>

	async function onClick(friendID, objectNum) {
		console.log("Submitted:", friendID);

		const data = friendID;

		console.log("Freind id: ", data);

		const url = `${process.env.REACT_APP_USERS}/users/api/friend/`;
		const params = {
			method: "put",
			body: data,
			credentials: "include",
		};

		const response = await fetch(url, params);

		if (response.status === 200) {
			console.log("1 Kindler friend: ", KindlerList?.[0]?.friend);

			let kindlerState = KindlerList;
			kindlerState[objectNum].friend = true;
			SetKindlerData(kindlerState);

			// KindlerList[objectNum].friend = true;

			console.log("2 Response: ", response);
			console.log("3 Modified KindlerList: ", KindlerList);
			console.log("3 This this a Kindler friend?: ", KindlerList?.[0]?.friend);
		}
	}

	const click = () => {
		console.log("State test: ", KindlerList?.[0]?.friend);
	};

	return (
		<div>
			<img className="mw-100" src="/bestMountains.png" alt="Max-width 100%"></img>
			<div className="px-4 py-5 my-5 text-center">
				<h1 className="display-5 fw-bold">The Campfire Kindler</h1>
				<div className="col-lg-6 mx-auto">
					<div className="lead mb-4">Gather around the campfire with new friends!</div>
				</div>
				<div>
					<small>Build your tribe</small>
				</div>
				{/* New Div */}
				<div className="container">
					<div class="row mb-2">
						<div class="col">Column 1</div>

						{/* New Div test */}
						{/* New Div test */}

						<div class="col test3">
							Column
							<div className="col test">Test</div>
							<div className="col test2">Test</div>
						</div>
					</div>
				</div>
				{/* Main Card - 1st of kindler mates*/}
				<div hidden={KindlerList.length > 0 ? false : true}>
					<div className="card mb-3 shadow">
						<img className="crop-image" src={KindlerList?.[0]?.profile_photo} alt="" />
						<div className="top-left">
							<h2 className="display-5 fw-bold"> Your Top Match! </h2>
							{/* <img src="/match.gif"  /> */}
						</div>
						<div className="card-body m-2">
							<h5 className="card-title">{KindlerList?.[0]?.username}</h5>
							<h6 className="card-subtitle mb-2 text-muted">
								{/* {KindlerUser?.favorite_activities?.[0]} */}
								Is this a friend? {KindlerList?.[0]?.friend.toString()}
							</h6>
							<p className="card-text">Email: {KindlerList?.[0]?.email}</p>

							<button
								type="button"
								className={KindlerList?.[0]?.friend ? "btn btn-warning d-none" : "btn btn-warning"}
								onClick={() => {
									onClick(KindlerList?.[0]?.id, 0);
								}}
							>
								{" "}
								Add to Friend's List{" "}
							</button>
							{/* <button type="button" hidden={ (KindlerList?.[0]?.friend) ? true : false } className="btn btn-warning" onClick={ () => {console.log('arrow function working');onSubmit(KindlerList?.[0]?.id, 0)} }> Add to Friend's List </button> */}

							<p> testing {KindlerList?.[0]?.friend.toString()} </p>

							<button className="btn btn-success" onClick={click}>
								{" "}
								Test friend[0] state{" "}
							</button>
						</div>
						<div className="card-footer">
							Location: {KindlerList?.[0]?.city} - {KindlerList?.[0]?.state}
						</div>
					</div>
					{/* 9 smaller match cards - kindler matches 2-10 */}
					<div className="row">
						{KindlerList.slice(1, 10).map((KindlerUser) => {
							return (
								<div className="col-sm-4 mb-3" key={KindlerUser.id}>
									<div className="card mb-3 shadow h-100">
										<img className="kindle-card" src={KindlerUser?.profile_photo} alt="" />
										{/* className="card-img-top" */}
										<div className="card-body">
											<h5 className="card-title">{KindlerUser.username}</h5>
											<h6 className="card-subtitle mb-2 text-muted">
												{/* {KindlerUser?.favorite_activities?.[0]} */}
												Test
											</h6>
											<p className="card-text">{KindlerUser.email}</p>
											<button type="button" className="btn btn-warning">
												{" "}
												Add to Friend's List{" "}
											</button>
										</div>
										<div className="card-footer">
											{KindlerUser.city}-{KindlerUser.state}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

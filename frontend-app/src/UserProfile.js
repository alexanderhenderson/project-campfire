import { useEffect, useState } from "react"


function UserProfile() {
    const [userData, setUserData] = useState({})
    const [error, setError] = useState('')
    const [userId, setUserId] = useState(0)

    // have to do this automatically somehow
    setUserId(6)

    useEffect(() => {
        const getUserData = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/${userId}/`;
            const response = await fetch(url);
            if (response.ok) {
                // console.log("response: ", response)
                const data = await response.json();
                // console.log("data: ", data)
                setUserData(data);
            } else {
                setError('Could not load users');
                console.log(error)
            }
        }
        getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUserData, setError])
    console.log(userData)

    return (
        <>
            <div className="container px-4 py-4">
                <div className="row gx-5">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card body px-4 py-4">
                                <h1>{userData.username}<small></small></h1>
                            </div>
                            <div className="px-5">
                                <h3>{userData.first_name} {userData.last_name}</h3>
                                <p>{userData.profile_description}</p>
                                <p>{userData.city}</p>
                                <p>{userData.state}</p>
                                <p>{userData.date_joined}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserProfile
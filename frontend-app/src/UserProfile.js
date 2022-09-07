import { useEffect, useState } from "react"


function UserProfile() {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(1)

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
                setError('Could not load the things');
            }
        }
        getUserData()
    }, [setUserData, setError])
    console.log(userData)

    return (
        <div>
            <div className="px-5 py-4">
                <h1>{userData.username}<small></small></h1>
            </div>
            <div className="px-5">
                <h3>{userData.first_name} {userData.last_name}</h3>
            </div>
        </div>
    )
}

export default UserProfile
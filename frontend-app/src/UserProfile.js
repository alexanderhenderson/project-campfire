import { useEffect, useState } from "react"


function UserProfile() {
    const [userData, setUserData] = useState({})
    const [error, setError] = useState('')
    const [userId, setUserId] = useState(6)

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
            }
        }
        getUserData()
    }, [setUserData, setError])
    console.log(userData)

    return (
        <>
            <div className="container px-4 py-4">
                <div className="col">
                    <div className="card shadow">
                        <div className="body px-4 py-4">
                            <h1>{userData.first_name} {userData.last_name} : {userData.username}</h1>
                        </div>
                        <div className="container m-3">
                            <div className='m-2'>
                                <img src={userData.profile_photo} height='200' />
                            </div>
                            <h4>About Me: </h4>
                            <p>{userData.profile_description}</p>
                            <h4>Location</h4>
                            <p>{userData.city}, {userData.state}</p>
                            <h4>Friends</h4>
                            <table className="table">
                                <tbody>
                                    {userData?.friends?.map(friend => (
                                        <tr key={friend.id}>
                                            <td>{friend.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserProfile
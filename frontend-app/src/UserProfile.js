import { useEffect, useState } from "react"


export default function UserProfile() {
    const [userData, setUserData] = useState({})
    const [error, setError] = useState('')
    const [userId, setUserId] = useState(0)

    // have to do this automatically somehow
    setUserId(6)

    useEffect(() => {
        const getUserData = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/${userId}/`
            const response = await fetch(url)
            if (response.ok) {
                // console.log("response: ", response)
                const data = await response.json()
                // console.log("data: ", data)
                setUserData(data)
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

            <div className="container p-4">
                <div className="col">
                    <div className="card shadow">
                        <div className="container m-3">
                            <div className="container">
                                <div className="row">
                                    <div className="body my-3">
                                        <h1>{userData.username}</h1>
                                    </div>
                                    <div className="col">
                                        <div className='mb-5'>
                                            <img src={userData.profile_photo} height='200' alt="" />
                                        </div>
                                        <div className='m-2'>
                                            <h4>Name: </h4>
                                            <p>{userData.first_name} {userData.last_name}</p>
                                            <h4>About Me: </h4>
                                            <p>{userData.profile_description}</p>
                                            <h4>Location</h4>
                                            <p>{userData.city}, {userData.state}</p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <h4>Favorite Activities</h4>
                                        <table className="table">
                                            <tbody>
                                                {userData?.favorite_activities?.map(activity => (
                                                    <tr key={activity.id}>
                                                        <td>{activity.name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                    </div>
                </div>
            </div>

        </>
    )
}
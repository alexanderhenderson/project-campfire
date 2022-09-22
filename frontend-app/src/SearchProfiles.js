import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function FetchUsers() {

    const [usersList, setUsersList] = useState([])
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const navigate = useNavigate()
    const [addUser, setAddUser] = useState(0)
    // const [click, setClick] = useState(true)
    

    useEffect(() => {

        const getUsersList = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/`
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setUsersList(data.users)
            }
        }
    getUsersList()
    }, [])
// console.log(usersList)
// console.log(addUser)
// console.log(usersList.length)
    // function clickHandler(event, activity) {
    //     addActivities(userData.id, activity)
    //     setActivityList([...activityList, activity])
    // }

    function searchFilter() {
        const searchedUser = usersList.filter(user => user.first_name.toLowerCase().includes(search.toLowerCase()))
        setFilteredUsers(searchedUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { searchFilter() }, [search])

    function handleChange(event) {
        setSearch(event.target.value)
    }

    const userState = filteredUsers.length < 1
        ? usersList
        : filteredUsers;

    return (
        <main>
            <span id="top"> </span>
            <div className='search-bg'></div>
            <div className="m-3">
                <h1>Search All Users</h1>
                <h4>Click Card to go to User Profile</h4>  
            </div>
            <div>
                <input
                    type="search"
                    id="search"
                    className="form-control"
                    placeholder="Search for users"
                    onChange={handleChange}
                    aria-label="Search"
                />
            </div>
            <div className="m-3">
                <div className="row ">
                    {userState.slice(0,9 + addUser).map(user => {
                            return (
                                <div className="col-sm-4 padding_bottom" key={user.id}>
                                    <div className="card mb-3 shadow h-100 pointer "
                                    onClick={() => {
                                        navigate(`/profile/${user.id}/`)
                                    }}>
                                            <img src={user?.profile_photo || "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} className="card-img-top crop-image" alt="" />
                                            <div className="card-body">
                                                <h5 className="card-title center_card_text">Username: {user.username}</h5>
                                                <h6 className="card-title center_card_text"> Name: {user.first_name} {user.last_name}</h6>
                                                <h6 className="card-title center_card_text"> Location: {user.city || "Unknown"} {user.state || ""}</h6>
                                                
                                            </div>  
                                    </div>
                                </div>
                            )
                            
                        })}
                </div>
                <div className="div-center">
                {addUser <= usersList.length - 8 ? <p  className="center-p paginate-button "
                onClick={() => {
                      setAddUser(addUser + 6);
                  }}><i className=" arrow down outline "></i></p> : <a className="back-to-top-btn " href="#top">Back to top</a> }
                
                </div>
            </div>
        </main>
    )
}

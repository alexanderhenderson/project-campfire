import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Comments() {
  const [comments, setComments] = useState([])
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  // const { id } = useParams()

  // console.log(id)
  useEffect(() => {
    const getUserdata = async () => {
      const url = `${process.env.REACT_APP_USERS}/users/comments`;
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
        console.log(userData)
      }
    }
    getUserdata()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  return (
    <>
      <h1>Comments</h1>
      <form>
        <div class="form-group">
          <label for="commentTextbox">Write your comment here</label>
          <textarea class="form-control" id="commentTextbox" rows="3"></textarea>
        </div>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>Post</button>
      </form>
      <div className="container mt-3">
        <table className="table">
          <tbody>
            {userData.map(comments => {
              return (
                <tr key={comments.id}>
                  <td>{comments.first_name} {comments.last_name}</td>
                </tr>
              )

            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
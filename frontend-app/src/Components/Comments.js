import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../UserContext"

export default function Comments() {
  const [commentData, setCommentData] = useState({})
  const [newComment, setNewComment] = useState('')
  const { id } = useParams()
  const { userId } = useContext(UserContext)


  useEffect(() => {
    const getCommentData = async () => {
      const url = `${process.env.REACT_APP_USERS}/users/profile/comments/${id}/`
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const data = await response.json()
        setCommentData(await data.comments)
      }
    }
    getCommentData()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [id, setCommentData, newComment])

  const changeHandler = e => {
    setNewComment(e.target.value);
  }

  async function handleSubmit() {

    const data = {
      user_id: userId.id,
      comment: newComment,
      user_profile: id,
    }
    console.log(data)
    const url = `${process.env.REACT_APP_USERS}/users/comments/`
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: "include",
      // headers: {
      //   'Content-Type': 'application/json'
      // },
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const comment = await response.json()
      console.log(comment)
      setNewComment('')
    }
  }
  return (
    <>
      <div className='mt-5'>
        <h1>Comments</h1>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="commentTextBox">Leave a comment for me!</label>
          <textarea className="form-control" id="commentTextBox" rows="3" onChange={changeHandler} value={newComment}></textarea>
        </div>
        <div className='m-3'>
          <button type="button" className="btn btn-dark btn-lg rounded-pill" onClick={handleSubmit}>Post</button>
        </div>
      </form>

      <div className="container mt-3">
        <h3>View Your Comments</h3>
        {commentData.length > 0 ? (
          <table className="table">
            <tbody>
              {commentData?.map(comments => {
                return (
                  <tr key={comments.id}>
                    <td>{comments.comment}</td>
                    <td>{new Date(comments.time_posted).toLocaleString()}</td>
                    <td>- {comments.commenter.username}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : ('')}
      </div>
    </>
  )
}


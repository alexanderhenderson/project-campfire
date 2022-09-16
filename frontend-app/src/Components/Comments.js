import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Comments() {
  const [commentData, setCommentData] = useState({})
  const { id } = useParams()


  useEffect(() => {
    const getCommentData = async () => {
      const url = `${process.env.REACT_APP_USERS}/users/profile/comments/${id}/`
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setCommentData(await data.comments)
        console.log(commentData)
      }
    }
    getCommentData()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [id, setCommentData])

  const changeHandler = e => {
    setCommentData(e.target.value);
  }
  console.log(commentData)

  async function onSubmit(event) {
    event.preventDefault()
    const data = {
      commentTextbox: event.target.commentTextbox.value,
    }
    console.log('data: ', data)

    const url = `${process.env.REACT_APP_USERS}/users/comments/`
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const newComment = await response.json()
      console.log(newComment)
    }
  }

  return (
    <>
      <h1>Comments</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          {/* <label htmlFor="commentTextbox">Leave a comment for me!</label> */}
          <textarea className="form-control" id="commentTextbox" rows="3"></textarea>
        </div>
        <div className='m-3'>
          <button type="button" className="btn btn-primary" onClick={onSubmit}>Post</button>
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
                    <td>{comments.comment} by {comments.commenter.first_name}</td>
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
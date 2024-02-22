// Write your code here
import './index.css'

const CommentItem = props => {
  const {eachComment, deleteComment, changeLikeImage} = props
  const {id, name, comment, date, isLiked, initialClassName} = eachComment
  const initial = name.slice(0, 1)
  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const likeImageClassName = isLiked ? 'like' : 'liked'

  const deleteItem = () => {
    deleteComment(id)
  }

  const onCLickLikeButton = () => {
    changeLikeImage(id)
  }

  return (
    <li className="list-style">
      <div className="details">
        <button type="button" className={`profile ${initialClassName}`}>
          {initial}
        </button>
        <p className="profile-name">{name}</p>
        <p className="time">{date}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="like-delete-container">
        <button
          className="button like-button"
          type="button"
          onClick={onCLickLikeButton}
        >
          <img src={likeImage} className="like-image" alt="like" />
          <p className={likeImageClassName}>like</p>
        </button>
        <button
          className="button"
          type="button"
          onClick={deleteItem}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
      <hr className="horizontal-line" />
    </li>
  )
}

export default CommentItem

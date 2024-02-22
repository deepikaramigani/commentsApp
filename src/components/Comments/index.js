import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {commentsList: [], name: '', comment: '', commentsCount: 0}

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    if (name !== '' && comment !== '') {
      const newComment = {
        id: uuidv4(),
        name,
        comment,
        date: formatDistanceToNow(new Date(), {addSuffix: true}),
        isLiked: true,
        initialClassName:
          initialContainerBackgroundClassNames[
            Math.ceil(
              Math.random() * initialContainerBackgroundClassNames.length - 1,
            )
          ],
      }

      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
        commentsCount: prevState.commentsCount + 1,
      }))
    }
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const newListAfterDeleting = commentsList.filter(each => each.id !== id)
    this.setState(prevState => ({
      commentsList: newListAfterDeleting,
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  changeLikeImage = id => {
    const {commentsList} = this.state
    const object = commentsList.find(each => each.id === id)
    object.isLiked = !object.isLiked
    const newListAfterLiking = commentsList.filter(each => each.id !== id)
    this.setState({
      commentsList: [...newListAfterLiking, object],
    })
  }

  render() {
    const {commentsList, name, comment, commentsCount} = this.state
    return (
      <div className="main-container">
        <div className="bg-container">
          <div className="comment-details">
            <h1 className="heading">Comments</h1>
            <div className="comment-details">
              <p className="comments-des">
                Say something about 4.0 Technologies
              </p>
              <form onSubmit={this.onAddComment}>
                <input
                  type="text"
                  value={name}
                  placeholder="Your Name"
                  className="input-style"
                  onChange={this.onChangeName}
                />
                <textarea
                  type="text"
                  value={comment}
                  rows="7"
                  cols="60"
                  placeholder="Your Comment"
                  className="input-style address"
                  onChange={this.onChangeComment}
                >
                  Your Comment
                </textarea>
                <button type="submit" className="add-comment-button">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
          <div className="image">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-img"
            />
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="comments-container">
          <div className="count-container">
            <p className="add-comment-button">{commentsCount}</p>
            <p>Comments</p>
          </div>
          <ul className="list-container">
            {commentsList.map(each => (
              <CommentItem
                deleteComment={this.deleteComment}
                changeLikeImage={this.changeLikeImage}
                eachComment={each}
                key={each.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments

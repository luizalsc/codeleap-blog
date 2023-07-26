import './index.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createNewPost, getPostsList} from '../../services'
import { useDispatch } from 'react-redux'
import { setPostsList } from '../../actions'

const PostComponent = ({content, title})=>{

  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)
  const offset = useSelector((state)=> state.offset)
  const [post, setPost] = useState({})

  const [isDisabled, setIsDisabled] = useState(true)
 
  const handleChange = (event)=>{
    const value = event.target.value
    setPost({...post,[event.target.name]: value})
    if(post.title && post.content){
      setIsDisabled(false)
    } 
  } 

  const handleSubmit = (event)=>{
    event.preventDefault()
    setPost({...post, username: user.profile.username})
    const fetchData = async () =>{
      await createNewPost(post)
      const postsList = await getPostsList(offset)
      dispatch(setPostsList(postsList.results))
    }
  fetchData()
  event.target.reset()
  }

  return(
    <div className='post-container'>
      <form
        onSubmit={handleSubmit}
        role='postForm'
        className='form-container'>
        <h3 className='header'>What's on your mind?</h3>
        <label role='labeltext' className='label'>Title</label>
        <input
          type='text'
          value={title}
          name='title'
          placeholder='Hello world'
          onChange={handleChange}
          className='input-field'></input>
        <label role='labeltext' className='label'>Content</label>
        <textarea
          cols='30'
          rows='10'
          name='content'
          value={content}
          onChange={handleChange}
          placeholder='Content here'
          className='input-field'></textarea>
        <button type='submit' className='button' disabled={isDisabled}>Create</button>
      </form>
    </div>
  )
}

export { PostComponent }

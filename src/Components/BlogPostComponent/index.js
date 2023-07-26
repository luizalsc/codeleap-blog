import './index.css'
import { Button } from '../Button'
import { PostForm } from '../PostForm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createNewPost, getPostsList} from '../../services'
import { useDispatch } from 'react-redux'
import { setPostsList } from '../../actions'

const PostComponent = ({content, title})=>{

  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)
  const offset = useSelector((state)=> state.offset)

  const [post, setPost] = useState({username: user.profile.username})
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
    const fetchData = async () =>{
      await createNewPost(post)
      const postsList = await getPostsList(offset)
      dispatch(setPostsList(postsList.results))
    }
  fetchData()
  setIsDisabled(true)
  event.target.reset()
  }

  return(
    <div className='post-container'>
      <div className='form-container'>
        <h3 className='header'>What's on your mind?</h3>
        <form
          onSubmit={handleSubmit}
          role='postForm'
          className='form'>
          <PostForm content={content} title={title} handleChange={handleChange}/>
          <div className='button-container'>
            <Button type='submit' className='button' disabled={isDisabled}>Create</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { PostComponent }

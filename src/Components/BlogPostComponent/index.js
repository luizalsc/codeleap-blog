import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createNewPost, getPostsList } from '../../services'
import { useDispatch } from 'react-redux'
import { setPostsList } from '../../actions'

const PostComponent = ({content, title})=>{

  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)


  const [post, setPost] = useState({
    username: user.profile.username
  })

  const handleChange = (event)=>{
    const value = event.target.value
    setPost({...post,[event.target.name]: value})
  } 

  const handleSubmit = (event)=>{
    event.preventDefault()
    const fetchData = async () =>{
      await createNewPost(post)
      const postsList = await getPostsList()
      dispatch(setPostsList(postsList.results))
    }
 
  fetchData()
  }
  
  return(
    <div>
      <h3>What's on your mind?</h3>
      <form
        onSubmit={handleSubmit}
        role='postForm'>
        <label role='labeltext'>Title</label>
        <input
          type='text'
          value={title}
          name='title'
          placeholder='Hello world'
          onChange={handleChange}></input>
        <br/>
        <label role='labeltext'>Content</label>
        <textarea
          cols='30'
          rows='10'
          name='content'
          value={content}
          onChange={handleChange}
          placeholder='Content here'></textarea>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export { PostComponent }

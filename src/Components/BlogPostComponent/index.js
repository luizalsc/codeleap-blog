import { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
//import { setPostsList } from '../../actions'
import { createNewPost } from '../../services'


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
    }
    
  fetchData()
  }

  // const fetchPosts = async () => {
  //   const postsList = await getPostsList()
  //   dispatch(setPostsList(postsList.results))
  // }
  // fetchPosts()

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
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { editPost, getPostsList } from '../../../services'
import { setPostsList, showEditModal } from '../../../actions'

const EditModal = ({title, content}) => {

  const dispatch = useDispatch()
  const status = useSelector((state)=>state.editStatus.status)
  const id = useSelector((state)=>state.editStatus.id)
  
  const [post, setPost] = useState({})

  const handleChange = (event)=>{
    const value = event.target.value
    setPost({...post,[event.target.name]: value})
  }

  const handleClose = ()=>{
    dispatch(showEditModal(false))
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    const fetchData = async () =>{
      await editPost(id, post)
      const postsList = await getPostsList()
      dispatch(setPostsList(postsList.results))
    }
 
  fetchData()
  handleClose()
  }

  if(!status){
    return null
  }

  return(
    <div className='modal' onClick={handleClose}>
      <div onClick={e => e.stopPropagation()}>
        <h3>Edit Item</h3>
        <form onSubmit={handleSubmit}>
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
          <button onClick={handleClose}>Cancel</button>
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export { EditModal }
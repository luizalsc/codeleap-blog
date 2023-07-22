import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { editPost, getPostsList } from '../../../services'
import { setPostsList, showEditModal } from '../../../actions'

const EditModal = ({title, content}) => {

  const dispatch = useDispatch()
  const status = useSelector((state)=>state.editStatus.status)
  const id = useSelector((state)=>state.editStatus.id)
  const offset = useSelector((state)=>state.offset)
  
  const [post, setPost] = useState({})

  const handleChange = (event)=>{
    const value = event.target.value
    setPost({...post,[event.target.name]: value})
  }

  const handleClose = ()=>{
    dispatch(showEditModal({status: false}))
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    const fetchData = async () =>{
      await editPost(id, post)
      const postsList = await getPostsList(offset)
      dispatch(setPostsList(postsList.results))
    }
 
  fetchData()
  handleClose()
  }

  if(!status){
    return null
  }

  return(
    <div className='edit-modal' onClick={handleClose}>
      <div className='edit-modal-content' onClick={e => e.stopPropagation()}>
        <h3 className='header'>Edit Item</h3> 
        <form onSubmit={handleSubmit} className='form'>
          <label role='labeltext' className='label'>Title</label>
          <input
            type='text'
            value={title}
            name='title'
            placeholder='Hello world'
            onChange={handleChange}
            className='input-field'></input>
            <br/>
          <label role='labeltext' className='label'>Content</label>
          <textarea
            cols='30'
            rows='10'
            name='content'
            value={content}
            onChange={handleChange}
            placeholder='Content here'
            className='input-field'>
          </textarea>
          <div className='buttons-container'>
            <button onClick={handleClose} className='button'>Cancel</button>
            <button type='submit' className='button save'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { EditModal }
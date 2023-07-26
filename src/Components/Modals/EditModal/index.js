import './editModal.css'
import { Button } from '../../Button'
import { PostForm } from '../../PostForm'
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

  function handleClose (status){
    dispatch(showEditModal({status: status}))
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    const fetchData = async () =>{
      await editPost(id, post)
      const postsList = await getPostsList(offset)
      dispatch(setPostsList(postsList.results))
    }
    fetchData()
    handleClose(false)
  }

  if(!status){
    return null
  }

  return(
    <div className='edit-modal' data-testid='edit-modal' onClick={()=>{handleClose(false)}}>
      <div className='edit-modal-content' onClick={e => e.stopPropagation()}>
        <h3 className='header'>Edit Item</h3> 
        <form
          onSubmit={handleSubmit} className='form'>
          <PostForm content={content} title={title} handleChange={handleChange}/>
          <div className='edit-buttons-container'>
            <Button onClick={()=>{handleClose(false)}} className='button'>Cancel</Button>
            <Button type='submit' className='button save'>Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { EditModal }
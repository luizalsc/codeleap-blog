import './index.css'
import { deletePost, getPostsList } from "../../../services"
import { useDispatch, useSelector } from "react-redux"
import { setPostsList, showDeleteModal } from "../../../actions"

const DeleteModal = ()=>{
  const dispatch = useDispatch()
  const status = useSelector((state)=>state.deleteStatus.status)
  const id = useSelector((state)=>state.deleteStatus.id)
  const offset = useSelector((state)=>state.offset)

  const handleClose = ()=>{
    dispatch(showDeleteModal({status: false}))
  }

  const handleDelete = ()=>{
    const fetchData = async()=>{
      await deletePost(id)
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
    <div className='modal' onClick={handleClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <h3>Are you sure you want to delete this item?</h3>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export { DeleteModal }
import './PostListItem.css'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faX} from '@fortawesome/free-solid-svg-icons'
import { 
  showEditModal, 
  showDeleteModal, 
} from '../../actions'
import { DeleteModal } from '../Modals/DeleteModal'
import { EditModal } from '../Modals/EditModal'
import moment from 'moment'

const Posts = ({username, id, dateTime, content, title}) =>{
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  function handleDelete(id){
    dispatch(showDeleteModal({status: true, id: id}))
  } 

  function handleEdit (id){
      dispatch(showEditModal({status: true, id: id}))
  } 

  return(
    <li className='list-item'>
      <div className='item-menu'>
        <h3 className='header'>{title}</h3>
        {user.profile.username === username ? 
          <div className='buttons'>
            <button onClick={()=>{handleDelete(id)}} className='button delete'>
              <span><FontAwesomeIcon icon={faX} className='icon x-icon'/> </span>
              <span><FontAwesomeIcon icon={faTrash} className='icon'/></span>
            </button>
              <DeleteModal/>
            <button onClick={()=>{handleEdit(id)}} className='button'>
              <span><FontAwesomeIcon icon={faPenToSquare} className='icon'/></span>
            </button>
            <EditModal/>
          </div> : 
            <></>}
      </div>
      <div className='author'>
        <p>@{username}</p>
        <p className='datetime'>{moment(new Date(dateTime)).fromNow()}</p>
      </div>
      <div className='content'>
        <p>{content}</p>
      </div>
    </li>
  )
}

export {Posts}
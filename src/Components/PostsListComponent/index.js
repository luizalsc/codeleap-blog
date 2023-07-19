import { useDispatch, useSelector } from 'react-redux'
import { getPostsList, deletePost } from '../../services'
import { useEffect } from 'react'
import { setPostsList, showEditModal, showDeleteModal } from '../../actions'
import { EditModal } from '../Modals/EditModal'
import { DeleteModal } from '../Modals/DeleteModal'

const PostsList = () =>{
  const dispatch = useDispatch()
  const posts = useSelector((state)=>state.posts)
  const user = useSelector((state)=>state.user)

  useEffect(()=>{
    const fetchData = async()=>{
      const postsList = await getPostsList()
      dispatch(setPostsList(postsList.results))
    } 
    fetchData()
  }, [])

  const handleDelete = (event)=>{
    const id = event.target.value
    dispatch(showDeleteModal({status: true, id: id}))
  } 

  const handleEdit = (event)=>{
      const id = event.target.value
      dispatch(showEditModal({status: true, id: id}))
  } 
  
  if(posts.length === 0) {
    return (<></>)
  }else{
    return(
      <div>
        <ul>
          {posts.map((post, index) => (
            <li key={`${post.title}-${index}`}>
              <h3>{post.title}</h3>
              {user.profile.username === post.username ? 
                <div>
                  <button onClick={handleDelete} value={post.id}>delete</button>
                  <DeleteModal/>
                  <button onClick={handleEdit} value={post.id}>edit</button>
                  <EditModal/>
                </div> : 
                  <></>}
              <p>@{post.username}</p>
              <p>creation data</p>
              <p>{post.content}</p>
            </li>))
          }       
        </ul>
      </div>
    )
  }
}

export { PostsList }

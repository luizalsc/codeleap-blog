import { useDispatch, useSelector } from 'react-redux'
import { getPostsList } from '../../services'
import { useEffect } from 'react'
import { setPostsList, showEditModal, showDeleteModal, setOffsetNumber } from '../../actions'
import { EditModal } from '../Modals/EditModal'
import { DeleteModal } from '../Modals/DeleteModal'
import moment from 'moment'

const PostsList = () =>{
  const dispatch = useDispatch()
  const posts = useSelector((state)=>state.posts)
  const user = useSelector((state)=>state.user)
  let offset = useSelector((state)=>state.offset)

  useEffect(()=>{
    const fetchData = async()=>{
      const postsList = await getPostsList(offset)
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

  const handleViewNext = ()=>{
    offset = offset + 10
    dispatch(setOffsetNumber(offset))
 
    const fetchData = async () =>{
      const postsList = await getPostsList(offset)
      dispatch(setPostsList(postsList.results))
    }
    fetchData()
  }

  const handleViewPrevious = (event)=>{
  
    offset = offset - 10
    dispatch(setOffsetNumber(offset))

    const fetchData = async () =>{
      const postsList = await getPostsList(offset)
      dispatch(setPostsList(postsList.results))
    }
    fetchData()
  }

  
  if(posts.length === 0) {
    return (<></>)
  }else{
    return(
      <div id='container'>
        <button onClick={handleViewPrevious} disabled={offset === 0 ? true : false}>
          <a href='#container'>Previous</a>
        </button>
        <button onClick={handleViewNext}>
          <a href='#container'>Next</a>
        </button>
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
              <p>{moment(new Date(post.created_datetime)).fromNow()}</p>
              <p>{post.content}</p>
            </li>))
          }       
        </ul>
        <button onClick={handleViewPrevious} disabled={offset === 0 ? true : false}>
          <a href='#container'>Previous</a>
        </button>
        <button onClick={handleViewNext}>
          <a href='#container'>Next</a>
        </button>
      </div>
    )
  }
}

export { PostsList }

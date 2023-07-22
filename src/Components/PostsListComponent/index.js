import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsList } from '../../services'
import { useEffect, useState } from 'react'
import { setPostsList, showEditModal, showDeleteModal, setOffsetNumber, showMorePosts } from '../../actions'
import { EditModal } from '../Modals/EditModal'
import { DeleteModal } from '../Modals/DeleteModal'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'

const PostsList = () =>{
  const dispatch = useDispatch()
  const posts = useSelector((state)=>state.posts)
  const user = useSelector((state)=>state.user)
  let offset = useSelector((state)=>state.offset)

  const [hasMore, setHasMore] = useState(true)

  useEffect(()=>{
    const fetchData = async()=>{
      const postsList = await getPostsList(offset)
      dispatch(setPostsList(postsList.results))
    } 
    fetchData()
  }, [])

  function handleDelete(id){
    dispatch(showDeleteModal({status: true, id: id}))
  } 

  function handleEdit (id){
      dispatch(showEditModal({status: true, id: id}))
  } 

  const handleViewNext = ()=>{
    offset = offset + 10
    dispatch(setOffsetNumber(offset))
    const fetchData = async () =>{
      const postsList = await getPostsList(offset)
      dispatch(showMorePosts(postsList.results))
      if( posts.length === postsList.count ){
        setHasMore(false)
      }
    }
    fetchData()
  }


  if(posts.length === 0) {
    return (<></>)
  }else{
    return(
      <div id='container'>
        <InfiniteScroll dataLength={posts.length} next={handleViewNext} hasMore={hasMore} loader={<p>Loading...</p>}>
          <ul>
            {posts.map((post, index) => (
              <li key={`${post.id}-${index}`} className='list-item'>
                <div className='item-menu'>
                  <h3 className='header'>{post.title}</h3>
                  {user.profile.username === post.username ? 
                    <div className='buttons'>
                      <button onClick={()=>{handleDelete(post.id)}} className='button'>
                        <span><FontAwesomeIcon icon={faTrash} className='icon'/></span>
                      </button>
                      <DeleteModal/>
                      <button onClick={()=>{handleEdit(post.id)}} value={post.id} className='button'><span><FontAwesomeIcon icon={faPenToSquare} className='icon'/></span></button>
                      <EditModal/>
                    </div> : 
                      <></>}
                </div>
                <div className='author'>
                  <p>@{post.username}</p>
                  <p className='datetime'>{moment(new Date(post.created_datetime)).fromNow()}</p>
                </div>
                <div className='content'>
                  <p>{post.content}</p>
                </div>
              </li>))
            }       
          </ul>
        </InfiniteScroll>
        <button>
          <a href='#container'>Voltar ao topo</a>
        </button>
      </div>
    )
  }
}

export { PostsList }

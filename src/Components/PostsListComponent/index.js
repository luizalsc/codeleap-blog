import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsList, getMorePosts } from '../../services'
import { useEffect, useState } from 'react'
import { 
  setPostsList, 
  setOffsetNumber, 
  showMorePosts 
} from '../../actions'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Posts } from '../PostListItem'

const PostsList = () =>{
  const dispatch = useDispatch()
  const posts = useSelector((state)=>state.posts)
  let offset = useSelector((state)=>state.offset)

  const [hasMore, setHasMore] = useState(true)

  useEffect(()=>{
    const fetchData = async()=>{
      const postsList = await getPostsList(offset)
      dispatch(setPostsList(postsList.results))
    } 
    fetchData()
  }, [])

  const handleViewNext = ()=>{
    offset = offset + 10
    dispatch(setOffsetNumber(offset))
    const fetchData = async () =>{
      const postsList = await getMorePosts(offset)
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
              <Posts key={`${post.id}-${index}`} username={post.username} id={post.id} dateTime={post.created_datetime} content={post.content} title={post.title}></Posts>
              ))
            }       
          </ul>
        </InfiniteScroll>
      </div>
    )
  }
}

export { PostsList }

{/* <li key={`${post.id}-${index}`} className='list-item'>
                <div className='item-menu'>
                  <h3 className='header'>{post.title}</h3>
                  {user.profile.username === post.username ? 
                    <div className='buttons'>
                      <button onClick={()=>{handleDelete(post.id)}} className='button'>
                        <span><FontAwesomeIcon icon={faTrash} className='icon'/></span>
                      </button>
                      <DeleteModal/>
                      <button onClick={()=>{handleEdit(post.id)}} className='button'><span><FontAwesomeIcon icon={faPenToSquare} className='icon'/></span></button>
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
              </li> */}
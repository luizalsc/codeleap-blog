import { useDispatch, useSelector } from 'react-redux'
import { getPostsList } from '../../services'
import { useEffect, useState } from 'react'
import { setPostsList } from '../../actions'

const PostsList = () =>{
  const dispatch = useDispatch()
  const posts = useSelector((state)=>state.posts)

  useEffect(()=>{
    const fetchData = async()=>{
      const postsList = await getPostsList()
      dispatch(setPostsList(postsList.results))
    } 
    fetchData()
  }, [])

  const user = useSelector((state)=>state.user)

  if(posts.length === 0) {
    return (<></>)
  }else{
    return(
      <div>
        <ul>
          {posts.map((post, index) => (
            <li key={`${post.title}-${index}`}>
              <h3>{post.title}</h3>
              {user.profile.username === post.username ? <div><button>'delete'</button><p>'edit'</p></div> : <></>}
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

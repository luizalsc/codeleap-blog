import { useSelector } from 'react-redux'
import { deletePost } from '../../services'
import { getPostsList } from '../../services'
import { useEffect, useState } from 'react'

const PostsList = () =>{

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      const postsList = await getPostsList()
      setPosts([...postsList.results])
      console.log(posts)
    } 
    fetchData()
  }, [])

  // const fetchPosts = async () => {
  //   const postsList = await getPostsList()
  //   dispatch(setPostsList(postsList.results))
  //   return
  // }
  // fetchPosts()
  
  //const postList = useSelector((state) => state.posts)
  //console.log(postList)

  const user = useSelector((state)=>state.user)

  // const handleClick = (id)=>{
  //   const fetchData = async () =>{
  //     await deletePost(id) 
  //   }
  //   fetchData()
  // }
  
 
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
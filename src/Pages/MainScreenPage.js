import { PostComponent } from '../Components/BlogPostComponent'
import { Navbar } from '../Components/NavBar'
import { PostsList } from '../Components/PostsListComponent'

function MainScreenPage (){
  return(
    <>
      <Navbar />
      <PostComponent />
      <PostsList />
    </>
  )
}

export { MainScreenPage }
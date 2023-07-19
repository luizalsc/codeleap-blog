async function createNewPost (post){

  const response = await fetch('https://dev.codeleap.co.uk/careers/', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return (await response.json())
}

async function getPostsList(){
  const response = await fetch('https://dev.codeleap.co.uk/careers/')
  return (await response.json())
}

async function deletePost(postId){
  await fetch(`https://dev.codeleap.co.uk/careers/${postId}/`, {
    method: 'DELETE'
    })
}

async function editPost(postId, post){
  const response = await fetch(`https://dev.codeleap.co.uk/careers/${postId}/`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: post.title,
      content: post.content
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    const editedPost = await response.json()
    return (editedPost)
}

export { createNewPost, getPostsList, deletePost, editPost }
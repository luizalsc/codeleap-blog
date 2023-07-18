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
  const response = await fetch(`https://dev.codeleap.co.uk/careers/${postId}`)
  return (await response.json())
}

export { createNewPost, getPostsList, deletePost }
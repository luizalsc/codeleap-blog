import reducer from './index'
import {
  login,
  loginStatus,
  showDeleteModal,
  showEditModal,
  setOffsetNumber,
  setPostsList,
  showMorePosts
} from '../../actions'

describe('reducer', ()=>{
  const userInitialState = {}
  const postsInitialState = []
  const offsetInitialState = 10
  const editStatustInitialState = false
  const deleteStatustInitialState = false

  const initialState =
  {
    user: userInitialState,
    posts: postsInitialState,
    editStatus: editStatustInitialState,
    deleteStatus: deleteStatustInitialState,
    offset: offsetInitialState
  }

  it('returns the initial state', ()=>{
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('handles the login', ()=>{

    const username = {username: 'Ana'}
    const expectedState = {
      user: {profile:{username: 'Ana'}},
      posts: postsInitialState,
      editStatus: editStatustInitialState,
      deleteStatus: deleteStatustInitialState,
      offset: offsetInitialState
    }

    expect(reducer(initialState, login(username))).toEqual(expectedState)
  })

  it('handles the login status', ()=>{

    const status = true
    const expectedState = {
      user: {status: true},
      posts: postsInitialState,
      editStatus: editStatustInitialState,
      deleteStatus: deleteStatustInitialState,
      offset: offsetInitialState
    }

    expect(reducer(initialState, loginStatus(status))).toEqual(expectedState)
  })

  it('handles the posts list', ()=>{

    const posts = [
      {title: 'Title 1', content: 'Lorem Ipsum', username: 'Ana', id: 6399}, 
      {title: 'Title 2', content: 'Dolor sit amet', username: 'John', id: 6400}, 
      {title: 'Title 3', content: 'Consectetur adipiscing elit', username: 'John', id: 6401}
    ]
    const expectedState = {
      user: userInitialState,
      posts: [
        {title: 'Title 1', content: 'Lorem Ipsum', username: 'Ana', id: 6399}, 
        {title: 'Title 2', content: 'Dolor sit amet', username: 'John', id: 6400}, 
        {title: 'Title 3', content: 'Consectetur adipiscing elit', username: 'John', id: 6401}
      ],
      editStatus: editStatustInitialState,
      deleteStatus: deleteStatustInitialState,
      offset: offsetInitialState
    }

    expect(reducer(initialState, setPostsList(posts))).toEqual(expectedState)
  })

  it('handles show more posts', ()=>{

    const postsList = [
      {title: 'Title 1', content: 'Lorem Ipsum', username: 'Ana', id: 6399}, 
      {title: 'Title 2', content: 'Dolor sit amet', username: 'John', id: 6400}, 
      {title: 'Title 3', content: 'Consectetur adipiscing elit', username: 'John', id: 6401}
    ]

    const currentState = {
      user: userInitialState,
      posts: postsList,
      editStatus: editStatustInitialState,
      deleteStatus: deleteStatustInitialState,
      offset: offsetInitialState
    }
    
    const newposts = [
      {title: 'Title 4', content: 'Mauris suscipit', username: 'Ana', id: 6402}, 
      {title: 'Title 5', content: 'Non magna in auctor', username: 'John', id: 6403}, 
      {title: 'Title 6', content: 'Ut pulvinar enim eu tellus', username: 'John', id: 6404}
    ]

    const expectedState = {
      user: userInitialState,
      posts: [...postsList, ...newposts],
      editStatus: editStatustInitialState,
      deleteStatus: deleteStatustInitialState,
      offset: offsetInitialState
    }

    expect(reducer(currentState, showMorePosts(newposts))).toEqual(expectedState)
  })

  it('handles show delete modal', ()=>{

    const status = true
    const expectedState = {
      user: userInitialState,
      posts: postsInitialState,
      editStatus: editStatustInitialState,
      deleteStatus: true,
      offset: offsetInitialState
    }

    expect(reducer(initialState, showDeleteModal(status))).toEqual(expectedState)
  })

  it('handles show edit modal', ()=>{

    const status = true
    const expectedState = {
      user: userInitialState,
      posts: postsInitialState,
      editStatus: true,
      deleteStatus: deleteStatustInitialState,
      offset: offsetInitialState
    }

    expect(reducer(initialState, showEditModal(status))).toEqual(expectedState)
  })

  it('handles increase offset number', ()=>{

    const offset = 10
    const expectedState = {
      user: userInitialState,
      posts: postsInitialState,
      editStatus: editStatustInitialState,
      deleteStatus: deleteStatustInitialState,
      offset: 10
    }

    expect(reducer(initialState, setOffsetNumber(offset))).toEqual(expectedState)
  })

})
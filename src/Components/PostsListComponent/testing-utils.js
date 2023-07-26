import configureStore from 'redux-mock-store'

function createMockStore (){
  const mockStore = configureStore({})
  const store = mockStore({
    user: {status: true, profile: {username: 'Ana'}},
    posts: [
        {title: 'Title 1', content: 'Lorem Ipsum', username: 'Ana', id: 6399}, 
        {title: 'Title 2', content: 'Dolor sit amet', username: 'John', id: 6400}, 
        {title: 'Title 3', content: 'Consectetur adipiscing elit', username: 'John', id: 6401}
      ],
    editStatus: false,
    deleteStatus: false,
    offset: 0
  })
  return store
}
export { createMockStore }
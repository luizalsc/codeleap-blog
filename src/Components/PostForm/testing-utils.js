import configureStore from 'redux-mock-store'

function createMockStore (){
  const mockStore = configureStore({})
  const store = mockStore({
    user: {status: true, profile: {username: 'Ana'}}
  })
  return store
}
export { createMockStore }
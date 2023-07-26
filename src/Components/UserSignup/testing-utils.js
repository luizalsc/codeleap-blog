import configureStore from 'redux-mock-store'

function createMockStore (){
  const mockStore = configureStore([])
  const store = mockStore({})
  return store
}
export { createMockStore }
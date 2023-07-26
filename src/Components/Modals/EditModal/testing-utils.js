import configureStore from 'redux-mock-store'

function createMockStore (){
  const mockStore = configureStore({})
  const store = mockStore({
    editStatus: {status: true, id: 6399}
  })
  return store
}
export { createMockStore }
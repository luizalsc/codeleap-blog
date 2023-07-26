import { EditModal } from '.'
import { render, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { createMockStore } from './testing-utils'
import { Provider } from 'react-redux'
import userEvent from "@testing-library/user-event"
import { editPost, getPostsList } from '../../../services'

jest.mock('../../../services', ()=>({
  editPost: jest.fn(),
  getPostsList: jest.fn()
}))

afterEach(()=>{
  editPost.mockReset()
  getPostsList.mockReset()
})

describe('Renders the EditModal component correctly', ()=>{

  it('renders when status is true', ()=>{
    const store = createMockStore()

    render(
      <Provider store={store}>
        <EditModal/>
      </Provider>
    )   
    
    const buttonsElements = screen.getAllByRole('button')

    expect(buttonsElements).toHaveLength(2)
  })


  it('edits the post and close modal when clicking the save button', async()=> {
    const store = createMockStore()
    const testTitle = 'New Title'
    const testContent = 'Lorem Ipsum dolor sit amet'
    editPost.mockResolvedValueOnce({
      status: 'OK',
      data: {title: 'New Title', content: 'Lorem Ipsum dolor sit amet', username: 'Ana', id: 6399}
    })
    getPostsList.mockResolvedValueOnce({
      status: 'OK', results: {data:  [
        {title: 'New Title', content: 'Lorem Ipsum dolor sit amet', username: 'Ana', id: 6399},
        {title: 'Title 2', content: 'Dolor sit amet', username: 'John', id: 6400},
        {title: 'Title 3', content: 'Consectetur adipiscing elit', username: 'John', id: 6401}
      ]}
    })

    render(
      <Provider store={store}>
        <EditModal />
      </Provider>
    )   

    const saveButtonElement = screen.getByRole('button', {name:/save/i})
    const inputTitleElement = screen.getByPlaceholderText(/Hello world/i)
    const inputContentElement = screen.getByPlaceholderText(/Content here/i)
    const actions = store.getActions()

    act(()=>{
      userEvent.type(inputTitleElement, testTitle)
      userEvent.type(inputContentElement, testContent)
    })

    act(()=>{
      userEvent.click(saveButtonElement)
    })
    await act(async () => {await Promise.resolve()})
    
    expect(editPost).toBeCalled()
    expect(editPost).toHaveBeenCalledWith(6399, {title: testTitle, content: testContent})
    expect(getPostsList).toBeCalled()
    expect(actions[0]).toEqual({payload: {status: false}, type: 'SHOW_EDIT_MODAL'})
  })

  it('closes the modal when clicking outside', ()=>{
    const store = createMockStore()
    const actions = store.getActions()

    render(
      <Provider store={store}>
        <EditModal />
      </Provider>
      )   
    
    const externalDivElement = screen.getByTestId('edit-modal')

    act(()=>{
      userEvent.click(externalDivElement)
    })

    expect(actions[0]).toEqual({payload: {status: false}, type: 'SHOW_EDIT_MODAL'})
  })

  it('closes the modal by clicking the cancel button', ()=>{
    const store = createMockStore()
    const actions = store.getActions()
    getPostsList.mockResolvedValueOnce({
      status: 'OK', results: {data: store.getState().posts}
    })

    render(
      <Provider store={store}>
        <EditModal />
      </Provider>
    )

    const cancelButtonElement = screen.getByRole('button', {name:/cancel/i})
   
    act(()=>{
      userEvent.click(cancelButtonElement)
    })

    expect(actions[0]).toEqual({payload: {status: false}, type: 'SHOW_EDIT_MODAL'})
  })

  it('does not render when status is false', ()=>{
    const store = createMockStore()
    store.getState().editStatus = false

    const { container } = render(<Provider store={store}><EditModal /></Provider>)   

    expect(container).toBeEmptyDOMElement()
  })
})
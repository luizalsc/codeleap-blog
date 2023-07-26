import { DeleteModal } from '.'
import { render, act, screen } from '@testing-library/react'
import { createMockStore } from './testing-utils'
import { Provider } from 'react-redux'
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'
import { deletePost, getPostsList } from '../../../services'

jest.mock('../../../services', ()=>({
  deletePost: jest.fn(),
  getPostsList: jest.fn()
}))

afterEach(()=>{
  deletePost.mockReset()
  getPostsList.mockReset()
})

describe('Renders the DeleteModal component correctly', ()=>{

  it('renders when status is true', ()=>{
    const store = createMockStore()

    render(
      <Provider store={store}>
        <DeleteModal/>
      </Provider>
    )   
    
    const buttonsElement = screen.getAllByRole('button')

    expect(buttonsElement).toHaveLength(2)
  })

  it('closes the modal when clicking outside', ()=>{
    const store = createMockStore()
    const actions = store.getActions()

    render(
      <Provider store={store}>
        <DeleteModal />
      </Provider>
      )   
    
    const externalDivElement = screen.getByTestId('modal')

    act(()=>{
      userEvent.click(externalDivElement)
    })

    expect(actions[0]).toEqual({payload: {status: false}, type: 'SHOW_DELETE_MODAL'})
  })

  it('closes the modal when clicking the cancel button', ()=>{
    const store = createMockStore()
    const actions = store.getActions()

    render(
      <Provider store={store}>
        <DeleteModal />
      </Provider>
    )   

    const cancelButtonElement = screen.getByRole('button', {name:/Cancel/i})

    act(()=>{
      userEvent.click(cancelButtonElement)
    })

    expect(actions[0]).toEqual({payload: {status: false}, type: 'SHOW_DELETE_MODAL'})
  })

  it('deletes the post and close modal when clicking the delete button', async ()=>{
    const store = createMockStore()
    const actions = store.getActions()
    deletePost.mockResolvedValueOnce({
      status: 'OK',
      data: {}
    })
    getPostsList.mockResolvedValueOnce({
      status: 'OK', data: [
        {title: 'Title 2', content: 'Dolor sit amet', username: 'John', id: 6400},
        {title: 'Title 3', content: 'Consectetur adipiscing elit', username: 'John', id: 6401}
      ]
    })

    render(
      <Provider store={store}>
        <DeleteModal />
      </Provider>
    )   
    const deleteButtonElement = screen.getByRole('button', {name:/Delete/i})

    act(()=>{
      userEvent.click(deleteButtonElement)
    })

    await act(async () => {await Promise.resolve()})

    expect(deletePost).toBeCalled()
    expect(deletePost).toBeCalledWith(6399)
    expect(getPostsList).toBeCalled()
    expect(actions[0]).toEqual({payload: {status: false}, type: 'SHOW_DELETE_MODAL'})
  })

  it('does not render when status is false', ()=>{
    const store = createMockStore()
    store.getState().deleteStatus = false

    const { container } = render(<Provider store={store}><DeleteModal/></Provider>)   

    expect(container).toBeEmptyDOMElement()
  })
})
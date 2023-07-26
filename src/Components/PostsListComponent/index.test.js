import { PostsList } from "."
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMockStore } from "./testing-utils"

describe('Renders PostsList component correctly', ()=>{
  it('renders existent posts when loaded', ()=>{
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PostsList />
      </Provider>
    )

    const listItemElement = screen.getAllByRole('listitem')
    const titleELement = screen.getByText(/Title 2/i)

    expect(listItemElement).toHaveLength(3)
    expect(titleELement).toBeInTheDocument()
  })

  it('shows the edit and delete buttons correctly', ()=>{
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PostsList />
      </Provider>
    )

    const buttonElement = screen.getAllByRole('button')

    expect(buttonElement).toHaveLength(2)
  })

  it('dispatches the edit modal action when button is clicked', ()=>{
    const store = createMockStore()
    const actions = store.getActions()

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostsList />
        </BrowserRouter>
      </Provider>
    )

    const buttonElement = screen.getAllByRole('button')
    const editButton = buttonElement[1]
    
    act(()=>{
      userEvent.click(editButton)
    })

    expect(actions[0]).toEqual({ type: 'SHOW_EDIT_MODAL', payload: { status: true, id: 6399} })
  })

  it('dispatches the delete modal action when button is clicked', ()=>{
    const store = createMockStore()
    const actions = store.getActions()

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostsList />
        </BrowserRouter>
      </Provider>
    )

    const buttonElement = screen.getAllByRole('button')
    const deleteButton = buttonElement[0]

    act(()=>{
      userEvent.click(deleteButton)
    })

    expect(actions[0]).toEqual({ type: 'SHOW_DELETE_MODAL', payload: { status: true, id: 6399} })
  })
})
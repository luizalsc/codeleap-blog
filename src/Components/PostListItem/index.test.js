import { Posts } from './index'
import { Provider } from "react-redux"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMockStore } from "./testing-utils"


describe('Renders Pots correctly',()=>{
  it('renders post when loaded', ()=>{
    const store = createMockStore()
    const post = store.getState().posts[0]

    render(
      <Provider store={store}>
        <Posts
          username={post.username}
          id={post.id}
          content={post.content}
          title={post.title}/>
      </Provider>
    )

    const titleELement = screen.getByText(/Title 1/i)
    const contentElement = screen.getByText(/Lorem Ipsum/i)
    const usernameElement = screen.getByText(/Ana/i)

    expect(titleELement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
    expect(usernameElement).toBeInTheDocument()
  })

  it('shows the edit and delete buttons when the user is the post author', ()=>{
    const store = createMockStore()
    const post = store.getState().posts[0]

    render(
      <Provider store={store}>
        <Posts
          username={post.username}
          id={post.id}
          content={post.content}
          title={post.title}/>
      </Provider>
    )

    const buttonElement = screen.getAllByRole('button')

    expect(buttonElement).toHaveLength(2)
  })

  it('does not show the edit and delete buttons when the user is not the post author', ()=>{
    const store = createMockStore()
    const post = store.getState().posts[1]

    render(
      <Provider store={store}>
        <Posts
          username={post.username}
          id={post.id}
          content={post.content}
          title={post.title}/>
      </Provider>
    )
    
    const buttonsElements = screen.queryAllByRole('button')

    expect(buttonsElements).toHaveLength(0)
  })

  it('dispatches the edit modal action when button is clicked', ()=>{
    const store = createMockStore()
    const actions = store.getActions()
    const post = store.getState().posts[0]

    render(
      <Provider store={store}>
        <Posts
          username={post.username}
          id={post.id}
          content={post.content}
          title={post.title}/>
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
    const post = store.getState().posts[0]

    render(
      <Provider store={store}>
        <Posts
          username={post.username}
          id={post.id}
          content={post.content}
          title={post.title}/>
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
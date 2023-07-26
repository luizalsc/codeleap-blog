import { PostForm } from "."
import { createMockStore } from "./testing-utils"
import { screen, render, act } from "@testing-library/react"
import { Provider } from "react-redux"
import userEvent from "@testing-library/user-event"

describe('Renders the PostForm corectly',()=>{
  it('renders the component correctly before user events', ()=>{
    const store = createMockStore()
    
    render(
      <Provider store={store}> 
          <PostForm /> 
      </Provider>
    )
    
    const titleInputElement = screen.getByPlaceholderText(/Hello world/i)
    const contentInputElement = screen.getByPlaceholderText(/Content here/i)

    expect(titleInputElement).toBeInTheDocument()
    expect(contentInputElement).toBeInTheDocument()

  })

  it('changes the input value after user type', ()=>{
    const store = createMockStore()
    const title = 'Title 3'
    const content = 'Consectetur adipiscing elit'
    
    render(
      <Provider store={store}>
          <PostForm />
      </Provider>
    )

    const titleInputElement = screen.getByPlaceholderText(/Hello world/i)
    const contentInputElement = screen.getByPlaceholderText(/Content here/i)

    act(()=>{
      userEvent.type(titleInputElement, title)
      userEvent.type(contentInputElement, content)
    })
    
    expect(titleInputElement.value).toEqual('Title 3')
    expect(contentInputElement.value).toEqual('Consectetur adipiscing elit')
  })
})
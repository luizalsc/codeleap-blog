import { render, screen } from "@testing-library/react"
import { createMockStore } from "./testing-utils"
import { Provider } from "react-redux"
import { PostComponent } from "."
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { getPostsList, createNewPost } from "../../services"

jest.mock('../../services', ()=>({
  createNewPost: jest.fn(),
  getPostsList: jest.fn()
}))

afterEach(()=>{
  createNewPost.mockReset()
  getPostsList.mockReset()
})

describe('Renders the Post Component correctly', ()=>{
  it('renders the component correctly before user events', ()=>{
    const store = createMockStore()
    
    render(
      <Provider store={store}> 
          <PostComponent /> 
      </Provider>
    )

    const formElement = screen.getByRole(/postform/i)
    const titleInputElement = screen.getByPlaceholderText(/Hello world/i)
    const contentInputElement = screen.getByPlaceholderText(/Content here/i)
    const buttonElement = screen.getByRole('button', {name: /Create/i})

    expect(formElement).toBeInTheDocument()
    expect(titleInputElement).toBeInTheDocument()
    expect(contentInputElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeDisabled()
  })

  it('changes the input value after user type', ()=>{
    const store = createMockStore()
    const title = 'Title 3'
    const content = 'Consectetur adipiscing elit'
    
    render(
      <Provider store={store}>
          <PostComponent />
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

  it('fetches the posts list from api when clicking the button', async ()=>{
    const store = createMockStore()
    const actions = store.getActions()
    createNewPost.mockResolvedValueOnce({
      status: 'OK',
      data: {title: 'Title 3', content: 'Consectetur adipiscing elit', username: 'John', id: 6401}
    })
    getPostsList.mockResolvedValueOnce({
      status: 'OK', results: {data: [
        {title: 'Title 1', content: 'Lorem Ipsum', username: 'Ana', id: 6399}, 
        {title: 'Title 2', content: 'Dolor sit amet', username: 'John', id: 6400}
      ]}
    })
    const title = 'Title 3'
    const content = 'Consectetur adipiscing elit'
    
    render(
      <Provider store={store}>
          <PostComponent />
      </Provider>
    )

    const titleInputElement = screen.getByPlaceholderText(/Hello world/i)
    const contentInputElement = screen.getByPlaceholderText(/Content here/i)
    const buttonElement = screen.getByRole('button', {name: /Create/i})

    act(()=>{
      userEvent.type(titleInputElement, title)
      userEvent.type(contentInputElement, content)
    })

    await expect(buttonElement).not.toBeDisabled()

    act(()=>{userEvent.click(buttonElement)})
    await act(async () => {await Promise.resolve()})

    expect(createNewPost).toBeCalled()
    expect(createNewPost).toBeCalledWith({title: title , content: content})
    expect(getPostsList).toBeCalled()
  })
})
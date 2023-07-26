import { PostsList } from "."
import { Provider } from "react-redux"
import { render, screen } from "@testing-library/react"
import { createMockStore } from "./testing-utils"

describe('Renders PostsList component correctly', ()=>{
  it('renders existent posts list when loaded', ()=>{
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
})
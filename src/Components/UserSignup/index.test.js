import { render, screen } from "@testing-library/react";
import { createMockStore } from "./testing-utils";
import { Provider } from "react-redux";
import { SignupComponent } from ".";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('Renders Signup Component correctly', ()=>{
  it('renders the component before user events', ()=>{
    const store = createMockStore()
    store.getState().user = {}

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignupComponent />
        </BrowserRouter>
      </Provider>
    )

    const formElement = screen.getByRole('form')
    const inputFieldElement = screen.getByPlaceholderText(/John doe/i)
    const buttonElement = screen.getByRole('button', {name: /ENTER/i})

    expect(formElement).toBeInTheDocument()
    expect(inputFieldElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeDisabled()
  })

  it('changes the input value after user type', ()=>{
    const store = createMockStore()
    const username = 'Ana'

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignupComponent/>
        </BrowserRouter>
      </Provider>
    )

    const inputFieldElement = screen.getByPlaceholderText(/John doe/i)

    act(()=>{
      userEvent.type(inputFieldElement, username)
    })
    expect(inputFieldElement.value).toBe(username)
  })

  it('dispatches login and loginStatus actions when clicking the button', async () => {
    const store = createMockStore()
    const username = 'Ana'
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignupComponent/>
        </BrowserRouter>
      </Provider>
    )

    const inputFieldElement = screen.getByPlaceholderText(/John doe/i)
    const buttonElement = screen.getByRole('button', {name: /ENTER/i})
    const actions = store.getActions()

    act(()=>{
      userEvent.type(inputFieldElement, username)
    })
    
    await expect(buttonElement).not.toBeDisabled()

    act(()=>{
      userEvent.click(buttonElement)
    })
    
    expect(actions).toHaveLength(2)
    expect(actions[0]).toEqual({ type: 'LOGIN', payload: { username: 'Ana' } })
    expect(actions[1]).toEqual({ type: 'LOGIN_STATUS', payload: true })
  })

})
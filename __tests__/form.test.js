/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { fakePostData, fakeRejectResponse, renderForm } from '../src/utils'

// custom jest matchers
import '@testing-library/jest-dom'

function init(handleSubmit) {
  const user = userEvent.setup()
  renderForm(handleSubmit)

  expect(screen.getByRole('heading', { name: /login form/i })).toBeInTheDocument()

  const form = screen.getByTestId('form')
  const emailInput = screen.getByRole('textbox', { name: /email:/i })
  const passwordInput = screen.getByLabelText(/password:/i)
  const submitButton = screen.getByTestId('submit')

  return { user, emailInput, passwordInput, form, submitButton }
}

afterEach(() => (document.body.innerHTML = ``))

describe('Form', () => {
  it('should submit with correct filled inputs', async () => {
    const { user, emailInput, passwordInput, form, submitButton } = init(fakePostData)

    await user.type(emailInput, 'alex@mail.com')
    await user.type(passwordInput, '123')

    expect(emailInput).toHaveValue('alex@mail.com')
    expect(passwordInput).toHaveValue('123')
    expect(form).toBeValid()

    await user.click(submitButton)

    // change state & disable submit button
    expect(await screen.findByTestId('submit')).toHaveTextContent(/sending data.../i)
    expect(await screen.findByTestId('submit')).toBeDisabled()

    // success result
    await screen.findByText(/✅ success! data was sent!/i)

    // submit button have original state
    expect(submitButton).toHaveTextContent(/submit/i)

    // check on reset form & original focus
    expect(emailInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(emailInput).toHaveFocus()
  })

  it('should handle rejected response', async () => {
    const { user, emailInput, passwordInput, form, submitButton } = init(fakeRejectResponse)

    await user.type(emailInput, 'alex@mail.com')
    await user.type(passwordInput, '123')

    expect(form).toBeValid()

    await user.click(submitButton)

    // rejected result
    await screen.findByText(/⚠️ Something went wrong! Try again!/i)

    // check on unchanged form state
    expect(emailInput).toHaveValue('alex@mail.com')
    expect(passwordInput).toHaveValue('123')
  })

  it('should handle invalid email inputs', async () => {
    const { user, emailInput, form } = init(fakePostData)

    await user.type(emailInput, '   ')
    expect(emailInput).toBeInvalid()

    await user.clear(emailInput)
    await user.type(emailInput, '@mail.com')
    expect(emailInput).toBeInvalid()

    await user.clear(emailInput)
    await user.type(emailInput, 'alex@mail.')
    expect(emailInput).toBeInvalid()

    expect(form).toBeInvalid()
  })

  it('should handle invalid password inputs', async () => {
    const { user, passwordInput, form } = init(fakePostData)

    await user.type(passwordInput, '   ')
    expect(passwordInput).toBeInvalid()

    await user.clear(passwordInput)
    await user.type(passwordInput, '1  3')
    expect(passwordInput).toBeInvalid()

    await user.clear(passwordInput)
    await user.type(passwordInput, '123  ')
    expect(passwordInput).toBeInvalid()

    expect(form).toBeInvalid()
  })
})

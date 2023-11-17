// @ts-check

import { initForm } from '../modules/initForm'

export const fakeRejectResponse = data => {
  console.error(data)
  return Promise.reject('Reject Response')
}

export const fakePostData = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

export const renderForm = handleSubmit => {
  const formHTML = `
        <section class="form__section">
          <h1 class="form__title">Login Form</h1>

          <form data-testid="form" class="form__content">
            <div>
              <label for="email" class="form__label">Email:</label>
              <input
                class="form__input"
                autofocus
                autocomplete="email"
                required
                pattern=".+@[a-zA-Z0-9]{0,}.[a-zA-Z]{0,}"
                title="Example: alex@mail.com"
                placeholder="alex@mail.com"
                type="email"
                id="email"
                name="email"
              />
            </div>

            <div>
              <label for="password" class="form__label">Password:</label>
              <input
                class="form__input form__input-password"
                autocomplete="current-password"
                required
                pattern="[a-zA-Z0-9!@#$%^&*-_+.]{0,}"
                title="No empty password or whitespace!"
                placeholder="type your Password"
                type="password"
                id="password"
                name="password"
              />
              <label for="showPassword" class="form__label-showpassword">
                <input type="checkbox" name="showPassword" id="showPassword" />
                <span class="form__text-show-password">Show Password</span>
              </label>
            </div>

            <p>
              <small><a href="#" class="link js-linkForgotPassword">Forgot Password?</a></small>
            </p>
            <button data-testid="submit" type="submit" class="btn btn--primary">Submit</button>
          </form>
        </section>
        `

  const div = document.createElement('div')
  div.insertAdjacentHTML('afterbegin', formHTML)
  document.body.appendChild(div)

  initForm(div, handleSubmit)
}

/**
 * @param {Document|Element} container
 */
export function getFormElements(container) {
  const formSection = container.querySelector('.form__section')
  if (!formSection) throw new Error('Form Section does not exist!')

  const form = formSection.querySelector('form')
  if (!form) throw new Error('Form does not exist!')

  const linkForgotPassword = form.querySelector('.js-linkForgotPassword')
  if (!linkForgotPassword) throw new Error('linkForgotPassword does not exist!')

  const inputEmail = form.querySelector('#email')
  if (!(inputEmail instanceof HTMLInputElement)) {
    throw new Error('InputEmail is not Input!')
  }

  const inputPassword = form.querySelector('#password')
  if (!(inputPassword instanceof HTMLInputElement)) {
    throw new Error('InputPassword is not Input!')
  }

  const inputShowPassword = form.querySelector('#showPassword')
  if (!(inputShowPassword instanceof HTMLInputElement)) {
    throw new Error('InputShowPassword is not Input!')
  }

  const buttonSubmit = form.querySelector('button[type="submit"]')
  if (!(buttonSubmit instanceof HTMLButtonElement)) {
    throw new Error('Button Submit is not Button!')
  }

  return {
    linkForgotPassword,
    inputShowPassword,
    inputPassword,
    form,
    buttonSubmit,
    formSection,
    inputEmail,
  }
}

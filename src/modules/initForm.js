// @ts-check

/**
 * @param {Element|null} parentCont
 * @param {(data) => Promise} handleSubmit
 */
export const initForm = (parentCont, handleSubmit) => {
  const container = parentCont ?? document

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

  linkForgotPassword.addEventListener('click', evt => {
    evt.preventDefault()
    alert('Simulating Page Navigation to Restore password!')
  })

  inputShowPassword.addEventListener('change', evt => {
    const target = evt.target

    if (target instanceof HTMLInputElement) {
      if (target.checked) {
        inputPassword.type = 'text'
      } else {
        inputPassword.type = 'password'
      }
    }
  })

  form.addEventListener('submit', function (evt) {
    evt.preventDefault()

    buttonSubmit.disabled = true
    buttonSubmit.textContent = 'Sending Data...'
    formSection.querySelector('#message')?.remove()

    const pElem = document.createElement('p')
    pElem.setAttribute('id', 'message')
    formSection.insertAdjacentElement('beforeend', pElem)

    const data = new FormData(this)

    handleSubmit(data)
      .then(res => {
        pElem.textContent = '✅ Success! Data was sent!'
        pElem.classList.add('form__message--success')
        buttonSubmit.disabled = false
        buttonSubmit.textContent = 'SUBMIT'
        inputEmail.focus()
        this.reset()

        // only for results demonstration
        console.log(JSON.stringify(Object.fromEntries(res?.entries()), null, 2))
      })
      .catch(err => {
        pElem.textContent = '⚠️ Something went wrong! Try again!'
        pElem.classList.add('form__message--error')
        buttonSubmit.disabled = false
        buttonSubmit.textContent = 'SUBMIT'
        console.error(err)
      })
  })
}

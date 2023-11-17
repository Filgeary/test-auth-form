// @ts-check

import { getFormElements } from '../utils'

/**
 * @param {Element|null} parentCont
 * @param {(data) => Promise} handleSubmit
 */
export const initForm = (parentCont, handleSubmit) => {
  const container = parentCont ?? document

  const {
    linkForgotPassword,
    inputShowPassword,
    inputPassword,
    form,
    buttonSubmit,
    formSection,
    inputEmail,
  } = getFormElements(container)

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

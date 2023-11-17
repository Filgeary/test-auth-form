// @ts-check

import { initForm } from './modules/initForm'
import { postData } from './services/postData'

const app = () => {
  const initCont = document.querySelector('#initCont')
  if (!initCont) throw new Error('Initial Cont does not exist!')

  initForm(initCont, postData)
}

app()

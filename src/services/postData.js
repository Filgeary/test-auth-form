// @ts-check

export const postData = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

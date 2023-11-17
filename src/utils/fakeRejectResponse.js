// @ts-check

export const fakeRejectResponse = data => {
  console.error(data)
  return Promise.reject('Reject Response')
}

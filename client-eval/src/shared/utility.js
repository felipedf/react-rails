export const fetchGet = (endpoint) => {
  return window.fetch(endpoint)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const fetchPost = (endpoint, body) => {
  return window.fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
    .catch(error => console.log(error))
}

export const fetchDelete = (endpoint) => (
  window.fetch(endpoint, {
    method: 'DELETE'
  }).then(response => response.json())
    .catch(error => console.log(error))
)

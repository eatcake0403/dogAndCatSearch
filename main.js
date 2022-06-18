const origFetch = window.fetch
window.fetch = async (...args) => {
  try {
    return await origFetch(...args)
  } catch (err) {
    window.alert(err.message)
    throw err
  }
}

const baseURL = 'https://dog.ceo/api'

async function getBreeds () {
  const reqURL = `${baseURL}/breeds/list/all`
  const data = (await (await fetch(reqURL)).json()).message
  return data
}


async function fillBreeds (vals) {
  const element = document.querySelector('#breedsSelect')
  element.innerHTML = ''
  for (const val in vals) {
    const option = document.createElement('option')
    option.value = val
    option.innerText = val
    element.append(option)
  }
}


window.onload = async () =>  {
  const data = await getBreeds()
  await fillBreeds(data)
}
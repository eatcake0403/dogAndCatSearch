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
  return (await (await fetch(reqURL)).json()).message
}


async function fillBreeds (vals) {
  const element = document.querySelector('#breedsSelect')
  for (const val in vals) {
    const option = document.createElement('option')
    option.value = val
    option.innerText = val
    element.append(option)
  }
}


async function searchImg (breed) {
  const reqURL = `${baseURL}/breed/${breed}/images/random`
  return (await (await fetch(reqURL)).json()).message
}

async function fillImg (breed) {
  if (!breed) return
  const element = document.querySelector('#dogImg')
  const img = await searchImg(breed)
  element.src = img
}

window.onload = async () =>  {
  const data = await getBreeds()
  await fillBreeds(data)
}
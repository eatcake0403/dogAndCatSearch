const origFetch = window.fetch
window.fetch = async (...args) => {
  try {
    document.querySelector('#spin').style.display = 'block'
    return await origFetch(...args)
  } catch (err) {
    window.alert(err.message)
    throw err
  } finally {
    document.querySelector('#spin').style.display = 'none'
  }
}

const baseURLDog = 'https://dog.ceo/api'
const baseURLCat = 'https://cataas.com'

async function getBreeds () {
  const reqURL = `${baseURLDog}/breeds/list/all`
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
  const reqURL = `${baseURLDog}/breed/${breed}/images/random`
  return (await (await fetch(reqURL)).json()).message
}

async function fillImg (breed) {
  if (!breed) return
  const element = document.querySelector('#dogImg')
  const img = await searchImg(breed)
  element.src = img
}

function changeTab (tab) {
  const elements = document.querySelector('#tabs').children
  const cards = document.querySelectorAll('.card')
  for(let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('active')
  }
  elements[tab].classList.add('active')
  for(let i = 0; i < cards.length; i++) {
    cards[i].classList.add('none')
  }
  cards[tab].classList.remove('none')
}

async function randomImgCat () {
  const randomNum = Math.floor(Math.random()*10000)
  const reqURL = `${baseURLCat}/cat?randomNum=${randomNum}`
  const img = URL.createObjectURL(await (await fetch(reqURL)).blob())
  document.querySelector('#CatImg').src = img
}

async function randomGIFCat () {
  const randomNum = Math.floor(Math.random()*10000)
  const reqURL = `${baseURLCat}/cat/gif?randomNum=${randomNum}`
  const img = URL.createObjectURL(await (await fetch(reqURL)).blob())
  document.querySelector('#CatImg').src = img
}

async function sayTextCat (text) {
  const randomNum = Math.floor(Math.random()*10000)
  const reqURL = `${baseURLCat}/cat/says/${encodeURI(text)}?randomNum=${randomNum}`
  const img = URL.createObjectURL(await (await fetch(reqURL)).blob())
  document.querySelector('#CatImg').src = img
}

window.onload = async () =>  {
  const data = await getBreeds()
  await fillBreeds(data)
}
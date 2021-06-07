let addToy = false
const toyContainer = document.querySelector('#toy-collection')
const url = 'http://localhost:3000/toys'

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('.container')
  const createNewCard = (toy) => {
    const cardsClass = document.createElement('div')
    cardsClass.classList.add('card')

    const h2 = document.createElement('h2')
    h2.innerText = toy.name
    
    const img = document.createElement('img')
    img.src = toy.image
    img.classList.add('toy-avatar')
    
    const p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
    
    const btn = document.createElement('button')
    btn.classList.add('like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = 'Like'
    btn.addEventListener('click', () => {
      const patchObject = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          likes: toy.likes++
        })
      }
      fetch(`${url}/${btn.id}`, patchObject)
        .then(resp => resp.json())
        .then(data => {
          p.innerText = `${data.likes} likes`
        })
    })
    cardsClass.append(h2, p, img, btn)
    toyContainer.append(cardsClass)
  }

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(toy => createNewCard(toy))
    })

  const submitToyButton = document.querySelector('.submit')
  submitToyButton.addEventListener('click', (event) => {  
    // event.preventDefault()
    const submitForm = document.querySelector('.add-toy-form')
    const newToyName = submitForm.name.value
    const newToyImage = submitForm.image.value

    const configurationObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImage,
        likes: ' '
      })
    }
    fetch('http://localhost:3000/toys', configurationObject)
      .then(resp => resp.json())
      .then(data => {
        createNewCard(data)
      })
  })


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = 'block'
    } else {
      toyFormContainer.style.display = 'none'
    }
  })
})
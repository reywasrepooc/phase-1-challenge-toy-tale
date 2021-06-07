let addToy = false
const toyContainer = document.querySelector('#toy-collection')

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
  cardsClass.append(h2, p, img, btn)
  toyContainer.append(cardsClass)
}

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('.container')

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(toy => createNewCard(toy))
    })
    
    const submitToyButton = document.querySelector('.submit')
    submitToyButton.addEventListener('click', (event) => {  
      event.preventDefault()
 
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

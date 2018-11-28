import 'styles/css/index.css'

function calcSize() {
  const width = screen.width
  if (width > 414) {
    document.documentElement.style.fontSize = '100px'
  } else {
    document.documentElement.style.fontSize = '250px'
  }
}

document.addEventListener('DOMContentLoaded', calcSize, false)
window.addEventListener('resize', calcSize, false)

let navhtml = ''
INDEX_LIST.forEach(pathname => {
  navhtml += `<p><a href="${pathname}.html">${pathname}.html</a></p>`
})

document.body.innerHTML = navhtml

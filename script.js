const tamanhoGeral = 70
const tamanhoTable = 8
let pId = 0
let getId
f_criarTabela()

function f_criarTabela() {
  let tabela = document.createElement('table')
  tabela.style.border = '5px solid black'
  tabela.style.borderCollapse = 'collapse'
  tabela.style.margin = '0 auto'
  
  for (let l = 0; l < tamanhoTable; l++) {
    let linha = document.createElement('tr')
    
    for (let c = 0; c < tamanhoTable; c++) {
      let casa = document.createElement('td')
      casa.dataset.lin = l
      casa.dataset.col = c
      casa.classList.add('casa')
      
      if (l % 2 == c % 2) {
        casa.style.backgroundColor = 'black'
        casa.addEventListener('dragover', f_over)
        
        if (l * 8 + c < 24) {
          const imagem = f_criarPeca('black')
          imagem.setAttribute('draggable', 'False')
          casa.append(imagem)
          
        } else if (l * 8 + c >= 40) {
          
          const imagem = f_criarPeca('red')
          casa.append(imagem)
        }
      } else {
        casa.style.backgroundColor = 'white'
      }
      casa.style.width = `${tamanhoGeral}px`
      casa.style.height = `${tamanhoGeral}px`
      casa.style.textAlign = 'center'
      linha.appendChild(casa)
    }
    tabela.appendChild(linha)
  }
  document.body.appendChild(tabela)
}

function f_criarPeca(cor) {
  let imagem = document.createElement('img')
  imagem.setAttribute('src', `${cor}.png`)
  imagem.classList.add('peca')
  imagem.setAttribute('widht', `${tamanhoGeral - 5}px`)
  imagem.setAttribute('height', `${tamanhoGeral - 5}px`)
  imagem.id = `${pId++}`
  imagem.addEventListener('drag', f_id)
  imagem.style.userSelect = 'none'
  imagem.style.margin = 0
  return imagem
}

function f_id(){
  getId = this.getAttribute('id')
}


function f_troca(){
  const pecas = document.querySelectorAll('.peca')
  //roda pelas peças e adiciona/remove drag
  pecas.forEach((pecau) => {
    pecau.draggable = !pecau.draggable
  })
}
    
function f_soltar(e) {
  const peca = document.getElementById(`${getId}`)
  peca.parentElement.addEventListener('dragover', f_over)
  e.target.append(peca)
  peca.parentElement.removeEventListener('dragover', f_over)
  f_troca()
}

function f_over(e){
  e.preventDefault()
  const peca = document.getElementById(`${getId}`)

  //pega as posições da colina e linha
  const cOrigem = peca.parentElement.dataset.col 
  const lOrigem = peca.parentElement.dataset.lin
  const lDestino = e.target.dataset.lin 
  const cDestino = e.target.dataset.col
  
  if ((peca.getAttribute('src') == 'red.png' && 
    lDestino == lOrigem-1 || 
    peca.getAttribute('src') == 'black.png' && 
    lDestino-1 == lOrigem) &&
    (cOrigem == cDestino-1 || cOrigem-1 == cDestino)) {
    e.target.addEventListener('drop', f_soltar)
    }
}

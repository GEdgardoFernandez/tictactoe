const cuadrados = Array.from(document.querySelectorAll('.cuadrado'));
const x = 'X';
const o = 'O';
let estadoJuego = 'P1'
let puntajeX = 0;
let puntajeO = 0;
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h3")
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

cuadrados.forEach((cuadrado, i) =>{
  cuadrado.addEventListener('click', ()=>{
    if (estadoJuego === 'PAUSA') {
      return;
    }
    if (cuadrado.textContent !== "") {
      return;
    }
    cuadrado.innerText = estadoJuego === 'P1' ? x: o;
    
    const posicionGanadora = verificarGanador();
    if (typeof posicionGanadora === "object") {
      quiengana(posicionGanadora);
      
      return
    }
    if (posicionGanadora === "EMPATE") {
      mostrarResuldado('Empate');
      return
    }
   
    estadoJuego = estadoJuego === 'P1' ? 'P2': 'P1';
  })
})

function verificarGanador() {
  const board = cuadrados.map(cuadrado => cuadrado.textContent);
  console.log(board)
  //revisar Horizontales
  for (let i = 0; i < 9; i += 3) {

      if (board[i] && board[i] === board[i+1] && board[i] === board[i+2]) {

        return [i,i+1,i+2]
      }
  }
  //revisar verticales
  for (let i = 0; i < 3; i++) {
       if (board[i] && board[i] === board[i+3] && board[i] === board[i+6]) {

        return [i,i+3,i+6]
      }
  }
  //revisar cruces
  if (board[0] && board[0] === board[4] && board[0] === board[8]) {

    return [0,4,8]
  }
  if (board[2] && board[2] === board[4] && board[2] === board[6]) {

    return [2,4,6]
  }
  if (board.includes("")) {
    return false;
  } else {
    return "EMPATE";
  }
  
}
function quiengana(posicionGanadora) {
  console.log('GANADOR '+posicionGanadora);
  
  posicionGanadora.forEach(posicion =>{
    cuadrados[posicion].classList.toggle("ganador", true)
  })
  mostrarResuldado('GANADOR: '+estadoJuego);
  estadoJuego = 'PAUSA';
  
}


function mostrarResuldado(texto) {
  textoModal.innerText = texto;
  modal.showModal();
  
}
function actualizarMarcador() {
  if (estadoJuego === 'P1') {
    puntajeX++;
    document.getElementById('player1').textContent = puntajeX;
  } else {
    puntajeO++;
    document.getElementById('player2').textContent = puntajeO;
  }
}

modal.querySelector("button").addEventListener('click', () =>{
  cuadrados.forEach(cuadrado => {
    cuadrado.textContent = "";
    cuadrado.classList.toggle("ganador", false);
    modal.close();
    estadoJuego = 'P1'
});
})
menuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

function recargarPagina() {
  location.reload();
}
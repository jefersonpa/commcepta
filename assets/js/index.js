var funcionarios = [];
loadPage = (url, element) => {
  req = new XMLHttpRequest();
  req.onload = function() {
    // in case of network errors this might not give reliable results
    return;
  };
  req.open('GET', url, false);
  req.send(null);
  element.innerHTML = req.responseText;
};

toggleMenu = () => {
  var x = document.getElementById('nav');
  if (x.className === 'active') {
    x.className = '';
  } else {
    x.className = 'active';
  }
};

changeSelectedValue = element => {
  document.getElementById('cardSelected').innerHTML =
    "<div class='card card__selecionado' > " +
    "  <img src='./assets/img/" +
    element.foto +
    "' " +
    "alt='Avatar do(a) funcionário(a) " +
    element.nome +
    "' class='imgCard' /> " +
    "  <div class='cardContainer'> " +
    '    <p>NOME: <b>' +
    element.nome +
    '</b></p> ' +
    '    <p>CARGO: <b>' +
    element.cargo +
    '</b></p> ' +
    '    <p>IDADE: <b>' +
    element.idade +
    '</b></p> ' +
    '  </div> ' +
    '</div>  ';
};

toggleSelected = id => {
  document.getElementById('cardSelected').innerHTML = '';

  funcionarios.forEach(element => {
    if ('card' + element.id != id) {
      // Retira a seleção dos outros
      var x = document.getElementById('card' + element.id);
      x.className = 'card';
    } else {
      // Seleciona o item se ainda não estava
      var x = document.getElementById(id);
      if (x.className === 'card') {
        x.className += ' card-selected';
        changeSelectedValue(element);
      } else {
        x.className = 'card';
      }
    }
  });
};

// Carrega a navbar
loadPage('./components/navbar.html', document.getElementById('navbarPage'));

// Pega os dados do JSON e renderiza os cards com os dados
fetch('./assets/dados.json')
  .then(response => response.json())
  .then(json => {
    funcionarios = json;
    document.getElementById('cardData').innerHTML = '';

    funcionarios.forEach(element => {
      document.getElementById('cardData').innerHTML +=
        "<div class='card'  id='card" +
        element.id +
        '\'  onclick="toggleSelected(this.id)">' +
        "<img src='./assets/img/" +
        element.foto +
        "' " +
        "alt='Avatar do(a) funcionário(a) " +
        element.nome +
        "' class='imgCard' /> <div class='cardBadge'>" +
        element.id +
        '</div>' +
        "     <div class='cardContainer'>" +
        '       <h4>' +
        '         <b>' +
        element.nome +
        '         </b>' +
        '       </h4> ' +
        '       <p>' +
        element.cargo +
        '       </p> ' +
        '     </div> ' +
        '   </div>  ' +
        ' </div>';
    });
  });

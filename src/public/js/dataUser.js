miStorage = window.localStorage;

function local(key, p) {
  miStorage.setItem(key, JSON.stringify(p));
}

async function dataUser() {
    let id = document.getElementById("idUser").value;
  if (id != "") {
    let url = "http://localhost:3500/getDataUser/";
    var getDataUser = await $.get(url + id);

    //Almacenamos datos en el localstorage
    local("userData", getDataUser);
  }
}


function updateDataFront() {
  var local = localStorage.getItem("userData");
  local = JSON.parse(local);

  let name = local[0].UsuNombre;

  if (window.location.href != "http://localhost:3500/Principal") {
    document.getElementById("navbarDropdown").innerHTML = name;
  }else{
    document.getElementById("titulobienvenido").innerHTML = `¡Bienvenido ${name}!`;
    document.getElementById("navbarDropdown").innerHTML = name;
  }
}

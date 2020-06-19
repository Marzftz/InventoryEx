miStorage = window.localStorage;

async function getProduct() {
  let Productos = "http://localhost:3500/getProductos";
  var getProduct = await $.get(Productos);

  //Llamo a la función para guardar en el local storage
  local("productos" ,getProduct);

  var element = document.getElementById("productos");
  var selectObject = $('select[id="productos"]');

  for (let i = 0; i < getProduct.length; i++) {
    var opt = document.createElement("option");
    if (
      selectObject.find('option[value="' + getProduct[i].InvNombre_Producto + '"]').length == 0) {
      opt.value = getProduct[i].InvNombre_Producto;
      opt.innerHTML = getProduct[i].InvNombre_Producto;
      element.appendChild(opt);
    }
  }
  $("#crearsolicitud").modal("show");
}


//------------Guardar de forma local información-------------
function local(key, p) {
  miStorage.setItem(key, JSON.stringify(p));
}


//-------Buscar y cambiar la lista de los productos----------
function changeProductos() {
  var actual = document.getElementById("productos").value;
  var local = localStorage.getItem('productos');
  local = JSON.parse(local);

  //Limpio los inputs 
  if (actual == "Seleccione un producto") {
    document.getElementById('codproducto').value = "";
    document.getElementById('costoun').value = "";
   }

   //Busco en el almacenado local el producto
  for (const name in local) {    
    if (local[name].InvNombre_Producto == actual) {
      
      //Elementos del modal de crear solicitud
      document.getElementById('codproducto').value = local[name].InvCodigo_Producto;
      document.getElementById('costoun').value = local[name].InvPrecio_Unitario;
      document.getElementById('cantproducto').value =  "";   
      document.getElementById('costol').value =  "";
    }
  }
}


function calculatePrice() {
  const priceU = document.getElementById('costoun').value;
  const cantidad = document.getElementById('cantproducto').value;
  let total = parseInt(priceU)*parseInt(cantidad);
  document.getElementById('costol').value = (total).toFixed(2);
}

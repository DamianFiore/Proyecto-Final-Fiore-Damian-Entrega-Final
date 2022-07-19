
//------------------------- RENDER DE TODOS LOS PRODUCTOS -----------------------//
const mainproductos = document.querySelector(`#main-p`);
const renderProductos = (arrayDeproductos) => {
    let productosHTML = ''
    arrayDeproductos.forEach(Producto => {
        const prod = document.createElement(`div`);
    prod.className=`prod`;
    prod.innerHTML=`
        <img src="${Producto.img}" alt="etiopia">
        <name>${Producto.nombre}</name>
        <des>${Producto.descripcion}</des>
        <price>$${Producto.precio}</price>
        <div class="boton-p">
            <button id="${Producto.nombre}" type="button" class="comp btn btn-dark" href="productos.html">COMPRAR</button>
        </div>
        `
    Allproducts.push(Producto);
    mainproductos.append(prod);
    })
}

fetch('./todoproductos.json')
    .then(response => response.json())
    .then(data => {
        renderProductos(data);
        const Clickbutton = document.querySelectorAll('.comp')
        Clickbutton.forEach(btn => {
            btn.addEventListener('click',addToCarritoItem)
            btn.addEventListener('click',AgregarProducto)
        })
    }
    )
    .catch(error => console.log(error))

const Allproducts = [];
//------------------------- FINAL RENDER DE TODOS LOS PRODUCTOS -----------------------//

function AgregarProducto (){
    const numero = document.querySelector(`.productoscarrito`);
    numero.innerHTML=`${carrito.length}`
}


//------------------------- INICIO RENDER DEL CARRITO DE COMPRAS -----------------------//
const  tbody = document.querySelector('.tbody')
let carrito =[]

function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.prod')
    const itemTitle = item.querySelector('name').textContent;
    const itemPrecio = item.querySelector('price').textContent;
    const itemImg = item.querySelector('img').src;
    const newItem = {
        title: itemTitle,
        precio: itemPrecio,
        img: itemImg,
        cantidad: 1
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto Agregado',
        showConfirmButton: false,
        timer: 1500
    })
    addItemCarrito(newItem)
}

function addItemCarrito(newItem) {

    const InputElemento = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++)
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;  //contador de cantidad de productos iguales//
            const inputValue = InputElemento[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    carrito.push(newItem)
    renderizarCarrito()
}

function renderizarCarrito() {
    tbody.innerHTML = ''
    carrito.map(item=>{
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
            <th scope="row">${carrito.length}</th>
              <td class="table">
                <h6 class="title">${item.title}</h6>
              </td>
              <td class="table"><p>${item.precio}</p></td>
              <td class="table">
                <input style="width:30px" type="number" min="1" value=${item.cantidad} class ="input__elemento"/>
              </td>
              <td class="table">
                <button class="delete btn btn-danget">X</button>
              </td>
        `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })
    itemCartTotal.innerHTML = `
        Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    CarritoTotal()
    AgregarProducto()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })

}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderizarCarrito()
    }
}

function confirmarCompra() {
    Swal.fire({
        title: 'Usted va a confirmar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Realizar Compra'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra Exitosa',
                'Muchas Gracias por su Compra',
                'success'
            )
            borrartarjeta()
            //Aquí va el metodo para vaciar toda la lista y el carrito
        }
    })
}

const botonesConfirmacion = document.querySelectorAll('.comprar')
botonesConfirmacion.forEach((botonesConfirmacion) => {
    botonesConfirmacion.addEventListener('click', confirmarCompra)
})

// PAGAR CON TARJETA //

const metodo = document.querySelector('.metodo')
const radio2 = document.getElementById('con2')
radio2.addEventListener('change', pagarcontarjeta)

function pagarcontarjeta(){
    metodo.innerHTML = ''
    const tarjeta = document.createElement('div')
    tarjeta.classList.add('tarjeta')
    const Content2 = `
        <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">TITULAR DE LA TARJETA</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" style="width: 220px;">
        </div>
        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">NUMERO DE LA TARJETA</label>
            <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="#### #### #### ####" style="width: 220px;">
        </div>
        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">CÓDIGO DE SEGURIDAD</label>
            <input type="password" class="form-control" id="formGroupExampleInput3" placeholder="***" style="width: 50px;">
        </div>
        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">FECHA DE VENCIMIENTO</label>
            <input type="text" class="form-control" id="formGroupExampleInput4" placeholder="MM/YY" style="width: 80px;">
        </div>
    `
    tarjeta.innerHTML = Content2;
    metodo.appendChild(tarjeta)
}


const radio1 = document.getElementById('con1')
radio1.addEventListener('change', borrartarjeta)

function borrartarjeta(){
    const tj = document.querySelector('.tarjeta')
    tj.remove()
}

// CUPÓN DE DESCUENTO //
const des = document.querySelector('.descuento')
const check1 = document.getElementById('con3')

function agregardescuento(){
    des.innerHTML = ''
    const ds = document.createElement('div')
    ds.classList.add('desc')
    const Content3 = `
        <div class="mb-3">
            <input type="text" class="form-control barrades" id="barrades" placeholder="INGRESE CÓDIGO DE DESCUENTO" style="width: 300px;">
        </div>
    `
    ds.innerHTML = Content3;
    des.appendChild(ds)
}
function borrardescuento(){
    const descu = document.querySelector('.desc')
    descu.remove()
}

check1.addEventListener("change", validaCheckbox, false);
function validaCheckbox()
{
  var checked = check1.checked;
  if(checked){
    agregardescuento()
  }
  else{
    borrardescuento()
  }
}




let productos = [];
let category = ['todos', 'Sin Categoria'];

let inputName = document.getElementById('name-producto');
let inputPrice = document.getElementById('precio-producto');
let inputCant = document.getElementById('cant-producto');
let selectCategory = document.getElementById('categoria-producto');
let btnAdd = document.getElementById('add-Producto');
let idProd = 0;
let prodcutoEditando = null;
let containerForm = document.getElementById('formulario-container');
let btnActu = document.getElementById('actualiza-Producto');
let inputSearch = document.getElementById('search-producto');

btnActu.setAttribute('disabled', "");

//categoria filter
let selectFilter = document.getElementById('filtro-ctgy');

let btneditCat = document.getElementById('editar');
let btnaddCat = document.createElement('button');
btnaddCat.innerHTML = 'agregar';
let divAddCategory = document.getElementById('add-Category');
let inputNewCat = document.createElement('input');


btneditCat.addEventListener('click', () => {
    divAddCategory.removeChild(btneditCat);
    divAddCategory.appendChild(inputNewCat);
    divAddCategory.appendChild(btnaddCat);
    selectCategory.setAttribute('disabled', "");
});

function addCategory() {
    if (inputNewCat.value.trim().length !== 0) {
        category.push(inputNewCat.value.trim());
    }
    saveDataProduct();
    updateListCategory(category.slice(1), selectCategory);
    updateListCategory(category, selectFilter);

}

function updateListCategory(listC, select) {
    let htmlOp = "";
    for (let i = 0; i < listC.length; i++) {
        htmlOp += `
        <option value='${listC[i]}'>${listC[i]}</option>
        `
    }
    select.innerHTML = htmlOp;
}
btnaddCat.addEventListener('click', () => {
    addCategory();
    console.log(category);
    divAddCategory.appendChild(btneditCat);
    divAddCategory.removeChild(inputNewCat);
    divAddCategory.removeChild(btnaddCat);
    selectCategory.removeAttribute('disabled');
});

//filtro
function filterCtgy(ctgy) {
    let arrCtgy = productos.filter(x => x.categoria === ctgy);
    console.log(arrCtgy);
    displayProducts(arrCtgy);

}
selectFilter.addEventListener('change', () => {
    if (selectFilter.value === 'todos') {
        displayProducts(productos);
    } else {
        filterCtgy(selectFilter.value);

    }
    // console.log(selectFilter.value);
});

//agregar producto
function agregarProducto() {
    let producto = {
        id: 0,
        nombre: "",
        precio: 0,
        cantidad: 0,
        categoria: "",
    }
    if (inputName.value.trim().length !== 0 &&
        inputPrice.value.trim().length !== 0 &&
        inputCant.value.trim().length !== 0 &&
        selectCategory.value.trim().length !== 0) {

        producto.nombre = inputName.value.trim();
        producto.precio = Number(inputPrice.value);
        producto.cantidad = Number(inputCant.value);
        producto.categoria = selectCategory.value;
        idProd++;
        producto.id = idProd;
        productos.push(producto);
        displayProducts(productos);
        limpiarInputs();
        saveDataProduct();
    }
    else {
        alert("Falta llenar parametros");
    }
}
function limpiarInputs() {
    inputName.value = '';
    inputPrice.value = '';
    selectCategory.value = '';
    inputCant.value = '';
}

function eliminarProducto(id) {
    productos = productos.filter(x => x.id !== id);
    displayProducts(productos);
    saveDataProduct();

}

function editarProducto(id) {
    let prod = productos.find(x => x.id === id);
    console.log(prod);
    if (prod) {
        inputName.value = prod.nombre;
        inputPrice.value = prod.precio;
        selectCategory.value = prod.categoria;
        inputCant.value = prod.cantidad;
    }
    btnActu.removeAttribute('disabled');
    prodcutoEditando = prod;

}
function actualizar() {
    console.log(prodcutoEditando);
    if (inputName.value.trim().length !== 0 &&
        inputPrice.value.trim().length !== 0 &&
        inputCant.value.trim().length !== 0 &&
        selectCategory.value.trim().length !== 0) {

        prodcutoEditando.nombre = inputName.value.trim();
        prodcutoEditando.precio = Number(inputPrice.value);
        prodcutoEditando.cantidad = Number(inputCant.value);
        prodcutoEditando.categoria = selectCategory.value;
        displayProducts(productos);
        limpiarInputs();
        saveDataProduct();

        prodcutoEditando = null;
    }
}
function search(text) {
    let findProd = productos.filter(x => x.nombre.includes(text));
    displayProducts(findProd);
}
inputSearch.addEventListener('input', () => {
    // console.log(inputSearch.value.trim());
    search(inputSearch.value.trim());
});

btnActu.addEventListener('click', () => {
    actualizar();
    btnActu.setAttribute('disabled', "");

})

btnAdd.addEventListener('click', () => {
    agregarProducto(productos);
    console.log(productos);

});

let bodyTable = document.getElementById('body-productos');
function displayProducts(arr) {
    let html = "";
    for (let i = 0; i < arr.length; i++) {
        html += `
            <tr>
               <td>${arr[i].id}</td>
               <td>${arr[i].nombre}</td>
               <td>${arr[i].precio}</td>
               <td>${arr[i].categoria}</td>
               <td>${arr[i].cantidad}</td>
               <td><button onclick="eliminarProducto(${arr[i].id})" class="delt-btn">Eliminar</button></td>
               <td><button onclick="editarProducto(${arr[i].id})" class="edit-btn">Editar</button></td>
            </tr>
        `
    }
    bodyTable.innerHTML = html;
}

function saveDataProduct() {
    localStorage.setItem('listProducts', JSON.stringify(productos));
    localStorage.setItem('ID', JSON.stringify(idProd));
    localStorage.setItem('listCategories', JSON.stringify(category));
}

function loadDataProduct() {
    let saved = localStorage.getItem('listProducts');
    let idLast = localStorage.getItem('ID');
    let listCtgy = localStorage.getItem('listCategories');

    if (saved != null) {
        productos = JSON.parse(saved);
        displayProducts(productos);
    }
    if (idLast) {
        idProd = JSON.parse(idLast);
        console.log(idProd);
    }
    if (listCtgy !== null) {
        category = JSON.parse(listCtgy);
        updateListCategory(category.slice(1), selectCategory);
        updateListCategory(category, selectFilter);

    }
}
loadDataProduct();

//stilos dinamicos (opcional)
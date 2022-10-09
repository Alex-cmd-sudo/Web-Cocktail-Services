//Constantes
const valorNombreFaltante = "Es necesario escribir el nombre de la bebida";
const valorErrorGeneral = "Ocurrio un error al consultar la información";
const pathByName = "/ByName/";
const pathByIngredient = "/ByName/";
const listaLocalStorage = "Mis Cocteles favoritos";

//Funciones
function valiarConsumirNombre() {
    if ($("#byName").val().length == 0) {
        errorAlert(valorNombreFaltante);
        return false;
    }
    else {

        consumirGeneric(pathByName + $("#byName").val())
        creaCards()
    }
}

//Para consumir mediante path variable
function consumirGeneric(metodo) {
    try {
        $.ajax({
            type: "GET",
            url: root + metodo,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                creaCards(data);
            },
            error: function (e) {
                errorAlert(valorErrorGeneral);
            }
        });
    } catch (e) {
        errorAlert(valorErrorGeneral);
    }

    return result;
}

//Para busquedas por ingrediente
function creaCards(json) {
    var data = json["drinks"];

    if (data != null) {
        var contenido = document.querySelector("#layoutInfo");
        contenido.innerHTML = ``;
        for (let value of data) {
            contenido.innerHTML +=
                `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="${value.strDrinkThumb}">
                        <div class="card-body">
                            <p class="card-text">${value.strDrink}</p>      
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary"
                                    onclick="addToCart('${value.strDrink.replace(/[^a-zA-Z ]/g, "")}','${value.strDrinkThumb}')">Agregar al carrito</button>
                                </div>
                                <small class="text-muted cursorActive" onclick="clickCard('${value.strDrink.replace(/[^a-zA-Z ]/g, "")}', '${value.strDrinkThumb}', '${value.strInstructions}')">Mas información</small>
                            </div>
                        </div>
                    </div>
                </div> 
            `
        }
    }
    else {
        errorAlert("No se encontraron bebidas con ese nombre");
    }
}

//Validaciones
$("#byName").on("keydown", function () {
    document.getElementById('btnIngredient').disabled = true;
    document.getElementById('btnName').disabled = false;
});

//Alerta satisfactoria
function successAlert(mensaje) {
    Swal.fire({
        icon: 'success',
        title: mensaje,
        showConfirmButton: true,
    })
}

//Alerta error detectado
function errorAlert(mensjae) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensjae,
    })
}

//Click sobre card
function clickCard(nombre, img, descripcion) {
    Swal.fire({
        title: nombre,
        text: descripcion,
        imageUrl: img,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Img-' + nombre,
    })
}

//local storage agregar
function addToCart(nombre, img) {

    let recoveredData = localStorage.getItem(listaLocalStorage);
    var today = new Date();
    var saveLocal = new Array();
    //var regex = new Regex("[0-9]");
    try {
        var timeStamp = today.toLocaleString().toString();
        timeStamp = timeStamp.replace(/[^0-9]/g, "");
        var bebida = { id: timeStamp, nombreBebida: nombre, imgBebida: img };

        if (recoveredData == null) {
            saveLocal.push(bebida);
            window.localStorage.setItem(listaLocalStorage, JSON.stringify(saveLocal));
        }
        else {
            let data = JSON.parse(recoveredData);
            data.push(bebida);
            localStorage.setItem(listaLocalStorage, JSON.stringify(data));
        }
        alertCarrito("Se agrego al carrrito", 'success');
    } catch (e) {
        alertCarrito("Ocurrio un error al intentar agregar al carrito", 'error')
    }
}

//Eliminar de carrito
function deleteItemCard(id) {
    let recoveredData = localStorage.getItem(listaLocalStorage);

    try {
        let data = JSON.parse(recoveredData);
        data = data.filter((item) => item.id !== id);
        localStorage.setItem(listaLocalStorage, JSON.stringify(data));
        if (data.length == 0 || recoveredData == null) {
            localStorage.clear();
        }
        successAlert("Se elimino de carrrito");
        //creaHtmlCarrito()

    } catch (e) {
        errorAlert("Ocurrio un error al intentar eliminar el articulo del carrito");
    }
}

//Consultar carrito
function consultarCarrito(html) {
    Swal.fire({
        title: '<strong>Mi carrito</strong>',
        html: '<ul class="d-grid gap-4 my-5 list-unstyled">' +
            html +
            '</ul>',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Cerrar',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}

//recorrer local storage
function creaHtmlCarrito() {
    try {
        var listaCocteles = localStorage.getItem(listaLocalStorage);
        let arraryCocteles = JSON.parse(listaCocteles);
        if (arraryCocteles != null) {
            var html = ``;
            for (let value of arraryCocteles) {
                html += `
                  <li class="d-flex gap-4 class="col-6 col-md-6 input-group mb-3"">
                    <button class="btn btn-outline-secondary" type="button" onclick="deleteItemCard('${value.id}')">Eliminiar</button>
                    <img width="40px" src="${value.imgBebida}">
                    <div>
                      <h5 class="mb-0 myFontsStyle">${value.nombreBebida}</h5>                      
                    </div>                    
                  </li>
            `
            }
            consultarCarrito(html)
        }
        else {
            alertCarrito("Sin articulos en tu carrito", 'info');
        }
    } catch (e) {
        errorAlert("Ocurrio un error al consultar el carrito")
    }
}

//agregar carrito
function alertCarrito(title, icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: title
    })
}
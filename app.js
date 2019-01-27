//Variables globales

const formulario = document.querySelector('#formulario');
const listaActividades = document.querySelector('#listaActividades');
let arrayActividades = []


//funciones

const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);
    return item;

}

const GuardarDB = () => {

    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    PintarDB();
}

const PintarDB = () => {

    listaActividades.innerHTML = '';

    arrayActividades = JSON.parse(localStorage.getItem('rutina'))
    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(element => {

            if(element.estado ){
                listaActividades.innerHTML += ` <div class="alert alert-success" role="alert">
                <i class="material-icons float-left mr-2">
                    accessibility
                </i>
                <b>${element.actividad}</b> - ${element.estado}
                <span class="float-right">
                    <i class="material-icons">
                        done
                    </i>
                    <i class="material-icons">
                        delete
                    </i>
                </span>
            </div>`
            }else{
              listaActividades.innerHTML += ` <div class="alert alert-danger" role="alert">
            <i class="material-icons float-left mr-2">
                accessibility
            </i>
            <b>${element.actividad}</b> - ${element.estado}
            <span class="float-right">
                <i class="material-icons">
                    done
                </i>
                <i class="material-icons">
                    delete
                </i>
            </span>
        </div>`  
            }
            
        });
    }

}

const EliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {

        if (elemento.actividad === actividad) {
            indexArray = index;
        }

    })

    arrayActividades.splice(indexArray, 1)
    GuardarDB();

}

const EditarDB = (actividad) => {

    let indexArray = arrayActividades.findIndex((element) =>{
      return  element.actividad === actividad});

    arrayActividades[indexArray].estado = true;
    GuardarDB();
}

//EventListener

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;

    CrearItem(actividadUI);
    GuardarDB();
    formulario.reset();
})

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividades.addEventListener('click', (e) => {
    e.preventDefault();


    if (e.target.innerHTML.trim() === 'done' || e.target.innerHTML.trim() === 'delete') {
        let texto = e.path[2].childNodes[3].innerHTML

        if (e.target.innerHTML.trim() === 'delete') {
            //Accion de Eliminar
            EliminarDB(texto)
        }
        if (e.target.innerHTML.trim() === 'done') {
            //ACcion de Editar
            EditarDB(texto);
        }

    }
})
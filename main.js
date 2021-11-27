//CLASE PARA LOS OBJETOS PRODUCTOS
class Base {
    constructor(name, minutes) {
        this.name = name;
        this.minutes = Number(minutes);
        this.before = null;
        this.next = null;
    }

    getName() {
        return this.name;
    }

    getMinutes() {
        return this.minutes;
    }
    //IMPRIME LOS RESULTADOS EN HTML
    getInfo() {
        return `| ${this.name}, Duración: ${this.minutes} min. |<br>`;
    }
    //IMPRIME LOS RESULTADOS EN HTML
    infoCard(hour, minutes) {
        return `| ${this.getName()}, Hora de llegada: ${hour}, Minutos restantes: ${minutes} |<br>`;
    }
}
//CLASE PARA LOS FUNCIONES DE LOS PRODUCTOS
class Road {
    constructor() {
        this.bases = null;
    }
    //AGREGAR PRODUCTOS
    add(base) {
        if(this.bases == null) {
            this.bases = base;
            base.next = this.bases;
            base.before = this.bases;
        } else {
            let last = this.bases.before;
            base.next = this.bases;
            base.before = last;
            last.next = base;
            this.bases.before = base;
        }
    }
    //ELIMINA PRODUCTOS POR NOMBRE
    delete(name) {
        let aux = this.bases;
        let last = this.bases.before;
        let deleteData = null;
        if(this.bases == null) {
            return null;
        } else if(this.bases.getName() == name){
            deleteData = this.bases;
            if(this.bases.next == this.bases) {
                this.bases.next = null;
                this.bases.before = null;
                this.bases = null;
            } else{
                last.next = this.bases.next;
                this.bases.next.before = last;
                this.bases = this.bases.next;
            }
        } else{
            aux = this.bases.next;
            while(aux != this.bases && del == null) { 
                if(temp.getName() == name) { 
                    deleteData = aux;
                    aux.before.next = aux.next;
                    aux.next.before = aux.before;
                    aux.next = null;
                    aux.before = null;
                } else{ 
                    aux = aux.next;
                }
            }
        }
        return deleteData;
    }
    //LISTA LOS PRODUCTOS POR DEFAULT
    list() {
        if(this.bases == null) {
            return 'Lista vacia';
        }
        else {
            let info = '';
            let aux = this.bases;
            do {
               info += `${aux.getInfo()}`;
                aux = aux.next;
            } while (aux != this.bases);
            return info;
        }
    }
    //CREA LA TARJETA DE SEGUIMIENTO
    createCard(base, hour, minutes) {
        let cardInfo = '';   
        let total = 0;
        let find = this._findBase(base);

        if(!find) {
            return null;
        } else {
            do{
                cardInfo += find.infoCard(this._hoursConvert(hour, total), minutes);               
                total += find.next.getMinutes();
                minutes -= find.next.getMinutes();
                find = find.next;
            }while(minutes >= 0);
            return cardInfo;
        }   
    }
    //CREA CONVIENTE LA HORA
    _hoursConvert(hour, minutes) {
        let hourMinutes = ((hour * 60) + minutes) / 60;
        let hoursTotal = Math.trunc(hourMinutes);
        let minusMinutes = Math.round((hourMinutes - hoursTotal) * 60);
        if(minusMinutes < 10) {
            return `${hoursTotal}:0${minusMinutes}`;
        } else {
            return `${hoursTotal}:${minusMinutes}`;
        }
    }
    //BUSCA LA BASE
    _findBase(name) {
        let base = this.bases;
        if(!base) {
            return null;
        } else {
            do{
                if(base.getName() == name) {
                    return base;
                } else {
                    base = base.next;
                }
            } while(base !== this.bases);
            return null;
        }
    }
}

let road = new Road();
    //IMPRIME LOS DATOS EN HTML
let details = document.getElementById('details');

//RECOLECCION DE DATOS
//TOMA ACCION DE BOTON PARA FUNCION AGREGAR
const btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
    //TOMA DATOS HTML
    let name = document.getElementById('nameAdd').value;
    let duration = document.getElementById('minutesAdd').value;
    let newBase = new Base(name, duration);
    road.add(newBase);
    details.innerHTML = `${newBase.getName()} añadida`;
});

//TOMA ACCION DE BOTON PARA FUNCION ELIMINAR
const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', () =>{
    //TOMA DATO HTML
    let name = document.getElementById('nameDelete').value;
    if(road.delete(name) == null) {
        details.innerHTML = 'Sin resultados';
    }else{
        details.innerHTML = `Eliminado`;
    }
});

//TOMA ACCION DE BOTON PARA FUNCION LISTAR DEFAULT
const btnList = document.getElementById('btnList');
btnList.addEventListener('click', () =>  {

    if(road.list() == null) {
        details.innerHTML = 'Lista está vacía';
    }else{
        details.innerHTML = `${road.list()}`
    }
});

//TOMA ACCION DE BOTON PARA FUNCION CREAR TARJETA DE SEGUIMIENTO
let btnCreateCard = document.getElementById('btnCreateCard');
btnCreateCard.addEventListener('click', () =>{
    let base = document.getElementById('nameCard').value;
    let hour = Number(document.getElementById('horaCard').value);
    let minutes = Number(document.getElementById('minutesCard').value); 
    let cardCreated = road.createCard(base, hour, minutes);
    if(!road) {
        details.innerHTML = 'Lista está vacía';
    } else if(!cardCreated) {
        details.innerHTML = `Sin resultados`;
    } else {
        details.innerHTML = `${cardCreated}`;
    }
});
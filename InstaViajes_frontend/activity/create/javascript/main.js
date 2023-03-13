import { fakeFetch } from "./fakeFetch.js";
import { createActivityView } from "./createActivityView.js";

createActivityView.buildView();

async function addMultipleOptionsToDataListInNameInput() {

    const nameDataList = document.querySelector('.nameDataList');

    const data = await fakeFetch.getPlacesData();

    for(const [key, place] of Object.entries(data)){

        let newOption = document.createElement('option');

        let newOptionText = document.createTextNode(place.name);

        newOption.appendChild(newOptionText);

        nameDataList.appendChild(newOption);
    }
}

addMultipleOptionsToDataListInNameInput();

const inputName = document.getElementById('inputName');
const inputDescription  = document.getElementById('inputDescription');
const inputDateStart = document.getElementById('inputDateStart');
const inputHourStart = document.getElementById('inputHourStart');
const inputDuration = document.getElementById('inputDuration');
const inputPrice = document.getElementById('inputPrice');

function checkVoidInputAndSaveValues() {

    let newActivity = {
        name: '',
        description: '',
        date: '',
        hour: '',
        duration: '',
        price: ''
    };

    if(inputName.value == '') {
        let spanErrorName = document.getElementById('spanErrorName');
        spanErrorName.innerHTML = 'DEBE ASIGNAR UN NOMBRE A LA ACTIVIDAD';
    }
    else {
        newActivity.name = inputName.value;
        spanErrorName.innerHTML = '';
    }

    if(inputDescription.value == '') {
        let spanErrorDescription = document.getElementById('spanErrorDescription');
        spanErrorDescription.innerHTML = 'ES NECESARIA UNA DESCRIPCIÓN DEL VIAJE';
    }
    else {
        newActivity.description = inputDescription.value;
        spanErrorDescription.innerHTML = '';
    }

    if(inputDateStart.value == '') {
        let spanErrorDate = document.getElementById('spanErrorDate');
        spanErrorDate.innerHTML = 'DEBE ASIGNAR UNA FECHA DE COMIENZO';
    }
    else {
        newActivity.date = inputDateStart.value;
        spanErrorDate.innerHTML = '';
    }

    if(inputHourStart.value == '') {
        let spanErrorHour = document.getElementById('spanErrorHour');
        spanErrorHour.innerHTML = 'ES NECESARIA UNA HORA DE INICIO';
    }
    else {
        newActivity.hour = inputHourStart.value;
        spanErrorHour.innerHTML = '';
    }

    if(inputDuration.value == '') {
        let spanErrorDuration = document.getElementById('spanErrorDuration');
        spanErrorDuration.innerHTML = 'DEBE ASIGNAR UNA DURACIÓN ESTIMADA';
    }
    else {
        newActivity.duration = inputDuration.value;
        spanErrorDuration.innerHTML = '';
    }

    if(inputPrice.value == '') {
        let spanErrorPrice = document.getElementById('spanErrorPrice');
        spanErrorPrice.innerHTML = 'ES NECESARIO UN PRESUPUESTO APROXIMADO';
    }
    else {
        newActivity.price = inputPrice.value;
        spanErrorPrice.innerHTML = '';
    }

    activitiesList.push(newActivity);

}


let activitiesList = [];

const buttonAddActivity = document.getElementById('buttonAddActivity');

buttonAddActivity.addEventListener('click',()=>{

    checkVoidInputAndSaveValues();

});
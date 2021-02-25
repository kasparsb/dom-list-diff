import append from 'dom-helpers/src/append';
import remove from 'dom-helpers/src/remove';
import jsx from 'dom-helpers/src/jsx';
import q from 'dom-helpers/src/q';
import clickp from 'dom-helpers/src/event/clickp';

import getNewData from './getNewData';

let currentData = [];

let container = q('.cards');


function diff(newData, currentData) {
    let newItems = [];

    // Visiem pieliekam pazīmi nav atrats
    currentData.map(d => d._found = false);

    newData.forEach(data => {
        let found = currentData.find(item => item.id == data.id);

        // Atrats
        if (found) {
            // Liekam pazīmi, ka atrasts
            found._found = true;

            // Pārceļam DOM elementa referenci uz jauno datu masīvu
            data.el = found.el;

            data.el.innerHTML = data.text;
        }
        // Nav atrasts, jāliek iekšā
        else {
            data.el = append(container, <div class="card">{data.text}</div>)
        }
    })

    // Dzēšam pazudušos
    currentData.filter(d => !d._found).map(d => remove(d.el))

    return newData;
}

function loadData() {
    currentData = diff(getNewData(), currentData);
}

window.setNewData = function(newData) {
    currentData = diff(newData, currentData);
}

clickp('[name=refresh]', loadData)


loadData();
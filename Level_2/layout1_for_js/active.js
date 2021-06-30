'use strict'


let filterActive = document.querySelector('.filterActive');
let playFilterActive = document.querySelector('.playFilterActive');
let filterListIcon = document.querySelector('.filterListIcon');

playFilterActive.addEventListener('click', function() {
    filterActive.classList.toggle('.filterHidden');
    playFilterActive.classList.toggle('filterLabelPink');


    if (ilterListIcon.getAttribute('src') === 'img/filterList.svg') {
        filterActive.setAttribute('src', 'src="img/filterList_Pink.svg')
    } else {
        ilterListIcon.setAttribute('src', 'img/filterList.svg')
    }
});
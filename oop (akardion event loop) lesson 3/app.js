function Accordion(el, config) {
    this.el = el;
    this.config = config;
}

Accordion.prototype.init = function () {

    this.setHiddenBody.call(this);
    this.accordionHeader = this.el.getElementsByClassName('accordeon-heading');

    for (var i = 0; i < this.accordionHeader.length; i++) {
        this.accordionHeader[i].addEventListener('click', this.onViewingAccordion.bind(this));
    }

}
Accordion.prototype.setHiddenBody = function () {
    this.accordionBody = this.el.getElementsByClassName('accordeon-body');
    for (var i = 0; i < this.accordionBody.length; i++) {
        this.accordionBody[i].hidden = true;
        this.accordionBody[i].setAttribute('index', i);
    }
}

Accordion.prototype.toСollapseOther = function (index) {

    for (let i = 0; i < this.accordionBody.length; i++) {
        if (i == index) continue;
        this.accordionBody[i].hidden = true;

    }
}


Accordion.prototype.open = function (index) {

    this.accordionBody[index].hidden = false;
}

Accordion.prototype.close = function (index) {

    this.accordionBody[index].hidden = true
}

Accordion.prototype.toggle = function (index) {
    if (this.accordionBody[index].hidden == true) this.accordionBody[index].hidden = false
    else this.accordionBody[index].hidden = true
}


Accordion.prototype.onViewingAccordion = function (event) {
    let elemClicked = event.target.nextElementSibling.getAttribute('index');

    this.toggle(elemClicked);
    if (!this.config.collapseOther) this.toСollapseOther(elemClicked);


}

const accordion = new Accordion(
    document.getElementById('container'),
    { collapseOther: false }
);


accordion.init();

// accordion.open(1);
// accordion.close(0);
// accordion.toggle(1);








// Ниже второй вариант через классы CSS и el.style (доделать!)





// function Accordeon(el, config){
//     this.el = el;
//     this.config = config;

// }

// Accordeon.prototype.init = function () { 

//     this.bindEventListeners();

// }

// Accordeon.prototype.bindEventListeners = function() {
//     this.accHeads = this.el.querySelectorAll('accordion-element accordeon-heading');
//     for(let i = 0; i < this.accHeads.length; i++) {
//         this.accHeads[i].addEventListener('click', (e) => this.openCurrAccordion.bind(this));
//         console.log(this.accHeads[i]);
//     }
//     console.log(this.accHeads[0]);
// }

//     Accordeon.prototype.openCurrAccordion = function (event) {
//         for(let i = 0; i < this.accHeads.length; i++) {
//             this.parent = this.accHeads[i].parentElement;
//             this.nextEl = this.accHeads[i].nextElementSibling;

//             if (this === accHeads[i] && !parent.classList.contains('open')) {
//                 this.parent.classList.add('open');
//                 this.nextEl.style.maxHeight = article.scrollHeight + 'px';
//             }
//             else {
//                 this.parent.classList.remove('open');
//                 this.nextEL.style.maxHeight = '0px';
//             }
//         }
//     }




// const accordion = new Accordeon(
//                         document.getElementById('container'),
//                         {collapseOther: false}
//                     );


// accordion.init();
// accordion.open(1);
// accordion.close(0);
// accordion.toggle(1);
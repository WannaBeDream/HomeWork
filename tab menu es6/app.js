class Tabset {
    static HEAD_ACTIVE_CLASS = 'tabset-header-active';
    static BODY_OPEN_CLASS = 'tabset-body-open';
    static CONTAINER_TABS = 'container-tabs'
    static COLLAPSE = true;

    constructor(element) {
        this.container = element;

        this.init();
    }
    init() {
        this.bindEventListener();
        // this.addContainerAndReplaceHeaders();
    }
    bindEventListener() {
        this.container.addEventListener('click', (e) => this.onContainerClick(e));
    }

    onContainerClick(e) {
        if (e.target.classList.contains('tabset-heading')) {
            this.toggleElement(e.target.parentNode);
        }
    }

    toggleElement(el) {
        if (el.children[1].classList.contains(Tabset.BODY_OPEN_CLASS)) {
            this.closeElement(el);
        } else {
            this.openElement(el);
        }
    }

    closeElement(el) {
        el.children[0].classList.remove(Tabset.HEAD_ACTIVE_CLASS)
        el.children[1].classList.remove(Tabset.BODY_OPEN_CLASS);
    }

    closeAllElements() {

        [].forEach.call(this.container.children, this.closeElement);

    }

    openElement(el) {
        if (Tabset.COLLAPSE) {
            this.closeAllElements();
        }

        el.children[0].classList.add(Tabset.HEAD_ACTIVE_CLASS);
        el.children[1].classList.add(Tabset.BODY_OPEN_CLASS);
    }

    toggle(index) {
        this.toggleElement(this.container.children.children[index]);
    }




}

const tabs = new Tabset(document.getElementById('container'));




// addContainerAndReplaceHeaders() {
    //     let containerForHeaders = document.createElement('div');
    //     containerForHeaders.className = Tabset.CONTAINER_TABS;
    //     this.container.parentNode.insertBefore(containerForHeaders,this.container.parentNode.childNodes[0]);

    //     this.tabHeads = document.getElementsByClassName('tabset-heading'); 
    //     for(let i = 0; i < this.tabHeads.length; i++) {
    //         containerForHeaders.appendChild(this.tabHeads[i]);
    //     }


    //      containerForHeaders.appendChild(this.tabs);
    // }









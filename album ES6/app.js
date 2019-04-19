class Album {
    static CONTAINER_CLASS = 'container__album';
    static ITEM_CLASS = 'album__item-img';
    static MAIN_ITEM_CLASS = 'album__main-img';

    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.addClassAndEventListener();
        this.getAndAddMainElement();
    }

    addClassAndEventListener() {
        this.element.classList.add(Album.CONTAINER_CLASS);
        this.element.addEventListener('mouseover', this.onAddMainImg.bind(this));
        Array.prototype.forEach.call(this.element.children, (el) => {
            el.classList.add(Album.ITEM_CLASS);
        })
    }

    getAndAddMainElement() {
        let liEl = document.createElement('li');
        this.mainImg = document.createElement('img');
        liEl.appendChild(this.mainImg);

        this.element.insertBefore(liEl, this.element.children[0]);
        this.mainImg.classList.add(Album.MAIN_ITEM_CLASS);
    }

    onAddMainImg(event) {
        if (event.target.classList == Album.ITEM_CLASS) {
            this.mainImg.src = event.target.children[0].src;
        }
    }
}

const album = new Album(document.getElementById('container'));


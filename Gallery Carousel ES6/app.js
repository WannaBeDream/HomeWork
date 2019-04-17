
class Carousel {
    constructor(el, { delay }) {
        this.el = el;
        this.delay = delay;
        this.init();
    }
    init() {
        this.createBtn();
        this.addEventListener();
        this.viewingFirstImage();
        this.autoViewingNextImage();
    }
    createBtn() {
        let btnPrivious = document.createElement('button');
        let btnNext = document.createElement('button');
        btnPrivious.classList = 'container__btn-previous';
        btnNext.classList = 'container__btn-next';

        this.el.parentNode.insertBefore(btnPrivious, this.el.parentNode.children[0]);
        this.el.parentNode.insertBefore(btnNext, this.el.parentNode.children[2]);
    }
    autoViewingNextImage() {
        this.viewingNextImage();
        setTimeout(() => this.autoViewingNextImage(), this.delay);
    }
    viewingPrewImage() {
        if (!(this.currentElemViewing == this.el.firstElementChild)) {
            this.changeShowImage(this.currentElemViewing.previousElementSibling);
        } else this.viewingLastImage();
    }
    viewingNextImage() {
        if (!(this.currentElemViewing == this.el.lastElementChild)) {
            this.changeShowImage(this.currentElemViewing.nextElementSibling);
        } else this.viewingFirstImage();
    }
    changeShowImage(el) {
        this.hiddenImage(this.currentElemViewing);
        this.viewingImage(el);
        this.currentElemViewing = el;
    }
    viewingFirstImage() {
        this.changeShowImage(this.el.firstElementChild);
    }
    viewingLastImage() {
        this.changeShowImage(this.el.lastElementChild);
    }
    hiddenImage(el) {
        !el || !el.classList.remove('active');
    }
    viewingImage(el) {
        el.classList.add('active');
    }
    addEventListener() {
        this.el.parentNode.children[0].addEventListener('click', () => this.onBtnPrevClick());
        this.el.parentNode.children[2].addEventListener('click', () => this.onBtnNextClick());
    }
    onBtnPrevClick() {
        this.viewingPrewImage();
    }
    onBtnNextClick() {
        this.viewingNextImage();
    }
    show(index) {
        this.changeShowImage(this.el.children[index]);
    }
    next() {
        this.viewingNextImage();
    }
    prev() {
        this.viewingPrewImage();
    }
}


const myGallery = new Carousel(document.getElementById('container__gallery'), { delay: 2000 });
// myGallery.next()
// myGallery.show(0)
// myGallery.prev()


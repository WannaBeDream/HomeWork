
class Carousel {
    constructor(el,  delay ) {
        this.el = el;
        this.config = delay;
        this.init();
    }
    init() {
        this.createBtn();
        this.addEventListener();
        this.showFirstImage();
        this.autoShowNextImage();
    }
    createBtn() {
        let btnPrivious = document.createElement('button');
        let btnNext = document.createElement('button');
        btnPrivious.classList = 'container__btn-previous';
        btnNext.classList = 'container__btn-next';

        this.el.parentNode.insertBefore(btnPrivious, this.el.parentNode.children[0]);
        this.el.parentNode.insertBefore(btnNext, this.el.parentNode.children[2]);
    }
    autoShowNextImage() {
        this.showNextImage();
        setTimeout(() => this.autoShowNextImage(), this.config.delay);
    }
    showPrewImage() {
        if (this.currentElemViewing != this.el.firstElementChild) {
            this.changeShowImage(this.currentElemViewing.previousElementSibling);
        } else this.showLastImage();
    }
    showNextImage() {
        if (this.currentElemViewing != this.el.lastElementChild) {
            this.changeShowImage(this.currentElemViewing.nextElementSibling);
        } else this.showFirstImage();
    }
    changeShowImage(el) {
        this.unShowImage(this.currentElemViewing);
        this.showImage(el);
        this.currentElemViewing = el;
    }
    showFirstImage() {
        this.changeShowImage(this.el.firstElementChild);
    }
    showLastImage() {
        this.changeShowImage(this.el.lastElementChild);
    }
    unShowImage(el) {
        el && el.classList.remove('active');
    }
    showImage(el) {
        el.classList.add('active');
    }
    addEventListener() {
        this.el.parentNode.children[0].addEventListener('click', () => this.onBtnPrevClick());
        this.el.parentNode.children[2].addEventListener('click', () => this.onBtnNextClick());
    }
    onBtnPrevClick() {
        this.showPrewImage();
    }
    onBtnNextClick() {
        this.showNextImage();
    }
    show(index) {
        this.changeShowImage(this.el.children[index]);
    }
    next() {
        this.showNextImage();
    }
    prev() {
        this.showPrewImage();
    }
}


const myGallery = new Carousel(document.getElementById('container__gallery'), { delay: 2000 });
// myGallery.next()
// myGallery.show(0)
// myGallery.prev()


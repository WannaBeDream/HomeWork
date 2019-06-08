
import ToDoCollection from './collection';
import config from './config';
import TodoView from './view';
export default class ToDoController {
    constructor() {
        console.log('contorller constructor');

        this.collection = new ToDoCollection(config.contactsUrl);
        this.view = new TodoView('#table-list')

        this.render();

        this.view.onClick = (id) => this.rename(id);
        this.view.onBtnClick = (id) => this.delete(id);


    }

    rename(id) {
        const model = this.collection.get(id);

        model.name = ' qqqqq';

        model.save()
            .then(this.render());
    }

    delete(id) {
        const model = this.collection.get(id); // колекция удали онтакт => 

        model.remove()
            .then(this.render());

    }


    render() {
        this.collection.fetch()
            .then((data) => this.view.render(data));

    }
}
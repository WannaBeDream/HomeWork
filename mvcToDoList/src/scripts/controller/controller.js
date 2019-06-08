
import '../../styles/list.css';

import ToDoCollection from '../model/collection';
import config from '../config';
import TodoView from '../view/view';
import Header from '../view/header';


export default class ToDoController {
    constructor() {
        console.log('contorller constructor');

        this.collection = new ToDoCollection(config.toDoUrl);
        this.header = new Header();
        this.view = new TodoView();

        this.renderData = this.renderData.bind(this);

        this.header.onAddToDo = (todo) => this.addTodo(todo);
        this.view.onDelete = (id) => this.deleteToDo(id);
        this.view.onChangeState = (id) => this.changeState(id);

        // this.modal.onSave = (model) => this.saveToDo(model);

        this.collection
            .fetch()
            .then(this.renderData);

    }

    renderData() {
        this.view.render(this.collection.list)
    }

    deleteToDo(id) {
        this.collection
            .delete(id)
            .then(this.renderData);
    }

    changeState(id) {
        this.collection
            .changeModelState(id)
            .then(this.renderData);
    }

    addTodo(model) {
        this.collection
            .addTodo(model)
            .then(this.renderData);
    }


}
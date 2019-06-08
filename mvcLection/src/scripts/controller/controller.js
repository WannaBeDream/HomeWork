
import '../../styles/list.css';

import ToDoCollection from '../model/collection';
import config from '../config';
import TodoView from '../view/view';
import ContactModal from '../view/modal';
import Header from '../view/header';
import ToDoModel from '../model/model';

export default class ToDoController{
    constructor(){
        console.log('contorller constructor');

        this.collection = new ToDoCollection(config.contactsUrl);
        this.header = new Header();
        this.view = new TodoView();
        this.modal = new ContactModal();

        this.renderData = this.renderData.bind(this);

        this.header.onAddContact = () => this.showContactForm(new ToDoModel(config.contactsUrl, {})); 
        this.view.onDelete = (id) => this.deleteContact(id);
        this.view.onEdit = (id) => this.editContact(id);
        this.modal.onSave = (model) => this.saveContact(model);

        this.collection
            .fetch()
            .then(this.renderData);

    }

    renderData(){
        this.view.render(this.collection.list)
    }

    showContactForm(contact){
        this.modal.show(contact);
    }

    deleteContact(id){
        this.collection
            .delete(id)
            .then(this.renderData);
    }

    editContact(id){
        const model = this.collection.get(id);
        this.showContactForm(model);
    }

    saveContact(model){
        if (!model.id){
            this.collection.add(model);
        }
        model.save()
            .then(this.renderData);
    }
}
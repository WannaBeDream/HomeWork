import ToDoModel from "./model";

export default class ToDoControler{
    constructor() {
        console.log('controller constructor');

        this.model = new ToDoModel();
    }
}
import ToDoModel from "../model/model";

export default class ToDoCollection{
    constructor(url){
        this.url = url;
        this.list = [];

        this.setData = this.setData.bind(this);

        console.log('collection', url);
    }

    fetch(){
        console.log('fetching')
        return fetch(this.url)
                .then((response => response.json()))
                .then(this.setData)
    }

    setData(list){
        return this.list = list.map(el => new ToDoModel(this.url, el));
    }

    get(id){
        return this.list.find(el => el.id == id);
    }

    delete(id){
        const model = this.get(id);

        // Оптимистичное выполнение
        model.delete();
        this.list = this.list.filter(item => item != model);
        return Promise.resolve();
        // 
        // return model.delete()
        //     .then(() => {
        //         this.list = this.list.filter(item => item != model);
        //     });
    }

    add(model){
        this.list.push(model);
    }
}
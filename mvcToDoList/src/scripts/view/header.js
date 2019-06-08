import $ from 'jquery';

export default class Header{
    constructor(){
        this.appendElement();

        this.$addInputBtn = $('#addInputBtn');
    }

    appendElement(){
        this.$el = $(
            `<div class="row">
                <input type="text" id="addInputBtn">
                <button id="addToDoBtn" class="button-primary">Add</button>
            </div>`
        );

        $(document.body).append(this.$el);

        const todo = {
            title: $addInputBtn.val()
        };

        this.$el.find('#addToDoBtn').on('click',()=>{
            this.onAddToDo && this.onAddToDo(todo);
        });
    }
}
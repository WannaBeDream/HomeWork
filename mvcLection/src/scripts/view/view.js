import $ from 'jquery';

export default class TodoView{
    constructor(){
        this.appendElement();

        this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
        this.onEditBtnClick = this.onEditBtnClick.bind(this);

        this.$el.on('click', 'button.delete-btn', this.onDeleteBtnClick);
        this.$el.on('click', 'button.edit-btn', this.onEditBtnClick);
    }

    appendElement(){
        this.$el = $(
            `<table class="u-full-width">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="contactsList"></tbody>
            </table>`
        );

        this.$list = this.$el.find('#contactsList');

        $(document.body).append(this.$el);
    }

    getId(el){
        return $(el).closest('.contact-row').data('contactId');
    }

    onDeleteBtnClick(event){
        const id = this.getId(event.target);
        this.onDelete && this.onDelete(id);
    }

    onEditBtnClick(event){
        const id = this.getId(event.target);
        this.onEdit && this.onEdit(id);
    }

    render(data){
        this.$list.html(
            data.map(this.renderItem).join('\n')
        )
    }

    renderItem(el){
        return `<tr class="contact-row" data-contact-id="${el.id}">
                    <td>${el.name} ${el.surname}</td>
                    <td>${el.phone}</td>
                    <td>${el.email}</td>
                    <td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>
                </tr>`
    }
}   
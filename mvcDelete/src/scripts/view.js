import $ from 'jquery';

export default class TodoView{
    constructor(elId){
        this.$el = $(elId);

        this.onTdElementClick = this.onTdElementClick.bind(this);
        this.onBtnElementClick = this.onBtnElementClick.bind(this);

        this.$el.on('click', 'tr[data-id]', this.onTdElementClick);
        this.$el.on('click', 'button', this.onBtnElementClick);
    }

    onTdElementClick(event){
        const id = $(event.target).parent("tr").data('id');
        // console.log(id, $(this))
        this.onClick(id);
    }

    onBtnElementClick(event){
        const id = $(event.target).parents("tr").data('id');
        this.onBtnClick(id);
    }

    render(data){
        this.$el.html(
           `${data.map(this.renderItem).join('\n')}`
        )
    }

    renderItem(el){
        return `
        <tr data-id="${el.id}">
        <td>${el.id}</td>
        <td>${el.name}</td>
        <td>${el.surname}</td>
        <td>${el.email}</td>
        <td>${el.phone}</td>
        <td>
        <button data-delete>Del</button>
        </td>
        </tr>
        `;
    }
}   
import $ from 'jquery';

export default class TodoView{
    constructor(elId){
        this.$el = $(elId);

        this.onTdElementClick = this.onTdElementClick.bind(this);
        this.onBtnElementClick = this.onBtnElementClick.bind(this);

        this.$el.on('click', 'td[data-name]', this.onTdElementClick);
        this.$el.on('click', 'button', this.onBtnElementClick);
    }

    onTdElementClick(event){
        const id = $(event.target).parent("tr").data('id');
        // console.log(id, $(this))
        this.onClick(id);
    }

    onBtnElementClick(event){
        const id = $(event.target).parents("tr").data('id');
        this.onBtnClick && this.onBtnClick(id); // чтобы не было ошибки(проверка)
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
        <td data-name>${el.name}</td>
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

//абстрактное представление 
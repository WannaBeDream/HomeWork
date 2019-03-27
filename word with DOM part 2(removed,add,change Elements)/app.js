const ulList = document.querySelector('ul');   
 //  const ulList = document.getElementsByTagName('ul');
const formatButton = document.querySelector('button')  
//  const formatButton = document.getElementsByTagName('button')
    .addEventListener('click', changeList);
    
function changeList() {
    const createdLi = document.createElement('li');
    createdLi.textContent = 'Phoenix qwe asd zxc'; 
    // createdLi.innerText = 'bla bla bla';                                                      
    ulList.appendChild(createdLi);
    // ulList.insertBefore(createdLi, ulList.lastChild[-1]);
    createdLi.addEventListener('click', getPowerButtonClick);
    createdLi.addEventListener('click', function (event) {
        if (event.altKey) 
            this.parentNode.removeChild(createdLi);
    })
};


function toggleBackgroundColor(element) {
    element.style.background =
        element.style.background === 'green' ? 'yellow' : 'green';
};


function getPowerButtonClick(event) {
    toggleBackgroundColor(event.target);
};


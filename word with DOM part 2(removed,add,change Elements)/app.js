const ulList = document.querySelector('ul');   
 //  const ulList = document.getElementsByTagName('ul');
const formatButton = document.querySelector('button');  
//  const formatButton = document.getElementsByTagName('button')

    formatButton.addEventListener('click', getNewList);
    ulList.addEventListener('click', toggleBackgroundColor);
    ulList.addEventListener('click', removeElement);
    
function getNewList() {
    const createdLi = document.createElement('li');
    createdLi.textContent = 'Phoenix qwe asd zxc'; 
    // createdLi.innerText = 'bla bla bla';  // inerHTML                                                   
    ulList.appendChild(createdLi);
    // ulList.insertBefore(createdLi, ulList.lastChild[-1]);
};

function toggleBackgroundColor(elem) {
    if(elem.target.tagName === 'LI') 
        elem.target.style.background =
            elem.target.style.background === 'green' ?
            'yellow' : 'green';
};


function removeElement(elem) {
    if(elem.target.tagName === 'LI')
        if(elem.altKey) elem.target.remove(); 
}


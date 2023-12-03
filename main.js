let categoriesSelected=[];
let categories=[];

window.onload= function (){
    if(localStorage.getItem('categories')){
        categoriesSelected=localStorage.getItem('categories').split(',')
    }else{
        categoriesSelected=[];
    }
    loadCategories();

}
function loadCategories(){
    //pasar a const
    let URL = "https://api.chucknorris.io/jokes/categories";
        fetch(URL)
        .then(respuesta =>{
            if(!respuesta.ok){
                throw new Error('Error en la obtención de las categorias');
            }
            return respuesta.json()
        })
        .then(res => {
            if(res){
                categories=res;
                renderCategories();
            }else{
                console.error('Categorias no encontradas');
            }
        })
        .catch(error => console.log('Error:' + error))
}

function renderCategories(){
    categories.forEach(categorie => {
        let categoriesContainer=document.querySelector('.options');
        let option=document.createElement('div');
        option.classList.add('option');
        if(categoriesSelected?.length>0){
            if(categoriesSelected.includes(categorie)){
                option.classList.add('selected');
            }
        }
        option.addEventListener('click', function() {select(option)});
        let optionText=document.createElement('p');
        optionText.textContent=categorie;
        option.appendChild(optionText);
        categoriesContainer.appendChild(option);
    });
    getJoke();
}
function reset(){
    let selected=document.querySelectorAll('.selected');
    categoriesSelected=[];
    localStorage.removeItem('categories');
    selected.forEach(option => {
        option.classList.remove('selected');
    });
    getJoke();

}

function getJoke(){
    let selected=localStorage.getItem('categories');
    let URL = "https://api.chucknorris.io/jokes/";

    if(selected){
        URL +='random?category='+selected;
    }else{
        URL +='random';
    }
    fetch(URL)
    .then(respuesta =>{
        if(!respuesta.ok){
            throw new Error('Error en la obtención de las categorias');
        }
        return respuesta.json()
    })
    .then(res => {
        if(res){
            let joke=document.querySelector('.sentence__title');
            joke.textContent=`"${res.value}"`;
        }else{
            console.error('Categorias no encontradas');
        }
    })
    .catch(error => console.log('Error:' + error))
}

function select(element){
    if(element.classList.contains('selected')){
        element.classList.remove('selected');
        categoriesSelected=categoriesSelected.filter((categorie) => categorie !==element.firstChild.textContent);
    }else{
        element.classList.add('selected');
        categoriesSelected.push(element.firstChild.textContent);
    }
    localStorage.setItem('categories',categoriesSelected);
}


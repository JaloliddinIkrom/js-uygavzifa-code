 
//  const elForm = document.querySelector('.js-form'); 
//  const elSpan = document.querySelector('.js-span'); 
//  const elInp1 = document.querySelector('.js-inp1'); 
//  const elInp2 = document.querySelector('.js-inp2'); 
//  const elInp3 = document.querySelector('.js-inp3'); 
//  const elText = document.querySelector('.js-text');   

 
// let array = ['olma', 'nok', 'gilos', 'orik']; 
// elText.textContent = array;

//  elForm.addEventListener('submit', function(evt) { 

//   evt.preventDefault(); 
  
//   var eliput1 = elInp1.value; 
//   var eliput2 = elInp2.value; 
//   var eliput3 = elInp3.value;

//   array.splice(eliput1,eliput2,eliput3); 
//   elSpan.textContent = array;

//  }); 



//-------------------------------------------------2-masalaTudus----------------------------------------------------
  
 const elForm = document.querySelector('.js-form'); 
 const elList = document.querySelector('.js-list');
 const elInp = document.querySelector('.js-input');  
 const elbtn1 = document.querySelector('.js-all');  
 const elbtn2 = document.querySelector('.js-complated');  
 const elbtn3 = document.querySelector('.js-uncomlated'); 
 const elBtngrop = document.querySelector('.js-btn-grop');
 
 const WinData = JSON.parse(window.localStorage.getItem('list'));

 const neArray = WinData || [];
 

 let Tudus = (array, node) => { 
  
  elbtn1.textContent = neArray.length;
  elbtn2.textContent = neArray.filter((item) => item.isComplated).length; 
  elbtn3.textContent = neArray.filter((item) => !item.isComplated).length; 

   node.innerHTML = '';

    array.forEach((item) => {

        let elItim = document.createElement('li'); 
        let elSpan = document.createElement('span');   
        let elBten = document.createElement('button');
        let elInput1 = document.createElement('input'); 
        
      
    
        elSpan.textContent = item.text;
        elInput1.type = 'checkbox';
        elBten.textContent = 'DELETE';
         
        elItim.appendChild(elInput1); 
        elItim.appendChild(elSpan);
        elItim.appendChild(elBten);
      
        
        elItim.setAttribute('class', 'd-flex align-items-center mb-2');
        elInput1.setAttribute('class', 'form-check-input me-2 js-checke');
        elBten.setAttribute('class', 'ms-auto btn btn-danger js-btn'); 
        elBten.dataset.todoId = item.id; 
        elInput1.dataset.todoId = item.id;

        node.appendChild(elItim); 

        if(item.isComplated ){ 

        elSpan.setAttribute('class', 'bg-warning text-dark text-decoration-line-through rounded p-2'); 
          
        elInput1.checked = true;

        }
    });
 };  

 Tudus(neArray, elList);  
 //=============================================================================================================
  
 elForm.addEventListener('submit', (evt) => { 

    evt.preventDefault(); 

    let elInpVal = elInp.value;  
    elInp.value = '';

     neArray.push({ 

       id: neArray.length ? neArray[neArray.length - 1].id + 1 : 1,
       text: elInpVal,
       isComplated: false,

     });
     elList.innerHTML = '';
     Tudus(neArray, elList); 

     window.localStorage.setItem('list', JSON.stringify(neArray));
 }); 

 //====================================================================================================

elList.addEventListener('click', function(evt){ 

 if(evt.target.matches('.js-btn')){ 

    let todoId = evt.target.dataset.todoId;

    let findedIndex = neArray.findIndex((el) => el.id == todoId); 

   neArray.splice(findedIndex, 1); 
   Tudus(neArray, elList); 
  
   window.localStorage.setItem('list', JSON.stringify(neArray));
 } 

 if(evt.target.matches('.js-checke')){ 

  let toduId = +evt.target.dataset.todoId;

  let findedItem = neArray.find((el) => el.id === toduId);

  findedItem.isComplated = !findedItem.isComplated; 

  Tudus(neArray, elList);  
  window.localStorage.setItem('list', JSON.stringify(neArray));
 }

}); 

//-------------------------------------------------------------------------------
 

let elBtn = document.querySelector('.js-butten');

var RostYolgon = false;

elBtn.addEventListener('click', function() { 

   RostYolgon = !RostYolgon;  

   var Rost = RostYolgon ? 'dark' : 'light'; 

   window.localStorage.setItem('RostYolgon', Rost);
  
   domgachiqish();
});
 
function domgachiqish (){ 

  if(window.localStorage.getItem('RostYolgon') == 'dark'){ 

    document.body.classList.add('dark');
    window.localStorage.setItem('list', JSON.stringify(neArray));
  } else{ 

    document.body.classList.remove('dark');
    window.localStorage.setItem('list', JSON.stringify(neArray));
  }
} 
domgachiqish();


 //==========================================================================

 elBtngrop.addEventListener('click', function(evt) { 
  
  if(evt.target.matches('.js-ball1')){ 


    Tudus(neArray, elList); 
  } 
  if(evt.target.matches('.js-com2')){ 

  let ArrayNew = neArray.filter((item) => item.isComplated);
    Tudus(ArrayNew, elList); 
  } 
  if(evt.target.matches('.js-uncom3')){ 

    let ArrayNew = neArray.filter((item) => !item.isComplated);
    Tudus(ArrayNew, elList); 
  
  }

 })

//================================================================================ 
 
 



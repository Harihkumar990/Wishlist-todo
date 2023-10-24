// UUID created unique id 
function uuid(){
    return "xxxx-yyyy-yxyx-xyxy".replace(/[xy]/g,function(c){
        var r=Math.random()*16|0;
        var v=c=='x'? r:(r & 0x3 |0x8);
        return v.toString(12);
    })
}
let button = document.querySelector(".submit-btn");

let input = document.querySelector(".input-txt");

let todo="";
let localdata = JSON.parse(localStorage.getItem("todo"))
let todolist  = localdata || [];
let showtodo = document.querySelector(".todo-container")

// Take INput from user and save into local storage by a uniqueid and its completed or not 
button.addEventListener("click", (event)=>{
    event.preventDefault();
    todo = input.value;
    if(todo.length>0){
        todolist.push({todo,id:uuid(),isCompleted:false});
        
    }
    localStorage.setItem("todo",JSON.stringify(todolist))
    rendertodolist(todolist)
    input.value="";

    
})

showtodo.addEventListener("click", (event) => {
    event.preventDefault()
   let key = event.target.dataset.key;
   let delkey = event.target.dataset.todokey;
   todolist = todolist.map((todo) => todo.id === key ? {...todo,isCompleted:!todo.isCompleted}:todo)
   todolist = todolist.filter((todo) => todo.id !== delkey);
   localStorage.setItem("todo",JSON.stringify(todolist))
   rendertodolist(todolist);  
   console.log(todolist);
});

function rendertodolist(todolist){
 showtodo.innerHTML=todolist.map(({todo,id,isCompleted})=> 
 `<div class="todo-input"> 
 <input class="checkbox-input " id="item-${id}" data-key=${id}  type='checkbox' ${isCompleted ? "checked": ""}>
 <label class="todo-label  ${
    isCompleted ? "checked-todo" : ""
  }" data-key=${id}>  ${todo} </label>
 <button type=button class="delete-button"  > <span   class="material-symbols-outlined"  data-todokey=${id}>
delete</span></button></div>`
 )   
}
rendertodolist(todolist);
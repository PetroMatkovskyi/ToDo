const addMessage = document.querySelector('.message'),
  addButton = document.querySelector('.add'),
  todo = document.querySelector('.todo'),
  body = document.querySelector('body');

class WorkWithToDo {
  #num = 0;
  #list = 'myDay';
  constructor() {}
  // Придумати як обновляти сторінку. Або з видаленням всього або точково.
  //  Може ввести пееключатель для показу підгружена чи сторінка (true)
  get numList() {
    return this.#num;
  }

  set newNum(newNum) {
    if (typeof newNum === 'number') {
      this.#num = newNum;
    }
  }

  get taskList() {
    return this.#list;
  }
  // !!!!!!====!!!!!
  set changList(list) {
    if (typeof list === 'string') {
      for (let item in todoList[this.numList].toDo) {
        if (item === list) {
          this.#list = list;
        }
      }
    }
  }

  renderTaskList() {
    let list = document.getElementById('list');
    list.innerHTML = '';
    let profile = todoList[this.numList];
    let str = '';

    // покищо працює тільки з першим користуваче myDay

    profile.toDo[this.taskList].forEach((item, index) => {
      str += `
      <li id='item_${index}'>
      <input type='checkbox' class='item_${index} check_task' ${
        item.checked ? 'checked' : ''
      }>
      <label for='item_${index}'>${item.task}</label>    
      <button class='remove_task item_${index}'>X</button>
      </li>
      `;
    });

    list.insertAdjacentHTML('afterbegin', `${str}`);
  }

  renderToDo(insert) {
    // let profile = todoList[this.numList];
    // поміняти

    let profile = todoList[0];
    insert.innerHTML = '';

    insert.insertAdjacentHTML(
      'afterbegin',
      `<nav>
      <div id='login'><p>${profile.login}</p></div>
    <div class="item name_list" id="myDay">
      <img class="label " src="img/sun.png" alt="sun" />
      <h2>My day</h2>
      <p class="count">${profile.toDo.myDay.length}</p>
    </div>
    <div class="item name_list" id="important">
      <img class="label" src="img/star.png" alt="star" />
      <h2>Important</h2>
      <p class="count">${profile.toDo.important.length}</p>
    </div>
  </nav> 
   <main>
   <div >
   <div class="wrapper">
   <ul id="list"></ul>
 </div>
    <input id='new_task' type="text" placeholder="Task" />
    <button class="addTask">Додати</button>
    </div>
  
  </main>`
    );
  }

  checkToDoInStorage() {
    return localStorage.getItem('todo');
  }

  createNewUser(form) {
    const newUser = {};
    for (let i = 0; i < form.length; i++) {
      const userData = form[i];
      if (
        userData.name !== 're-password' &&
        userData.name !== 'submit' &&
        userData.name !== 'reset'
      ) {
        newUser[userData.name] = `${userData.value}`;
      }
    }
    newUser.toDo = {
      myDay: [],
      important: [],
    };

    todoList.push(newUser);
  }

  upload() {
    return JSON.parse(localStorage.getItem('todo'));
  }

  //Збереження в Local Storage
  saveToDo() {
    localStorage.setItem('todo', JSON.stringify(todoList));
  }

  // знайти юзера
  findUser(typeForm) {
    const storageToDo = JSON.parse(localStorage.getItem('todo'));
    let formReq = document.querySelectorAll(`${typeForm} ._req`);
    forForm.removeError(formReq[1]);
    let match = false;

    for (let i = 0; i < storageToDo.length; i++) {
      forForm.removeError(formReq[0]);

      if (storageToDo[i].login === formReq[0].value) {
        match = !match;
        if (storageToDo[i].password === formReq[1].value) {
          this.newNum = i;
          return match;
        } else {
          console.log('findUser пароль не правильний');
          const input = formReq[1];
          forForm.addError(input);
          return;
        }
      }
    }

    if (formReq[0].value === '') {
      forForm.addError(formReq[0]);
      console.log('findUser Введіть логін');
    } else if (!match) {
      console.log('findUser Юзера не існує');
      forForm.addError(formReq[0]);
    }
  }

  addTask(t) {
    let newTask = {
      done: false,
      task: `${t}`,
      important: false,
    };

    todoList[this.numList].toDo[this.taskList].push(newTask);
  }

  removeTask(numTask) {
    let task = todoList[this.numList].toDo[this.taskList];
    console.log(task, numTask);
    task.splice(numTask, 1);
  }
}

const ToDo = new WorkWithToDo(),
  newTask = document.getElementById('new_task');

let todoList = [];

if (ToDo.checkToDoInStorage()) {
  todoList = ToDo.upload();
}

document.addEventListener('click', (event) => {
  // Відправка нової таски в список
  if (event.target.classList.contains('addTask')) {
    const newTask = document.getElementById('new_task');
    if (newTask.value !== '') {
      ToDo.addTask(newTask.value);
      ToDo.saveToDo();
      ToDo.renderToDo(body);
      ToDo.renderTaskList();
      console.log(newTask.value);
    }
  }
  if (event.target.classList.contains('remove_task')) {
    // Знаходження номер таски
    const regexp = /\d+/;
    let numTask = Number(event.target.classList.value.match(regexp).join(''));
    const task = todoList[0].toDo['myDay'];
    // console.log(task);
    ToDo.removeTask(numTask);
    ToDo.saveToDo();
    ToDo.renderToDo(body);
    ToDo.renderTaskList();
  }
  if (event.target.classList.contains('name_list')) {
    let id = event.target.id;
    ToDo.changList = id;
    ToDo.renderTaskList();
    console.log(ToDo.taskList);
  }
});

// Потрібно поле для мого дня і важливого !!!

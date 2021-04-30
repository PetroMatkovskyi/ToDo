const addMessage = document.querySelector('.message'),
  addButton = document.querySelector('.add'),
  todo = document.querySelector('.todo'),
  body = document.querySelector('body');

class WorkWithToDo {
  #num = 0;
  #list = 'myDay';
  constructor() {}

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
      for (let item in data.todoList[this.numList].toDo) {
        if (item === list) {
          this.#list = list;
        }
      }
    }
  }

  renderTaskList() {
    let list = document.getElementById('list');
    let profile = data.todoList[this.numList];
    let str = '';

    list.innerHTML = '';
    profile.toDo[this.taskList].forEach((item, index) => {
      str += `
      <li id='item_${index}' class='item_list ${item.done ? 'done' : ''}'>
      <div>
      <input type='checkbox' ${
        item.done ? 'checked = ' + item.done : ''
      } class='item_${index} check_task '>
      <label for='item_${index}' class=''>${item.task}</label>
      </div>    
      <button class='remove_task item_${index}'>X</button>
      </li>
      `;
    });

    list.insertAdjacentHTML('afterbegin', `${str}`);
  }

  renderToDo(insert) {
    let profile = data.todoList[this.numList];
    insert.innerHTML = '';

    insert.insertAdjacentHTML(
      'afterbegin',
      `<nav>
      <div>
      <div id='login'><h1>${profile.login}</h1></div>
    <div class="list_container" >
      <img class="label " src="img/sun.png" alt="sun" />
      <h2 id="myDay" class='name_list'>My day</h2>
      <p class="count">${profile.toDo.myDay.length}</p>
    </div>
    <div class="list_container" >
      <img class="label" src="img/star.png" alt="star" />
      <h2 id="important" class='name_list'>Important</h2>
      <p class="count">${profile.toDo.important.length}</p>
    </div>
    </div>
    <div id='quote'></div>
  </nav> 
   <main>
   <div>
   <h3></h3>
   <div id='weather'>${data.main.weather}</div>
   <div class="wrapper">   
   <ul id="list"></ul>
 </div>
 <div class='wide'>
    <input id='new_task' type="text" placeholder="Task" />
    <button class="addTask">Add</button>
    </div>
    </div>
  </main>`
    );
    this.activeList();
  }

  checkToDoInStorage() {
    return localStorage.getItem('todo');
  }

  setNewUser() {
    data.todoList.length === 0
      ? (this.newNum = 0)
      : (this.newNum = data.todoList.length - 1);
  }

  createNewUser(form) {
    const newUser = {};
    for (let i = 0; i < form.length; i++) {
      const userData = form[i];
      console.log(userData, userData.value);
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
    data.todoList.push(newUser);
    this.setNewUser();
  }

  upload() {
    return JSON.parse(localStorage.getItem('todo'));
  }

  //Збереження в Local Storage
  saveToDo() {
    localStorage.setItem('todo', JSON.stringify(data));
  }

  // знайти юзера
  findUser(typeForm) {
    let formReq = document.querySelectorAll(`${typeForm} ._req`);
    let incor = document.querySelectorAll('.incorect');
    incor.forEach((i) => {
      i.innerHTML = '';
    });
    forForm.removeError(formReq[1]);
    let match = false;

    for (let i = 0; i < data.todoList.length; i++) {
      forForm.removeError(formReq[0]);

      if (data.todoList[i].login === formReq[0].value) {
        match = !match;
        if (data.todoList[i].password === formReq[1].value) {
          this.newNum = i;
          return match;
        } else {
          const input = formReq[1];
          incor[1].innerHTML = 'Не вірний пароль';
          forForm.addError(input);
          return;
        }
      }
    }

    if (formReq[0].value === '') {
      forForm.addError(formReq[0]);
      incor[0].innerHTML = 'Введіть логін';
    } else if (!match) {
      forForm.addError(formReq[0]);
      incor[0].innerHTML = 'Користувача не існує';
    }
  }

  addTask(t) {
    let newTask = {
      done: false,
      task: `${t}`,
      important: false,
    };

    data.todoList[this.numList].toDo[this.taskList].push(newTask);
  }

  findNumTask(event) {
    const regexp = /\d+/;
    let numTask = Number(event.target.classList.value.match(regexp));
    return numTask;
  }

  removeTask(event) {
    const num = this.findNumTask(event);
    let task = data.todoList[this.numList].toDo[this.taskList];
    task.splice(num, 1);
  }

  checkDoneTask(event, newValue) {
    const num = this.findNumTask(event);

    data.todoList[this.numList].toDo[this.taskList][num].done = newValue;
  }

  activeList() {
    if (document.querySelectorAll('.active')) {
      document.querySelectorAll('.active').forEach((i) => {
        i.classList.remove('active');
      });
    }
    let active = document.querySelector(`#${this.taskList}`);
    active.classList.add('active');
  }

  render(body) {
    this.saveToDo();
    this.renderToDo(body);
    this.renderTaskList();
  }
}

const ToDo = new WorkWithToDo(),
  newTask = document.getElementById('new_task');

let data = {main: {}, todoList: []};

if (ToDo.checkToDoInStorage()) {
  data = ToDo.upload();
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('addTask')) {
    const newTask = document.getElementById('new_task');

    if (newTask.value !== '') {
      ToDo.addTask(newTask.value);
      ToDo.render(body);
    }
  }
  if (event.target.classList.contains('remove_task')) {
    ToDo.removeTask(event);
    ToDo.render(body);
  }
  if (event.target.classList.contains('name_list')) {
    ToDo.changList = event.target.id;
    ToDo.render(body);
  }
});

document.addEventListener('change', (event) => {
  if (event.target.classList.contains('check_task')) {
    let value = event.target.checked;
    ToDo.checkDoneTask(event, value);
    ToDo.render(body);
  }
});

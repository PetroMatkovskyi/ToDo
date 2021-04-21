const addMessage = document.querySelector('.message'),
  addButton = document.querySelector('.add'),
  todo = document.querySelector('.todo'),
  body = document.querySelector('body');

class WorkWithToDo {
  #num;
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

  renderTaskList() {
    let list = document.getElementById('list');
    let profile = todoList[0];
    let str = '';
    // покищо працює тільки з першим користуваче myDay
    profile.toDo.myDay.forEach((item, index) => {
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
    let profile = todoList[this.numList];
    insert.insertAdjacentHTML(
      'afterbegin',
      `<nav>
      <div id='login'><p>${profile.login}</p></div>
    <div class="item" id="my_day">
      <img class="label" src="img/sun.png" alt="sun" />
      <h2>My day</h2>
      <p class="count">${profile.toDo.myDay.length}</p>
    </div>
    <div class="item" id="important">
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

    todoList[0].toDo.myDay.push(newTask);
  }

  removeTask() {}
}

const ToDo = new WorkWithToDo();
const newTask = document.getElementById('new_task');

let todoList = [];

if (ToDo.checkToDoInStorage()) {
  todoList = ToDo.upload();
} else {
  // !!!
}
document.addEventListener('click', (event) => {
  // Відправка нової таски в список
  if (event.target.classList.contains('addTask')) {
    const newTask = document.getElementById('new_task');
    if (newTask.value !== '') {
      ToDo.addTask(newTask.value);
      ToDo.saveToDo();
      ToDo.renderToDo(body);

      console.log(newTask.value);
    }
  }
  if (event.target.classList.contains('remove_task')) {
  }
});
// При вході в прогу створити змінну з списком туду за логіном і при виборі мій день чи важливе також(зроблено через анонімне поле)
// підгружати і працювати тільки з одним профілем а не із усіма(зроблено через анонімне поле)
// Потрібно поле для мого дня і важливого !!!

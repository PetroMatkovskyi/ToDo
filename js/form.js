'use strict';

class RenderForm {
  #check = true;
  #formActive = true;

  constructor() {}

  get check() {
    return this.#check;
  }

  set changeCheck(newCheck) {
    if (typeof newCheck === 'boolean') {
      this.#check = newCheck;
    }
  }

  renderLoginForm(insert) {
    if (this.check) {
      insert.insertAdjacentHTML(
        'afterbegin',
        `<div id="sing_in" class="form_container _inactive form_sing_in">
        <form id="check_form" action="#" class="form_body sing_in">
          <div class="form_item">
            <label for="formName" class="form_label">Your login*</label>
            <input
              id="check_login"
              class="form_input _req"
              type="text"
              name="login"
              placeholder="Your login"
            />
            <p class="incorect"></p>
          </div>
          <div class="form_item">
            <label for="formPassword" class="form_label">Your Password*</label>
            <input
              id="check_password"
              class="form_input _req"
              type="password"
              name="password"
              placeholder="Password"
            />
            <p class="incorect"></p>
          </div>
          <button
            id="check_submit"
            class="form_button check_submit"
            name="submit"
            type="submit"
          >
            submit
          </button>
          <button type="reset">reset</button>
          <p class="change_form">Log in</p>
        </form>
      </div>`
      );
    } else {
      insert.insertAdjacentHTML(
        'afterbegin',
        ` <div id="log_in" class="form_container form_log_in">
        <form action="#" class="form_body form_log_in" id="form">
          <div class="form_item">
            <label for="formName" class="form_label">Your login*</label>
            <input
              id="formName"
              class="form_input _req _login"
              type="text"
              name="login"
              placeholder="Your login"
            />
            <p class="incorect"></p>
          </div>
          <div class="form_item">
            <label for="formEmail" class="form_label _email">Your E-mail*</label>
            <input
              id="formEmail"
              class="form_input _req"
              type="email"
              name="email"
              placeholder="Your E-mail"
            />
            <p class="incorect"></p>
          </div>
          <div class="form_item">
            <label for="formPassword" class="form_label">Your Password*</label>
            <input
              id="formPassword"
              class="form_input _req _password"
              type="password"
              name="password"
              placeholder="Password"
            />
            <p class="incorect"></p>
          </div>
          <div class="form_item">
            <p>Re-enter your Password*</p>
            <input
              type="password"
              class="form_input _req _re_password"
              name="re-password"
              id="password"
              placeholder="Re-enter Password"
            />
            <p class="incorect"></p>
          </div>
          <button id="submit" class="form_button submit" name="submit" type="submit">
            submit
          </button>
          <button class="form_button" type="reset" name="reset">reset</button>
          <p class="change_form">Sing in</p>
        </form>
      </div>`
      );
    }
    this.changeCheck = !this.check;
  }

  removeForm() {
    let form = document.querySelector('.form_container');
    form.remove();
  }
}

const renderForm = new RenderForm();

class WorkWithForm {
  #check = true;
  constructor() {}

  get check() {
    return this.#check;
  }

  set changeCheck(newCheck) {
    if (typeof newCheck === 'boolean') {
      this.#check = newCheck;
    }
  }

  addError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  removeError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
}

const forForm = new WorkWithForm();

class CheckValidForm {
  constructor() {}

  checkForm(e, typeForm) {
    let error = 0;
    let formReq = document.querySelectorAll(`${typeForm} ._req`);

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      forForm.removeError(formReq[i]);
      switch (true) {
        case input.classList.contains('_login'):
          for (let i in todoList) {
            if (todoList[i].login === input.value) {
              forForm.addError(input);
              error++;
              console.log('Логін вжу існує');
            }
          }
          break;
        case input.classList.contains('_password') && input.value.length < 4:
          console.log('Пароль повинен містити не менше 4 символів');
          forForm.addError(input);
          error++;
          break;
        case input.value === '':
          console.log('Заповніть всі поля');
          forForm.addError(input);
          error++;
          break;
      }
    }
    return error;
  }

  isValidate(e, typeForm) {
    let error = 0;
    let formReq = document.querySelectorAll(`${typeForm} ._req`);

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];

      forForm.removeError(formReq[i]);
      switch (true) {
        case input.value === '':
          console.log('Заповніть всі поля');
          forForm.addError(input);
          error++;
          break;
        case input.classList.contains('_login'):
          for (let i in todoList) {
            if (todoList[i].login === input.value) {
              forForm.addError(input);
              error++;
              console.log('Логін вжу існує');
            }
          }
          break;
        case input.classList.contains('_email'):
          if (validate.emailTest(input)) {
            forForm.addError(input);
            error++;
          }
          break;
        case input.classList.contains('_password') && input.value.length < 4:
          console.log('Пароль повинен містити не менше 4 символів');
          forForm.addError(input);
          error++;
          break;
        case input.classList.contains('_re_password') &&
          input.value !== formReq[i - 1].value:
          console.log('Неправильно введений повторний пароль');
          forForm.addError(input);
          error++;
          break;
      }
    }
    return error;
  }

  emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
}

const validate = new CheckValidForm();

document.addEventListener('DOMContentLoaded', () => {
  renderForm.renderLoginForm(body);

  let form = document.getElementById('#form');

  // ???

  document.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('sing_in')) {
      console.log('check_submit');
      check(event);
    } else if (event.target.classList.contains('form_log_in')) {
      formSend(event);
      form = document.querySelector('#form');
      console.log('submit');
    }
  });

  // !!! обєднати в індексі
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('change_form')) {
      renderForm.removeForm();
      renderForm.renderLoginForm(body);
    }
  });

  // Перевірка і пошук юзера!

  async function check(e) {
    // renderForm.removeForm();
    // ToDo.renderToDo(body);

    if (ToDo.findUser('#check_form') >= 0) {
      renderForm.removeForm();
      ToDo.renderToDo(body);
      console.log('findUse');
    }
    // Включити!!!
  }

  // Створення нового юзера

  async function formSend(e) {
    let error = validate.isValidate(form, '#form');

    if (error === 0) {
      ToDo.createNewUser(form);
      ToDo.saveToDo();
      renderForm.removeForm();
      // Розкоментувати!!!!
      ToDo.renderToDo(body);
      ToDo.renderTaskList();
    }
  }
});
// ToDo.renderToDo(body);
// ToDo.renderTaskList();

const addMessage = document.querySelector('.message'),
	addButton = document.querySelector('.add'),
	todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('todo')) {
	todoList = JSON.parse(localStorage.getItem('todo'));
	displayMessages();
}

addButton.addEventListener('click', function () {
	const newTodo = {
		todo: addMessage.value,
		checked: false,
		important: false,
	};

	todoList.push(newTodo);
	displayMessages();

	localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages() {
	let displayMessage = ``;
	todoList.forEach((item, index) => {
		displayMessage += `
    <li>
    <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
    <label for='item_${index}'>${item.todo}</label>    
    </li>
    `;
		todo.innerHTML = displayMessage;
	});
}

todo.addEventListener('change', (event) => {
	let idInput = event.target.getAttribute('id');
	let forLabel = todo.querySelector('[for=' + idInput + ']');
	let valueLabel = forLabel.innerHTML;

	todoList.forEach((item) => {
		if (item.todo === valueLabel) {
			item.checked = !item.checked;
			localStorage.setItem('todo', JSON.stringify(todoList));
		}
	});
});

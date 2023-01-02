import removeList from './removeList.js';
import editList from './editList.js';
import completedList from './completedList.js';

const input = document.querySelector('.todo-input');
const addDesc = document.querySelector('#add-task');
let getLocalStorage = localStorage.getItem('AppData') !== null ? JSON.parse(localStorage.getItem('AppData')) : [];
const li = document.querySelector('#todoList');
let index = getLocalStorage.length;
const clear = document.querySelector('.clear');

export default function DisplayUI() {
  if (getLocalStorage !== null) {
    li.innerHTML = '';
    getLocalStorage.forEach((todo) => {
      li.innerHTML += `
        <li class="listItems">
          <input type="checkbox" class="todo-check" id="checked"  value="${todo.completed}" ${todo.completed === true ? 'checked' : ''}>
          <input type="text" class="description ${todo.completed === true ? 'checked' : ''}" value="${todo.desc}">
          <i class="fa-solid fa-ellipsis-vertical dots"></i>
          <button type="button" id="delete"><i class="fa fa-trash"></i></button>
        </li>
      `;
    });
  }

  for (let i = 0; i < li.querySelectorAll('.listItems').length; i += 1) {
    const listItems = li.querySelectorAll('.listItems')[i];
    // eslint-disable-next-line no-loop-func
    listItems.querySelector('.todo-check').addEventListener('click', () => {
      const result = completedList(i, getLocalStorage);
      localStorage.setItem('AppData', JSON.stringify(result));
      DisplayUI();
    });

    listItems.addEventListener('focusin', () => {
      listItems.querySelector('#delete').style.display = 'block';
      listItems.querySelector('.dots').style.display = 'none';
    });

    // eslint-disable-next-line no-loop-func
    listItems.querySelector('#delete').addEventListener('click', () => {
      const updTodo = removeList(i, getLocalStorage);
      for (let a = i; a < updTodo.length; a += 1) {
        updTodo[a].index -= 1;
      }
      index -= 1;
      localStorage.setItem('AppData', JSON.stringify(updTodo));
      DisplayUI();
    });

    listItems.addEventListener('focusout', (e) => {
      const parent = listItems;
      const leavingParent = !parent.contains(e.relatedTarget);
      if (leavingParent) {
        listItems.querySelector('.dots').style.display = 'block';
        listItems.querySelector('#delete').style.display = 'none';
      }
    });

    // eslint-disable-next-line no-loop-func
    listItems.querySelector('.description').addEventListener('change', (e) => {
      const result = editList(i, getLocalStorage, e.target.value);
      localStorage.setItem('AppData', JSON.stringify(result));
    });
  }
}
addDesc.addEventListener('click', () => {
  if (input.value !== '') {
    index += 1;
    localStorage.setItem('AppData', JSON.stringify(getLocalStorage.push({ index, desc: input.value, completed: false })));
    DisplayUI();
    input.value = '';
  }
});
clear.addEventListener('click', () => {
  getLocalStorage = getLocalStorage.filter((list) => list.completed !== true);
  let i = 0;
  getLocalStorage.forEach((list) => {
    list.index = i + 1;
    i += 1;
  });
  index = getLocalStorage.length;
  localStorage.setItem('AppData', JSON.stringify(getLocalStorage));
  DisplayUI();
});
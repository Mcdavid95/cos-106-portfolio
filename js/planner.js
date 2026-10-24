const STORAGE_KEY = 'cos106-tasks';

const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskCourse = document.getElementById('taskCourse');
const taskDue = document.getElementById('taskDue');
const taskError = document.getElementById('taskError');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const filterButtons = document.querySelectorAll('.filters button');

let currentFilter = 'all';

/**
 * @function loadTasks
 * @returns {array} tasks saved in localStorage, or an empty array
 */
const loadTasks = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
};

let tasks = loadTasks();

/**
 * @function saveTasks
 * @returns {void}
 */
const saveTasks = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

/**
 * @function formatDate
 * @param {string} value date string from the date input (yyyy-mm-dd)
 * @returns {string} readable date e.g. 24 Oct 2026
 */
const formatDate = (value) => {
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

/**
 * @function createTaskItem
 * @param {object} task task to display
 * @returns {HTMLElement} list item for the task
 */
const createTaskItem = (task) => {
  const li = document.createElement('li');
  li.className = task.done ? 'task done' : 'task';
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.setAttribute('aria-label', `Mark "${task.title}" as completed`);

  const text = document.createElement('div');
  const title = document.createElement('span');
  title.className = 'task-title';
  title.textContent = task.title;
  const meta = document.createElement('span');
  meta.className = 'task-due';
  meta.textContent = task.due ? `${task.course} · Due ${formatDate(task.due)}` : task.course;
  text.append(title, meta);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';

  li.append(checkbox, text, deleteBtn);
  return li;
};

/**
 * @function render
 * @description rebuilds the task list from the tasks array
 * @returns {void}
 */
const render = () => {
  const visible = tasks.filter((task) => {
    if (currentFilter === 'active') return !task.done;
    if (currentFilter === 'done') return task.done;
    return true;
  });

  taskList.innerHTML = '';

  if (visible.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = tasks.length ? 'Nothing here for this filter.' : 'No tasks yet. Add one to get started!';
    taskList.append(empty);
  } else {
    visible.forEach((task) => taskList.append(createTaskItem(task)));
  }

  const remaining = tasks.filter((task) => !task.done).length;
  taskCount.textContent = `${remaining} of ${tasks.length} task${tasks.length === 1 ? '' : 's'} left`;
};

/**
 * @function addTask
 * @param {Event} event form submit event
 * @returns {void}
 */
const addTask = (event) => {
  event.preventDefault();
  const title = taskTitle.value.trim();

  if (!title) {
    taskError.textContent = 'Please enter a task.';
    taskTitle.parentElement.classList.add('invalid');
    return;
  }

  taskError.textContent = '';
  taskTitle.parentElement.classList.remove('invalid');

  tasks.push({
    id: Date.now().toString(),
    title,
    course: taskCourse.value,
    due: taskDue.value,
    done: false
  });

  saveTasks();
  render();
  taskForm.reset();
  taskTitle.focus();
};

/**
 * @function handleListClick
 * @description marks tasks as completed or deletes them (event delegation)
 * @param {Event} event click event from the task list
 * @returns {void}
 */
const handleListClick = (event) => {
  const item = event.target.closest('.task');
  if (!item) return;
  const { id } = item.dataset;

  if (event.target.matches('input[type="checkbox"]')) {
    tasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
  } else if (event.target.matches('.delete-btn')) {
    tasks = tasks.filter((task) => task.id !== id);
  } else {
    return;
  }

  saveTasks();
  render();
};

/**
 * @function setFilter
 * @param {Event} event click event from a filter button
 * @returns {void}
 */
const setFilter = (event) => {
  currentFilter = event.target.dataset.filter;
  filterButtons.forEach((btn) => btn.classList.toggle('active', btn === event.target));
  render();
};

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleListClick);
filterButtons.forEach((btn) => btn.addEventListener('click', setFilter));

render();

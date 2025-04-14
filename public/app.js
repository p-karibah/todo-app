async function fetchTasks() {
    try {
        const response = await fetch('https://todo-app-indol-psi.vercel.app/tasks');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const tasks = await response.json();
        console.log('Fetched tasks:', tasks); // Debug
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTask(task.id);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
}

async function addTask() {
    try {
        const taskInput = document.getElementById('taskInput');
        const title = taskInput.value.trim();
        if (title) {
            const response = await fetch('https://todo-app-indol-psi.vercel.app/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            taskInput.value = '';
            fetchTasks();
        }
    } catch (error) {
        console.error('Failed to add task:', error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`https://todo-app-indol-psi.vercel.app/tasks/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        fetchTasks();
    } catch (error) {
        console.error('Failed to delete task:', error);
    }
}

// Load tasks on page load
fetchTasks();
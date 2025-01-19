let editIndex = null;

function handleFormSubmit(event){
    event.preventDefault();

    const user ={
        money: event.target.money.value,
        description: event.target.description.value,
        category: event.target.category.value
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (editIndex !== null) {
        users[editIndex] = user;
        editIndex = null;
    } else {
        users.push(user);
    }

    localStorage.setItem('users', JSON.stringify(users));

    displayUsers();

    document.getElementById('money').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
}

function displayUsers(){
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index}:- ${user.money} - ${user.description} - ${user.category}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteUsers(index);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener("click", () => {
            editUsers(index);
        });

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        userList.appendChild(listItem);
    });

}

function deleteUsers(index){
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.splice(index, 1);

    localStorage.setItem('users', JSON.stringify(users));

    displayUsers();
}

function editUsers(index){
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const editableValue = users[index];

    document.getElementById('money').value = editableValue.money;
    document.getElementById('description').value = editableValue.description;
    document.getElementById('category').value = editableValue.category;

    editIndex = index;
}


displayUsers();

const baseUrl = "http://localhost:4000/";

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const select = document.getElementById("role");
const email = document.getElementById("email");
const roleName = document.getElementById("roleName");
const addUserButton = document.getElementById("addUserButton");
const addRoleButton = document.getElementById("addRole");

const table = document.getElementById("users-table");
let roles = [];
const getRoleOptions = () =>
  roles.map((item) => {
    const option = document.createElement("option");
    option.append(item.name);
    option.value = item.id;
    return option;
  });

(async function getRoles() {
  const r = await fetch(`${baseUrl}roles`);
  roles = await r.json();

  select.append(...getRoleOptions());
})();

addUserButton.addEventListener("click", function () {
  addUser({
    name: firstName.value,
    email: email.value,
    roleId: +select.value,
  });
});

addRoleButton.addEventListener("click", function () {
  addRole({
    name: roleName.value,
  });
});

async function getUsers() {
  const response = await fetch(`${baseUrl}users`);
  const users = await response.json();
  drawUsers(users);
}

function drawUsers(users) {
  table.innerHTML = "";
  users.forEach((user) => {
    const tr = document.createElement("tr");
    Object.keys(user).forEach((k) => {
      if (k === "id") return;
      const td = document.createElement("td");
      if (k === "role") {
        td.innerHTML = user[k].name;
      } else {
        td.innerHTML = user[k];
      }

      tr.append(td);
    });

    const td = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.append("Remove");
    const updateBtn = document.createElement("button");
    updateBtn.append("Update");
    td.append(removeBtn, updateBtn);
    tr.append(td);

    removeBtn.addEventListener("click", () => {
      removeUser(user.id);
    });
    updateBtn.addEventListener("click", () => {
      onUpdateUserClick(user, tr);
    });

    table.append(tr);
  });
}

async function removeUser(id) {
  const r = await fetch(`${baseUrl}users/${id}`, {
    method: "DELETE",
  });
  await r.json();
  getUsers();
}

function onUpdateUserClick(user, row) {
  row.innerHTML = "";
  const nameInput = document.createElement("input");
  nameInput.value = user.name;
  const emailInput = document.createElement("input");
  emailInput.value = user.email;
  const select = document.createElement("select");
  select.append(...getRoleOptions());
  select.value = +`${user.roleId}`;
  const updateBtn = document.createElement("button");
  updateBtn.innerHTML = "Update";
  Object.values({ nameInput, emailInput, select, updateBtn }).forEach(
    (elem) => {
      const td = document.createElement("td");
      td.append(elem);
      row.append(td);
    }
  );
  updateBtn.addEventListener("click", async () => {
    const r = await fetch(`${baseUrl}users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        roleId: +select.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await r.json();
    getUsers();
  });
}

async function addUser(data) {
  const r = await fetch(`${baseUrl}users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  await r.json();
  getUsers();
}
async function addRole(data) {
  fetch(`${baseUrl}roles`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

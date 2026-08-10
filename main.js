<<<<<<< HEAD
const supabase = window.supabase;
const supabaseUrl = "https://ltgxnrztexdhhfypgfqo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0Z3hucnp0ZXhkaGhmeXBnZnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MDA3MDEsImV4cCI6MjA5OTk3NjcwMX0.L7pIx-oXR4iVGuoxuKS_yVzmqENLOtVxfqgGUfS5WmE";

const sup = supabase.createClient(supabaseUrl, supabaseAnonKey);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const loginSection = document.getElementById("login");
const listSection = document.getElementById("list");
const usernameSpan = document.getElementById("username");
const logoutBtn = document.getElementById("logout-btn");
const controlsSection = document.getElementById("controls");
const itemInput = document.getElementById("item-input");
const addItemBtn = document.getElementById("add-item-btn");
const groceriesList = document.getElementById("groceries-list");
const pastItemsList = document.getElementById("past-items-list");

addItemBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const item = itemInput.value;
  if (item.length > 2) {
    const newItem = document.createElement("li");
    newItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    newItem.textContent = item;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-outline-danger btn-sm remove-item-btn";
    const removeIcon = document.createElement("i");
    removeIcon.className = "bi bi-trash remove-item-icon";
    removeBtn.appendChild(removeIcon);
    newItem.appendChild(removeBtn);
    groceriesList.appendChild(newItem);
    itemInput.value = "";
  }
});

groceriesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item-btn")) {
    const pastItem = document.createElement("li");
    pastItem.className = "list-group-item";
    pastItem.textContent = e.target.parentElement.textContent;
    pastItemsList.appendChild(pastItem);
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("remove-item-icon")) {
    const pastItem = document.createElement("li");
    pastItem.className = "list-group-item";
    pastItem.textContent = e.target.parentElement.parentElement.textContent;
    pastItemsList.appendChild(pastItem);
    e.target.parentElement.parentElement.remove();
  }
});


logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const { error } = await sup.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    showLoginForm();
  }
});
signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const { error } = await sup.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Error signing up:", error.message);
  } else {
    console.info("Sign up successful! Please check your email to confirm.");
  }
});

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const { data, error } = await sup.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Error logging in:", error.message);
  } else {
    showGroceriesList(data.user);
  }
});

window.addEventListener("load", async () => {
  const { data } = await sup.auth.getSession();
  if (data.session) {
    showGroceriesList(data.session.user);
  } else {
    showLoginForm();
  }
});

sup.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    showGroceriesList(session.user);
  }
   if (event === "SIGNED_OUT") {
   showLoginForm();
 }
});

function showGroceriesList(user) {
  loginSection.classList.add("d-none");
  loginSection.classList.remove("d-block");
  listSection.classList.add("d-block");
  listSection.classList.remove("d-none");

  controlsSection.classList.add("d-block");
 controlsSection.classList.remove("d-none");
  usernameSpan.textContent = user.email;
}

function showLoginForm() {
  loginSection.classList.add("d-block");
  loginSection.classList.remove("d-none");
  listSection.classList.add("d-none");
  listSection.classList.remove("d-block");
   controlsSection.classList.add("d-none");
 controlsSection.classList.remove("d-block");
  usernameSpan.textContent = "";
}
=======
const supabase = window.supabase;
const supabaseUrl = "https://ltgxnrztexdhhfypgfqo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0Z3hucnp0ZXhkaGhmeXBnZnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MDA3MDEsImV4cCI6MjA5OTk3NjcwMX0.L7pIx-oXR4iVGuoxuKS_yVzmqENLOtVxfqgGUfS5WmE";

const sup = supabase.createClient(supabaseUrl, supabaseAnonKey);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const loginSection = document.getElementById("login");
const listSection = document.getElementById("list");
const usernameSpan = document.getElementById("username");
const logoutBtn = document.getElementById("logout-btn");
const controlsSection = document.getElementById("controls");
const itemInput = document.getElementById("item-input");
const addItemBtn = document.getElementById("add-item-btn");
const groceriesList = document.getElementById("groceries-list");
const pastItemsList = document.getElementById("past-items-list");

addItemBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const item = itemInput.value;
  if (item.length > 2) {
    const newItem = document.createElement("li");
    newItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    newItem.textContent = item;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-outline-danger btn-sm remove-item-btn";
    const removeIcon = document.createElement("i");
    removeIcon.className = "bi bi-trash remove-item-icon";
    removeBtn.appendChild(removeIcon);
    newItem.appendChild(removeBtn);
    groceriesList.appendChild(newItem);
    itemInput.value = "";
  }
});

groceriesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item-btn")) {
    const pastItem = document.createElement("li");
    pastItem.className = "list-group-item";
    pastItem.textContent = e.target.parentElement.textContent;
    pastItemsList.appendChild(pastItem);
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("remove-item-icon")) {
    const pastItem = document.createElement("li");
    pastItem.className = "list-group-item";
    pastItem.textContent = e.target.parentElement.parentElement.textContent;
    pastItemsList.appendChild(pastItem);
    e.target.parentElement.parentElement.remove();
  }
});


logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const { error } = await sup.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    showLoginForm();
  }
});
signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const { error } = await sup.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Error signing up:", error.message);
  } else {
    console.info("Sign up successful! Please check your email to confirm.");
  }
});

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const { data, error } = await sup.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Error logging in:", error.message);
  } else {
    showGroceriesList(data.user);
  }
});

window.addEventListener("load", async () => {
  const { data } = await sup.auth.getSession();
  if (data.session) {
    showGroceriesList(data.session.user);
  } else {
    showLoginForm();
  }
});

sup.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    showGroceriesList(session.user);
  }
   if (event === "SIGNED_OUT") {
   showLoginForm();
 }
});

function showGroceriesList(user) {
  loginSection.classList.add("d-none");
  loginSection.classList.remove("d-block");
  listSection.classList.add("d-block");
  listSection.classList.remove("d-none");

  controlsSection.classList.add("d-block");
 controlsSection.classList.remove("d-none");
  usernameSpan.textContent = user.email;
}

function showLoginForm() {
  loginSection.classList.add("d-block");
  loginSection.classList.remove("d-none");
  listSection.classList.add("d-none");
  listSection.classList.remove("d-block");
   controlsSection.classList.add("d-none");
 controlsSection.classList.remove("d-block");
  usernameSpan.textContent = "";
}
>>>>>>> 111e9c16b8c2b2c45d1944956a492518e38f1419

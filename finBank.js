const toLogin = () => {
  window.location.href = "login.html";
};

// Function to get user data from local storage or initialize an empty array
function getUserData() {
  const userData = JSON.parse(localStorage.getItem("userDataList")) || [];
  return userData;
}

// Function to store user data in local storage
function storeUserData(userData) {
  localStorage.setItem("userDataList", JSON.stringify(userData));
}

// Function to handle signup
function signUp() {
  const userMail = document.getElementById("userMail").value;
  const phoneNum = document.getElementById("phoneNum").value;
  const accountNum = document.getElementById("accountNum").value;
  const bvnNum = document.getElementById("bvnNum").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const middleName = document.getElementById("middleName").value;
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const country = document.getElementById("country").value;
  const work = document.getElementById("work").value;
  const password = document.getElementById("password").value;
  const pin = document.getElementById("pin").value;

  // Get existing user data or initialize an empty array
  const userData = getUserData();

  // Create a new user object
  const newUser = {
    userMail,
    phoneNum,
    accountNum,
    bvnNum,
    firstName,
    lastName,
    middleName,
    gender,
    dob,
    address,
    city,
    state,
    country,
    work,
    password,
    pin,
    balance: 5000,
    airtimeHistory: [],
    transferHistory: [],
  };

  // Add the new user to the userData array
  userData.push(newUser);
  console.log(newUser);

  // Store the updated userData in local storage
  storeUserData(userData);

  // Redirect to the login file
  window.location.href = "login.html";
}

// LOGIN FUNCTION
// Function to get user data from local storage
function getUserData() {
  return JSON.parse(localStorage.getItem("userDataList")) || [];
}

// Function to handle login
function login() {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  const userData = getUserData();

  const user = userData.find(
    (user) => user.userMail === loginEmail && user.password === loginPassword
  );

  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = ""; // Clear any previous alert

  if (user) {
    // Login successful
    const successAlert = document.createElement("div");
    successAlert.classList.add("alert", "alert-success");
    successAlert.textContent = "Login successful!";
    alertContainer.appendChild(successAlert);

    // Redirect to the dashboard after a short delay
    setTimeout(() => {
      window.location.href = "dashboard.html";
      window.onload = function () {
        displayBalanceAndAccountNumber();
      };
    }, 2000);
  } else {
    // Login failed
    const failureAlert = document.createElement("div");
    failureAlert.classList.add("alert", "alert-danger");
    failureAlert.textContent = "Invalid email or password.";
    alertContainer.appendChild(failureAlert);
  }
}

function displayBalanceAndAccountNumber() {
  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("userDataList")) || [];
  console.log(userData);

  // Check if user data exists
  if (userData.length > 0) {
    // Assuming there's only one user, get the first user object
    const user = userData[0];

    //update username
    const userName = document.getElementById("userName");
    if (userName) {
      userName.innerHTML = `<h3>Hi! ${user.firstName}</h3>`;
    }

    // Update available balance
    const userAvailableBalance = document.getElementById(
      "userAvailableBalance"
    );
    if (userAvailableBalance) {
      userAvailableBalance.innerHTML = `<h3>${user.balance}</h3>`;
    }

    // Update account number
    const userAcctNumber = document.getElementById("userAcctNumber");
    if (userAcctNumber) {
      userAcctNumber.innerHTML = `<h3>${user.accountNum}</h3>`;
    }
  }
}

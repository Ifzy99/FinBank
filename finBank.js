const toLogin = () => {
  window.location.href = "login.html";
};

function hasSeenWelcomeModal() {
  return localStorage.getItem("seenWelcomeModal") === "true";
}

//   <!--SIGN UP FUNCTION--->
// Function to get user data from local storage or initialize an empty array
function getUserData() {
  const userData = JSON.parse(localStorage.getItem("userDataList")) || [];
  return userData;
}

// Function to store user data in local storage
function storeUserData(userData) {
  localStorage.setItem("userDataList", JSON.stringify(userData));
}

// Function to validate account number format
function isValidAccountNumber(accountNum) {
  const accountNumRegex = /^3\d{9}$/;
  return accountNumRegex.test(accountNum);
}

// Function to validate password
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Regular expression pattern
  return passwordRegex.test(password);
}

// Function to validate pin format
function isValidPin(pin) {
  const pinRegex = /^\d{4}$/;
  return pinRegex.test(pin);
}

// Function to display error messages
function displayErrorMessage(message) {
  const errorContainer = document.getElementById("errorContainer");
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;
  errorContainer.appendChild(errorMessage);

  // Remove the error message after 5 seconds
  setTimeout(() => {
    errorContainer.removeChild(errorMessage);
  }, 5000);
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

  // Validate account number format
  if (!isValidAccountNumber(accountNum)) {
    displayErrorMessage(
      "Invalid account number. Account start with '3' and have exactly 10 digits."
    );
    return;
  }

  // Validate password format
  if (!isValidPassword(password)) {
    displayErrorMessage(
      "Invalid password.Password should contain letters,numbers and symbols and have at least 8 characters."
    );
    return;
  }

  // Validate pin format
  if (!isValidPin(pin)) {
    displayErrorMessage("Invalid pin. Pin shouldbe a 4-digit number.");
    return;
  }

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
    }, 2000);
  } else {
    // Login failed
    const failureAlert = document.createElement("div");
    failureAlert.classList.add("alert", "alert-danger");
    failureAlert.textContent = "Invalid email or password.";
    alertContainer.appendChild(failureAlert);
  }
}

// Function to display the welcome modal
function showWelcomeModal(userName) {
  const modal = document.getElementById("welcomeModal");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const span = document.getElementsByClassName("close")[0];

  // Set the welcome message
  welcomeMessage.textContent = `Dear, ${userName}! Welcome to FinBank Web Banking App!.We are thrilled to have you on board and thank you for choosing our services to manage your finances conveniently and securely. With our app, you can access a wide range of banking features at your fingertips, anytime, anywhere. As an appreaciation for choosing us, we're rewarding you #5,000 as a welcome bonus.Thank you for trusting us with your banking needs. We look forward to providing you with a seamless and rewarding banking experience.
    `;

  // Show the modal
  modal.style.display = "block";

  // Close the modal when the user clicks the close button
  span.onclick = function () {
    modal.style.display = "none";
    // Set the seenWelcomeModal flag in local storage
    localStorage.setItem("seenWelcomeModal", "true");
  };

  // Close the modal when the user clicks outside the modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      // Set the seenWelcomeModal flag in local storage
      localStorage.setItem("seenWelcomeModal", "true");
    }
  };
}

//This is to Call the showWelcomeModal function after the displayBalanceAndAccountNumber function
window.onload = function () {
  displayBalanceAndAccountNumber();
  const userData = getUserData();
  const user = userData[0];

  //To check if the user has seen the welcome modal before
  if (!hasSeenWelcomeModal()) {
    showWelcomeModal(user.firstName);
  }

   updateContinueButton();
};

//  FUNCTION TO DISPLAY BALANCE AND ACCOUNT DETAILS
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

    //update fullname
    const fullname = document.getElementById("fullname");
    if (fullname) {
      fullname.innerHTML = `<h3>${user.firstName} ${user.lastName}</h3>`;
    }

    // Get the initials
const firstNameInitial = user.firstName.charAt(0).toUpperCase();
const lastNameInitial = user.lastName.charAt(0).toUpperCase();

// Update the fullname element with the initials
const userInitials = document.getElementById("userInitials");
if (userInitials) {
  userInitials.innerHTML = `<h3>${firstNameInitial}${lastNameInitial}</h3>`;
}

    //update firstname
    const userFirstName = document.getElementById("userFirstName");
    if (userFirstName) {
      userFirstName.innerHTML = `<h4> ${user.firstName}</h4>`;
    }

    //update lastname
    const userLastName = document.getElementById("userLastName");
    if (userLastName) {
      userLastName.innerHTML = `<h4> ${user.lastName}</h4>`;
    }

    //update Mail
    const userEmail = document.getElementById("userEmail");
    if (userEmail) {
      userEmail.innerHTML = `<h4> ${user.userMail}</h4>`;
    }

    //update Date of Birth
    const dateOfBirth = document.getElementById("dateOfBirth");
    if (dateOfBirth) {
      dateOfBirth.innerHTML = `<h4> ${user.dob}</h4>`;
    }

       //update user Contact
    const userContact = document.getElementById("userContact");
    if (userContact) {
      userContact.innerHTML = `<h4> ${user.phoneNum}</h4>`;
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


function finBankTransfer() {
  const receipentAcct = document.getElementById('receipentAcctDetails').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const remarks = document.getElementById('remarks').value;

  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem('userDataList')) || [];
  const currentUser = userData[0]; // Assuming the first user is the current user

  if (!receipentAcct || isNaN(amount) || amount <= 0) {
    alert('Please enter valid account details and amount.');
    return;
  }

  if (amount > currentUser.balance) {
    alert('Insufficient balance for this transfer.');
    return;
  }

  // Create transfer object
  const transferDetails = {
    receipentAccount: receipentAcct,
    amount: amount,
    remarks: remarks,
    date: new Date().toISOString()
  };

  // Add transfer to user's history
  currentUser.transferHistory.push(transferDetails);

  // Update user's balance
  currentUser.balance -= amount;

  // Update local storage
  localStorage.setItem('userDataList', JSON.stringify(userData));

  // alert('Transfer successful!');
  // Optionally, redirect to another page or clear the form
  window.location.href = '/subFiles/reviewTransfer.html';
}

// Function to enable/disable the Continue button based on input
function updateContinueButton() {
  const amount = parseFloat(document.getElementById('amount').value);
  const continueButton = document.querySelector('.button');
  const userData = JSON.parse(localStorage.getItem('userDataList')) || [];
  const currentUser = userData[0];

  if (!isNaN(amount) && amount > 0 && amount <= currentUser.balance) {
    continueButton.disabled = false;
  } else {
    continueButton.disabled = true;
  }
}

// Add event listener to amount input
document.getElementById('amount').addEventListener('input', updateContinueButton);

// Initial call to set button state
updateContinueButton();
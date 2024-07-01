const toLogin = () => {
  window.location.href = "login.html";
};

function hasSeenWelcomeModal() {
  return localStorage.getItem("seenWelcomeModal") === "true";
}

//                                        <!--SIGN UP FUNCTION--->
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

// Add the getCurrentUser function here
function getCurrentUser() {
  const userData = JSON.parse(localStorage.getItem("userDataList")) || [];
  const currentUserEmail = localStorage.getItem("currentUserEmail");

  if (!currentUserEmail) {
    console.error("No user is currently logged in");
    return null;
  }

  const currentUser = userData.find(
    (user) => user.userMail === currentUserEmail
  );

  if (!currentUser) {
    console.error("Current user not found in userData");
    return null;
  }

  return currentUser;
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
//  SIGN UP FUNCTION ENDs

// <!---- LOGIN FUNCTION -->
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
    localStorage.setItem("currentUserEmail", user.userMail);
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
// <!---- LOGIN FUNCTION ENDs -->

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

//  FUNCTION TO DISPLAY BALANCE AND ACCOUNT DETAILS
function displayBalanceAndAccountNumber() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    console.error("No user logged in");
    return;
  }

  //update username
  const userName = document.getElementById("userName");
  if (userName) {
    userName.innerHTML = `<h3>Hi! ${currentUser.firstName}</h3>`;
  }

  //update fullname
  const fullname = document.getElementById("fullname");
  if (fullname) {
    fullname.innerHTML = `<h3>${currentUser.firstName} ${currentUser.lastName}</h3>`;
  }

  // Get the initials
  const firstNameInitial = currentUser.firstName.charAt(0).toUpperCase();
  const lastNameInitial = currentUser.lastName.charAt(0).toUpperCase();

  // Update the fullname element with the initials
  const userInitials = document.getElementById("userInitials");
  if (userInitials) {
    userInitials.innerHTML = `<h3>${firstNameInitial}${lastNameInitial}</h3>`;
  }

  //update firstname
  const userFirstName = document.getElementById("userFirstName");
  if (userFirstName) {
    userFirstName.innerHTML = `<h4> ${currentUser.firstName}</h4>`;
  }

  //update lastname
  const userLastName = document.getElementById("userLastName");
  if (userLastName) {
    userLastName.innerHTML = `<h4> ${currentUser.lastName}</h4>`;
  }

  //update Mail
  const userEmail = document.getElementById("userEmail");
  if (userEmail) {
    userEmail.innerHTML = `<h4> ${currentUser.userMail}</h4>`;
  }

  //update Date of Birth
  const dateOfBirth = document.getElementById("dateOfBirth");
  if (dateOfBirth) {
    dateOfBirth.innerHTML = `<h4> ${currentUser.dob}</h4>`;
  }

  //update user Contact
  const userContact = document.getElementById("userContact");
  if (userContact) {
    userContact.innerHTML = `<h4> ${currentUser.phoneNum}</h4>`;
  }

  // Update available balance
  const userAvailableBalance = document.getElementById("userAvailableBalance");
  if (userAvailableBalance) {
    userAvailableBalance.innerHTML = `<h3>${currentUser.balance}</h3>`;
  }

  // Update account number
  const userAcctNumber = document.getElementById("userAcctNumber");
  if (userAcctNumber) {
    userAcctNumber.innerHTML = `<h3>${currentUser.accountNum}</h3>`;
  }
}

// Function to display messages
function displayMessage(message, isError = false) {
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.innerHTML = `<div class="${
    isError ? "error-message" : "success-message"
  }">${message}</div>`;

  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 5000);
}

function finBankTransfer() {
  const receipentAcct = document.getElementById("receipentAcctDetails").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const remarks = document.getElementById("remarks").value;

  const currentUser = getCurrentUser();
  if (!currentUser) {
    displayMessage("User session ended. Please log in again.", true);

    setTimeout(() => {
      window.location.href = "/login.html";
    }, 3000);
    return;
  }

  if (!isValidAccountNumber(receipentAcct)) {
    displayMessage(
      "Invalid account number. Account must start with '3' and have exactly 10 digits.",
      true
    );
    return;
  }

  if (!receipentAcct || isNaN(amount) || amount <= 0) {
    displayMessage("Please enter valid account details and amount.", true);
    return;
  }

  if (amount > currentUser.balance) {
    displayMessage("Insufficient balance for this transfer.", true);
    return;
  }

  // Create transfer object
  const transferDetails = {
    receipentAccount: receipentAcct,
    amount: amount,
    remarks: remarks,
    date: new Date().toISOString(),
  };

  // Store transfer details in local storage for confirmation
  localStorage.setItem("pendingTransfer", JSON.stringify(transferDetails));

  // displayMessage('Transfer details saved. Redirecting to confirmation page...');

  setTimeout(() => {
    window.location.href = "/subFiles/reviewTransfer.html";
  }, 1000);
}

function displayTransferDetails() {
  const pendingTransfer = JSON.parse(localStorage.getItem("pendingTransfer"));

  if (!pendingTransfer) {
    return;
  }

  const expirationTime = 10 * 60 * 1000; // 10 minutes
  if (
    new Date().getTime() - new Date(pendingTransfer.date).getTime() >
    expirationTime
  ) {
    localStorage.removeItem("pendingTransfer");
    displayMessage(
      "Transfer session expired. Please initiate a new transfer.",
      true
    );
    window.location.href = "/toFinBank.html";
    return;
  }

  document.getElementById("receipentAcctDetails").textContent =
    pendingTransfer.receipentAccount;
  document.getElementById("amount").textContent =
    pendingTransfer.amount.toFixed(2);
  document.getElementById("remarks").textContent =
    pendingTransfer.remarks || "No remarks";
  document.getElementById("date").textContent = new Date(
    pendingTransfer.date
  ).toLocaleString();
}

function confirmTransfer() {
  document.getElementById("pinModal").style.display = "block";
}

function closePinModal() {
  document.getElementById("pinModal").style.display = "none";
  document.getElementById("pinInput").value = "";
}

function verifyPinAndTransfer() {
  const enteredPin = document.getElementById("pinInput").value;
  const currentUser = getCurrentUser();

  if (enteredPin === currentUser.pin) {
    executeTransfer();
    closePinModal();
  } else {
    displayMessage("Incorrect PIN. Please try again.", true);
  }
}

//  FUNCTION TO GENERATE TRANSACTIONID
function generateTransactionId() {
  // Get current timestamp
  const timestamp = new Date().getTime();

  // Generate a random number between 1000 and 9999
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  // Combine timestamp and random number
  const transactionId = `TRX-${timestamp}-${randomNum}`;

  return transactionId;
}

function executeTransfer() {
  const currentUser = getCurrentUser();
  const pendingTransfer = JSON.parse(localStorage.getItem("pendingTransfer"));

  if (currentUser.balance >= pendingTransfer.amount) {
    currentUser.balance -= pendingTransfer.amount;

    // Create the completed transfer object
    const completedTransfer = {
      ...pendingTransfer,
      senderAccount: currentUser.accountNum,
      senderName: `${currentUser.firstName} ${currentUser.lastName}`,
      status: "Completed",
      transactionId: generateTransactionId(),
      date: new Date().toISOString(),
    };

    console.log("Transfer completed:", completedTransfer);

    // Get existing transactions or initialize an empty array
    let completedTransactions =
      JSON.parse(localStorage.getItem("completedTransactions")) || [];

    // Add the new transaction to the array
    completedTransactions.push(completedTransfer);

    // Save the updated array back to localStorage
    localStorage.setItem(
      "completedTransactions",
      JSON.stringify(completedTransactions)
    );

    // Also save as lastCompletedTransfer for immediate display on receipt page
    localStorage.setItem(
      "lastCompletedTransfer",
      JSON.stringify(completedTransfer)
    );

    // Add transfer to Transaction History
    if (!currentUser.transferHistory) {
      currentUser.transferHistory = [];
    }
    currentUser.transferHistory.push(completedTransfer);

    // Update user data in local storage
    updateUserData(currentUser);

    // Clear pending transfer
    localStorage.removeItem("pendingTransfer");

    displayMessage("Transfer successful!");
    setTimeout(() => {
      window.location.href = "/subFiles/transactionReceipt.html";
    }, 2000);
  } else {
    displayMessage("Insufficient balance.", true);
  }
}

function cancelTransfer() {
  if (confirm("Are you sure you want to cancel this transfer?")) {
    localStorage.removeItem("pendingTransfer");
    displayMessage("Transfer cancelled.");
    setTimeout(() => {
      window.location.href = "/transfer.html";
    }, 2000);
  }
}

function goBackToTransfer() {
  if (confirm("Going back will cancel this transfer. Are you sure?")) {
    cancelTransfer();
    window.location.href = "/toFinBank.html";
  }
}

function getCurrentUser() {
  const userData = JSON.parse(localStorage.getItem("userDataList")) || [];
  const currentUserEmail = localStorage.getItem("currentUserEmail");

  return userData.find((user) => user.userMail === currentUserEmail) || null;
}

function updateUserData(updatedUser) {
  let userData = JSON.parse(localStorage.getItem("userDataList")) || [];
  const index = userData.findIndex(
    (user) => user.userMail === updatedUser.userMail
  );
  if (index !== -1) {
    userData[index] = updatedUser;
    localStorage.setItem("userDataList", JSON.stringify(userData));
  }
}

function displayTransactionReceipt() {
  console.log("Starting displayTransactionReceipt");
  const lastCompletedTransfer = JSON.parse(
    localStorage.getItem("lastCompletedTransfer")
  );
  console.log("lastCompletedTransfer:", lastCompletedTransfer);

  if (!lastCompletedTransfer) {
    console.log("No lastCompletedTransfer found in localStorage");
    displayMessage("No recent transaction found.", true);
    return;
  }

  try {
    document.getElementById("transactionId").textContent =
      lastCompletedTransfer.transactionId || "N/A";
    document.getElementById("date").textContent = lastCompletedTransfer.date
      ? new Date(lastCompletedTransfer.date).toLocaleString()
      : "N/A";
    document.getElementById("senderName").textContent =
      lastCompletedTransfer.senderName || "N/A";
    document.getElementById("senderAccount").textContent =
      lastCompletedTransfer.senderAccount || "N/A";
    document.getElementById("receipentAccount").textContent =
      lastCompletedTransfer.receipentAccount || "N/A";
    document.getElementById("amount").textContent = lastCompletedTransfer.amount
      ? lastCompletedTransfer.amount.toFixed(2)
      : "N/A";
    document.getElementById("remarks").textContent =
      lastCompletedTransfer.remarks || "No remarks";
    document.getElementById("status").textContent =
      lastCompletedTransfer.status || "N/A";

    console.log("DOM elements updated successfully");
  } catch (error) {
    console.error("Error updating DOM elements:", error);
  }

  // Don't remove the data immediately, in case of page reload
  // Instead, you might want to clear it after a certain time or on a specific user action
  // localStorage.removeItem('lastCompletedTransfer');

  console.log("displayTransactionReceipt completed");
}

function displayAllTransactions() {
  const transactions = JSON.parse(localStorage.getItem('completedTransactions')) || [];
  const transactionList = document.getElementById('transactionList');
  
  transactionList.innerHTML = ''; // Clear existing content
  
  transactions.forEach((transaction, index) => {
    const listItem = document.createElement('div');
    listItem.className = 'transaction-item';
    
    // Determine transaction type
    const transactionType = transaction.amount > 0 ? 'Credit' : 'Debit';
    const icon = transaction.amount > 0 ? '↓' : '↑';
    
    listItem.innerHTML = `
      <div class="transaction-summary" onclick="toggleDetails(${index})">
        <span class="transaction-icon">${icon}</span>
        <span class="transaction-type">${transactionType}</span>
        <span class="transaction-amount">₦${Math.abs(transaction.amount).toFixed(2)}</span>
      </div>
      <div class="transaction-details" id="details-${index}" style="display: none;">
        <strong>Date:</strong> ${new Date(transaction.date).toLocaleString()} <br>
        <strong>Transaction ID:</strong> ${transaction.transactionId} <br>
        <strong>Sender Account:</strong> ${transaction.senderAccount} <br>
        <strong>Sender Name:</strong> ${transaction.senderName} <br>
        <strong>Recipient Account:</strong> ${transaction.receipentAccount} <br>
        <strong>Recipient Name:</strong> ${transaction.receipentName} <br>
        <strong>Amount:</strong> ₦${Math.abs(transaction.amount).toFixed(2)} <br>
        <strong>Status:</strong> ${transaction.status} <br>
        ${transaction.description ? `<strong>Description:</strong> ${transaction.description} <br>` : ''}
      </div>
    `;
    transactionList.appendChild(listItem);
  });
}

function toggleDetails(index) {
  const detailsElement = document.getElementById(`details-${index}`);
  if (detailsElement.style.display === 'none') {
    detailsElement.style.display = 'block';
  } else {
    detailsElement.style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  displayBalanceAndAccountNumber();

  const userData = getUserData();
  // Check if there's any user data
  if (userData.length > 0) {
    // If there is, get the first user
    const user = userData[0];

    // To check if the user has seen the welcome modal before
    if (!hasSeenWelcomeModal()) {
      showWelcomeModal(user.firstName);
    }
  }

  displayTransferDetails();

  if (document.getElementById("transactionId")) {
    displayTransactionReceipt();
  }
});

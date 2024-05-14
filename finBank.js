
const toLogin = ()=>{
    window.location.href = "./Login/login.html";
}


// Function to show the loader

// function showLoader() {
//     const loaderContainer = document.getElementById('loaderContainer');
//     if (loaderContainer) {
//       loaderContainer.style.display = 'block'; // Display the loader
//     }
//   }
  
//   // Function to hide the loader and show the content
//   function hideLoaderAndShowContent() {
//     const loaderContainer = document.getElementById('loaderContainer');
//     if (loaderContainer) {
//       loaderContainer.style.display = 'none'; // Hide the loader
//     }
  
//     // Show the content of the page
//     document.body.style.visibility = 'visible'; // Example: Show the body content
//   }
  
//   // Event listener for page load
//   window.onload = function() {
//     // Show the loader when the page starts loading
//     showLoader();
  
//     // Set a delay (in milliseconds) before hiding the loader and showing the content
//     const loaderDisplayDuration = 3000; // Adjust the display duration in milliseconds (e.g., 3000 = 3 seconds)
  
//     setTimeout(hideLoaderAndShowContent, loaderDisplayDuration);
//   };
  

// // Function to retrieve existing client data from local storage or initialize an empty array
// let allCustomers = JSON.parse(localStorage.getItem("localAllCustomers")) || [];

// const signUp = () => {
//     // Retrieve form input values
//     const userMail = document.getElementById('userMail').value;
//     const phoneNum = document.getElementById('phoneNum').value;
//     const accountNum = document.getElementById('accountNum').value;
//     const bvnNum = document.getElementById('bvnNum').value;
//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     const middleName = document.getElementById('middleName').value;
//     const gender = document.getElementById('gender').value;
//     const dob = document.getElementById('dob').value;
//     const address = document.getElementById('address').value;
//     const city = document.getElementById('city').value;
//     const state = document.getElementById('state').value;
//     const country = document.getElementById('country').value;
//     const work = document.getElementById('work').value;
//     const password = document.getElementById('password').value;
//     const pin = document.getElementById('pin').value;


//     // Create client data object
//     const customersData = {
//         Email: userMail,
//         PhoneNumber: phoneNum,
//         AccountNumber: accountNum,
//         BankVerificationNumber: bvnNum,
//         FirstName: firstName,
//         LastName: lastName,
//         MiddleName: middleName,
//         Password: password,
//         Pin: pin,
//         Address: address,
//         City: city,
//         State: state,
//         Country: country,
//         DateOfBirth: dob,
//         Gender: gender,
//         Occupation: work,
//         allTodo: [],
//         balance: 5000,
//         airtimeHistory: [],
//         transferHistory: []
//     };

//     // Add new client data to the existing clients array
//     // allCustomers.push(customersData);
//     console.log(customersData);

//     // Store updated clients array in local storage
//     // localStorage.setItem("localAllCustomers", JSON.stringify(allCustomers));

//     // Redirect to login page after successful signup
//     // window.location.href = "./Login/login.html";
// };

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const userMail = document.getElementById('userMail').value;
        const phoneNum = document.getElementById('phoneNum').value;
        const accountNum = document.getElementById('accountNum').value;
        const bvnNum = document.getElementById('bvnNum').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const middleName = document.getElementById('middleName').value;
        const gender = document.getElementById('gender').value;
        const dob = document.getElementById('dob').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const country = document.getElementById('country').value;
        const work = document.getElementById('work').value;
        const password = document.getElementById('password').value;
        const pin = document.getElementById('pin').value;

        // Create user object with form data
        const user = {
            Email: userMail,
            PhoneNumber: phoneNum,
            AccountNumber: accountNum,
            BankVerificationNumber: bvnNum,
            FirstName: firstName,
            LastName: lastName,
            MiddleName: middleName,
            Password: password,
            Pin: pin,
            Address: address,
            City: city,
            State: state,
            Country: country,
            DateOfBirth: dob,
            Gender: gender,
            Occupation: work,
            allTodo: [],
            balance: 5000,
            airtimeHistory: [],
            transferHistory: []
        };

        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(user));

        // Display success message (for demonstration)
        alert('Signup successful! User data saved in local storage.');

        // Clear form fields
        signupForm.reset();
    });
});


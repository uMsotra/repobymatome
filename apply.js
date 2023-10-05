// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVYQETZ8o9cKp8CWDWRD2Mvz7nUqQrj6Q",
  authDomain: "assignment-avenue-e9420.firebaseapp.com",
  databaseURL: "https://assignment-avenue-e9420-default-rtdb.firebaseio.com",
  projectId: "assignment-avenue-e9420",
  storageBucket: "assignment-avenue-e9420.appspot.com",
  messagingSenderId: "70372309245",
  appId: "1:70372309245:web:63b1767487b0c0242e6694",
  measurementId: "G-84B1SWDV9E"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Set database variable
  var database = firebase.database()
  function validateForm() {
    // Validate Name
    var nameInput = document.getElementById("name");
    var name = nameInput.value.trim();
    var namePattern = /^[A-Za-z]{1,10}$/; // Allows only letters and up to 10 characters

    if (!namePattern.test(name)) {
        alert("Please enter a valid name (up to 10 letters, letters only).");
        nameInput.focus();
        return false;
    }

    // Validate Phone Number
    var phoneNumberInput = document.getElementById("number");
    var phoneNumber = phoneNumberInput.value.trim();
    var phoneNumberPattern = /^\d{11}$/; // Allows only 11 digits

    if (!phoneNumberPattern.test(phoneNumber)) {
        alert("Please enter a valid phone number (11 digits, numbers only).");
        phoneNumberInput.focus();
        return false;
    }

    // Validate Final Mark in Course
    var marksInput = document.getElementById("marks");
    var marks = marksInput.value.trim();
    var marksPattern = /^\d{2}$/; // Allows only 2 digits

    if (!marksPattern.test(marks)) {
        alert("Please enter a valid final mark (2 digits, numbers only).");
        marksInput.focus();
        return false;
    }

    return true; // Form is valid, can be submitted
}
  
function save() {
  var name = document.getElementById('name').value;
  var university = document.getElementById('university').value;
  var number = document.getElementById('number').value;
  var subject = document.getElementById('subject').value;
  var marks = document.getElementById('marks').value;

  // Validate Name
  var namePattern = /^[A-Za-z]{1,10}$/;
  if (!namePattern.test(name)) {
      alert('Please enter a valid name (up to 10 letters, letters only).');
      return;
  }

  // Validate Phone Number
  var phoneNumberPattern = /^\d{11}$/;
  if (!phoneNumberPattern.test(number)) {
      alert('Please enter a valid phone number (11 digits, numbers only).');
      return;
  }

  // Validate Marks
  var marksPattern = /^\d{2}$/;
  if (!marksPattern.test(marks)) {
      alert('Please enter a valid final mark (2 digits, numbers only).');
      return;
  }

  // Check for empty inputs
  if (name === '' || university === '' || number === '' || subject === '' || marks === '') {
      alert('Please fill in all fields');
      return;
  }

  // If all validations pass, push data to Firebase
  database.ref('users').push({
      name: name,
      university: university,
      number: number,
      subject: subject,
      marks: marks
  });

  alert('Application Successful');
    // Clear the form after successful submission
    document.getElementById('name').value = '';
    document.getElementById('university').value = '';
    document.getElementById('number').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('marks').value = '';

}

  

  function update() {
    var number = document.getElementById('number').value
    var name = document.getElementById('name').value
    var university = document.getElementById('university').value
  
    var updates = {
      email : name,
      password : university
    }
  
    database.ref('users/' + number).update(updates)
  
    alert('updated')
  }
  
  
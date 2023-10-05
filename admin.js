
document.addEventListener("DOMContentLoaded", function() {
    const adminLoginForm = document.getElementById("adminLoginForm");
    
    adminLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const passwordInput = document.getElementById("password");
        const password = passwordInput.value;
        
        // Replace "your-hardcoded-password" with your actual hardcoded password
        if (password === "mali") {
            window.location.href = "tutor-dashboard.html";
        } else {
            alert("Incorrect password. Please try again.");
        }
    });
});



// script.js

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8VmHClcM4Y9Ku-LxKbxNqt-ReuDLxTrY",
  authDomain: "assignment-avenue.firebaseapp.com",
  databaseURL: "https://assignment-avenue-default-rtdb.firebaseio.com",
  projectId: "assignment-avenue",
  storageBucket: "assignment-avenue.appspot.com",
  messagingSenderId: "934090549111",
  appId: "1:934090549111:web:e0ed015b245c7a434da372",
  measurementId: "G-NFY9T2GHCZ"
};
  
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the "tutors" node in your Firebase database
  const tutorsRef = firebase.database().ref('users');
  
  function fetchAndDisplayAllTutors() {
    tutorsRef.on('value', (snapshot) => {
      const tutors = snapshot.val();
  
      if (tutors) {
        const tutorsSection = document.getElementById('tutors');
        tutorsSection.innerHTML = ''; // Clear previous content
  
        for (const tutorId in tutors) {
            const tutor = tutors[tutorId];
            const tutorListing = createTutorListingElement(tutor, tutorId);
            tutorsSection.appendChild(tutorListing);
        }
      }
    });
  }
  
  function createTutorListingElement(tutor, tutorId) {
    const tutorListing = document.createElement('div');
    tutorListing.className = 'tutor-listing';
    tutorListing.innerHTML = `
        <h3>${tutor.name}</h3>
        <p><strong>University: </strong>${tutor.university}</p>
        <p><strong>Course: </strong>${tutor.subject}</p>
        <p><strong>Contact: </strong><a href="https://api.whatsapp.com/send?phone=${tutor.number}" target="_blank">${tutor.number}</a></p>
        <button class="delete-button" data-tutor-id="${tutorId}">Delete</button>
    `;
    return tutorListing;
}

  
// Function to delete a tutor by ID
function deleteTutor(tutorId) {
    tutorsRef.child(tutorId).remove()
        .then(() => {
            console.log(`Tutor with ID ${tutorId} deleted successfully.`);
        })
        .catch((error) => {
            console.error(`Error deleting tutor with ID ${tutorId}: ${error}`);
        });
}

// Add event listener for delete buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const tutorId = event.target.getAttribute('data-tutor-id');
        if (confirm('Are you sure you want to delete this tutor?')) {
            deleteTutor(tutorId);
        }
    }
});

  
  
  
  
  // Load all tutors when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayAllTutors();
  });
  // Add this code below your existing code in script.js
  
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  let searchTimeout;
  
  function filterTutors(searchTerm) {
    clearTimeout(searchTimeout);
  
    searchTimeout = setTimeout(() => {
      tutorsRef.on('value', (snapshot) => {
        const tutors = snapshot.val();
  
        if (tutors) {
          const tutorsSection = document.getElementById('tutors');
          tutorsSection.innerHTML = ''; // Clear previous content
  
          for (const tutorId in tutors) {
            const tutor = tutors[tutorId];
            if (
              tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              tutor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
              tutor.university.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              const tutorListing = createTutorListingElement(tutor);
              tutorsSection.appendChild(tutorListing);
            }
          }
        }
      });
    }, 300); // Delay in milliseconds before filtering
  }
  
  
  // Replace the existing searchButton event listener code
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    filterTutors(searchTerm);
  });
  
  
  // Load all tutors when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayAllTutors();
  });
  
  
  
  

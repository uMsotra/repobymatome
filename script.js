// script.js

// Initialize Firebase
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
        const tutorListing = createTutorListingElement(tutor);
        tutorsSection.appendChild(tutorListing);
      }
    }
  });
}

function createTutorListingElement(tutor) {
  const tutorTile = document.createElement('div');
  tutorTile.className = 'tutor-tile';

  const tutorInfo = document.createElement('div');
  tutorInfo.className = 'tutor-info';

  const tutorName = document.createElement('h3');
  tutorName.textContent = tutor.name;

  const university = document.createElement('p');
  university.innerHTML = `<strong>University:</strong> ${tutor.university}`;

  const subject = document.createElement('p');
  subject.innerHTML = `<strong>Course:</strong> ${tutor.subject}`;

  const grade = document.createElement('p');
  grade.innerHTML = `<strong>Grade:</strong> ${tutor.marks}%`;

  const whatsappLink = document.createElement('a');
  whatsappLink.href = `https://wa.me/+27638847656?text=I'm%20interested%20in%20${tutor.subject}%20help%20by%20${tutor.name}`;
  whatsappLink.target = '_blank';
  whatsappLink.textContent = 'WhatsApp';

  tutorInfo.appendChild(tutorName);
  tutorInfo.appendChild(university);
  tutorInfo.appendChild(subject);
  tutorInfo.appendChild(grade);
  tutorInfo.appendChild(whatsappLink);

  tutorTile.appendChild(tutorInfo);

  return tutorTile;
}





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




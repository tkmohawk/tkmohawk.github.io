// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the search input and search button
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const resultsList = document.querySelector('.results-list');

  // Load the trailer data
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const registrations = data.registrations;

      // Handle search button click event
      searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();

        // Clear previous results
        resultsList.innerHTML = '';

        // Perform search or replace with your own logic
        if (searchQuery !== '') {
          const filteredRegistrations = registrations.filter(registration =>
            registration.trailerNumber.includes(searchQuery)
          );

          if (filteredRegistrations.length > 0) {
            filteredRegistrations.forEach(registration => {
              const resultItem = document.createElement('li');
              resultItem.classList.add('result-item');
              resultItem.innerHTML = `
                <div class="image-container">
                  <img src="${registration.image}" alt="Registration Image">
                </div>
                <div class="details-container">
                  <p>Trailer Number: ${registration.trailerNumber}</p>
                  <p>Owner: ${registration.ownerName}</p>
                  <p>State: ${registration.state}</p>
                </div>
              `;
              resultsList.appendChild(resultItem);
            });
          } else {
            const resultItem = document.createElement('li');
            resultItem.textContent = 'No matching results found.';
            resultsList.appendChild(resultItem);
          }
        }
      });
    })
    .catch(error => console.log('Error loading trailer data:', error));

  // Handle form submission event
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    searchButton.click();
  });
});

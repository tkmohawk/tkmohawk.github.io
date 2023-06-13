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

      // Function to handle the search
      function performSearch() {
        const searchQuery = searchInput.value.trim();

        // Clear previous results
        resultsList.innerHTML = '';

        // Perform search or replace with your own logic
        if (searchQuery !== '') {
          const filteredRegistrations = registrations.filter(registration =>
            (registration.trailerNumber && registration.trailerNumber.includes(searchQuery)) ||
            (registration.truckNumber && registration.truckNumber.includes(searchQuery))
          );

          if (filteredRegistrations.length > 0) {
            filteredRegistrations.forEach(registration => {
              const resultItem = document.createElement('li');
              resultItem.classList.add('result-item');
              const imageContainer = document.createElement('div');
              imageContainer.classList.add('image-container');
              const detailsContainer = document.createElement('div');
              detailsContainer.classList.add('details-container');

              // Display one image for trailers
              if (registration.trailerNumber) {
                const trailerImage = document.createElement('img');
                trailerImage.src = registration.image || registration.images.image1;
                trailerImage.alt = 'Trailer Image';
                imageContainer.appendChild(trailerImage);
              }
              
              // Display three images for trucks
              if (registration.truckNumber) {
                const truckImagesContainer = document.createElement('div');
                truckImagesContainer.classList.add('truck-images-container');

                const truckImage1 = document.createElement('img');
                truckImage1.src = registration.images.image1;
                truckImage1.alt = 'Truck Image 1';
                truckImagesContainer.appendChild(truckImage1);
                
                const truckImage2 = document.createElement('img');
                truckImage2.src = registration.images.image2;
                truckImage2.alt = 'Truck Image 2';
                truckImagesContainer.appendChild(truckImage2);
                
                const truckImage3 = document.createElement('img');
                truckImage3.src = registration.images.image3;
                truckImage3.alt = 'Truck Image 3';
                imageContainer.appendChild(truckImagesContainer);
                imageContainer.appendChild(truckImage3);
                
                // Display "U.S. DOT #" field for trucks
                const dotNumber = registration["U.S. DOT #"];
                const dotNumberElement = document.createElement('p');
                dotNumberElement.textContent = `U.S. DOT #: ${dotNumber}`;
                detailsContainer.appendChild(dotNumberElement);
              }

              const truckNumber = registration.truckNumber ? 'Truck Number' : 'Trailer Number';
              const ownerName = registration.ownerName;
              const state = registration.state;

              detailsContainer.innerHTML += `
                <p>${truckNumber}: ${registration.truckNumber || registration.trailerNumber}</p>
                <p>Owner: ${ownerName}</p>
                <p>State: ${state}</p>
              `;

              resultItem.appendChild(imageContainer);
              resultItem.appendChild(detailsContainer);
              resultsList.appendChild(resultItem);
            });
          } else {
            const resultItem = document.createElement('li');
            resultItem.textContent = 'No matching results found.';
            resultsList.appendChild(resultItem);
          }
        }
      }

      // Handle search button click event
      searchButton.addEventListener('click', performSearch);

      // Handle form submission event
      document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        performSearch();
      });

      // Handle Enter key press event on search input
      searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          performSearch();
        }
      });
    })
    .catch(error => console.log('Error loading trailer data:', error));
});

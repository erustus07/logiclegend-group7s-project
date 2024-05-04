document.addEventListener("DOMContentLoaded", function () {
    const resultsList = document.getElementById('results-list');

    function displayVenues(venues) {
        resultsList.innerHTML = ''; // Clear existing venues
        venues.forEach(venue => {
            const li = document.createElement('li');
            li.className = 'venue-item';
            li.innerHTML = `
                <div class="venue-image" style="background-image: url('${venue.image}'); height: 200px; background-size: cover; border-top-left-radius: 8px; border-top-right-radius: 8px;"></div>
                <div class="venue-info">
                    <h3>${venue.name}</h3>
                    <p>Location: ${venue.location}</p>
                    <p>Capacity: ${venue.capacity}</p>
                    <p>${venue.description}</p>
                    <button class="add-venue-btn">Add to List</button>
                </div>
            `;
            resultsList.appendChild(li);
        });
    }

    function fetchVenues() {
        fetch('http://localhost:3000/venues')
            .then(response => response.json())
            .then(data => displayVenues(data))
            .catch(error => console.error('Error fetching data: ', error));
    }

    function searchVenues() {
        const searchText = document.getElementById('search-input').value.toLowerCase();
        fetch(`http://localhost:3000/venues?q=${searchText}`)
            .then(response => response.json())
            .then(data => displayVenues(data))
            .catch(error => console.error('Error fetching data: ', error));
    }

    const searchButton = document.querySelector('.button button');
    searchButton.addEventListener('click', searchVenues);

    // Initially fetch all venues
    fetchVenues();
});

            function updateVenue(venueId, updatedVenueData) {
                fetch(`http://localhost:3000/venues/${venueId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedVenueData)
                })
                    .then(response => {
                        if (response.ok) {
                            throw new Error('Failed to update venue.');
                        }
                        return response.json();
                    })
                    .then(updatedVenue => {

                        console.log('Venue updated', updatedVenue);
                    })
                    .catch(error => {
                        console.error('Error updating venue: ', error);
                    })
            };
document.addEventListener("DOMContentLoaded", function () {
    const resultsList = document.getElementById('results-list');
    document.querySelector('#search-form').addEventListener('submit', handleSubmit)


 //Event handlers
 function handleSubmit(e) {
     e.preventDefault()
     let venueLocation = {
         name: e.target.name.value,
         location: e.target.location.value,
         image: e.target.image.value,
         capacity: e.target.capacity.value,
         description: e.target.description.value,
     }
     displayVenues([venueLocation])
    
     // addVenue(venueLocation)
     addVenue(venueLocation)

 }

//DOM Render Functions
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
                    </div>
                <div>
                    <button class="add-venue-btn">Add to List</button>
                    <button class ="update-venue-btn" data-venue-id= "${venue.id}">Update Venue</button>
                </div>
            `;
            const updateButton = li.querySelector('.update-venue-btn');
            updateButton.addEventListener('click', () => {
                const venueId = updateButton.getAttribute('data-venue-id');

                const venueInfoDiv = li.querySelector('.venue-info');
                venueInfoDiv.innerHTML = '';

                const form = document.createElement('form');
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const updatedVenueData = {
                        name: form.elements['name'].value,
                        location: form.elements['location'].value,
                        capacity: form.elements['capacity'].value,
                        description: form.elements['description'].value,
                        image: form.elements['image'].value
                    };
                    updateVenue(venueId, updatedVenueData);

                });
                // Displays a menu where venue details are updated
                form.innerHTML = `
                    <label for="name">Name</label>
                    <input type="text" name="name" value="${venue.name}">
                    <label for="location">Location</label>
                    <input type="text" name="location" value="${venue.location}">
                    <label for="capacity">Capacity</label>
                    <input type="number" name="capacity" value="${venue.capacity}">
                    <label for="description">Description</label>
                    <input type="text" name="description" value="${venue.description}">
                    <label for="image">Image</label>
                    <input type="text" name="image" value="${venue.image}">
                    <button type="submit">Update Venue</button>
                `;
                venueInfoDiv.appendChild(form);
            });
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

            console.log('Venue updated', updatedVenue);
        })
        .catch(error => {
            console.error('Error updating venue: ', error);
        })
};

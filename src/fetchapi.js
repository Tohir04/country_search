function buttonClicked() {
    var name = document.getElementById("SearchData").value;
    fetch(`https://restcountries.com/v2/name/${name}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                var country = data[0];
                document.getElementById("City").innerHTML = `${country.name}`;
                document.getElementById("Capital").innerHTML = `${country.capital}`;
                document.getElementById("region").innerHTML = `${country.region}`;
                document.getElementById("subregion").innerHTML = `${country.subregion}`;
                document.getElementById("timezone").innerHTML = `${country.timezones}`;
                
                // Displaying the flag if available
                if (country.flags && country.flags.svg) {
                    document.getElementById("flag").innerHTML = `<img src="${country.flags.svg}" alt="Flag" width="100">`;
                } else {
                    document.getElementById("flag").innerHTML = "Flag: Not available";
                }
                
                var currencyNames = country.currencies.map(currency => currency.name).join(', ');
                document.getElementById("currencies").innerHTML = `${currencyNames}`;
                
                // Display population if available
                if (country.population) {
                    document.getElementById("population").innerHTML = `Population: ${country.population.toLocaleString()}`;
                } else {
                    document.getElementById("population").innerHTML = "Population: Not available";
                }

                // Display languages if available
                if (country.languages) {
                    var languages = country.languages.map(lang => lang.name).join(', ');
                    document.getElementById("languages").innerHTML = `${languages}`;
                } else {
                    document.getElementById("languages").innerHTML = "Languages: Not available";
                }

                // Display location link if latitude and longitude available
                if (country.latlng && country.latlng.length === 2) {
                    var locationLink = `<a href="#" onclick="openGoogleMaps('${country.latlng[0]}','${country.latlng[1]}')">View on Google Maps</a>`;
                    document.getElementById("location").innerHTML = `${locationLink}`;
                } else {
                    document.getElementById("location").innerHTML = "Location: Not available";
                }
                
            } else {
                document.getElementById("City").innerHTML = "";
                document.getElementById("Capital").innerHTML = "";
                document.getElementById("region").innerHTML = "";
                document.getElementById("currencies").innerHTML = "";
                document.getElementById("flag").innerHTML = "";
                document.getElementById("population").innerHTML = "";
                document.getElementById("location").innerHTML = "";
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            // You can handle error display here
        });
}

function openGoogleMaps(latitude, longitude) {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank', 'fullscreen=yes');
}

function updateDateTime() {
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    var dateTimeString = now.toLocaleString('en-US', options);
    var datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = dateTimeString;
    } else {
        console.error("Element with id 'datetime' not found.");
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});



/*--------------------------------------SearchForFlightButton---------------------------------------*/


document.getElementById('searchForFlights').onclick = function () {
    var Date_of_depart = document.getElementById("DepartDate").value;
    var Date_of_return = document.getElementById('ReturnDate').value;

    if (document.getElementById("Return").style.display === "none") {
        var FlightInfo = {
            dep: DepLocation,
            depCountryCode: CountryCodeDep,
            arr: ArrLocation,
            arrCountryCode: CountryCodeArr,
            depart_time: Date_of_depart,

        }

        console.log(FlightInfo);

    } else {


        var FlightInfo = {
            dep: DepLocation,
            depCountryCode: CountryCodeDep,
            arr: ArrLocation,
            arrCountryCode: CountryCodeArr,
            depart_time: Date_of_depart,
            return_time: Date_of_return
        }

        console.log(FlightInfo);
    }
}

/*----------------------------------search for hotels button------------------------------------------------------------*/


document.getElementById('searchForHotels').onclick = function () {
    var Check_in = document.getElementById("check-in").value;
    var Check_out = document.getElementById('check-out').value;

    var HotelInfo = {
        LocationName: HotelLocation,
        LocCountryCode: HotelPlaceLocationCountryCOde,
        check_in_time: Check_in,
        check_out_time: Check_out
    }
    console.log(HotelInfo);

    getHotels(HotelInfo);



}

/*--------------------Autocomplete--------------------------------------------------------------------------------------------*/
var DepLocation;
var ArrLocation;
var HotelPlaceLocationCountryCOde;
var HotelLocation;
var CountryCodeDep;
var CountryCodeArr;


function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place_dep = autocomplete_dep.getPlace();

    //  for (var component in componentForm) {
    //document.getElementById(component).value = '';
    // }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place_dep.address_components.length; i++) {
        var addressType = place_dep.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place_dep.address_components[0][componentForm[addressType]];
            console.log(place_dep.address_components[0][componentForm[addressType]].place_id);
            // document.getElementById(addressType).value = val;
            DepLocation = val;
        }
        // for the country, get the country code (the "short name") also
        if (addressType == "country") {
            //  document.getElementById("country_code").value = place.address_components[i].short_name;
            CountryCodeDep = place_dep.address_components[i].short_name;

        }
    }


}

function fillInAddress2() {
    // Get the place details from the autocomplete object.
    var place_arr = autocomplete_arr.getPlace();
    //  for (var component in componentForm) {
    //document.getElementById(component).value = '';
    // }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place_arr.address_components.length; i++) {
        var addressType1 = place_arr.address_components[i].types[0];
        if (componentForm[addressType1]) {
            var val = place_arr.address_components[0][componentForm[addressType1]];
            // document.getElementById(addressType).value = val;
            ArrLocation = val;
        }
        // for the country, get the country code (the "short name") also
        if (addressType1 == "country") {
            //  document.getElementById("country_code").value = place.address_components[i].short_name;
            CountryCodeArr = place_arr.address_components[i].short_name;
        }
    }


}


function fillInAddress3() {
    // Get the place details from the autocomplete object.

    var place_hotel = autocomplete_HotelSearch.getPlace();
    //  for (var component in componentForm) {
    //document.getElementById(component).value = '';
    // }

    for (var i = 0; i < place_hotel.address_components.length; i++) {
        var addressType2 = place_hotel.address_components[i].types[0];
        if (componentForm[addressType2]) {
            var val = place_hotel.address_components[0][componentForm[addressType2]];
            // document.getElementById(addressType).value = val;
            HotelLocation = val;
        }
        // for the country, get the country code (the "short name") also
        if (addressType2 == "country") {
            //  document.getElementById("country_code").value = place.address_components[i].short_name;
            console.log(place_hotel.address_components[i].short_name);
            HotelPlaceLocationCountryCOde = place_hotel.address_components[i].short_name;
        }
    }


}



var placeSearch, autocomplete_dep, autocomplete_arr, autocomplete_HotelSearch;

var componentForm = {
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete_arr = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement}     */
        (document.getElementById('autocomplete_arr')), {
            types: ['(cities)']
        }
    );

    autocomplete_HotelSearch = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement}     */
        (document.getElementById('autocompleteHotelPLace')), {
            types: ['(cities)']
        }
    );
    autocomplete_dep = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement}     */
        (document.getElementById('autocomplete')), {
            types: ['(cities)']
        }
    );

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    // Get Latitude and longitude
    google.maps.event.addListener(autocomplete_dep, 'place_changed', function () {
        var place = autocomplete_dep.getPlace();
        // document.getElementById('lat').value = place.geometry.location.lat();
        // document.getElementById('lng').value = place.geometry.location.lng();
        fillInAddress();
    });

    google.maps.event.addListener(autocomplete_HotelSearch, 'place_changed', function () {
        var place3 = autocomplete_HotelSearch.getPlace();
        // document.getElementById('lat').value = place.geometry.location.lat();
        // document.getElementById('lng').value = place.geometry.location.lng();
        fillInAddress3();
    });

    google.maps.event.addListener(autocomplete_arr, 'place_changed', function () {
        var place2 = autocomplete_arr.getPlace();
        // document.getElementById('lat').value = place.geometry.location.lat();
        // document.getElementById('lng').value = place.geometry.location.lng();
        fillInAddress2();
    });
}
google.maps.event.addDomListener(window, 'load', initAutocomplete);

/*----------------------------------------------------------------------------------------------------------------------------*/
/*-- ROud type change---*/
document.getElementById("One").onclick = function () {
    myFunction1()
};
document.getElementById("Round").onclick = function () {
    myFunction2()
};

function myFunction1() {
    document.getElementById("Return").style.display = "none";
    var elements = document.getElementsByClassName("devider");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = ("30%");
    }
}

function myFunction2() {
    document.getElementById("Return").style.display = "flex";
    var elements = document.getElementsByClassName("devider");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = ("22.5%");
    }
}

/*-- frame type change---*/

document.getElementById("wannaHotel").onclick = function () {
    myFunction3()
};

document.getElementById("wannaFlight").onclick = function () {
    myFunction4()
};

function myFunction3() {
    var elements = document.getElementsByClassName("ifYouWannaHotel");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = ("rgba(33, 47, 61, 0.8)");
    }
    elements = document.getElementsByClassName("ifYouWannaFlight");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = ("rgba(33, 47, 61, 0.5)");
    }

    document.getElementById("flights-form").style.display = "none";
    document.getElementById("hotels-form").style.display = "flex";

}

function myFunction4() {
    var elements = document.getElementsByClassName("ifYouWannaHotel");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = ("rgba(33, 47, 61, 0.5)");
    }
    elements = document.getElementsByClassName("ifYouWannaFlight");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = ("rgba(33, 47, 61, 0.8)");
    }
    document.getElementById("flights-form").style.display = "flex";
    document.getElementById("hotels-form").style.display = "none";
}
/*--------------------------navbar-------------------------------------------------------------*/
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const servicesMenu = document.querySelector('#search-page');
    let scrollPos = window.scrollY;
    // console.log(scrollPos);

    // adds 'highlight' class to my menu items
    if (window.innerWidth > 960 && scrollPos < 600) {
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 1400) {
        aboutMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        servicesMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 2345) {
        servicesMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    }

    if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
        elem.classList.remove('highlight');
    }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

/*--------------------------One way flights search-------------------------------*/


/*--------------------------Round flights search---------------------------------*/

/*------------------------------Hotels search -----------------------------------*/

function getHotels(HotelInfo) {
    let id;
    fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${HotelInfo.LocationName}&locale=en_US`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "c4f3219d3fmshfd7fae08824cf1dp17cca4jsnc979aa0e2f0b",
                "x-rapidapi-host": "hotels4.p.rapidapi.com"
            }
        })
        .then(response =>
            response.json()
        )
        .then(response => {
            console.log(response);
            id = response['suggestions'][0]['entities'][0].destinationId;

            fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${id}&pageNumber=1&checkIn=${HotelInfo.check_in_time}&checkOut=${HotelInfo.check_out_time}&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "c4f3219d3fmshfd7fae08824cf1dp17cca4jsnc979aa0e2f0b",
                        "x-rapidapi-host": "hotels4.p.rapidapi.com"
                    }
                })
                .then(response =>
                    response.json()
                )
                .then(response => {
                    console.log(response);

                    for (let i = 0; i < 5; i++) {
                        
                        console.log(response['data']['body']['searchResults']['results'][i].name);
                        console.log(response['data']['body']['searchResults']['results'][i]['address'].streetAddress);
                        console.log(response['data']['body']['searchResults']['results'][i]['address'].locality);
                        console.log(response['data']['body']['searchResults']['results'][i]['address'].region);
                        console.log(response['data']['body']['searchResults']['results'][i]['guestReviews'].rating);
                        console.log(response['data']['body']['searchResults']['results'][i]['landmarks'][0]);
                        console.log(response['data']['body']['searchResults']['results'][i]['landmarks'][1]);
                        
                    }
                })
                .catch(err => {
                    console.error(err);
                });

        })
        .catch(err => {
            console.error(err);
        });


}

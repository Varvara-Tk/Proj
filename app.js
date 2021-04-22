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
            origin: originSkyName,
            destination: destSkyNAme
        }

        console.log(FlightInfo);
        getOneFlight(FlightInfo);


    } else {


        var FlightInfo = {
            dep: DepLocation,
            depCountryCode: CountryCodeDep,
            arr: ArrLocation,
            arrCountryCode: CountryCodeArr,
            depart_time: Date_of_depart,
            return_time: Date_of_return,
            origin: originSkyName,
            destination: destSkyNAme
        }

        console.log(FlightInfo);
        getRoundFlight(FlightInfo);
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
var originSkyName = '';
var destSkyNAme = '';

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
            //  console.log(place_dep.address_components[0][componentForm[addressType]].place_id);
            // document.getElementById(addressType).value = val;
            DepLocation = val;
            getSkyName(DepLocation).then(response => originSkyName = response);
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
            getSkyName(ArrLocation).then(response => destSkyNAme = response);

            // console.log(destSkyNAme);
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
    document.getElementById("resultForm").style.display = "flex";
    document.getElementById("resultFormFlight").style.display = "none";

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
    document.getElementById("resultForm").style.display = "none";
    document.getElementById("resultFormFlight").style.display = "block";

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
/*-------------------------------------- get sky name----------------------------*/

function getSkyName(Location) {

    return fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${Location}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "key",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        })
        .then(response =>
            response.json()
        )
        .then((responseData) => {
            //console.log(responseData);
            return responseData['Places'][0]['PlaceId'];
        })
        .catch(err => {
            console.error(err);
        });


}

//getvals().then(response => console.log(response));
/*--------------------------One way flights search-------------------------------*/
let ResultFormForFlights = document.getElementById('resultFormFlight');

function getOneFlight(FlightInfo) {
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${FlightInfo.depCountryCode}/USD/en-US/${FlightInfo.origin}/${FlightInfo.destination}/${FlightInfo.depart_time}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "key",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        })
        .then(response =>
            response.json()
        )
        .then(response => {
            console.log(response);
            document.getElementById("resultFormFlight").style.display = "block";
            let listResult = '';

            if (response['Carriers'].length == 0) {
                confirm("No matching flights!")
            } else {

                for (let i = 0; i < response['Carriers'].length; i++) {
                    listResult += `
            <div class="helpForm" >
                 <div class="Triumvirat">
                      <div class="Airlines">
                            <img src="image/tickets.png" >
                            <div id="${i}_NameCraft">${response['Carriers'][i].Name}</div>
                      </div>  
                      <div class="Flight_info">
                           <div class="Direction">
                                <div class="aero-info-dep"> 
                                          <img src="image/region.png">
                                          ${FlightInfo.dep}
                                </div>
                                <img src="image/OneWayDirection.png" class="imgD">
                                <div class="aero-info-arr"> 
                                          <img src="image/region.png">
                                          ${FlightInfo.arr}
                                </div>
                           </div>
                           <div class="direct-info">
                           <div> Price: ${response['Quotes'][i].MinPrice} $</div>
                           </div>
                      </div>
                      <div class="CarrierId">
                          ${response['Carriers'][i].CarrierId}
                      </div>
                 <div>
               
                 
                 
            </div></div>

<button class="Order_btn" id="${i}"
let name="Carrier: ${response['Carriers'][i].Name} 
Price:   ${response['Quotes'][i].MinPrice}$ 
From:    ${FlightInfo.dep},${FlightInfo.depCountryCode}
To:      ${FlightInfo.arr},${FlightInfo.arrCountryCode}
Depart:  ${FlightInfo.depart_time}" onClick="replyClick( this.name )" > Book </button>

</div>
            `
                }
                ResultFormForFlights.innerHTML = ('<div class="Res_form">' + listResult + '</div>');
            }


        })
        .catch(err => {
            confirm("No matching flights!")
            console.log(err);
        });
}
/*--------------------------Round flights search---------------------------------*/

function getRoundFlight(FlightInfo) {
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${FlightInfo.depCountryCode}/USD/en-US/${FlightInfo.origin}/${FlightInfo.destination}/${FlightInfo.depart_time}?inboundpartialdate=${FlightInfo.return_time}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "key",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        })
        .then(response =>
            response.json()
        )
        .then(response => {
            console.log(response);
            document.getElementById("resultFormFlight").style.display = "block";
            let listResult = '';

            if (response['Carriers'].length == 0) {
                confirm("No matching flights!")
            } else {

                for (let i = 0; i < response['Carriers'].length; i++) {
                    listResult += `
            <div class="helpForm" >
                 <div class="Triumvirat">
                      <div class="Airlines">
                            <img src="image/tickets.png" >
                            <div id="${i}_NameCraft">${response['Carriers'][i].Name}</div>
                      </div>  
                      <div class="Flight_info">
                           <div class="Direction">
                                <div class="aero-info-dep"> 
                                          <img src="image/region.png">
                                          ${FlightInfo.dep}
                                </div>
                                <img src="image/direction.png" class="imgD">
                                <div class="aero-info-arr"> 
                                          <img src="image/region.png">
                                          ${FlightInfo.arr}
                                </div>
                           </div>
                           <div class="direct-info">
                           <div> Price: ${response['Quotes'][i].MinPrice} $</div>
                           </div>
                      </div>
                      <div class="CarrierId">
                          ${response['Carriers'][i].CarrierId}
                      </div>
                 <div>
               
                 
                 
            </div></div>

<button class="Order_btn" id="${i}"
let name="Carrier: ${response['Carriers'][i].Name} 
Price:   ${response['Quotes'][i].MinPrice}$ 
From:    ${FlightInfo.dep},${FlightInfo.depCountryCode}
To:      ${FlightInfo.arr},${FlightInfo.arrCountryCode}
Depart:  ${FlightInfo.depart_time}" onClick="replyClick( this.name )" > Book </button>

</div>
            `
                }
                ResultFormForFlights.innerHTML = ('<div class="Res_form">' + listResult + '</div>');
            }


        })
        .catch(err => {
            confirm("No matching flights!")
            console.log(err);
        });
}

let TempInfo;

function replyClick(info) {
    $("#User").show("slow");

    TempInfo = info;
    window.document.getElementById("InfoText").innerText = info;
    console.log(TempInfo);
}



function BackButton2() {
    $("#User").hide();
}

function BookingDone() {
    let x = window.document.getElementById('phoneI').value;
    console.log(x);
    let n = window.document.getElementById("nameI").value;
    let e = window.document.getElementById('emailI').value;
    if (IFnumberISvalid(x) && validateName(n) && emailIsValid(e)) {
        window.document.getElementById('phoneI').style.borderColor = "green";
        window.document.getElementById('emailI').style.borderColor = "green";
        window.document.getElementById('nameI').style.borderColor = "green";
        let tempParam = {
            P_name: n,
            sent_to: e,
            phone: x,
            message: TempInfo
        };

        emailjs.send('service_llkndvq', 'template_s9ah8hd', tempParam)
            .then(function (res) {
                console.log("succes", res.status);
            })

        emailjs.send('service_llkndvq', 'template_tom9ctm', tempParam)
            .then(function (res) {
                console.log("succes", res.status);
                $("#User").hide('slow');
                $("#MyImage").show();
                $("#MyImage").delay(1000).fadeOut(500);
                setTimeout(() => {
                    location.reload();
                }, 800);
                

            })
            .catch(err => {
                alert("Input an email!")
                console.log(err);
            });
    } else {
        if (!IFnumberISvalid(x)) {
            window.document.getElementById('phoneI').style.borderColor = "red";
        }
        if (IFnumberISvalid(x)) {
            window.document.getElementById('phoneI').style.borderColor = "green";
        }

        if (!validateName(n)) {
            window.document.getElementById('nameI').style.borderColor = "red";
        }
        if (validateName(n)) {
            window.document.getElementById('nameI').style.borderColor = "green";
        }
        if (!emailIsValid(e)) {
            window.document.getElementById('emailI').style.borderColor = "red";
        }
        if (emailIsValid(e)) {
            window.document.getElementById('emailI').style.borderColor = "green";
        }
    }
}

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateName(name) {

    if (name == null || name == "") {
        //  alert("Name can't be blank");  
        return false;
    }
    return true;
}

function IFnumberISvalid(inputtxt) {

    var isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(inputtxt);
    return (isphone);


}

const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

/*------------------------------Hotels search -----------------------------------*/

let ResultForm = document.getElementById('resultForm');

function getHotels(HotelInfo) {
    let id;
    fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${HotelInfo.LocationName}&locale=en_US`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "key",
                "x-rapidapi-host": "hotels4.p.rapidapi.com"
            }
        })
        .then(response =>
            response.json()
        )
        .then(response => {
            // console.log(response);
            id = response['suggestions'][0]['entities'][0].destinationId;

            fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${id}&pageNumber=1&checkIn=${HotelInfo.check_in_time}&checkOut=${HotelInfo.check_out_time}&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "key",
                        "x-rapidapi-host": "hotels4.p.rapidapi.com"
                    }
                })
                .then(response =>
                    response.json()
                )
                .then(response => {
                    console.log(response);
                    document.getElementById("resultForm").style.display = "flex";
                    let i = 0;
                    let listResult = '<div class="Res_form">';
                    listResult = fiveHotels(i, listResult, response, HotelInfo);
                    ResultForm.innerHTML = listResult + `<div class="More_Hotels" id="more"><img src="image/more.png"  style="width:30px;"></div></div>`;

                    document.getElementById('more').onclick = function () {
                        console.log('dddddddddddd');
                        i += 5;
                        listResult = fiveHotels(i, listResult, response, HotelInfo);
                        ResultForm.innerHTML = listResult + `</div>`;
                        console.log(document.getElementById('1_name').value);
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


function fiveHotels(i, listResult, response, HotelInfo) {
    let r = i + 5;
    for (i; i < r; i++) {

        listResult += `
<div class="hlpfrm" >
<div class="HOTEL_NAME"  id="${i}_name"> ${response['data']['body']['searchResults']['results'][i].name} </div>
<div class="Stars"> ${getStars(response['data']['body']['searchResults']['results'][i].starRating )} </div>
<div class="InfoPArt">
<div>
<div class="HOTEL_Address"  id="${i}_address"> ${response['data']['body']['searchResults']['results'][i]['address'].streetAddress}, ${response['data']['body']['searchResults']['results'][i]['address'].locality}, ${response['data']['body']['searchResults']['results'][i]['address'].region} </div>`
        if (response['data']['body']['searchResults']['results'][i]['guestReviews'].rating != undefined) {
            listResult += `
<div class="Rating"> Rating: ${response['data']['body']['searchResults']['results'][i]['guestReviews'].rating}`
        }
        listResult += `
</div>
<div class="Price"> Price: ${response['data']['body']['searchResults']['results'][i]['ratePlan']['price'].current}     
</div></div>
<div class="Landmarks"> <div> ${response['data']['body']['searchResults']['results'][i]['landmarks'][0].distance } from  ${response['data']['body']['searchResults']['results'][i]['landmarks'][0].label } </div>
<div> ${response['data']['body']['searchResults']['results'][i]['landmarks'][1].distance } from ${response['data']['body']['searchResults']['results'][i]['landmarks'][1].label }</div> 
</div>
</div>
<button class="Order_btn" id="${i}"
let name="Hotel: ${response['data']['body']['searchResults']['results'][i].name} 
Address: ${response['data']['body']['searchResults']['results'][i]['address'].streetAddress}, ${response['data']['body']['searchResults']['results'][i]['address'].locality}, ${response['data']['body']['searchResults']['results'][i]['address'].region}
Price:   ${response['data']['body']['searchResults']['results'][i]['ratePlan']['price'].current}/per night
Check-in:   ${HotelInfo.check_in_time}
Check-out:  ${HotelInfo.check_out_time}"onClick="replyClick(this.name )"> Book </button>
</div> `

    }

    return listResult;
}


function getStars(number) {
    let str = ``;
    for (let i = 0; i < number; i++) {
        str += `<img src="image/star.png" width="15px" height="15px">`;
    }
    return str;
}

"use strict";
    // ========================================= Main ================================================================
$(document).ready(function(){
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            console.log(lat,lng);
            makeMapsAjaxCall(lat,lng);
        },
        function(error) {
            const lat = 44.977753
            const lng = -93.265011
            console.log(error);
            makeMapsAjaxCall(lat,lng);
            }
        );

        $('#search-form').submit(handleSearchClick)

        $()

    });

    // ======================================== Functions ===========================================================

    function handleSearchClick(e) {

        //Ensure sure form doesnt submit and reset the page
        e.preventDefault()

        //Grab user input
        const searchInput = $('#user-input').val();

        if (searchInput === "") {
            alert('wrong!')
        } else {

        const searchCity = searchInput.replace(' ', '+');

        //Make Ajax Call
        makeTicketFlyAjaxCall(searchCity)
        }
      
    };

    //TicketFly api call
    function makeTicketFlyAjaxCall(city) {
        console.log('TF on the way!');
        let number = 50;
        const queryURL = `http://www.ticketfly.com/api/events/upcoming.json?orgId=1&q=${city}&maxResults=${number}&fieldGroup=light&fields=id,startDate,venue.name,venue.address1,headliners,showType,venue.lat,venue.lng`
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: 'jsonp',
            cors: true,
            secure: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }).then(function(response) {
            console.log(response);
            $('#results').empty();
            for (let i=0;i<response.events.length;i++){

                let name = response.events[i].name
                let ticketPrice = response.events[i].ticketPrice;
                let venueAddress = response.events[i].venue.address1;
                let venueName = response.events[i].venue.name;
                let venueLat = response.events[i].venue.lat;
                // let venueLat = +venueLat;
                let venueLong = response.events[i].venue.lng;
                // let venueLong = +venueLong;
                let startDate = response.events[i]. startDate;
                let ticketPurchaseLink= response.events[i].ticketPurchaseUrl;
                let image = response.events[i].headliners[0].image
                
                if (image === null){
                //  console.log("Not Available");
                image = "Not Available";
                }else{
                image = response.events[i].headliners[0].image.jumbo.path
                // console.log(image);
                }

                let eventCard =`<div class="mdl-card demo-card-event mdl-shadow--2dp mdl-cell mdl-cell--4-col">
                <div class="mdl-card__title mdl-card--expand" style="background: url('${image}') center / cover;">
                    <h1 tabindex="0" class="mdl-card__title-text">${name}</h1>
                </div> 
                <div tabindex="0" class="mdl-card__supporting-text">
                    <div class="support-text">${venueName}</div>
                    <div class="support-text">${startDate}</div>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a tabindex="0" class="mdl-button mdl-js-button mdl-js-ripple-effect">Map</a>
                    <a tabindex="0" class="mdl-button mdl-js-button mdl-js-ripple-effect">Tickets</a>
                </div>
                </div>`
            
                $("#results").append(eventCard);
            }
        });
    }
    // Google maps api call
    function makeMapsAjaxCall(lat,lng){
        alert('GM on the way!');
        const apiKey= 'AIzaSyA1oE-m_GG9r2xxBtwtQ0ZNMercB9pBhPU'
        const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

        $.ajax({
            url: queryURL,
            method: "GET",

        }).then(function(response) {
            const currentCity = response.results[0].address_components.find(function(element) {
                return element.types.includes('locality')
            }).long_name

            const cleanCity =currentCity.trim().replace(' ', '+');

            console.log(cleanCity);
            
            makeTicketFlyAjaxCall(cleanCity);
        })
    }
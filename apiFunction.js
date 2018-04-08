"use strict";
    // ========================================= Variables ===========================================================
        let lat = 44.977753
        let lng = -93.265011

    // ========================================= Main ================================================================
    $(document).ready(function(){

            // navigator.geolocation.getCurrentPosition(function(position) {
            //    let lat = position.coords.latitude
            //    let lng = position.coords.longitude
            //   console.log(lat,lng);
            // });

            var geoSuccess = function(position) {            
                startPos = position;
                document.getElementById('startLat').innerHTML = startPos.coords.latitude;
                document.getElementById('startLon').innerHTML = startPos.coords.longitude;
                console.log(startPos.coords.latitude);
              };

        // makeMapsAjaxCall(lat,lng);

        $('form').submit(handleSearchClick);
    });

    // ======================================== Functions ===========================================================
    // Try HTML5 geolocation.
   

    
    
    function handleSearchClick(event) {

        //Ensure sure form doesnt submit and reset the page
        event.preventDefault()

        //Grab user input
        const searchInput = $('#user-input').val('');

        if (searchInput === "")  {
            // //Clean up search query and call API
            // $('#user-input').val('');
               
            const searchCity = searchInput.replace(' ', '+');

            //Make Ajax Call
            makeTicketFlyAjaxCall(searchCity)
        } else {
            alert('give us a valid input');
        };       
    };

    //TicketFly api call
    function makeTicketFlyAjaxCall(city) {
        let scroll = 50;
        const queryURL = `http://www.ticketfly.com/api/events/upcoming.json?orgId=1&q=${city}
    &maxResults=${scroll}&fieldGroup=light&fields=id,startDate,venue.name,venue.address1,headliners,showType,venue.lat,venue.lng`
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

                let eventCard =`<div class="event-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col">
                <div class="mdl-card__title">
                    <h1 class="mdl-card__title-text">${name}</h1>
                </div>
                <div class="mdl-card__supporting-text">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam accusamus, consectetur.</p>
                </div>    
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Read More</a>
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Read More</a>
                </div>
                </div>`
            
                $("#results").append(eventCard);
            }
        });
    }
    // Google maps api call
    function makeMapsAjaxCall(lat,lng){
        alert('on my way!');
        const apiKey= 'AIzaSyA1oE-m_GG9r2xxBtwtQ0ZNMercB9pBhPU'
        const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                apiKey: apiKey,
                lat: lat,
                lng: lng
            }
        }).then(function(response) {
            console.log(response);
            })
    }
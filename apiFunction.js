"use strict";
    // ========================================= Variables ===========================================================
        let lat = 44.977753
        let lng = -93.265011

    // ========================================= Main ================================================================
    $(document).ready(function(){

            makeTicketFlyAjaxCall('Minneapolis');
            // navigator.geolocation.getCurrentPosition(function(position) {
            //    let lat = position.coords.latitude
            //    let lng = position.coords.longitude
            //   console.log(lat,lng);
            // });

            // var geoSuccess = function(position) {            
            //     startPos = position;
            //     document.getElementById('startLat').innerHTML = startPos.coords.latitude;
            //     document.getElementById('startLon').innerHTML = startPos.coords.longitude;
            //     console.log(startPos.coords.latitude);
            //   };

        // makeMapsAjaxCall(lat,lng);

        $('form').submit(handleSearchClick);
    });

    // ======================================== Functions ===========================================================
    // Try HTML5 geolocation.
   

    
    
    function handleSearchClick(event) {

        //Ensure sure form doesnt submit and reset the page
        event.preventDefault()

        //Grab user input
        const searchInput = $('#user-input').val();

        const searchCity = searchInput.replace(' ', '+');

        //Make Ajax Call
        makeTicketFlyAjaxCall(searchCity)
      
    };

    //TicketFly api call
    function makeTicketFlyAjaxCall(city) {
        console.log('TF on the way!');
        let number = 50;
        const queryURL = `http://www.ticketfly.com/api/events/upcoming.json?orgId=1&q=${city}
    &maxResults=${number}&fieldGroup=light&fields=id,startDate,venue.name,venue.address1,headliners,showType,venue.lat,venue.lng`
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

                let eventCard =`<div class="mdl-card demo-card-event mdl-shadow--2dp mdl-cell mdl-cell--4-col">
                <div class="mdl-card__title mdl-card--expand">
                    <h1 class="mdl-card__title-text">${name}</h1>
                </div> 
                <div class="mdl-card__supporting-text">
                    <div class="support-text">${venueName}</div>
                    <div class="support-text">${startDate}</div>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-js-button mdl-js-ripple-effect">Map</a>
                    <a class="mdl-button mdl-js-button mdl-js-ripple-effect">Tickets</a>
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
            data: {
                apiKey: apiKey,
                lat: lat,
                lng: lng
            }
        }).then(function(response) {
            console.log(response);
            })
    }
"use strict";
    // ========================================= Variables ===========================================================


    // ========================================= Main ================================================================
    $(document).ready(function(){
        getCurrentLocation();
        
        makeAjaxCall(currentLocation);

        $('#submit').submit(handleSearch);
    });

    // ======================================== Functions ===========================================================
    
    // get user's current loation
    function getCurrentLocation() {
        $.get("http://ipinfo.io", function (response) {
        currentLocation = response.city;
        return(currentLocation)
        }, "jsonp");
    }

    function handleSearchClick(event) {

            //Ensure sure form doesnt submit and reset the page
            e.preventDefault()

            //Grab user input
            const searchInput = $('#user-input').val();
        
            //Clean up search query and call API
            $('#user-input').val('');
        
            const searchCity = input.replace(' ', '+');

            //Make Ajax Call
            makeAjaxCall(searchCity)
    }

    //TicketFly api call
    function makeAjaxCall(cityName) {
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

            //Empty Dom so new search is shown at the top of the results list
            $("#results").empty();

            for (let i=0;i<response.events.length;i++){

                artistName = response.events[i].name;
                ticketPrice = response.events[i].ticketPrice;
                venueAddress = response.events[i].venue.address1;
                venueName = response.events[i].venue.name;
                venueLat = response.events[i].venue.lat;
                venueLat = +venueLat;
                venueLong = response.events[i].venue.lng;
                venueLong = +venueLong;
                startDate = response.events[i]. startDate;
                ticketPurchaseLink= response.events[i].ticketPurchaseUrl;
                image = response.events[i].headliners[0].image
                    if (image === null){
                    //  console.log("Not Available");
                        image = "Not Available";
                    }else{
                        image = response.events[i].headliners[0].image.medium.path
                        // console.log(image);
                    }

                let eventCard =` <div class="event-card mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col">
                <div class="mdl-card__title" style="background: url('${image}') center / cover;">
                    <h3 class="card-h3" id="${artistName}">
                        ${artistName}
                    </h3>
                    <h5 class="card-h5" id="${venueName}">
                        ${venueName}
                    </h5>
                    <h5 class="card-h5" id="${ticketPrice}">
                        ${ticketPrice}
                    </h5>
                </div>
                <div class="button-container mdl-card__actions mdl-card--border">
                    <a id="map-button" class="button mdl-button mdl-js-button mdl-js-ripple-effect">
                        Map
                    </a>
                    <a id="ticket-purchase-button" href="${ticketPurchaseLink}" class="button mdl-button mdl-js-button mdl-js-ripple-effect">
                        Tickets
                    </a>
                </div>
                </div>`
                
                $("#results").append(eventCard);
            } 
        }); //End Ticket Fly API

}); //End of document.ready
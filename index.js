"use strict";
$(document).ready(function(){

    // var for TicketFly API
    let artistName = "";
    let ticketPrice = "";
    let venueAddress = "";
    let venueName = "";
    let venueLat = 0;
    let venueLong = 0;
    let ticketPurchaseLink= "";
    let startDate = "";
    let image = ""
    let eventInfos = {};
    
    // // Variables for Last FM Api
    // let topTrackName = ""
    
    // Search input value 
    let city= "";
    let inputCity =""
    let scroll = 10;

    $.get("http://ipinfo.io", function (response) {
        console.log(response.city);
    city = response.city;
   console.log(city)
    }, "jsonp");

    // // Search input value 
    // let city= $("#location-search").val();
    // let scroll = 10;
    // console.log(city)
    
    // callTicketFlyApi(city);
    // console.log(callTicketFlyApi("Minneapolis"))
    // $("#search").on("click", function(){
    // let callTicketFlyApi = function(CityName) {

    
        
     // TicketFLy Ajax Call
            $.ajax({
                url: `http://www.ticketfly.com/api/events/upcoming.json?orgId=1&q=${city}
                    &maxResults=${scroll}&fieldGroup=light&fields=id,startDate,venue.name,venue.address1,headliners,showType,venue.lat,venue.lng`,
                method: "GET",
                dataType: 'jsonp',
                cors: true,
                secure: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
        }).then(function(response) {
            console.log(response);
            console.log(city)
            for (let i=0;i<response.events.length;i++){

            // Artist/Band Name
            artistName = response.events[i].name;
            // console.log(artistName);

            // Ticket Price
            ticketPrice = response.events[i].ticketPrice;
            console.log(ticketPrice);
                    
            // Venue Address
            venueAddress = response.events[i].venue.address1;
            // console.log(venueAddress);

            // Venue Name
            venueName = response.events[i].venue.name;
            // console.log(venueName);

            // Venue Lat and Long
            venueLat = response.events[i].venue.lat;
            venueLat = +venueLat;
            venueLong = response.events[i].venue.lng;
            venueLong = +venueLong;
            // console.log(typeof venueLong);
            // console.log(venueLat);


            // Start Date
            startDate = response.events[i]. startDate;
            // console.log(startDate);

            // Ticket Buying Link 
            ticketPurchaseLink= response.events[i].ticketPurchaseUrl;
            // console.log(ticketPurchaseLink);

            // Image Link
            image = response.events[i].headliners[0].image
            if (image === null){
                //  console.log("Not Available");
                image = "Not Available";
            }else{
                image = response.events[i].headliners[0].image.medium.path
                // console.log(image);
            }

            let div =` <div class="event-card mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col">
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
            $("#results").append(div);
            } // End of for loop (TicketFly API)

        }); // End of promise (TicketFly API)
        
        $("#submit").on("click", function(){
            let input = $("#fixed-header-drawer-exp").val();
            if (input===""){

            }else{
            $.ajax({
                url: `http://www.ticketfly.com/api/events/upcoming.json?orgId=1&q=${input}
                    &maxResults=${scroll}&fieldGroup=light&fields=id,startDate,venue.name,venue.address1,headliners,showType,venue.lat,venue.lng`,
                method: "GET",
                dataType: 'jsonp',
                cors: true,
                secure: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
        }).then(function(response) {
            $("#results").empty();
            
            for (let i=0;i<response.events.length;i++){

                // Artist/Band Name
                artistName = response.events[i].name;
                // console.log(artistName);
    
                // Ticket Price
                ticketPrice = response.events[i].ticketPrice;
                console.log(ticketPrice);
                        
                // Venue Address
                venueAddress = response.events[i].venue.address1;
                // console.log(venueAddress);
    
                // Venue Name
                venueName = response.events[i].venue.name;
                // console.log(venueName);
    
                // Venue Lat and Long
                venueLat = response.events[i].venue.lat;
                venueLat = +venueLat;
                venueLong = response.events[i].venue.lng;
                venueLong = +venueLong;
                // console.log(typeof venueLong);
                // console.log(venueLat);
    
    
                // Start Date
                startDate = response.events[i]. startDate;
                // console.log(startDate);
    
                // Ticket Buying Link 
                ticketPurchaseLink= response.events[i].ticketPurchaseUrl;
                // console.log(ticketPurchaseLink);
    
                // Image Link
                image = response.events[i].headliners[0].image
                if (image === null){
                    //  console.log("Not Available");
                    image = "Not Available";
                }else{
                    image = response.events[i].headliners[0].image.medium.path
                    // console.log(image);
                }
    
                let div =` <div class="event-card mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col">
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
                $("#results").append(div);
            }
        });
           
        }
        })
    // }
// }); //End Of search click event


})

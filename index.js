"use strict";
$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyCfxyrk88iFuovC_eL1q4LnTdzFpWDNdog",
        authDomain: "highlyoptimized.firebaseapp.com",
        databaseURL: "https://highlyoptimized.firebaseio.com",
        projectId: "highlyoptimized",
        storageBucket: "highlyoptimized.appspot.com",
        messagingSenderId: "485374131862"
      };
    firebase.initializeApp(config);

    // Globally declared Variables 
    let database = firebase.database();

    // var for TicketFly API
    let artistName = "";
    let ticketPrice = "";
    let venueAddress = "";
    let venueName = "";
    let venueLat = 0;
    let venueLong = 0;
    let ticketPurchaseLink= "";
    let doorsDate = "";
    let image = ""
    let eventInfos = {};
    
    // Variables for Last FM Api
    let topTrackName = ""

    // Search input value ($('#searchTerm').val())
    let city= $("#search").val();
    let scroll = 10;

    $("#search").on("click", function(){
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
    for (i in response.events){

    // Artist/Band Name
    artistName = response.events[i].name;
    artistName = artistName.toLowerCase()
    // console.log(artistName);

    // Ticket Price
    ticketPrice = response.events[i].ticketPrice;
    // console.log(ticketPrice);
            
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


    // Doors Date
    startDate = response.events[i]. startDate;
    // console.log(doorsDate);

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
    // Object to store data's from TicketFly API
    eventInfos = {
        artistName:artistName,
        ticketPrice:ticketPrice,
        ageLimit:ageLimit,
        venueAddress:venueAddress,
        venueName:venueName,
        latLong:{lat:venueLat, lng:venueLong},
        ticketPurchaseLink:ticketPurchaseLink,
        startDate:startDate,
        image:image,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        }
    // console.log(eventInfos);

    // push the above object into the database 
    database.ref().push(eventInfos);

    } // End of for loop (TicketFly API)

}); // End of promise (TicketFly API)

}); //End Of search click event


})
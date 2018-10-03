// 'use strict';
$(document).ready(function() {
    // $( "form" ).submit(function( event ) {
    //         console.log( $( this ).serializeArray() );
    //         event.preventDefault();
    //       });

    let val = '';

    $('.send').click(function() {

        let EventName = document.getElementById('EventName').value;
        let EventDate = document.getElementById('EventDate').value;
        let EventPlace = document.getElementById('EventCity').value;
        let EventAddress = document.getElementById('EventAddress').value;
        let EventTime = document.getElementById('EventTime').value;
        let EventTopic = document.getElementById('Topic').value;
        let SpeakerName = document.getElementById('SpeakerName').value;
        let SpeakerLastName = document.getElementById('SpeakerLastname').value;
        let SpeakerCountry = document.getElementById('SpeakerFromCountry').value;
        let SpeakerCity = document.getElementById('SpeakerFromCity').value;
        let SpeakerDescription = document.getElementById('SpeakerDescription').value;
        val = {
            "name": EventName,
            "date": EventDate,
            "city": EventPlace,
            "address": EventAddress,
            "speaker": [{
                "time": EventTime,
                "topic": EventTopic,
                "firstName": SpeakerName,
                "lastname": SpeakerLastName,
                "country": SpeakerCountry,
                "city": SpeakerCity,
                "description": SpeakerDescription
            }]
        }
        console.log(val);
    })

    // const fs = require('fs');
    // let data = JSON.stringify(val);
    // fs.writeFileSync('data.json', data, finished);

    // function finished(err) {
    //     console.log('success');
    // }

})
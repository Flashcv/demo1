let data = [];
var config = {
    apiKey: "AIzaSyCY35X_IC6tnFgrRGrWmWbl0fcj6039zHc",
    authDomain: "demo1-41cbe.firebaseapp.com",
    databaseURL: "https://demo1-41cbe.firebaseio.com",
    projectId: "demo1-41cbe",
    storageBucket: "demo1-41cbe.appspot.com",
    messagingSenderId: "427473126991"
};
firebase.initializeApp(config);

var out = '';
var uniqYears = [];
var ActualDate = new Date();
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]
//to delete duplicate years
function unique(arr) {
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
}
//to render event front/back card + modal
function renderEvent(eventData) {
    let speakerData = '';
    let modal = '';

    eventData.speaker.forEach(function (speaker, index, data) {
        modal += `
        <div id="${speaker.firstName + speaker.lastName}" class="modal">
            <span>Speaker:</span> 
            <span class="titleClass">${speaker.firstName + ' ' + speaker.lastName}</span>
            <p>from:    ${speaker.city}, ${speaker.country} </p>
            <p> Description </p>
            <p> ${speaker.description} </p>
            <a href="#" rel="modal:close">Close</a>
        </div>`
        if (index === 0) {
            speakerData += `
            <table class="blueTable">
                <thead>
                    <tr class="rowClass">
                        <th>Schedule</th>
                        <th>Topic</th>
                        <th>Speaker</th>
                    </tr>
                </thead>
            <tbody>`
        }

        speakerData += `
            <tr>
                <td>${speaker.time}</td>
                <td>${speaker.topic}</td>
                <td><a class="buttonClass" href="#${speaker.firstName + speaker.lastName}" rel="modal:open">${speaker.firstName + " " + speaker.lastName}</a></td>
            </tr>`

        if (index === (data.length - 1)) {
            speakerData += `
                </tbody>
                </table>
                `
        }

    });
    const date = new Date(eventData.date);
    $('#modal').append(modal);
    return `  
        <div class="container">
            <div class="card">
                <div class="front">
                    <div class="contentfront">
                        <div class="month">
                            <span class="eventName">
                                ${eventData.name}
                            </span>
                                <div class="eventPlace">
                                    ${eventData.address}
                                </div>
                        </div>
                        <div class="date">
                            <div class="datecont">
                            <div id="date">${date.getDate()}</div>
                            <div id="day">${days[date.getDay()]}</div>
                            <div id="month">${months[date.getMonth()] + ' / ' + date.getFullYear()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back">
                    ${speakerData}
                </div>
            </div>
        </div>`
}
//years list
function renderYears(events) {
    var allYears = [];
    events.forEach(function (element) {
        let date = new Date(element.date)
        allYears.push(date.getFullYear())
        uniqYears = unique(allYears.sort())
    })
    for (var i = 0; i < uniqYears.length; i++) {
        if (uniqYears[i] == ActualDate.getFullYear()) {
            out += '<li class="year activeYear">' + uniqYears[i] + '</li>'
        } else {
            out += '<li class="year">' + uniqYears[i] + '</li>'
        }
    }
    return out;
}
//flip card
function flipCard(e) {
    if (e.target.className === "buttonClass") return;
    $(this).toggleClass('flipped');
}
//main
window.onload = (function () {
    let database = firebase.database();
    database.ref().on("value", function (snap) {
        if (snap.exists()) {
            data = snap.val();
            $('#slider').html(renderYears(data));

            let currentYearEvent = data.filter(function (event) {
                let date = new Date(event.date);
                return date.getFullYear() === ActualDate.getFullYear();
                
            })
            //default page (current year)
            currentYearEvent.forEach(function (event) {
                $('#name').append(renderEvent(event))
            })
            $('.card').click(flipCard);

            $('.year').click(function () {
                $('.year').removeClass('activeYear');
                $(this).toggleClass('activeYear');
                document.getElementById('name').innerHTML = ''
                $('#name').html('');
                //onclick year
                yearOnClick = $(this).text()
                let filteredData = data.filter(function (event) {
                    let date = new Date(event.date);
                    return parseInt(yearOnClick) === date.getFullYear();
                })

                filteredData.forEach(function (event) {
                    $('#name').append(renderEvent(event));
                })
                $('.card').click(flipCard);
            })


        }
    });
});

function formSend(form) {

    let val = {
        "name": form.EventName.value,
        "date": form.EventDate.value,
        "city": form.EventCity.value,
        "address": form.EventAddress.value,
        "speaker": [{
            "time": form.EventTime.value,
            "topic": form.EventTopic.value,
            "firstName": form.SpeakerName.value,
            "lastName": form.SpeakerLastName.value,
            "country": form.SpeakerCountry.value,
            "city": form.SpeakerCity.value,
            "description": form.SpeakerDescription.value
        }]
    }
    let ref = firebase.database().ref();
    let eventsRef = ref.child(data.length);
    let eventRef = eventsRef.update(val);

    ref.child(eventsRef).update(val);


}
//login button
document.getElementById("check").onclick = function () {
    let login = document.getElementById("login");
    let password = document.getElementById("password");
    let check = document.getElementById("check");
    let logout = document.getElementById("logout");
    let logged = document.getElementById("logged");
    if (login.value == "admin" && password.value == "admin") {
        password.style.display = "none";
        login.style.display = "none";
        check.style.display = "none";
        logout.style.display = "block";
        logged.style.display = "block";
        $("#labellogin").toggleClass("hidden");
        $("#labelpassword").toggleClass("hidden");
        $(".disabled").toggleClass("disabled");

    } else {
        alert("incorrect login or password");
        login.value = "";
        password.value = "";
    }
}
//logout button
document.getElementById("logout").onclick = function () {
    window.location.replace('index.html');
}
//add speaker form
let counter = 0;
$("#addSpeaker").click(function () {
    let oneMore = '';
    if (counter < 4) {
        counter += 1;
        oneMore += `
        <div class="addFormBody" id="speakerid${counter}">
            <fieldset>
                <label class="EventName" >Add speaker</label><a class="close" href="#" onclick="hide('speakerid${counter}')">X</a>
                <div class="field">
                    <label for="EventTime">Event time</label>
                    <select class="selectClass" id="EventTime${counter}" name="EventTime">
                        <option value="9:30-10:30" selected>9:30-10:30</option>
                        <option value="10:30-11:30">10:30-11:30</option>
                        <option value="11:30-12:30">11:30-12:30</option>
                        <option value="12:30-13:30">12:30-13:30</option>
                    </select>
                </div>
                <div class="field">
                    <label for="Topic">Topic</label>
                    <input type="text" id="EventTopic${counter}" name="EventTopic">
                </div>
                <div class="field">
                    <label for="SpeakerName">First Name</label>
                    <input type="text" id="SpeakerName${counter}" name="SpeakerName">
                </div>
                <div class="field">
                    <label for="SpeakerLastname">Last Name</label>
                    <input type="text" id="SpeakerLastname${counter}" name="SpeakerLastName">
                </div>
                <div class="field">
                    <label for="SpeakerFromCountry">From (Country)</label>
                    <input type="text" id="SpeakerCountry${counter}" name="SpeakerCountry">
                </div>
                <div class="field">
                    <label for="SpeakerFromCity">From (City)</label>
                    <input type="text" id="SpeakerCity${counter}" name="SpeakerCity">
                </div>
                <div class="field">
                    <label for="SpeakerDescription">Description</label>
                    <input type="text" id="SpeakerDescription${counter}" name="SpeakerDescription">
                </div>
            </fieldset>
        </div>`
    }
    $('#oneMore').append(oneMore);
})
function hide(target) {
    document.getElementById(target).style.display = 'none';
}
$(document).ready(function () {
    var out = '';
    var uniqYears = [];
    var ActualDate = new Date();
    document.get
    document.getElementById("check").onclick = function () {
        let login = document.getElementById("login");
        let password = document.getElementById("password");
        //let top = document.getElementsByClassName("top");
        let check = document.getElementById("check");
        let logout = document.getElementById("logout");
        let logged = document.getElementById("logged");
        let labellogin = document.getElementById("labellogin");
        let labelpassword = document.getElementById("labelpassword");
        //let disabled = document.getElementsByClass("disabled");
        // for (let i = 0; i < login.length; i++) {
            if (login.value == "" && password.value == "") {
                password.style.display="none";
                login.style.display="none";
                check.style.display = "none";
                logout.style.display = "block";
                logged.style.display = "block";
                $("#labellogin").toggleClass("hidden");
                $("#labelpassword").toggleClass("hidden");
                $(".disabled").toggleClass("disabled");
                
                
                // login.style.display = "none";
                // password.style.display = "none";
                //top[i].style.display = "none";
            }
            else {
                alert("incorrect login or password");
                login.value = "";
                password.value = "";
            }
        
    }
    document.getElementById("logout").onclick = function () {
        let login = document.getElementById("login");
        let password = document.getElementById("password");
        //let top = document.getElementsByClassName("top");
        let check = document.getElementById("check");
        let logout = document.getElementById("logout");
        let logged = document.getElementById("logged");

        password.style.display = "block";
        login.style.display = "block";
        check.style.display = "block";
        logout.style.display = "none";
        logged.style.display = "none";

    }
    // function to delete duplicate years except one ==============================================================
    function unique(arr) {
        var obj = {}
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            obj[str] = true;
        }
        return Object.keys(obj);
    }
    // list of years from JSON file ==============================================================
    $.getJSON('data.json', function (data) {
        var allYears = [];
        let outroDefault = '';
        let months = [
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
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]
        data.forEach(function (element) {
            let date = new Date(element.date)
            allYears.push(date.getFullYear())
            uniqYears = unique(allYears.sort())
        })
        for (var i = 0; i < uniqYears.length; i++) {
            if (uniqYears[i] == "2018") {
                out += '<li class="year activeYear">' + uniqYears[i] + '</li>'
            } else {
                out += '<li class="year">' + uniqYears[i] + '</li>'
            }
        }

        $('#slider').append(out);

        // default index.html ==============================================================
        data.forEach(function (element) {
            let date = new Date(element.date)
            if (date.getFullYear() == ActualDate.getFullYear()) {
                let speakerData = '';
                outroDefault += `
                <div class="container">
                    <div class="card">
                        <div class="front">
                            <div class="contentfront">
                            <div class="month">
                            <span class="eventName">
                            ${element.name}
                            </span>
                            <div class="eventPlace">
                            ${element.address}
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
            $('#name').html(outroDefault);
            // $('.year').removeClass('year').addClass('active');
        })
        $('.year').click(function () {
            $('.year').removeClass('activeYear');
            $(this).toggleClass('activeYear');
            document.getElementById('name').innerHTML = ''
            $('#name').html('');
            let outro = '';
            let modal = '';
            let thead = `
            <table class="blueTable">
                <thead>
                    <tr class="rowClass">
                        <th>Schedule</th>
                        <th>Topic</th>
                        <th>Speaker</th>
                    </tr>
                </thead>
            <tbody>
            `
            let tfoot = `
            </tbody>
            </table>
            `
            yearOnClick = $(this).text()
            data.forEach(element => {
                let date = new Date(element.date)
                if (parseInt(yearOnClick) == date.getFullYear()) {
                    let speakerData = '';

                    element.speaker.forEach(each => {
                        speakerData += `
                        <tr>
                            <td>${each.time}</td>
                            <td>${each.topic}</td>
                            <td><a class="buttonClass" href="#${each.firstName + each.lastName}" rel="modal:open">${each.firstName + " " + each.lastName}</a></td>
                        </tr>
                        
                        `
                        modal += `
                        <div id="${each.firstName + each.lastName}" class="modal">
                        <p>Speaker: ${each.firstName + ' ' + each.lastName}, from ${each.city}, ${each.country} </p>
                        <p> ${each.description} </p>
                        <a href="#" rel="modal:close">Close</a>
                        </div>
                        `
                        // </div>

                    });

                    outro += `
                        <div class="container">
                            <div class="card">
                                <div class="front">
                                    <div class="contentfront">
                                    <div class="month">
                                    <span class="eventName">
                                    ${element.name}
                                    </span>
                                    <div class="eventPlace">
                                    ${element.address}
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
                                    ${thead + speakerData + tfoot}
                                </div>
                            </div>
                        </div>`
                }
                $('#name').html(outro);
                $('#modal').html(modal);
            })
            // $('.card').click(function() {
            //     //alert("asdasd");
            //     $(this).toggleClass('flipped');
            // })

            $('.card').click(function (e) {
                if (e.target.className === "buttonClass") return;
                //alert("asdasd");
                $(this).toggleClass('flipped');
            })
        })

    })

});
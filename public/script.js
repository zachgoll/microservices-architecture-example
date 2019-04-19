function register() {
    const email = $("#register-email").val();
    const pw = $("#register-pw").val();
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://localhost:8081/register",
        data: JSON.stringify({ email: email, password: pw }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result){ 
            setTimeout(() => {
                $("#register-message").toggleClass("hide"); 
            }, 3000);
            $("#register-message").toggleClass("hide"); 
        }
    });
}

function login() {
    const email = $("#login-email").val();
    const pw = $("#login-pw").val();
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://localhost:8081/authenticate",
        data: JSON.stringify({ email: email, password: pw }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result){ 
            if (result.authenticated) {
                localStorage.setItem("email", email);
                setTimeout(() => {
                    $("#login-message").toggleClass("hide"); 
                }, 3000);
                $("#login-message").toggleClass("hide"); 
                $("#logout-button").toggleClass("hide"); 
                $("#log-in-status").text(`You are logged in as ${localStorage.getItem("email")}`);
            } else {
                setTimeout(() => {
                    $("#login-message-error").toggleClass("hide"); 
                }, 3000);
                $("#login-message-error").toggleClass("hide");
            }
        }
    });
}

function logout() {
    localStorage.clear();
    setTimeout(() => {
        $("#logout").toggleClass("hide"); 
    }, 3000);
    $("#logout").toggleClass("hide");
    $("#logout-button").toggleClass("hide");
    $("#log-in-status").text(``);
}

function stopSpinner(position) {

    let coordinatesArray = position.slice(7).split(",");
    let c1 = Math.abs(parseFloat(coordinatesArray[0]));
    let c2 = Math.abs(parseFloat(coordinatesArray[1]));
    let result;

    let email = localStorage.getItem("email");

    if (!email) {
        setTimeout(() => {
            $("#logged-out-warning").toggleClass("hide"); 
        }, 3000);
        $("#logged-out-warning").toggleClass("hide");
    }

    if (c1 >= 0.9935 && c1 <= 1 && c2 >= 0 && c2 <= 0.12) {
        result = "win";
        setTimeout(() => {
            $("#winner").toggleClass("hide");
        }, 3000);
        $("#winner").toggleClass("hide");
    } else {
        result = "loss";
        setTimeout(() => {
            $("#loser").toggleClass("hide");
        }, 3000);
        $("#loser").toggleClass("hide");
    }
    
    if (email) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8082/score",
            data: JSON.stringify({ email: email, result: result }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result){ console.log(result) }
        });
    }
}

function seeScores() {
    const email = localStorage.getItem("email");
    $.ajax({
        url: `http://localhost:8082/score/${email}`,
        type: "GET",
        success: function (user) {
            $("#wins").text(user.wins);
            $("#losses").text(user.losses);
        },
        error: function (jqXHR, textStatus, ex) {
            console.log(textStatus + "," + ex + "," + jqXHR.responseText);
        }
    });
}

function checkLogin() {
    if (localStorage.getItem("email")) {
        $("#log-in-status").text(`You are logged in as ${localStorage.getItem("email")}`);
        $("#logout-button").toggleClass("hide");
    }
}

$(document).ready(() => {
    let position;

    checkLogin();

    $("#start-game").click(() => {
        $("#start-game").toggleClass("hide");
        $("#stop-spinner").toggleClass("hide");
        $("#spinner").toggleClass("no-animate");
    });

    $("#stop-spinner").click(() => {
        $("#stop-spinner").toggleClass("hide");
        $("#restart").toggleClass("hide");
        
        // Makes call to database and stops the spinner
        position = window.getComputedStyle(document.querySelector("#spinner")).transform;
        stopSpinner(position);
        
        $("#spinner").toggleClass("no-animate");
        $("#spinner").css("transform", position);
    });

    $("#restart").click(() => {
        $("#restart").toggleClass("hide");
        $("#stop-spinner").toggleClass("hide");

        $("#spinner").toggleClass("no-animate");
        $("#spinner").css("transform", "none");
    });

    $("#see-scores").click(() => {
        seeScores();
        $("#results").toggleClass("hide");
        $("#hide-scores").toggleClass("hide");
        $("#see-scores").toggleClass("hide");
    });

    $("#hide-scores").click(() => {
        $("#results").toggleClass("hide");
        $("#hide-scores").toggleClass("hide");
        $("#see-scores").toggleClass("hide");
    });
});
//import { getSearchParams } from "./helper";

//var weatherKey = "aaf3430f61ac73a6d7b3cf283e5d3ddc";
var weatherKey = "381b924806df87bd627652ddaac0634c";
//var xchangeKey = "75a2ec4f7a6badaec6a3f93a";
var xchangeKey = "86c9f5b090f410ff3e2b972f";
var allsportsKey =
  "689ad9175e01c1534a675d7a00f8bbe95819a71058e3fd184b41946b0fc0bc04";

function calcCurrency() {
  var amount = $("#amount").val();
  var fromCurrency = $("#fromCurrency").val();
  var toCurrency = $("#toCurrency").val();
  var xchangeEndpoint = `https://v6.exchangerate-api.com/v6/${xchangeKey}/latest/${fromCurrency}`;

  $.ajax({
    type: "GET",
    dataType: "json",
    url: xchangeEndpoint,
    success: function (data) {
      var conversionRate = data.conversion_rates[`${toCurrency}`];
      var result = (amount * conversionRate).toFixed(2);
      $("#conversionResult").text(
        `${amount} ${fromCurrency} = ${result} ${toCurrency}`
      );
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Success callback
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric&lang=ar`;

        console.log(weatherEndpoint);
        $.ajax({
          type: "GET",
          dataType: "json",
          url: weatherEndpoint,
          success: function (data) {
            var temperature = Math.round(data.main.feels_like);
            $("#temperature").text(temperature + "°");
            $("#locationDisplay").text(data.name);
            $("#weatherIcon").html(
              `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}" width="70">`
            );
          },
          error: function (error) {
            console.log(error);
          },
        });
      },
      function (error) {
        // Error callback
        switch (error.code) {
          case error.PERMISSION_DENIED:
            $("#locationDisplay").text(
              "User denied the request for Geolocation."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            $("#locationDisplay").text("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            $("#locationDisplay").text(
              "The request to get user location timed out."
            );
            break;
          case error.UNKNOWN_ERROR:
            $("#locationDisplay").text("An unknown error occurred.");
            break;
        }
      },
      {
        timeout: 60000,
        maximumAge: 0,
      }
    );
  } else {
    $("#locationDisplay").text("Geolocation is not supported by this browser.");
  }
});

const leagueId = 152;

let filterData = { from: "2025-08-31", to: "2025-09-15" };
//let searchParams = getSearchParams(filterData);
/* ${
  searchParams ? "&" + searchParams : ""
} */

let Url = `https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=${leagueId}&APIkey=${allsportsKey}&timezone=Africa/Cairo&from=${filterData.from}&to=${filterData.to}`;
console.log(Url);
function getMatchesdata() {
  $.ajax({
    url: Url,
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.success == 1) {
        let matches = response.result;

        $("#LiveMatches, #FinishedMatches, #UpcomingMatches").empty();

        $.each(matches, function (index, match) {
          let homeLogo = `<img src="${match.home_team_logo}" width="20" />`;
          let awayLogo = `<img src="${match.away_team_logo}" width="20" />`;
          let homeTeam = match.event_home_team;
          let awayTeam = match.event_away_team;
          let score = match.event_final_result || "-";
          let status = match.event_status;
          let matchTime = match.event_time;
          let matchDate = match.event_date;

          let matchCard = `
            <div class="matchCard m-2 p-1 border rounded">
              <div class="d-flex justify-content-between m-1">
                <span class="matchStatus">${matchDate}</span>
                <span class="matchTime"></span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="team d-flex align-items-center">
                  ${homeLogo}
                  <span class="homeTeamName mx-1">${homeTeam}</span>
                </div>
                <div class="result fw-bold text-center">${score}</div>
                <div class="team d-flex align-items-center">
                  <span class="awayTeamName mx-1">${awayTeam}</span>
                  ${awayLogo}
                </div>
              </div>
            </div>
          `;

          if (match.event_live == "1" || status == "Live") {
            $("#LiveMatches").append(
              $(matchCard)
                .find(".matchStatus")
                .text("🔴 مباشرة")
                .end()
                .find(".matchTime")
                .text("الدقيقة " + status)
                .end()
            );
          } else if (status == "Finished") {
            $("#FinishedMatches").append(
              $(matchCard)
                .find(".matchStatus")
                .text("✅ منتهية")
                .end()
                .find(".matchTime")
                .text("90 دقيقة")
                .end()
            );
          } else {
            $("#UpcomingMatches").append(
              $(matchCard)
                .find(".matchStatus")
                .text("⏰ قادمة")
                .end()
                .find(".matchTime")
                .text(matchDate + " - " + matchTime)
                .end()
                .find(".result")
                .text("VS")
                .end()
            );
          }
        });
      }
    },
    error: function (error) {
      console.log("Error: " + error);
    },
  });
}

getMatchesdata();
//console.log(Url);
/* function getMatchesTT(Url) {
  fetch(Url, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.result);
      //renderMatches(data.result);
    })
    .catch((err) => {
      return console.error("Error fetching fixtures:", err);
    });
}
getMatchesTT(Url); */

// Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navbarCollapse) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

    // لو المستخدم نزل أكتر من 10 بكسل والقائمة مفتوحة
    if (
      Math.abs(currentScroll - lastScrollTop) > 10 &&
      navbarCollapse.classList.contains("show") &&
      bsCollapse
    ) {
      bsCollapse.hide(); // اقفل القائمة
    }

    lastScrollTop = currentScroll;
  }
});

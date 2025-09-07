





var weatherKey = "aaf3430f61ac73a6d7b3cf283e5d3ddc";
var xchangeKey = "75a2ec4f7a6badaec6a3f93a";

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
        $.ajax(
            {
            type: "GET",
            dataType: "json",
            url: weatherEndpoint,
            success: function (data) {
                var temperature = Math.round(data.main.feels_like);
                $("#temperature").text(temperature + "°");
                $("#locationDisplay").text(data.name);
            },
            error: function (error) {
                console.log(error);
            }
            }
        )
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

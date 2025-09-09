import {
  formatDateTimeArabic,
  getArabicName,
  getSearchParams,
  getTeamId,
} from "./helper.js";

const matchesApiKey = "06c16dbede7dd239b69b352d3a4a4ee1";
let filterData = {};
let searchParams = getSearchParams(filterData);
let Url = `https://v3.football.api-sports.io/fixtures?${searchParams}&league=39&timezone=Africa/Cairo`;

async function getAllTeams() {
  await fetch("https://v3.football.api-sports.io/teams?league=39&season=2023", {
    method: "GET",
    headers: {
      "x-apisports-key": matchesApiKey,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.response);
      renderAllTeams(data.response);
    })
    .catch((err) => console.error("Error fetching data:", err));
}
// getAllTeams();

// from=2023-08-11&to=2023-08-21
// "https://v3.football.api-sports.io/fixtures?season=2023&league=39&timezone=Africa/Cairo&team=40"
async function getMatches() {
  await fetch(Url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": matchesApiKey,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.response);
      renderMatches(data.response);
    })
    .catch((err) => {
      return console.log(err);
    });
}
// getMatches();

// async function getTeamMatches(teamId) {
//   // const teamId = 9;
//   await fetch(
//     `https://v3.football.api-sports.io/fixtures?league=39&season=2023&team=9`,
//     {
//       method: "GET",
//       headers: {
//         "x-apisports-key": matchApiKey,
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       renderMatches(data.response);
//     })
//     .catch((err) => console.error(err));
// }

// getTeamMatches();

function renderAllTeams(teams) {
  for (let i = 0; i < teams.length; i++) {
    const teamOption = `
    <option value="teams[i].team.name">${getArabicName(
      teams[i].team.name
    )}</option>
    `;
    $("#teamFilter").append(teamOption);
  }
}

function renderMatches(matches) {
  for (let i = 0; i < matches.length; i++) {
    let match = {
      teamOne: getArabicName(matches[i].teams.home.name),
      teamOneLogo: matches[i].teams.home.logo,
      teamOneScore: matches[i].goals.home,
      teamTwo: getArabicName(matches[i].teams.away.name),
      teamTwoLogo: matches[i].teams.away.logo,
      teamTwoScore: matches[i].goals.away,
      data: formatDateTimeArabic(matches[i].fixture.date),
    };
    const teamOption = `
    <option value="ليفربول">ليفربول</option>

    `;
    const matchCard = `
   <div class="col-lg-4 col-md-6 mb-4">
            <div class="match-card border rounded p-3 shadow-sm">
              <!-- حالة المباراة -->
              <div class="mb-2 fw-bold text-danger">انتهت</div>

              <!-- تفاصيل الفرق والنتيجة -->
              <div class="row align-items-center">
                <!-- الفريق الأول -->
                <div class="col-4 d-flex flex-column align-items-center ">
                  <span class="fs-3"><img class="img-fluid" src="${match.teamOneLogo}" /></span>
                  <span>${match.teamOne}</span>
                </div>

                <!-- النتيجة -->
                <div class="col-4 d-flex flex-column align-items-center">
                  <span class="fs-4 fw-bold">${match.teamOneScore} - ${match.teamTwoScore}</span>
                  <span class="text-muted small">النتيجة النهائية</span>
                </div>

                <!-- الفريق الثاني -->
                <div class="col-4 d-flex flex-column align-items-center">
                  <span class="fs-3"><img class="img-fluid" src="${match.teamTwoLogo}" /></span>
                  <span>${match.teamTwo}</span>
                </div>
              </div>

              <!-- تاريخ المباراة -->
              <p class="match-date mt-3 text-muted small">
              ${match.date}           
              </p>
            </div>
          </div>
`;
    $(".matches-page .matches-list").append(matchCard);
  }
}

$("#filter-btn").on("click", (e) => {
  e.preventDefault();
  const selectedSeason = $(".filters #seasonFilter").val();
  const selectedTeam = getTeamId($(".filters #teamFilter").val() || "");
  const selectedDate = $(".filters #dateFilter").val();
  const dateFrom = $(".filters #dateFrom").val();
  const dateTo = $(".filters #dateTo").val();

  filterData = {
    selectedSeason,
    selectedTeam,
    selectedDate,
    dateFrom,
    dateTo,
  };

  console.log(filterData);
});

$(document).ready(function () {
  const $dateFilter = $("#dateFilter");
  const $dateFrom = $("#dateFrom");
  const $dateTo = $("#dateTo");

  $dateFilter.on("input change", function () {
    if ($(this).val()) {
      $dateFrom.prop("disabled", true);
      $dateTo.prop("disabled", true);
    } else {
      $dateFrom.prop("disabled", false);
      $dateTo.prop("disabled", false);
    }
  });

  $dateFrom.add($dateTo).on("input change", function () {
    if ($dateFrom.val() || $dateTo.val()) {
      $dateFilter.prop("disabled", true);
    } else {
      $dateFilter.prop("disabled", false);
    }
  });

  $("form").on("reset", function () {
    $("#dateFilter, #dateFrom, #dateTo").prop("disabled", false);
  });
});

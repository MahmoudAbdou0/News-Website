// const matchesApiKey = "06c16dbede7dd239b69b352d3a4a4ee1";
// const matchesApiUrl =
//   "https://v3.football.api-sports.io/fixtures?league=39&season=2025";

import { formatDateTimeArabic, getArabicName } from "./helper.js";

// fetch(matchesApiUrl, {
//   method: "GET",
//   headers: {
//     "x-apisports-key": matchesApiKey, // هنا بتحط الـ API key بتاعك
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Premier League Matches:", data);
//   })
//   .catch((err) => console.error("Error fetching data:", err));

// const matchApiKey = "06c16dbede7dd239b69b352d3a4a4ee1";
async function getAllTeams() {
  await fetch("https://v3.football.api-sports.io/teams?league=39&season=2023", {
    method: "GET",
    headers: {
      "x-apisports-key": matchApiKey,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderAllTeams(data.response);
    })
    .catch((err) => console.error(err));
}
getAllTeams();

// async function getMatches() {
//   await fetch(
//     "https://v3.football.api-sports.io/fixtures?season=2023&league=39&timezone=Africa/Cairo&from=2023-08-11&to=2023-08-21",
//     {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "v3.football.api-sports.io",
//         "x-rapidapi-key": matchApiKey,
//       },
//     }
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data.response);
//       renderMatches(data.response);
//     })
//     .catch((err) => {
//       return console.log(err);
//     });
// }
// getMatches();

async function getTeamMatches(teamId) {
  // const teamId = 9;
  await fetch(
    `https://v3.football.api-sports.io/fixtures?league=39&season=2023&team=9`,
    {
      method: "GET",
      headers: {
        "x-apisports-key": matchApiKey,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderMatches(data.response);
    })
    .catch((err) => console.error(err));
}

getTeamMatches();

// $.ajax({
//   type: "get",
//   dataType: "json",
//   url: matchesApiUrl,
//   success: (data) => {
//     console.log(data);
//   },
//   error: (err) => {
//     const errMsg = JSON.parse(err.responseText);
//     console.error(errMsg);
//   },
// });

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

function getFilterParams() {
  $("#filter-btn").on("click", () => {
    $(".filters #teamFilter");
  });
}

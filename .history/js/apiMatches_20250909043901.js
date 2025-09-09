import {
  formatDateTimeArabic,
  getArabicName,
  getSearchParams,
} from "./helper.js";

const APIKey =
  "658b2cfed4c98c54058c01b23d5aea80cf7fb0a6080e39589921ce4364f08d8c";
const leagueId = 152;

let filterData = { from: "2025-08-11", to: "2025-09-21" };
let searchParams = getSearchParams(filterData);

let Url = `https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=${leagueId}&APIkey=${APIKey}&timezone=Africa/Cairo${
  searchParams ? "&" + searchParams : ""
}`;
// console.log(Url);

// Get leagues Id
// fetch(`https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=${APIKey}
// `)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

async function getAllTeams() {
  fetch(
    `https://apiv2.allsportsapi.com/football/?met=Teams&leagueId=${leagueId}&APIkey=${APIKey}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.result);
      renderAllTeams(data.result);
    })
    .catch((err) => console.error("Error fetching data:", err));
}
getAllTeams();

async function getMatches(Url) {
  fetch(Url, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data.result);
      renderMatches(data.result);
    })
    .catch((err) => {
      return console.error("Error fetching fixtures:", err);
    });
}
getMatches(Url);

function renderAllTeams(teams) {
  $("#teamFilter").children(":not(:first)").remove();
  for (let i = 0; i < teams.length; i++) {
    const teamOption = `
    <option value="${teams[i].team_key}">${getArabicName(
      teams[i].team_name
    )}</option>
    `;
    $("#teamFilter").append(teamOption);
  }
}

function renderMatches(matches) {
  $(".matches-page .matches-list").empty();

  for (let i = 0; i < matches.length; i++) {
    const status = matches[i].event_status; // "Finished" | "Live" | "Not Started" | ...
    const isFinished = status === "Finished";
    const isLive = status === "Live";
    const isNotStarted = status === "Not Started" || status === "Scheduled";

    const statusClass = isFinished
      ? "text-danger"
      : isLive
      ? "text-success"
      : "text-primary";
    const statusText = isFinished ? "انتهت" : isLive ? "مباشر" : "قادمة";
    const subtitle = isFinished
      ? "النتيجة النهائية"
      : isLive
      ? "النتيجة"
      : "لم تبدأ";

    const match = {
      teamOne: getArabicName(matches[i].event_home_team),
      teamOneLogo: matches[i].home_team_logo,
      teamTwo: getArabicName(matches[i].event_away_team),
      teamTwoLogo: matches[i].away_team_logo,
      matchStatus: status,
      finalResult: matches[i].event_final_result, // ممكن تكون "" لو لسه
      date: formatDateTimeArabic(matches[i].event_date, matches[i].event_time),
    };

    const score =
      match.finalResult && match.finalResult.trim() !== "-"
        ? match.finalResult
        : "VS";

    const matchCard = `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="match-card border rounded p-3 shadow-sm h-100">
          <!-- حالة المباراة -->
          <div class="mb-2 fw-bold ${statusClass}">${statusText}</div>

          <!-- تفاصيل الفرق والنتيجة -->
          <div class="row align-items-center text-center">
            <!-- الفريق الأول -->
            <div class="col-4 d-flex flex-column align-items-center">
              <img class="img-fluid mb-1" src="${match.teamOneLogo}" alt="${match.teamOne}" style="max-height:48px; object-fit:contain;" />
              <span>${match.teamOne}</span>
            </div>

            <!-- النتيجة -->
            <div class="col-4 d-flex flex-column align-items-center">
              <span class="fs-4 fw-bold">${score}</span>
              <span class="text-muted small">${subtitle}</span>
            </div>

            <!-- الفريق الثاني -->
            <div class="col-4 d-flex flex-column align-items-center">
              <img class="img-fluid mb-1" src="${match.teamTwoLogo}" alt="${match.teamTwo}" style="max-height:48px; object-fit:contain;" />
              <span>${match.teamTwo}</span>
            </div>
          </div>

          <!-- تاريخ المباراة -->
          <p class="match-date mt-3 text-muted small mb-0">${match.date}</p>
        </div>
      </div>
    `;

    $(".matches-page .matches-list").append(matchCard);
  }
}

$("#filter-btn").on("click", (e) => {
  e.preventDefault();
  let season = $(".filters #seasonFilter").val();
  const teamId = $(".filters #teamFilter").val() || "";
  // const matchesFilter = $(".filters #teamFilter").val();
  const date = $(".filters #dateFilter").val();
  let from = $(".filters #dateFrom").val();
  let to = $(".filters #dateTo").val();

  // const today = new Date().toISOString().split("T")[0];

  if (date) {
    from = date;
    to = date;
    // Reset season
    season = date.substring(0, 4);
    $(".filters #seasonFilter").val(season);
  } else {
    from = from || `${season}-08-10`;
    to = to || `${+season + 1}-05-31`;
    // Reset season
    season = from.substring(0, 4);
    $(".filters #seasonFilter").val(season);
  }
  // if (matchesFilter === "next") {
  //   from = today;
  // } else if (matchesFilter === "previous") {
  //   to = today;
  // }
  filterData = {
    // season,
    // date,
    teamId,
    from,
    to,
  };

  searchParams = getSearchParams(filterData);
  // console.log(searchParams);
  getMatches(
    `https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=${leagueId}&APIkey=${APIKey}&timezone=Africa/Cairo${
      searchParams ? "&" + searchParams : ""
    }`
  );
  $("#collapseExample").collapse("hide");
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

// $("#filter-btn, #reset-btn").on("click", function () {
//   $("#collapseExample").collapse("hide");
// });

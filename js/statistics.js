// ---------------------------------- Sports API key and endpoints--------------------------------
let key = "e9be647924b1d3e06f0a3048877a34939e77eac09479c1077949ee9601b3548d";
let leaguesApi = `https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=${key}`;

// -------------------------------------global variables-----------------------------------------
let leagues = [];
let playersCardData = [];
let teamsApis = [];
let sort = "";
console.log(teamsApis);

// pagination variables
let currentPage = 1; // current page number
let rowsPerPage = 9; // number of players per page
let totalPages; // total number of pages

// -------------------------------------fetch all leagues-----------------------------------------
$.ajax({
  type: "GET",
  dataType: "json",
  url: leaguesApi,
  success: (leagues) => {
    leagues.result.forEach((lg) => {
      // extract api for each league
      teamsApis.push(
        `https://apiv2.allsportsapi.com/football/?&met=Teams&leagueId=${lg.league_key}&APIkey=${key}`
      );

      // create button for each league
      $("#leagueBtn").append(`
        <button class="btn btn-outline-success   league" type="button">
          <img
            src=${lg.league_logo}
            alt="league_logo"
            title=${lg.league_name}
            style="width: 20px; height: 20px"
          />
            ${lg.league_name}
        </button> 
      `);
    });

    // handle league button click
    let leagueBtn = document.querySelectorAll(".league");
    handleLeaguesBtn(leagueBtn);
  },
  error: (error) => {
    console.log("Error fetching leagues:", error);
  },
});

//--------------------------------- handle league buttons function--------------------------------
function handleLeaguesBtn(leagueBtn) {
  Array.from(leagueBtn).forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // league button active
      leagueBtn.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // show filters buttons
      const filters = document.getElementById("filters");
      $(filters).show(350);

      // change league title
      $("#leagueTitle").text(btn.innerText);

      // reset players data and sort
      $("#cardContainer").empty().hide();
      playersCardData = [];
      sort = "";
      currentPage = 1;

      // fetch teams and players for the selected league
      $.ajax({
        type: "GET",
        dataType: "json",
        url: teamsApis[index],
        success: (teams) => {
          teams.result.map((t) => {
            if (t.players.length > 0) {
              t.players.map((p) => {
                if (p.player_name) {
                  // collect data for each player
                  playersCardData.push({
                    player: p,
                    team: t.team_name,
                    teamLogo: t.team_logo,
                  });
                }
              });
            }
          });

          //show players cards
          display_sort(playersCardData);

          // handle sort buttons
          handleSortBtn();
        },
        error: (error) => {
          console.log("Error fetching teams:", error);
        },
      });
    });
  });
}

// ----------------------------------handle sort buttons function---------------------------------
function handleSortBtn() {
  $("#goalsNum").on("click", function () {
    $("#cardContainer").empty().hide();
    sort = "goals";
    currentPage = 1;
    

    display_sort(playersCardData);
  });
  $("#yellowCardsNum").on("click", function () {
    $("#cardContainer").empty().hide();
    sort = "yellow";
    currentPage = 1;
    display_sort(playersCardData);
  });
  $("#redCardsNum").on("click", function () {
    $("#cardContainer").empty().hide();
    sort = "red";
    currentPage = 1;
    display_sort(playersCardData);
  });
}

// -----------------------------------display players cards sorted---------------------------------
function display_sort(playersData) {
  // sort players data
  switch (sort) {
    case "goals":
      playersData.sort((a, b) => b.player.player_goals - a.player.player_goals);
      break;
    case "yellow":
      playersData.sort(
        (a, b) => b.player.player_yellow_cards - a.player.player_yellow_cards
      );
      break;
    case "red":
      playersData.sort(
        (a, b) => b.player.player_red_cards - a.player.player_red_cards
      );
      break;
  }

  // pagination logic
  let start = (currentPage - 1) * rowsPerPage;
  let end = start + rowsPerPage;
  let paginatedData = playersData.slice(start, end);
  $("#cardContainer").empty();

  // create player card for each player
  paginatedData.map((p) => {
    $("#cardContainer")
      .append(
        `
                <div class="col-12 col-md-6 col-lg-4">
                  <div class="card card-hover shadow p-3 bg-body rounded h-100">
                    <div class="text-center">
                      <img
                        src=${p.player.player_image || "./icons/player.png"}
                        alt="player image"
                        title=${p.player.player_name}
                        class="img-fluid rounded-circle mb-3 imgError"
                        style="width: 100px; height: 100px; object-fit: cover"
                        onerror="this.onerror=null;this.src='../assets/icons/player.png';"
                      />
                      <h3>${p.player.player_name}</h3>
                      <p><strong>المركز :</strong> ${p.player.player_type}</p>
                    </div>
                    <div class="pe-3">
                      <p>
                          <img
                            src=${p.teamLogo}
                            alt="team logo"
                            title=${p.team}
                            style="width: 20px; height: 20px"
                          />
                      ${p.team}
                      </p>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center ps-3"
                     >
                      <div>
                        <p>⚽ الأهداف :</p>
                      </div>
                      <p class="fw-bold text-success">${
                        p.player.player_goals || 0
                      }</p>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center ps-3"
                     >
                      <div>
                        <p>🟨 كروت صفراء :</p>
                      </div>
                      <p class="fw-bold text-warning">${
                        p.player.player_yellow_cards || 0
                      }</p>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center ps-3"
                     >
                      <div>
                        <p>🟥 كروت حمراء :</p>
                      </div>
                      <p class="fw-bold text-danger">${
                        p.player.player_red_cards || 0
                      }</p>
                    </div>
                  </div>
                </div>
              `
      )
      .show(1500);
  });

  // render pagination
  renderPagination(playersData.length);

  // handle img error
  $(".imgError").on("error", function () {
    $(this).attr("src", "./icons/player.png");
  });
}

// ----------------------------------------pagination function-------------------------------------

function renderPagination(totalItems) {
  totalPages = Math.ceil(totalItems / rowsPerPage);
  $("#pagination").empty();
  for (let i = 1; i <= totalPages; i++) {
    $("#pagination").append(`
      <button class="btn btn-outline-success page-btn m-1 ${
        i === currentPage ? "active" : ""
      }  "  data-page="${i}">${i}</button>
    `);
  }

  $(".page-btn").on("click", function () {
    currentPage = parseInt($(this).data("page"));
    display_sort(playersCardData);
  });
}

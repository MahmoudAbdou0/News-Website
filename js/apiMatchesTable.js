const API_KEY = "63cc1f86357b7aa3a1d29001d144b75344ef7c3fa1f70c926f1da259ab9f2e88";
const API_URL = `https://apiv2.allsportsapi.com/football/?met=Standings&leagueId=152&APIkey=689ad9175e01c1534a675d7a00f8bbe95819a71058e3fd184b41946b0fc0bc04`;

console.log(API_URL);
$(document).ready(function () {
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function (data) {
            console.log(data.result); // للتأكد من البيانات
            let tableBody = $("table tbody");
            tableBody.empty();

            data.result.total.forEach((team) => {
                let row = `
          <tr>
            <td class="fw-bold text-yellow">${team.standing_place}</td>
            <td>
              <div class="team-cell">
                <img src="${team.team_logo}" alt="${team.standing_team}" width="25" class="me-2"/>
                <span class="team-name">${team.standing_team}</span>
              </div>
            </td>
            <td>${team.standing_P}</td>
            <td class="text-green">${team.standing_W}</td>
            <td class="text-yellow">${team.standing_D}</td>
            <td class="text-red">${team.standing_L}</td>
            <td>${team.standing_F}</td>
            <td>${team.standing_A}</td>
            <td class="${team.standing_GD >= 0 ? 'text-green' : 'text-red'}">
              ${team.standing_GD}
            </td>
            <td class="points fw-bold">
            <span class="d-inline-block bg-dark text-white rounded-circle fw-bold text-center" 
                  style="width: 40px; height: 40px; line-height: 40px;  font-size: 1.05rem;">
              ${team.standing_PTS}
            </span></td>
          </tr>
        `;
                tableBody.append(row);
            });
        },
        error: function (err) {
            console.error("Error fetching standings:", err);
            $("table tbody").html(
                `<tr><td colspan="10" class="text-center text-danger">فشل في تحميل البيانات</td></tr>`
            );
        },
    });
  
  
});

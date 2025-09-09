const API_KEY = "63cc1f86357b7aa3a1d29001d144b75344ef7c3fa1f70c926f1da259ab9f2e88";
const API_URL = `https://allsportsapi.com/api/football/?action=get_events&from=2025-09-01&to=2025-09-20&league_id=152&APIkey=63cc1f86357b7aa3a1d29001d144b75344ef7c3fa1f70c926f1da259ab9f2e88
    `;

console.log(API_URL);
$(document).ready(function () {
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function (data) {
            console.log(data); // للتأكد من البيانات
            let tableBody = $("table tbody");
            tableBody.empty();

            data.forEach((team) => {
                let row = `
          <tr>
            <td class="fw-bold text-yellow">${team.overall_league_position}</td>
            <td>
              <div class="team-cell">
                <img src="${team.team_badge}" alt="${team.team_name}" width="25" class="me-2"/>
                <span class="team-name">${team.team_name}</span>
              </div>
            </td>
            <td>${team.overall_league_payed}</td>
            <td class="text-green">${team.overall_league_W}</td>
            <td class="text-yellow">${team.overall_league_D}</td>
            <td class="text-red">${team.overall_league_L}</td>
            <td>${team.overall_league_GF}</td>
            <td>${team.overall_league_GA}</td>
            <td class="${team.overall_league_GF - team.overall_league_GA >= 0 ? 'text-green' : 'text-red'}">
              ${team.overall_league_GF - team.overall_league_GA}
            </td>
            <td class="points fw-bold">${team.overall_league_PTS}</td>
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

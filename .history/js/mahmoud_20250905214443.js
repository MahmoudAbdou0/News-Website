const matchesApiKey =
  "658b2cfed4c98c54058c01b23d5aea80cf7fb0a6080e39589921ce4364f08d8c";
const matchesApiUrl = `https://apiv2.allsportsapi.com/football/?met=H2H&APIkey=${matchesApiKey}
`;
console.log(matchesApiUrl);
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
const matchCard = `
   <div class="col-lg-4 col-md-6 mb-4">
            <div class="match-card border rounded p-3 shadow-sm">
              <!-- حالة المباراة -->
              <div class="mb-2 fw-bold text-danger">انتهت</div>

              <!-- تفاصيل الفرق والنتيجة -->
              <div class="row align-items-center">
                <!-- الفريق الأول -->
                <div class="col-4 d-flex flex-column align-items-center">
                  <span class="fs-3">🔵</span>
                  <span>مانشستر سيتي</span>
                </div>

                <!-- النتيجة -->
                <div class="col-4 d-flex flex-column align-items-center">
                  <span class="fs-4 fw-bold">3 - 1</span>
                  <span class="text-muted small">النتيجة النهائية</span>
                </div>

                <!-- الفريق الثاني -->
                <div class="col-4 d-flex flex-column align-items-center">
                  <span class="fs-3">🔴</span>
                  <span>مانشستر يونايتد</span>
                </div>
              </div>

              <!-- تاريخ المباراة -->
              <p class="match-date mt-3 text-muted small">
                15 يناير 2024 - 17:30
              </p>
            </div>
          </div>
`;

for (i = 0; i < 5; i++) {
  $(".matches-page .matches-list").append(matchCard);
}

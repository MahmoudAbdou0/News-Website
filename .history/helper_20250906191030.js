const teamsMap = {
  Arsenal: "آرسنال",
  "Aston Villa": "أستون فيلا",
  Bournemouth: "بورنموث",
  Brentford: "برينتفورد",
  Brighton: "برايتون",
  Burnley: "بيرنلي",
  Chelsea: "تشيلسي",
  "Crystal Palace": "كريستال بالاس",
  Everton: "إيفرتون",
  Fulham: "فولهام",
  Liverpool: "ليفربول",
  Luton: "لوتون تاون",
  "Manchester City": "مانشستر سيتي",
  "Manchester United": "مانشستر يونايتد",
  Newcastle: "نيوكاسل يونايتد",
  "Nottingham Forest": "نوتنجهام فورست",
  "Sheffield Utd": "شيفيلد يونايتد",
  Tottenham: "توتنهام هوتسبير",
  "West Ham": "وست هام يونايتد",
  Wolves: "وولفرهامبتون",
};

function getArabicName(teamName) {
  return teamsMap[teamName] || teamName;
}

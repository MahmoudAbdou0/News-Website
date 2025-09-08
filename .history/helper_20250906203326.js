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

export function getArabicName(teamName) {
  return teamsMap[teamName] || teamName;
}

export function formatDateTimeArabic(dateString) {
  const date = new Date(dateString);

  // تنسيق التاريخ بالعربي
  const options = {
    weekday: "long", // اسم اليوم (السبت، الأحد...)
    year: "numeric",
    month: "long", // اسم الشهر بالعربي
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat("ar-EG", options).format(date);
}

// تجربة
console.log(formatDateTimeArabic("2023-08-12T17:00:00+03:00"));

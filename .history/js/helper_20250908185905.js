const teamsData = {
  // كبار الدوري (دائمي الوجود تقريباً)
  "Manchester City": "مانشستر سيتي",
  "Manchester United": "مانشستر يونايتد",
  Liverpool: "ليفربول",
  Chelsea: "تشيلسي",
  Arsenal: "آرسنال",
  "Tottenham Hotspur": "توتنهام هوتسبير",
  Everton: "إيفرتون",
  "West Ham United": "وست هام يونايتد",
  "Newcastle United": "نيوكاسل يونايتد",
  "Aston Villa": "أستون فيلا",

  // أندية حالية (23/24 - 24/25)
  "Brighton & Hove Albion": "برايتون",
  "Wolverhampton Wanderers": "وولفرهامبتون",
  "Crystal Palace": "كريستال بالاس",
  Brentford: "برينتفورد",
  Fulham: "فولهام",
  "Nottingham Forest": "نوتنجهام فورست",
  "AFC Bournemouth": "بورنموث",
  Burnley: "بيرنلي",
  "Sheffield United": "شيفيلد يونايتد",
  "Luton Town": "لوتون تاون",

  // أندية شاركت بين 2020 - 2023
  "Leeds United": "ليدز يونايتد",
  "Leicester City": "ليستر سيتي",
  Watford: "واتفورد",
  "Norwich City": "نوريتش سيتي",
  Southampton: "ساوثهامبتون",
  "Huddersfield Town": "هدرسفيلد تاون",
  "Cardiff City": "كارديف سيتي",
  "West Bromwich Albion": "ويست بروميتش ألبيون",
  "Stoke City": "ستوك سيتي",
  "Swansea City": "سوانزي سيتي",
  "Hull City": "هال سيتي",
  Middlesbrough: "ميدلزبره",
  "Queens Park Rangers": "كوينز بارك رينجرز",
  Sunderland: "سندرلاند",
  "Derby County": "ديربي كاونتي",
};

export function getArabicName(teamName) {
  return teamsData[teamName] || teamName;
}

export function getTeamId(teamName) {
  return teamsData[teamName]?.id || "";
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

export function getSearchParams(filtersData) {
  const params = Object.fromEntries(
    Object.entries(filtersData).filter(([_, value]) => value !== "")
  );

  const queryString = new URLSearchParams(params).toString();

  return queryString || "";
}

const teamsData = {
  Arsenal: { id: 19, nameAr: "آرسنال" },
  "Manchester City": { id: 9, nameAr: "مانشستر سيتي" },
  "Manchester United": { id: 14, nameAr: "مانشستر يونايتد" },
  Liverpool: { id: 8, nameAr: "ليفربول" },
  Chelsea: { id: 18, nameAr: "تشيلسي" },
  Tottenham: { id: 6, nameAr: "توتنهام هوتسبير" },
  "Aston Villa": { id: 66, nameAr: "أستون فيلا" },
  "Crystal Palace": { id: 52, nameAr: "كريستال بالاس" },
  Everton: { id: 45, nameAr: "إيفرتون" },
  Newcastle: { id: 34, nameAr: "نيوكاسل يونايتد" },
  "West Ham": { id: 48, nameAr: "وست هام يونايتد" },
  Wolves: { id: 39, nameAr: "وولفرهامبتون" },
  Brighton: { id: 51, nameAr: "برايتون" },
  Brentford: { id: 55, nameAr: "برينتفورد" },
  Fulham: { id: 36, nameAr: "فولهام" },
  "Nottingham Forest": { id: 65, nameAr: "نوتنجهام فورست" },
  Bournemouth: { id: 35, nameAr: "بورنموث" },
  Burnley: { id: 44, nameAr: "بيرنلي" },
  "Sheffield Utd": { id: 62, nameAr: "شيفيلد يونايتد" },
  Luton: { id: 71, nameAr: "لوتون تاون" },

  // أندية ظهرت مواسم 2021-2023
  Leicester: { id: 46, nameAr: "ليستر سيتي" },
  Leeds: { id: 63, nameAr: "ليدز يونايتد" },
  Watford: { id: 38, nameAr: "واتفورد" },
  Norwich: { id: 68, nameAr: "نوريتش سيتي" },
  Southampton: { id: 41, nameAr: "ساوثهامبتون" },
  Huddersfield: { id: 72, nameAr: "هدرسفيلد تاون" },
  Cardiff: { id: 70, nameAr: "كارديف سيتي" },
  "West Brom": { id: 60, nameAr: "ويست بروميتش ألبيون" },
  Stoke: { id: 73, nameAr: "ستوك سيتي" },
  Swansea: { id: 74, nameAr: "سوانزي سيتي" },
  Hull: { id: 75, nameAr: "هال سيتي" },
  Middlesbrough: { id: 76, nameAr: "ميدلزبره" },
  QPR: { id: 77, nameAr: "كوينز بارك رينجرز" },
  Sunderland: { id: 78, nameAr: "سندرلاند" },
  Derby: { id: 79, nameAr: "ديربي كاونتي" },
};

export function getArabicName(teamName) {
  return teamsData[teamName].nameAr || teamName;
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

  console.log(queryString);
  return queryString || "";
}

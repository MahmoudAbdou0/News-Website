  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });


function timeAgoArabic(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past; 

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    if (diffMin < 1) return "الآن";
    if (diffMin === 1) return "منذ دقيقة";
    if (diffMin === 2) return "منذ دقيقتين";
    return `منذ ${diffMin} دقائق`;
  }

  if (diffHours < 24) {
    if (diffHours === 1) return "منذ ساعة";
    if (diffHours === 2) return "منذ ساعتين";
    return `منذ ${diffHours} ساعات`;
  }

  if (diffDays === 1) return "منذ يوم";
  if (diffDays === 2) return "منذ يومين";
  return `منذ ${diffDays} أيام`;
}



var NEW_API_KEY = "727ca44e62b94b15469970de60c7e12a";
/* var NEW_API_KEY = "ed0dc38c340ba1b315e4b89cc0d37aaf"; */
var NEWS_BASIC_URL = "https://gnews.io/api/v4/search?";


  function getnewsdata(fcategory , elementID){
    var query = "google";
    var lang = "ar" ; 
    var  max = 3

    var NewsEndPoint = `${NEWS_BASIC_URL}q=${query}&lang=${lang}&category=${fcategory}&max=${max}&apikey=${NEW_API_KEY}`;


      console.log(NewsEndPoint);
 $.ajax({
    type : "get",
    dataType : "json",
    url :  NewsEndPoint , 
    success : (news)=>{

          $("#"+elementID).empty();
   for (let index = 0; index < 3; index++) {
  
                                               $("#"+elementID).append (`
                                                        
                                                                <div class="col-md-4">
                                                                <div class="card h-100 fullcarddata">
                                                                    <img src="${news.articles[index].image}" class="card-img-top" alt="...">
                                                                    <div class="card-body">
                                                                    <h5 class="card-title">${news.articles[index].title}</h5>
                                                                    <p class="card-text">${news.articles[index].description}</p>
                                                                    <span class="text-xs text-blue-500 mt-2 block">${timeAgoArabic(news.articles[index].publishedAt)}</span>  
                                                                    </div>
                                                                </div>
                                                                </div>`);
    
                                            }
    } ,
    error : (errors)=>{
       console.log("Error while getting "+fcategory+" News " + JSON.stringify(errors));
    }
  }); 

  }

      
    getnewsdata("general"  , 'politicalnewsSection');
    getnewsdata("business" , 'economicnewscardssection');
    getnewsdata("entertainment"  , 'entertainmentnewscardssection');
    getnewsdata("sports"  , 'sportsnewscardsection'); 





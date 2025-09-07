var NEW_API_KEY = "ed0dc38c340ba1b315e4b89cc0d37aaf";
var NEWS_BASIC_URL = "https://gnews.io/api/v4/search?";


  function getnewsdata(fcategory , elementID){
    var query = "google";
    var lang = "ar" ; 
    var  max = 3

      var NewsEndPoint = `${NEWS_BASIC_URL}q=${query}&lang=${lang}&category=${fcategory}&max=${max}&apikey=${NEW_API_KEY}`;

 $.ajax({
    type : "get",
    dataType : "json",
    url :  NewsEndPoint , 
    success : (news)=>{
   for (let index = 0; index < 3; index++) {
    $("#"+elementID).empty();
                                                $("#"+elementID).append (`
                                                
                                                                <div class="card h-100 col-md-4">
                                                                    <img src="${news.articles[index].image}" class="card-img-top" alt="News 1" />
                                                                    <div class="card-body">
                                                                        <h5 class="card-title">${news.articles[index].title}</h5>
                                                                        <p class="card-text">${news.articles[index].description}</p>
                                                                        <a href="#" class="btn btn-primary">اقرأ المزيد</a>   
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





var API_KEY = "9cb0ecbe0a81f60f2350da900477ff38"; 



/**
 * 
general - Uncategorized News
business - Business News
entertainment - Entertainment News
health - Health News
science - Science News
sports - Sports News
technology - Technology News
 *
*/
 

var LAN = "en" ; 
var COUNTRY = "eg";
var LIMIT = 3 ; 
var SOURCES = "cnn" ; 
var CATEGORY = "general";



  function getnewsdata(fcategory , elementID)

  {

    var API_BASIC_URL = "http://api.mediastack.com/v1/news?access_key="+API_KEY +"&countries="+COUNTRY +"&languages="+LAN + "&limit="+ LIMIT+ "&categories="+fcategory;

    console.log(API_BASIC_URL);

    $.ajax({
            type : "get",
            dataType : "json",
            url :  API_BASIC_URL , 
            success : (news)=>{
        for (let index = 0; index < LIMIT; index++) {
                                                     /*    $(elementID).append (`
                                                        
                                                                        <div class="card h-100 col-md-4">
                                                                            <img src="${news.data[index].image}" class="card-img-top" alt="News 1" />
                                                                            <div class="card-body">
                                                                                <h5 class="card-title">${news.data[index].title}</h5>
                                                                                <p class="card-text">${news.data[index].description}</p>
                                                                                <a href="#" class="btn btn-primary">اقرأ المزيد</a>   
                                                                            </div>
                                                                        </div>`); */

                                                          $("#"+elementID).append (`
                                                        
                                                                        <div class="col-md-4">
      <div class="card h-100 fullcarddata">
        <img src="${news.data[index].image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${news.data[index].title}</h5>
          <p class="card-text">${news.data[index].description}</p>
           <a href="#" class="btn btn-primary">اقرأ المزيد</a>  
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
        getnewsdata("business" , 'economicalnewsSection');
        getnewsdata("entertainment"  , 'entertainmentalnewssection');
        getnewsdata("sports"  , 'sportalnewsSection'); 
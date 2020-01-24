$(document).ready(function(){
    $('#search').keyup(function(){
        var searchValue = ($('#search').val()).trim();
        // console.log(searchValue);
        if(searchValue != ''){
            $.getJSON('list.json', function(result){
                var list = result.list;
                // console.log(list);
                var options = {
                    shouldSort: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: [
                        "template_name",
                        "template_id"
                    ]
                  };
                  var fuse = new Fuse(list, options);
                  var searchResult = fuse.search(searchValue);
                  console.log(searchResult);
                    if(searchResult.length > 0){
                    $('#result').empty();
                    for(i =0; i < searchResult.length; i++){
                        $('#result').append('<div class="res">    <div class="image-container"> <a href="'+searchResult[i].preview_url+'" target="_blank"><img class="thumbnail" src="'+searchResult[i].thumbnail_url+'"></a>  </div>   <div class="content-container"> <a href="'+searchResult[i].preview_url+'" target="_blank"><h2>'+ searchResult[i].template_name +'</h2></a> <p>'+ "ID: " + searchResult[i].template_id +'</p> <h3>'+ "Properties:" +'</h3> <ul> <li>'+ (searchResult[i].template_properties.can_build_from_url ? "Can Build From URL" : "Can't Build in URL")  +'</li> <li>'+ (searchResult[i].template_properties.has_store ? "Has Store" : "Don't Have Store")   +'</li> <li>'+ (searchResult[i].template_properties.has_blog ? "Has Blog" : "Don't Have Blog")  +'</li> <li>'+ "Page Count: " + searchResult[i].template_properties.page_count  +'</li> </ul> </div>     </div>')
                    }
                }
                else{
                    $('#result').empty();
                    $('#result').html('No Result Found.');
                }
            })
        }
    })
})
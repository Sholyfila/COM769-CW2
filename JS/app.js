//The URIs of the REST endpoint
IUPS = "https://prod-34.northeurope.logic.azure.com:443/workflows/ad75a8b9ee9c4c9ba9cac6f44848f0e5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pEAhTLG-T8ntxzOnKSVOJCTE8WIYp02p_6_v6SAW_Ck";
RAI = "https://prod-50.northeurope.logic.azure.com:443/workflows/6f703563209748d1bcd327204f161806/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=25J5tTuURZWJdxfspyg_NAPZLJ7dje7EtUZUSZ8lBKY";
//addCommentUrl = "https://prod-68.eastus.logic.azure.com/workflows/a451431f6fbb4033983ce5a34ddf0c7e/triggers/manual/paths/invoke/api/video/comments?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yaO8WWYsqt5kOfxqdkR78ppeE3NmHuBq-OMZ2on2TQA";
BLOB_ACCOUNT = "https://vidshareb00902156.blob.core.windows.net";


//Handlers for button clicks
$(document).ready(function () {
  addSignOutButton();
  getVideos();
  // Event listener for search input
  $("#searchInput").on("input", function () {
    var searchTerm = $(this).val();
    filterVideos(searchTerm);
  });

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {
    //Execute the submit new asset function
    submitNewAsset();
  });

});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
   submitData = new FormData();
   //Get form variables and append them to the form data object
   submitData.append('Title', $('#Title').val());
   submitData.append('Publisher', $('#Publisher').val());
   submitData.append('Producer', $('#Producer').val());
   submitData.append('Agerating', $('#Agerating').val());
   submitData.append('Genre', $('#Genre').val());
   submitData.append('File', $("#UpFile")[0].files[0]);
  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
   url: IUPS,
   data: submitData,
   cache: false,
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,
   type: 'POST',
   success: function(data){
  
   }
   });
  }


// //A function to submit a new asset to the REST endpoint
function submitNewAsset() {

  //Create a form data object

  submitData = new FormData();

  //Get form variables and append them to the form data object

  submitData.append("Title", $("#Title").val());

  submitData.append("Publisher", $("#Publisher").val());

  submitData.append("Producer", $("#Producer").val());

  submitData.append("Genre", $("#Genre").val());

  submitData.append("Agerating", $("#Agerating").val());

  submitData.append("User_id", $("#User_id").val());

  submitData.append("File", $("#UpFile")[0].files[0]);

 

  //Post the form data to the endpoint, note the need to set the content type header

  $.ajax({

    url: IUPS,

    data: submitData,

    cache: false,

    enctype: "multipart/form-data",

    contentType: false,

    processData: false,

    type: "POST",

    success: function (data) {},

  });

}

function processVideoData(data) {

  var processedData = [];


  // Iterate through each video

  $.each(data.videos, function (index, video) {

    var videoWithComments = {

      video: video,

      comments: [],

    };

 

    // Iterate through comments to find associated ones

    $.each(data.comments, function (commentIndex, comment) {

      if (comment.videoId === video.id) {

        videoWithComments.comments.push(comment);

      }

    });

 

    // Add the video with associated comments to the processed data array

    processedData.push(videoWithComments);

  });

 

  return processedData;

}

function filterVideos(searchTerm) {

  var videos = localStorage.getItem("videos");

  if (!videos) return;

  var videoArray = JSON.parse(videos);

 

  var filteredVideos = videoArray.filter(function (val) {

    // Customize this condition based on your search criteria

    return (

      val.video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||

      val.video.genre.toLowerCase().includes(searchTerm.toLowerCase())

    );

  });

 

  displayVideos(filteredVideos);

}

// 
//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){
  //Replace the current HTML in that div with a loading message
   $('#VideosList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
   $.getJSON(RAI, function( data ) {
   //Create an array to hold all the retrieved assets
   var items = [];
  
   //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
   $.each( data, function( key, val ) {
   items.push( "<hr />");
   items.push("<video width='800' controls><source src='"+ BLOB_ACCOUNT + val["filepath"] +"' type='video/mp4'>wrong format</video> <br />");
   items.push( "Title : " + val["Title"] + "<br />");
   items.push( "Producer : " + val["Producer"] + "<br />");
   items.push( "Publisher : " + val["Publisher"] + "<br />");
   items.push( "Genre : " + val["Genre"] + "<br />");
   items.push( "Agerating : " + val["Agerating"] + "<br />");
   //items.push( "File : " + val["fileName"] + "<br />");
   //items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
   items.push( "<hr />");
   });
   //Clear the assetlist div
   $('#VideosList').empty();
   //Append the contents of the items array to the ImageList Div
   $( "<ul/>", {
   "class": "my-new-list",
   html: items.join( "" )
   }).appendTo( "#VideosList" );
   });
  }
 

// Function to add the sign-out button

function addSignOutButton() {

  var signOutContainer = $("#signout-container");

 

  var signOutButton = $("<button>", {

    text: "Sign Out",

    class: "btn btn-danger",

    click: logout,

  });

 

  signOutContainer.append(signOutButton);

}

 

// Function to handle the logout process

function logout() {

  // Clear local storage or perform other logout actions as needed

  localStorage.clear();

 

  // Redirect or perform any other post-logout actions

  // For example, redirect to the login page

  window.location.href = "index.html";

}

 

// Bind the submit event using jQuery

$(document).on("submit", ".comment-form", function (event) {

  // Prevent the default form submission behavior

  event.preventDefault();

 

  // Get the values from the form

  var commentText = $(this).find("textarea[name='comment']").val();

  var rating = $(this).find("input[name='rating']").val();

  var videoIndex = $(this).data("video-index"); // Assuming you set a data attribute in your HTML

  var user = JSON.parse(localStorage.getItem("user"));

 

  // Validate the rating

  if (rating < 1 || rating > 5) {

    alert("Rating must be between 1 and 5.");

    return false; // Prevent form submission

  }

 

  // Prepare data to be sent in the request body

  var requestBody = JSON.stringify({

    videoId: videoIndex,

    comment: commentText,

    rating: Number(rating),

    userName: user.userName,

  });

 

  console.log(requestBody);

 

  // Make a fetch request to your endpoint

  fetch(addCommentUrl, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      // Add any other headers if needed

    },

    body: requestBody,

  })

    .then((response) => {

      if (!response.ok) {

        throw new Error("Network response was not ok");

      }

      return response.json();

    })

    .then((data) => {

      // Handle the successful response

      $(this).find("textarea[name='comment']").val("");

      $(this).find("input[name='rating']").val("");

 

      // Update UI with the new comment without refreshing the page

      updateUIWithCommentAndRating(data);

    })

    .catch((error) => {

      console.error("There was a problem with the fetch operation:", error);

      // Handle the error, show an alert, or perform other error-handling actions

    });

 

  return false; // Prevent form submission

});

 

function updateUIWithCommentAndRating(data) {

  // Find the corresponding comment section and append the new comment

  var newComment =

    "<p><strong>User:</strong> " +

    data.userName +

    "<br /><strong>Comment:</strong> " +

    data.comment +

    "</p>";

  $("#videoList")

    .find(".comment-form[data-video-index='" + data.videoId + "']")

    .append(newComment);

}


var loginUrl = "https://prod-82.eastus.logic.azure.com/workflows/6d9128c215df4030b51d04aad18bb267/triggers/manual/paths/invoke/api/login?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rV_Ax7byonb9nDKQ-pij1dENLc_2yaU-qCMfq-rZSSQ"; 

function isObjectEmpty(obj) {

  return Object.keys(obj).length === 0;

}

 

function login() {
  var username = $("#username").val();
  var password = $("#password").val();

  var submitData = {
    userName: username,
    password: password,
  };

 

  fetch(loginUrl, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify(submitData),

  })

    .then((response) => response.json())

    .then((data) => {

      if (isObjectEmpty(data)) {

        alert("Invalid login credentials");

        return;

      }

 

      var respdata = data.Table1[0];

      console.log(respdata);

      console.log(submitData);

      if (

        respdata.userName === submitData.userName &&

        respdata.password === submitData.password

      ) {

        console.log("login successful");
        localStorage.setItem("user", JSON.stringify(respdata));

        $("#username").val("");
        $("#password").val("");
        window.location.href = "consumer.html";
      }

    })

    .catch((error) => {

      // Handle error if fetch request fails

      console.error("Fetch request failed:", error);

    });

}
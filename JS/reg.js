var registerUrl = "https://prod-71.eastus.logic.azure.com/workflows/42de4d8c4ccc4243999ff14315ab09c1/triggers/manual/paths/invoke/api/register?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RMlAzi9FQOOueR5V1hbxNEye462WjXV9zWUiJANMa5k";
 
function register() {

  var userName = $("#userName").val();
  var fullName = $("#fullName").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();


  if (password !== confirmPassword) {
    alert('Password field does not match')
    return;
  }

  var submitData = {
    userName: userName,
    fullName: fullName,
    email: email,
    password: password
  };

  console.log(submitData)

  fetch(registerUrl, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify(submitData),

  })
  .then((response) => response.json())
  .then((data) => {
      if (data.ItemInternalId) {
        // Registration successful, perform actions like redirecting to another page or showing a success message
        console.log("Registration successful");
        window.location.href = 'index.html';
      } else {
        // Registration failed, handle error (display error message, clear fields, etc.)
        console.log("Registration failed");
      }
    }).catch((error) => {

      // Handle error if fetch request fails

      console.error("Fetch request failed:", error);

    });

}
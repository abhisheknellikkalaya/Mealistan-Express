function generateMealPlan() {
  // Retrieve user inputs
  var mealCount = document.getElementById("mealCount").value;
  var dietPreference = document.getElementById("dietPreference").value;
  var healthSpecification = document.getElementById("healthSpecification").value;
  var calories = document.getElementById("calories").value;

  // Construct API URL with user inputs as query parameters
  var apiURL = "https://api.edamam.com/api/recipes/v2?type=public&" +
    "app_id=5849662a&" +
    "app_key=b902aef41f66db22ff957ecbb27a0312&" +
    "q=&" +
    "diet=" + dietPreference + "&" +
    "health=" + healthSpecification + "&" +
    "calories=gte%20" + calories + "&" +
    "random=true&" +
    "to=" + mealCount;

  fetch(apiURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayMealPlan(data);
    })
    .catch(function(error) {
      console.log("Error retrieving recipe information:", error);
    });
}

function generateMealPlan() {
  // Retrieve user inputs
  var mealCount = document.getElementById("mealCount").value;
  var dietPreference = document.getElementById("dietPreference").value;
  var healthSpecification = document.getElementById("healthSpecification").value;
  var calories = document.getElementById("calories").value;
  
  // Make API call to retrieve recipe information based on user inputs
  // You will need to replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your actual Edamam API credentials
  var apiURL = "https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=64fd9f86&app_key=
10c784d31af8735ed43516e8cc7ad98d&diet=" + dietPreference + "&health=" + healthSpecification + "&calories=gte%20" + calories + "&random=true&to=" + mealCount;
  
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

function displayMealPlan(data) {
  var mealPlanTable = document.getElementById("mealPlanTable");
  
  // Clear existing meal plan
  mealPlanTable.querySelectorAll("td").forEach(function(cell) {
    cell.innerHTML = "";
  });
  
  // Populate meal plan table with recipe information
  for (var i = 0; i < data.hits.length; i++) {
    var meal = data.hits[i].recipe;
    
    var dayIndex = i % 5 + 1; // Generate meal plan for Monday to Friday
    var mealType = "";
    
    if (i < 5) {
      mealType = "Breakfast";
    } else if (i < 10) {
      mealType = "Lunch";
    } else {
      mealType = "Dinner";
    }
    
    var cell = document.getElementById(getTableCellId(mealType, dayIndex));
    
    var mealName = document.createElement("p");
    mealName.textContent = meal.label;
    
    var mealImage = document.createElement("img");
    mealImage.src = meal.image;
    
    var ingredients = document.createElement("ul");
    meal.ingredientLines.forEach(function(ingredient) {
      var ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient;
      ingredients.appendChild(ingredientItem);
    });
    
    cell.appendChild(mealName);
    cell.appendChild(mealImage);
    cell.appendChild(ingredients);
  }
}

function getTableCellId(mealType, dayIndex) {
  return dayIndexToName(dayIndex) + mealType.toLowerCase();
}

function dayIndexToName(dayIndex) {
  switch (dayIndex) {
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    default:
      return "";
  }
}

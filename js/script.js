const searchButton = document.getElementById("searchButton"); //  search button element 

searchButton.addEventListener("click", async function() { // Add event listener to the search button

     // value of the search input
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput === "") {  // Check we check if the search input is empty
        alert("Please enter a recipe name.");  // If this is  empty, an alert and return is shown from the function
        return;
    }
// Construct the URL for fetching recipe data
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchInput}&number=1`;


    // Set up options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'af422f11d6msh01bab85c3650592p19b636jsndb94dddd0b9d',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.results.length > 0) {
            const recipe = data.results[0];
            const nutritionData = await fetchRecipeNutrition(recipe.id);
            displayRecipeData(recipe, nutritionData);  // e recipe data and nutrition data on the page
        } else {
            alert("Recipe not found."); // If no recipe is found  an alert is shown
        }
    } catch (error) {
        console.error(error); // Catch any errors that occur during the fetch request
    }
    const studentInfo = document.createElement("p");  // student information to the page
    studentInfo.textContent = "Name: Dupinder Kaur, Student id: 200553418";
    document.body.appendChild(studentInfo);
});

async function fetchRecipeNutrition(recipeId) {
    const nutritionUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/nutritionWidget.json`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'af422f11d6msh01bab85c3650592p19b636jsndb94dddd0b9d',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(nutritionUrl, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

function displayRecipeData(recipe, nutritionData) {

    document.getElementById("recipeId").textContent = recipe.id;  // Update  elements with recipe and nutrition data
    document.getElementById("recipeTitle").textContent = recipe.title;
    document.getElementById("recipeImageType").textContent = recipe.imageType;
    document.getElementById("recipeImage").src = recipe.image;
    document.getElementById("calories").textContent = nutritionData.calories;
    document.getElementById("carbs").textContent = nutritionData.carbs;
    document.getElementById("fat").textContent = nutritionData.fat;
    document.getElementById("protein").textContent = nutritionData.protein;
}

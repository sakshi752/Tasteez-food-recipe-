const recipeContainer = document.querySelector('.recipe-container');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.searchBtn');

const fetchRecipes = async (value) => {
    recipeContainer.innerHTML="loading recipes..."
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await response.json();

    recipeContainer.innerHTML="";
    data.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish</p>
        <p>${meal.strCategory}</p>
        `
        recipeContainer.appendChild(recipeDiv);
    });

}

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (searchInput.value.trim() === '') {
        alert("Please enter a valid recipe name...");
    } else {
        const inputData = searchInput.value.trim();
        await fetchRecipes(inputData);
    }
});

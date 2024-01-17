const recipeContainer = document.querySelector('.recipe-container');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.searchBtn');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-closeBtn');
const addYourRecipeBtn=document.querySelector('.addYourRecipe')
const recipeForm=document.querySelector('.recipe-form-container')
const hr=document.querySelector('hr')

// fetching recipe on clicking search btn
const fetchRecipes = async (value) => {
    recipeContainer.innerHTML = "loading recipes..."
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    const data=await response.json();
    recipeContainer.innerHTML = "";
    data.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish</p>
        <p>Belongs to ${meal.strCategory} category</p>
        `

        const btn = document.createElement("button");
        btn.classList.add("btn")
        btn.textContent = "View Recipe"
        recipeDiv.appendChild(btn)

        // adding event listener to recipe button
        btn.addEventListener('click',()=>{
            openRecipePopup(meal);
        });


        recipeContainer.appendChild(recipeDiv);
    });

}

// fetching ingredients and measurements
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredient:</h3>
    <ul class="indegredientList">${fetchIngredients(meal)}</ul>
    <div>
        <h3 class="instructions">Instructions:</h3>
        <p class="recipe-instructions">${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display='block';
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display='none';
})

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (searchInput.value.trim() === '') {
        alert("Please enter a valid recipe name...");
    } else {
        const inputData = searchInput.value.trim();
        await fetchRecipes(inputData);
    }
});


let yourRecipes=[
    {
        recipeImg:"images/img1.jpg",
        recipeName:"uppama",
        recipeCuisine:"South Indian",
        recipeCategory:"breakfast",
        recipeIngredient:"",
        recipeInstructions:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, alias dicta ducimus voluptatibus odit fugit quas, earum quasi corrupti pariatur ea possimus debitis magni sint eos quis quia voluptate omnis dolorem accusamus similique ipsum unde ad. Voluptate cupiditate fugiat nemo recusandae ipsam, aliquam obcaecati voluptates quae numquam, nulla id officiis!"

    },
    {
        recipeImg:"images/img2.jpg",
        recipeName:"dal makhani",
        recipeCuisine:"Punjabi",
        recipeCategory:"Vegetarian",
        recipeIngredient:"",
        recipeInstructions:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, alias dicta ducimus voluptatibus odit fugit quas, earum quasi corrupti pariatur ea possimus debitis magni sint eos quis quia voluptate omnis dolorem accusamus similique ipsum unde ad. Voluptate cupiditate fugiat nemo recusandae ipsam, aliquam obcaecati voluptates quae numquam, nulla id officiis!"
    },
    {
        recipeImg:"images/img3.jpg",
        recipeName:"papdi no lot",
        recipeCuisine:"Gujarati",
        recipeCategory:"breakfast",
        recipeIngredient:"",
        recipeInstructions:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, alias dicta ducimus voluptatibus odit fugit quas, earum quasi corrupti pariatur ea possimus debitis magni sint eos quis quia voluptate omnis dolorem accusamus similique ipsum unde ad. Voluptate cupiditate fugiat nemo recusandae ipsam, aliquam obcaecati voluptates quae numquam, nulla id officiis!"
    }

    // {

    // }
];

const fetchYourRecipe=()=>{
    recipeForm.style.display="block"
    hr.style.display="block"
    recipeContainer.innerHTML="";
    yourRecipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src=${recipe.recipeImg}>
        <h3>${recipe.recipeName}</h3>
        <p>${recipe.recipeCuisine} Dish</p>
        <p>Belongs to ${recipe.recipeCategory} category</p>
        `

        const btn = document.createElement("button");
        btn.classList.add("btn")
        btn.textContent = "View Recipe"
        recipeDiv.appendChild(btn)

        // adding event listener to recipe button
        btn.addEventListener('click',()=>{
            openRecipePopup1(recipe);
        });

        recipeContainer.appendChild(recipeDiv);
    });
}

const openRecipePopup1=(recipe)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${recipe.recipeName}</h2>
    <h3>Ingredient:</h3>
    <div>
        <h3 class="instructions">Instructions:</h3>
        <p class="recipe-instructions">${recipe.recipeInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display='block';
}

addYourRecipeBtn.addEventListener('click',()=>{
    
   fetchYourRecipe();
})
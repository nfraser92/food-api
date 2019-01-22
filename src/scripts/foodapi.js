// fetch("http://localhost:8088/foods")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         // console.table(parsedFoods)
//     })

const createFoodComponent = foods => {
    return `
    <section class="foodList">
    <h2>${foods.name}</h2>
    <section>
        <p>Ethnicity:${foods.ethnicity}</p>
        </section>
        <section>
        <p>Category:${foods.category}</p>
        </section>
        <section>
        <p>Ingredients:${foods.ingredients}</p>
        </section>
        <section>
        <p>Country:${foods.country}</p>
        </section>
        <section>
        <p>Calories:${foods.calories}</p>
        </section>
        <section>
        <p>Fat Content:${foods.fat}</p>
        </section>
        <section>
        <p>Sugar:${foods.sugar}</p>
        </section>
        </section>
        `
}



const foodOnTheDom = (text) => document.querySelector(".foodList").innerHTML += text

fetch("http://localhost:8088/foods")
.then(foods => foods.json())
.then(myParsedFoods => {
    myParsedFoods.forEach(foods => {
        console.log(foods) // Should have a `barcode` property

        // Now fetch the food from the Food API
        fetch(`https://world.openfoodfacts.org/api/v0/product/${foods.barcode}.json`)
            .then(response => response.json())
            .then(productInfo => {
                foods.ingredients = productInfo.product.ingredients_text
                foods.country = productInfo.product.countries
                foods.calories = productInfo.product.nutriments.energy_100g
                foods.fat = productInfo.product.nutriments.fat_value
                foods.sugar = productInfo.product.nutriments.sugars

                // Produce HTML representation
                foodAsHTML = createFoodComponent(foods)

                // Add representaiton to DOM
                foodOnTheDom(foodAsHTML)
            })
    })
})
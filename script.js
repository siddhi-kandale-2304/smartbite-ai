console.log("JS loaded");

// Main Elements
const button = document.getElementById("analyzeBtn");
const input = document.getElementById("foodInput");
const resultsSection = document.getElementById("resultsSection");
const analysisLabel = document.getElementById("analysisLabel");

const recipeSection = document.getElementById("recipeSection");
const alternativesSection = document.getElementById("alternativesSection");

// Result Elements
const healthScoreValue = document.getElementById("healthScoreValue");
const healthScoreOrb = document.getElementById("healthScoreOrb");
const healthScoreTitle = document.getElementById("healthScoreTitle");
const healthScoreMsg = document.getElementById("healthScoreMsg");
const macroCalories = document.getElementById("macroCalories");
const macroProtein = document.getElementById("macroProtein");
const macroCarbs = document.getElementById("macroCarbs");
const macroFats = document.getElementById("macroFats");

// User Interaction: Allow Enter key to trigger analysis
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});

// User Interaction: Mood Buttons Selection Logic
const moodBtns = document.querySelectorAll(".mood-btn");
moodBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Reset all buttons to transparent borders
        moodBtns.forEach(b => {
            b.classList.remove("border-primary");
            b.classList.add("border-transparent");
        });
        // Set the active button to have primary border
        btn.classList.add("border-primary");
        btn.classList.remove("border-transparent");
    });
});

// Analyze Button Click Logic
button.addEventListener("click", async () => {
    const food = input.value.trim();

    if (!food) {
        alert("Please enter a food item!");
        return;
    }

    console.log(`Sending Analysis Request for: ${food}`);

    // Hide all dynamic sections before analyzing new input
    resultsSection.classList.add("hidden");
    recipeSection.classList.add("hidden");
    alternativesSection.classList.add("hidden");

    // Set UI to loading state
    button.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Analyzing...';
    button.disabled = true;

    // Feature 1: Working Recipe Feature (triggered by comma-separated ingredients)
    if (food.includes(",")) {
        setTimeout(() => {
            generateRecipe(food);
            button.innerHTML = '<span class="material-symbols-outlined">analytics</span> Analyze Food';
            button.disabled = false;
        }, 800); // Artificial delay for UX feel
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ food })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data from backend:", data);

        // Feature: Display parsed data
        analysisLabel.textContent = `Based on: ${food}`;
        resultsSection.classList.remove("hidden");
        displayResults(data);

        // Feature 2: Healthy Alternative Feature
        if (data.healthScore < 7) {
            showAlternative(food);
        }

    } catch (error) {
        console.error("Error analyzing food:", error);
        alert("Something went wrong while connecting to the backend! Make sure 'node server.js' is running on port 5000.");
    } finally {
        button.innerHTML = '<span class="material-symbols-outlined">analytics</span> Analyze Food';
        button.disabled = false;
    }
});

function displayResults(data) {
    macroCalories.textContent = data.calories;
    macroProtein.textContent = data.protein;
    macroCarbs.textContent = data.carbs;
    macroFats.textContent = data.fat;
    healthScoreMsg.textContent = data.suggestion;
    healthScoreValue.textContent = data.healthScore;

    let title = "Nutrition Match";
    let orbColorClass = "text-primary";
    
    if (data.healthScore >= 7) {
        title = "Excellent Choice!";
        orbColorClass = "text-primary";
    } else if (data.healthScore >= 5) {
        title = "Moderate Choice";
        orbColorClass = "text-yellow-500"; 
    } else {
        title = "Consider Alternatives";
        orbColorClass = "text-error";
    }

    healthScoreTitle.textContent = title;

    const circumference = 552.92;
    const progress = (data.healthScore / 10) * 100;
    const dashoffset = circumference - (circumference * progress) / 100;

    healthScoreOrb.classList.remove("text-primary", "text-yellow-500", "text-error");
    healthScoreOrb.classList.add(orbColorClass);
    healthScoreOrb.setAttribute("stroke-dashoffset", dashoffset);
}

// Generates a simple text-based Recipe
function generateRecipe(inputStr) {
    const list = inputStr.split(",").map(i => i.trim()).filter(i => i);
    const lowerInput = inputStr.toLowerCase();
    
    let title = "Fresh Healthy Bowl";
    let instructions = [
        "Chop and prepare all your raw ingredients.", 
        "Toss together in a large bowl or pan.", 
        "Add a light dressing of olive oil and lemon juice, or sauté lightly.", 
        "Serve fresh and enjoy your healthy meal!"
    ];
    
    if (lowerInput.includes("egg") || lowerInput.includes("bread") || lowerInput.includes("cheese")) {
        title = "Healthy Breakfast Skillet";
        instructions = [
            "Heat a non-stick pan over medium heat with a touch of oil.", 
            "Sauté the ingredients lightly until fragrant.", 
            "Cook until your proteins (like eggs) are fully set.", 
            "Season with salt, pepper, and fresh herbs to serve warm."
        ];
    } else if (lowerInput.includes("chicken") || lowerInput.includes("rice")) {
        title = "Protein Power Bowl";
        instructions = [
            "Cook the chicken thoroughly until internal temp reaches 165°F.", 
            "Prepare your rice or base grains on the side.", 
            "Assemble everything in a bowl, layering proteins and veggies.", 
            "Garnish with a healthy low-calorie sauce."
        ];
    }
    
    document.getElementById("recipeTitle").textContent = title;
    
    const ingredientsHtml = list.map(item => `<li>${item.charAt(0).toUpperCase() + item.slice(1)}</li>`).join("");
    document.getElementById("recipeIngredients").innerHTML = ingredientsHtml;
    
    const stepsHtml = instructions.map(step => `<li>${step}</li>`).join("");
    document.getElementById("recipeSteps").innerHTML = stepsHtml;
    
    recipeSection.classList.remove("hidden");
}

// Show a healthy alternative map for low scored foods
function showAlternative(food) {
    const lower = food.toLowerCase();
    
    let altTitle = "Quinoa Protein Bowl";
    let altTag = "+5g Protein";
    let altDesc = "Replace heavy carbs with a complex carb base for sustained energy and better macros today.";
    let altImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuCNJDTPiojt49b4_k33GbN077rF4GhMc-qAedMhJEH4A7PF1PSDjhKsIVrmJPY1Q9vfK6Im_D2iIphtCIE7XxGowR7EN7fTfHiUAlFAgPnjJyvAIhj9XNVTYWQElESCgMio0_PnuUK18EaUTdTlXFdQArFAljsKD0QAWCCl2GdPcvoaSMmrA0Vu9jFM9CtWcTPwymJMccrho0ULY6GR0P7mMqZIGQNiwoBSIyGvAJnoQBixcbAjV8QwWYeFDByeSfckCS11_u4JPco";
    
    if (lower.includes("burger")) {
        altTitle = "Lean Turkey Lettuce Wrap";
        altTag = "-300 Cal";
        altDesc = "Swap the heavy brioche bun for crisp lettuce and use lean turkey for a satisfying, low-carb alternative.";
    } else if (lower.includes("pizza")) {
        altTitle = "Cauliflower Crust Flatbread";
        altTag = "Low Carb";
        altDesc = "A delicious cauliflower base topped with fresh veggies and less cheese to cut saturated fats in half.";
    }
    
    document.getElementById("altCard1Title").textContent = altTitle;
    document.getElementById("altCard1Tag").textContent = altTag;
    document.getElementById("altCard1Desc").textContent = altDesc;
    document.getElementById("altCard1Image").src = altImg;
    
    alternativesSection.classList.remove("hidden");
}
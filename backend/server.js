const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint
app.post('/analyze', (req, res) => {
    const { food } = req.body;

    if (!food || typeof food !== 'string') {
        return res.status(400).json({ 
            error: 'Please provide a valid food item in the request body.' 
        });
    }

    const lowerFood = food.toLowerCase();

    // Default to Good Health Score
    let response = {
        calories: 350,
        protein: '25g',
        carbs: '30g',
        fat: '10g',
        healthScore: 9, // Good
        suggestion: 'Great choice! Keep up the healthy eating habits.'
    };

    // Simple Logic per requirements
    if (lowerFood.includes('burger')) {
        response = {
            calories: 850,
            protein: '35g',
            carbs: '60g',
            fat: '45g',
            healthScore: 3, // Unhealthy, low score
            suggestion: 'Unhealthy option. Consider evaluating healthier alternatives like a grilled chicken wrap or a salad.'
        };
    } else if (lowerFood.includes('pizza')) {
        response = {
            calories: 1200,
            protein: '45g',
            carbs: '150g',
            fat: '40g',
            healthScore: 6, // Medium score
            suggestion: 'Try having just a few slices and paired with a large side salad to balance your meal.'
        };
    }

    res.json(response);
});

// Start Server
app.listen(PORT, () => {
    console.log(`SmartBite backend is running on http://localhost:${PORT}`);
});

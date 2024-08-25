const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// POST method endpoint
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        // Find the highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
        let highestLowercaseAlphabet = [];

        if (lowercaseAlphabets.length > 0) {
            highestLowercaseAlphabet = lowercaseAlphabets.reduce((a, b) => a > b ? a : b);
        }

        // Construct the response
        const response = {
            is_success: true,
            user_id: "Sardaar_2000", // Replace with dynamic data if needed
            email: "mantej.singh2021@vitstudent.ac.in", // Replace with actual email
            roll_number: "21BAI1852", // Replace with actual roll number
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        res.status(200).json(response);

    } catch (error) {
        // Handle any errors
        res.status(400).json({
            is_success: false,
            error: error.message
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

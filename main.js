const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.send('Hello from Gemini')
})


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

// const prompt = "value of pi in maths";

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

// generate()

app.get('/api/content', async (req, res) => {

    try {
        
        const data = req.body.question;
        const result = await generate(data);

        res.send({
            "result": result
        })

    } catch (error) {
        res.send("error" + error)
    }

})

app.listen('3000', ()=> {
    console.log('Server is running on port 3000');
})
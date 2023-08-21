// console.log('Express + TS!')

// - Init Express
import express from 'express';

const app = express()

// - rota com POST
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Hello Express!")
})

// rota com POST
app.post("/api/product", (req, res) => {
    console.log(req.body)

    return res.send("Product added");
})

app.listen(3000, () => {
    console.log("Express + TS app is working!");        
});     
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
});

// - rota para todos os verbos

app.all("/api/product/check", (req, res) => {

    // req.method = VERBO HTTP

    if(req.method === "POST") {
        return res.send("Inserted any record")
    } else if(req.method === "GET") {
        return res.send("Read any record")
    } else {
        return res.send("We cannot perform this operation")
    }

})

app.listen(3000, () => {
    console.log("Express + TS app is working!");        
});     
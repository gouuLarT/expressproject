// console.log('Express + TS!')

// - Init Express
import express, {NextFunction, Request, Response } from 'express';

const app = express()

// - rota com POST
app.use(express.json());

// - middleware com todas as rotas
function showPath(req: Request, res: Response, next: NextFunction) {
    console.log(req.path);
    next();
}

app.use(showPath)

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

// - Interfaces do express

app.get("/api/Interfaces", (req: Request, res: Response) => {
    return res.send("Using interfaces");
});

// - Enviando JSON

app.get("/api/json", (req: Request, res: Response) => {
    return res.json({
        name: "Shirt",
        price: 30.00,
        color: "Blue",
        sizes: ["P", "M", "G"],
    })
});

// - Router Parameters
app.get("/api/product/:id", (req: Request, res: Response) => {
    
    console.log(req.params)

    const id = req.params.id

    if(id === "1") {

        const product = {
            id: 1,
            name: "Cap",
            price: 10,
        };

        return res.json(product);
    } else {
        return res.send("Product not found")
    }
});

// - Rotas complexas
app.get("/api/product/:id/review/:reviewId", (req: Request, res: Response) => {
    console.log(req.params);

    const productId = req.params.id;
    const reviewId = req.params.reviewId;

    return res.send(`Accessing review ${reviewId} of product ${productId}`);
});

// - Router handler


function getUser(req: Request, res: Response) {
    console.log(`Rescuing the user with id: ${req.params.id}`)
    
    return res.send("The user has been found");
}

app.get("/api/user/:id", getUser)

// - Middleware
function checkUser(req: Request, res: Response, next: NextFunction){
    if(req.params.id === "1"){
        console.log("You can proceed")
        next()
    } else {
        console.log("Restricted access")
    }
}

app.get("/api/user/:id/access", checkUser, (req: Request, res: Response) => {
    return res.json({msg: "Welcome to admin space" });
})


app.listen(3000, () => {
    console.log("Express + TS app is working!");        
});     
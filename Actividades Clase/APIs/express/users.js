const express = require('express');
const app = express();
const port = 7000;

let mockData = {
    users: [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        },
        {
            id: 2,
            name: 'Mark Twain',
            email: 'marktwain@example.com'
        },
        {
            id: 3,
            name: 'Jack Sparrow',
            email: 'jacksparrow@example.com'
        },
        {
            id: 4,
            name: 'CJ',
            email: 'cj@example.com'
        },
        {
            id: 5,
            name: 'Xanthus',
            email: 'xanthus@example.com'
        },
        {
            id: 6,
            name: 'Onard Bersomist',
            email: 'onardbersomist@example.com'
        },
    ]
};

// Devolver todos los usuarios
app.get('/users', (req,res)=>{
    res.json(mockData.users);
});

// Devolver un usuario según su id
app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = mockData.users.find(user => user.id === id);
    if(user){
        res.json(user);
    } else{
        res.sendStatus(404);
    };
})

// Middleware de preprocesamiento para especificar como debe express transformar un POST
app.use(express.json());

// Crear un usuario
app.post('/users', (req,res) => {
    const user = req.body;
    user.id = mockData.users.length + 1;
    mockData.users.push(user);
    res.status(201).json(user);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
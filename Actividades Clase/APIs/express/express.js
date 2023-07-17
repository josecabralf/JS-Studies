const express = require('express');
const app = express();
const port = 5000;

/*app.get('/', (req,res)=>{
    res.send('Hello World!');
});*/

// GET
app.get('/dds', (req,res)=>{
    res.send('Hello World DDS!');
});

// POST:
app.post('/dds', (req,res) => {
    res.send('Esta es la rta a un POST!');
})

// PUT:
app.put('/dds', (req,res) => {
    res.send('Esta es la rta a un PUT!');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
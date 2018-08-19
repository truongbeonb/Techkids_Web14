const express = require('express');
const path = require('path');
let app = express();

// localhost: 6969
// app.get('/',(request, response) => {
//     console.log(__dirname);
//     // response.sendFile(__dirname +  '/FE-CSS/index.html');
//     response.sendFile(path.resolve(__dirname, './FE-CSS/index.html'));
// });


app.get('/:name',(req, res) => {
    res.send(`Hello ${req.params.name}`);
});



app.get('/' ,(req,res) => {
	res.send('Hello '+ req.query.name);
})



app.listen(6969, (err) => {
    if(err) console.log(err);
    else console.log("Server is listening ar port 6969!");
});
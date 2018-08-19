// console.log("Hello World");
const fs = require('fs');

const objData = {
    a: 11,
    b: 15
}

// console.log('Start write file' +JSON.stringify(objData.a));
fs.writeFile('./test.txt',JSON.stringify(objData) , (error) => {
    if(error) console.log(error)
    else console.log('Wirte file sucess!');
});

// fs.writeFileSync();

// let fileData = fs.readFileSync('./test.txt');

// console.log("File data: " + fileData);


fs.readFile('./test.txt',(err,fileData) =>{
    if(err) console.log(err);
    else console.log("File data: " + JSON.parse(fileData).a);
});

console.log('End write file!');
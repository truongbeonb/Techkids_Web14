const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
let app = express();

const QuestionModel = require('./models/questionModel');

mongoose.connect('mongodb://localhost/quyetde', (err) => {
    if (err) console.log(err)
    else console.log("DB connect success !");
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(6969, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server is listening at port 6969!");
    }
});

app.get('/', (req, res) => {
    res.send("Hello World");

});

app.post('/ask', (req, res) => {
  const newQuestion = {
      content: req.body.question,
  }
  QuestionModel.create(newQuestion, (err, questionCreated) => {
      if (err) console.log(err)
      else {
          // res.send({mess: "Ask success!",question: questionCreated});           
          res.redirect('http://localhost:8080/');
      }
  });

  // console.log("Hihi vao roi!");
  // // req.on('data',(data)=>{

  // // });
  // fs.readFile('./questions.txt', (err, data) => {
  //     if (err) console.log(err);
  //     else {
  //         try {
  //             console.log("file data : " + data);

  //             let questions = [];
  //             if (data != "" && JSON.parse(data).length) {
  //                 questions = JSON.parse(data);
  //             }
  //             const newQuestion = {
  //                 id: questions.length + 1,
  //                 questionContent: req.body.question,
  //                 yes: 0,
  //                 no: 0

  //             }
  //             questions.push(newQuestion);
  //             // console.log("hi:", newQuestion);
  //             fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
  //                 if (err) console.log(err);
  //                 else res.redirect('http://localhost:8080/ask.html');
  //                 //http://localhost:6969/


  //             });
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     }
  // });
  // // console.log("Question : ", req.body.question);
});


app.use(cors()); // request cho nhau (ajax)

app.get('/question', (req, res) => {
    QuestionModel.find({}, (err, questions) => {
        let ranNum = Math.floor(Math.random() * questions.length);
        QuestionModel.findOne({}).skip(ranNum == 0 ? ranNum : ranNum - 1).exec((err, questionFound) => {
            if (err) console.log(err);
            else {
                res.send({
                    mess: "success!",
                    question: questionFound
                });
            }
        });
    });

    // fs.readFile('./questions.txt', (err, fileData) => {
    //     if (err) console.log(err);
    //     else {
    //         try {
    //             let questions = JSON.parse(fileData);
    //             let randomNum = Math.floor(Math.random() * questions.length);
    //             let randomQuestion = questions[randomNum];
    //             res.send({
    //                 message: "success!",
    //                 question: randomQuestion
    //             });
    //         } catch (error) {
    //             console.log("ERROR", err);
    //         }
    //     }
    // })
});
app.get('/question/:questionId', (req, res) => {
    console.log(req.params.questionId);
    let id =req.params.questionId;
    QuestionModel.findById(id,function(err,result){
        if(err) console.log(err);
        else{
            console.log("view OK!")
            res.send({mess : "success", question: result});
        }
    });


    // fs.readFile('./questions.txt', (err, fileData) => {
    //     if (err) console.log(err);
    //     else {
    //         try {
    //             let questionId = req.params.questionId;

    //             let questions = JSON.parse(fileData);
    //             let randomNum = Math.floor(Math.random() * questions.length);
    //             let randomQuestion = questions[randomNum];
    //             let question = questions[req.body.ID - 1];
    //             res.send({
    //                 message: "success!",
    //                 question: randomQuestion
    //             });
    //         } catch (error) {
    //             console.log("ERROR", err);
    //         }
    //     }
    // })
});

app.put('/answer', (req, res) => {
    // console.log("hihi vao roi");
    // console.log(req.body.ID);
    QuestionModel.findById(req.body.ID,function(err,result){
        if(err) console.log(err)
        else{
            let myquery = { _id: req.body.ID};
            let newValue;
            let valueY = result.yes;
            let valueN = result.no;
            if(req.body.YN == "yes"){
               valueY ++;;
                 newValue = { $set: { yes: valueY } };
            }else{
               valueN ++;
                 newValue = { $set: { no: valueN } };
            }           
         
            QuestionModel.updateOne(myquery,newValue,function(err,ress){
                if(err) console.log(err);
                else{
                    let data = {
                        content: result.content,
                        yes : valueY,
                        no : valueN
                    };
                    res.send({ mess: "success!", question: data});
                    // console.log(data.yes+data.no);
                    console.log("1 document updated");                   
                }
            });         
            
        }
     
    });


    // fs.readFile('./questions.txt', (err, data) => {
    //     if (err) console.log(err);
    //     else {
    //         try {
    //             // console.log("file data : " + data);

    //             let questions = [];
    //             if (data != "" && JSON.parse(data).length) {
    //                 questions = JSON.parse(data);
    //             }

    //             for (var i = 0; i < questions.length; i++) {
    //                 if (questions[i].id == req.body.ID) {

    //                     questions[req.body.ID - 1][req.body.YN] += 1;

    //                     // if ((req.body.YN) == "yes") {
    //                     //     questions[i].yes += 1;
    //                     // }
    //                     // if (req.body.YN == "no") {
    //                     //     questions[i].no += 1;
    //                     // }
    //                 }
    //             }

    //             fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
    //                 if (err) console.log(err);
    //                 else {
    //                     // res.redirect('http://localhost:8080;');
    //                     res.send({
    //                         mess: "success!",
    //                         question: questions[req.body.ID - 1]
    //                     });
    //                     console.log("Success write!");
    //                 }
    //                 //http://localhost:6969/
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // });
});


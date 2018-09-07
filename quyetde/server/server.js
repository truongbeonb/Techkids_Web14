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

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));

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
});

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
});
app.get('/question/:questionId', (req, res) => {
  console.log(req.params.questionId);
  let id = req.params.questionId;
  QuestionModel.findById(id, function (err, result) {
    if (err) console.log(err);
    else {
      console.log("view OK!")
      res.send({
        mess: "success",
        question: result
      });
    }
  });
});

app.put('/answer', (req, res) => {
  // const answer = req.body.answer;
  // const questionId = req.body.questionId;
  const { answer, questionId } = req.body;

  QuestionModel.findOne({ _id: questionId })
    .exec((err, questionFound) => {
      if (err) console.log(err)
      else if (questionFound) {
        questionFound[answer]++;
        questionFound.save((err) => {
          if (err) console.error(err)
          else res.send({ message: "Success!", question: questionFound });
        });
      }
    });
});
app.listen(6969, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is listening at port 6969!");
  }
});
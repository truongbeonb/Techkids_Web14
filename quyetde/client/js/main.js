$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:6969/question',
        method: 'GET',
        success: function (data) {
            // console.log("success", data);
            $('h1').text(data.question);
            $('.answer').attr('data-id', data.id)
        },
        error: function () {
            console.log("error!");
        }
    });

    $('.answer').on('click', function (event) {
        let answer = $(event.target).attr('data-answer');
        let questionId = $(event.target).attr('data-id');
        // console.log(answer, questionId);
        $.ajax({
            url: 'http://localhost:6969/answer',
            method: 'PUT',
            data: {
                answer,
                questionId
            },
            success: function (data) {
               if(data.question){
                   let totalVote = data.question.yes + data.question.no;
                   $('#vote').text(totalVote);
                   $('#voteYes').text((data.question.yes/totalVote)*100);
                   $('#voteNo').text((data.question.no/totalVote)*100);
                   $('.questionInfo').css('display','block');
                   $('.answer').css('display','none');
               }
            },
            error: function () {
                console.log(error);
            }
        });
    });
});
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
                'answer': answer,
                'id': questionId
            },
            success: function (data) {
                console.log('success')
            },
            error: function () {
                console.log("error!");
            }
        });
    });
});
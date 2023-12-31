function Questions(text,choices,answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

//Question prototype

Questions.prototype.checkAnswer=function(answer){
    return this.answer===answer;
}

//Quiz Constructor

function Quiz(questions){
    this.questions=questions;
    this.score=0;
    this.questionIndex=0;
}

//Quiz Prototype
Quiz.prototype.getQuestion=function(){
    return this.questions[this.questionIndex];
}

//Quiz isFinish
Quiz.prototype.isFinish=function(){
    return this.questions.length ===this.questionIndex;
}

//Quiz Guess
Quiz.prototype.guess=function(answer){
    var question=this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;


}


var q1=new Questions("What's the best programming language?",
["C#","JavaScript","pyhton","asp.net"],"JavaScript");

var q2=new Questions("What's the most popular language?",
["C#","JavaScript","VisualBasic","node.js"],"JavaScript");

var q3=new Questions("What's the best modern programming language?",
["C#","JavaScript","pyhton","asp.net"],"JavaScript");

var questions=[q1,q2,q3];


//Start Quiz
var quiz=new Quiz(questions);

loadQuestion();

function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }else{
        var question=quiz.getQuestion();
        var choices=question.choices;


        document.querySelector('#question').textContent=question.text;

        for(var i=0;i<choices.length;i++){
            var element=document.querySelector('#choice'+i);
            element.innerHTML=choices[i];

            guess('btn'+i,choices[i]);
        }
        showProgress();
    }
}

function guess(id,guess){
    var btn=document.getElementById(id);
    btn.onclick=function(){
        quiz.guess(guess);
        loadQuestion();
    }

}

function showScore(){
    var html=`<h2>Score</h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML=html;
}

function showProgress(){
    var totalQuestion=quiz.questions.length;
    var questionNumber=quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML='Question '+questionNumber
    +' of '+totalQuestion;
}



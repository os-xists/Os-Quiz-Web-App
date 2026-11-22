//https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=boolean

let lastData = null;

class Question {
  constructor(questionText, correctAnswer, incorrectAnswers) {
    this.question = questionText;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = incorrectAnswers;
  }
}

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.totalQuestions = questions.length;
  }

  getCurrentQuestion() {
    const index = this.currentQuestionIndex;
document.getElementById("progress").innerHTML = `${index+1} of ${this.totalQuestions}`;
    return this.questions[index];
  }

  checkAnswer(answer, computerAnswer) {
    const currentQuestion = this.getCurrentQuestion();
    let correct=false;
    if (answer === currentQuestion.correctAnswer || computerAnswer) {
      if(!computerAnswer) this.score++;
      correct=true;
    }
    document.getElementById("current-score").textContent=this.score;
    this.currentQuestionIndex++;
    return correct;
  }
  
  nextQuestion() {
    const index = this.currentQuestionIndex + 1;
    return this.questions[index];
  }

isFinished() {
    const done= this.currentQuestionIndex >= this.questions.length;
    if(done) console.log("Quiz finished! Your score: " + this.score);
    return done;
  }
}


let Questions=[];
let timer=null;
let currentTime = 15;

function startTimer(){
    clearInterval(timer)
    timer=setInterval(()=>{
        currentTime--;
        document.getElementById("timer").textContent=currentTime;
        if(currentTime<1) {
            
             document.querySelectorAll(".option-btn").forEach(btn=>{
                btn.classList.remove("correct");
                btn.classList.add("incorrect");
                btn.setAttribute("disabled","disabled")
             })
                  const nextBtn=document.getElementById("next-btn");
                nextBtn.classList.remove("hidden");
            document.getElementById("correct-answer").classList.remove("incorrect");
            document.getElementById("correct-answer").classList.add("correct");
            document.getElementById("correct-answer").dataset.computer=true;
            document.getElementById("correct-answer").removeAttribute("disabled")
            document.getElementById("correct-answer").click();
        
            clearInterval(timer);
        }
    }, 1000)
}
function displayQuestion(quiz){
      const question=quiz.getCurrentQuestion().question;
      const correctAnswer=quiz.getCurrentQuestion().correctAnswer;
      const options=[...quiz.getCurrentQuestion().incorrectAnswers, correctAnswer];

      options.sort(() => Math.random() - 0.5);
      const labels=["a","b","c","d"];

    let quizEl=document.getElementById("the-quiz");
    let optionsHtml="";

    options.forEach((value,i)=>{
        optionsHtml +=  `
          <div>
            <button class="option-btn" data-option="${value}" ${value===correctAnswer?' id="correct-answer" data-answer="true"':''}>${labels[i].toUpperCase()}. ${value}</button>
          </div>`
    });

      quizEl.innerHTML=`
        <h2>${question}</h2>
        <div>${optionsHtml}</div>
        <div id="next-btn-container"><button class="hidden" id="next-btn">NEXT</button></div>
      `;

      startTimer();


      document.querySelectorAll(".option-btn").forEach(button=>{
        button.addEventListener("click", ()=>{
            clearInterval(timer)
            const selectedAnswer=button.dataset.option;
            const computerAnswer=button.dataset.computer;
            
            const isCorrect=quiz.checkAnswer(selectedAnswer, computerAnswer);

             document.querySelectorAll(".option-btn").forEach(btn=>{
                btn.classList.remove("correct");
                btn.setAttribute("disabled","disabled")
             })
            if(isCorrect){
                 button.classList.add("correct");
            }else{
                button.classList.add("incorrect");
                document.getElementById("correct-answer").classList.add("correct")
            }

                const nextBtn=document.getElementById("next-btn");
                nextBtn.classList.remove("hidden");
                
            nextBtn.addEventListener("click", ()=>{            
                if(quiz.isFinished()){
                    displayResult(quiz)
                return switchSection("result");
                }
                    currentTime=16;
                    displayQuestion(quiz);
                })

        })
      })
}

function displayResult(quiz){
    const score=quiz.score;
    const bestScore= Number( localStorage.getItem("best-score"));
     if(score > bestScore) localStorage.setItem("best-score", score);
    document.getElementById("result-score").textContent= score;
    const percentage = Math.round( (quiz.score*100)/quiz.totalQuestions);
    document.getElementById("percentage").textContent= percentage + "%";
}


function safeFetch(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status + " — " + response.statusText);
      }
      return response.json();
    });
}

function switchSection(sectionId) {
 document.querySelectorAll(".section").forEach(function (section) {
    section.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}
// --- Fetch Questions ---

document.getElementById("start-quiz").addEventListener("click", function () {
    const $this=this;
    let category=document.getElementById("category").value;
    let difficulty=document.getElementById("difficulty").value;
    let loader=document.getElementById("loading");
    let error=document.getElementById("error");


    loader.classList.remove("hidden");
    error.classList.add("hidden");
    $this.setAttribute("disabled", "disabled");
    $this.classList.add("disabled")

  safeFetch(`https://opentdb.com/api.php?amount=2&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`)
    .then(function (questions) {
        loader.classList.add("hidden");
        error.classList.add("hidden");
        
      lastData = questions.results;

        Questions = lastData.map(function (q) {
        return new Question(
          decodeURIComponent(q.question),
          decodeURIComponent(q.correct_answer),
          q.incorrect_answers.map(decodeURIComponent)
        );
      });

        const quiz = new Quiz(Questions);
        displayQuestion(quiz)

      switchSection("quiz");
      console.log("Questions loaded:", questions.results.length);
    })
    .catch(function (err) {
        loader.classList.add("hidden");
        error.classList.remove("hidden");
        $this.removeAttribute("disabled");
      error.textContent = "✗ " + err.message;
      console.error("Fetch failed:", err.message);
    });
});

const bestScore= Number( localStorage.getItem("best-score"));
document.getElementById("best-score").textContent = bestScore;
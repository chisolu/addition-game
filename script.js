// CORRECT ANSWER ANIMATION
//   button.addEventListener("click", function () {
//   if (selectAnswer === correctAnswer) {
//     confettiBurst(event.currentTarget);
//   }
// });

// function confettiBurst(button) {
//     const colors = ["red", "yellow", "blue", "lime", "orange", "Purple", "pink"];

//     const rect = button.getBoundingingClientRect();

//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;

//             for (let i = 0; i < 36; i++) {
//                 const particle = document.createElement("div");

//                 particle.className = "confetti-particle";
//                 particle.style.left = centerX + "px";
//                 particle.style.top = centerY + "px";

//                 particle.style.backgroundColor = 
//                 colors[Math.floor(Math.random() * colors.length)]; 

//                 const angle = Math.random() * Math.PI * 2;
//                 const distance = 50 + Math.random() * 130;

//                 particle.style.setProperty(
//                     "--x", Math.cos(angle) * distance + "px"
//                     );

//                 particle.style.setProperty(
//                     "--y", Math.sin(angle) * distance + "px"
//                 );

//                  document.body.appendChild(particle);
                 
//                 setTimeout(() => particle.remove(), 1100);        
//             }
// }

// // END ANIMATION


// END AMIMATION

function launchFireworks() {
    const colors = ["red", "yellow", "blue", "lime", "orange", "magenta"];

    const container = document.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();

    for (let burst = 0; burst < 3; burst ++) {
        setTimeout(() => {
           const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 36; i++) {
                const particle = document.createElement("div");

                particle.className = "firework-particle";

                particle.style.left = centerX + "px";
                particle.style.top = centerY + "px";

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.color = color;
                const angle = (Math.PI * 2 * i) / 36;
                const distance = 30 + Math.random() * 50;

                particle.style.setProperty(
                    "--x", Math.cos(angle) * distance + "px"
                    );

                particle.style.setProperty(
                    "--y", Math.sin(angle) * distance + "px"
                );
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 1100);                
            }
        }, burst * 300);
    }
}

let num1, num2;
let score = 0;
let questionCount = 0;
let maxQuestions = 10;
let timeleft = 60;
let timer;
let gameStarted = false;

// start game
function startGame () {
    score = 0;
    questionCount = 0;
    timeleft = 60;
    gameStarted  = true;
    clearInterval(timer);

    document.getElementById("score").innerText = score;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("timer").innerText = timeleft;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").value = "";

    // start timer
    timer = setInterval( function () {
        timeleft--;
        document.getElementById("timer").innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(timer);
            gameStarted =false
            document.getElementById("question").innerText = "Time's up!";

            document.getElementById("message").innerText = 
            "Final Score:" + score + "/" + maxQuestions;
        } 
    }, 1000);
    nextQuestion();
}
// Generate next question
function nextQuestion () {
    if (questionCount >= maxQuestions) {
        clearInterval(timer);
        gameStarted = false;

         document.getElementById("question").innerText = "Game Over!";

         document.getElementById("message").innerText = 
         "Final Score:" + score + "/" + maxQuestions;
         return;
    }

    let level = Number(document.getElementById("level").value);
    num1 = Math.floor(Math.random() * level + 1);
    num2 = Math.floor(Math.random() * level + 1);
    document.getElementById("question").innerText = 
            "what is " + num1 + " + " + num2 + "?";

    document.getElementById("answer").value = "";
    questionCount++;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("answer").focus();
}

// check answer
function checkAnswer () {
    if (!gameStarted) {
        return;
    }
  let userAnswer = Number(document.getElementById("answer").value);
  let correctAnswer = num1 + num2;
  if (userAnswer === correctAnswer){
    score++;
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = "correct!";
    message.style.color = "green"
    launchFireworks();

  } else{
    document.getElementById("message").innerText =
     "Wrong! Correct Answer: " + correctAnswer;
    message.style.color = "red"
  }
  setTimeout(function () {
    if (gameStarted) {
        nextQuestion();
    }
  }, 1);
} 
// press enter to submit answer
    document.getElementById("answer").addEventListener(
        "keydown",
        function(event) {
            if (event.key ==="Enter") {
                checkAnswer();
            }
        }
    );

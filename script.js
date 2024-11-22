const questions = [
    {
      question: "What is the fastest land animal?",
      options: ["Lion", "Elephant", "Cheetah", "Giraffe"],
      answer: 2, // Correct answer index
      audio: "new-notification-7-210334.mp3"
    },
    {
      question: "Which animal has the longest neck?",
      options: ["Giraffe", "Elephant", "Lion", "Zebra"],
      answer: 0,
      audio: "new-notification-7-210334.mp3"
    },
    {
      question: "What is the largest mammal?",
      options: ["Blue Whale", "Fin Whale", "Humpback Whale", "Sperm Whale"],
      answer: 0,
      audio: "new-notification-7-210334.mp3"
    },
    {
      question: "What is the smallest bird?",
      options: ["Hummingbird", "Sparrow", "Finch", "Robin"],
      answer: 0,
      audio: "new-notification-7-210334.mp3"
    },
    {
      question: "What is the fastest water animal?",
      options: ["Shark", "Dolphin", "Whale", "Octopus"],
      answer: 0,
      audio: "new-notification-7-210334.mp3"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer = 30;
  let timerInterval;
  
  function loadQuestion() {
    // Update the question text and options
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("option1").innerHTML = questions[currentQuestion].options[0];
    document.getElementById("option2").innerHTML = questions[currentQuestion].options[1];
    document.getElementById("option3").innerHTML = questions[currentQuestion].options[2];
    document.getElementById("option4").innerHTML = questions[currentQuestion].options[3];
  
    resetTimer(); // Reset the timer for each question
  }
  
  function checkAnswer(event) {
    const userAnswer = parseInt(event.target.id.replace("option", "")) - 1;
    const correctAnswer = questions[currentQuestion].answer;
    const audio = questions[currentQuestion].audio;
  
    // Check if the selected answer is correct
    if (userAnswer === correctAnswer) {
      score++;
      document.getElementById("result").innerHTML = `Correct! Your score is ${score}/${currentQuestion + 1}`;
      document.getElementById("result").classList.add("correct");
      playSound(audio);
    } else {
      document.getElementById("result").innerHTML = `Wrong! The correct answer is ${questions[currentQuestion].options[correctAnswer]}. Your score is ${score}/${currentQuestion + 1}`;
      document.getElementById("result").classList.add("wrong");
      playSound("wronganswer-37702.mp3");
    }
  
    currentQuestion++;
  
    // Load the next question or end the quiz
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
  function playSound(sound) {
    const audio = new Audio(`sounds/${sound}`);
    audio.play();
  }
  
  function resetTimer() {
    clearInterval(timerInterval); // Stop the previous timer
    timer = 30; // Reset timer to 30 seconds
    document.getElementById("timer").innerHTML = `Time remaining: ${timer} seconds`;
  
    timerInterval = setInterval(() => {
      timer--;
      document.getElementById("timer").innerHTML = `Time remaining: ${timer} seconds`;
      if (timer === 0) {
        clearInterval(timerInterval); // Stop the timer
        alert("You ran out of time!"); // Alert when time runs out
        checkAnswer({ target: { id: '' } }); // Automatically check answer when time is up
      }
    }, 1000);
  }
  
  function endQuiz() {
    document.getElementById("question").innerHTML = "Quiz finished!";
    document.getElementById("options").style.display = "none";
    document.getElementById("result").innerHTML = `You scored ${score}/${questions.length}!`;
    if (score === questions.length) {
      document.getElementById("result").innerHTML += " Congratulations, you aced the quiz!";
    } else {
      document.getElementById("result").innerHTML += " Try again to improve your score!";
    }
    document.getElementById("reset-quiz").style.display = "block";
  }
  
  function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("reset-quiz").style.display = "none";
    document.getElementById("options").style.display = "flex";
    document.getElementById("result").innerHTML = "";
    loadQuestion(); // Load the first question again
  }
  
  // Event listeners for answer selection
  document.querySelectorAll(".option-button").forEach(button => {
    button.addEventListener("click", checkAnswer);
  });
  
  // Initial load of the quiz
  loadQuestion();
  
  // Reset quiz functionality
  document.getElementById("reset-quiz").addEventListener("click", resetQuiz);
  
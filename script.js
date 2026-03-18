let playerHealth = 100;
let enemyHealth = 100;
let score = 0;
let combo = 0;

let mode = "attack";
let correctAnswer;
let timeLeft = 10;

// Generate Question (AI scaling)
function generateQuestion() {
    let difficulty = score < 50 ? 10 : score < 100 ? 20 : 40;

    let a = Math.floor(Math.random() * difficulty) + 1;
    let b = Math.floor(Math.random() * difficulty) + 1;

    let ops = ["+", "-", "*"];
    let op = ops[Math.floor(Math.random() * ops.length)];

    if (op === "+") correctAnswer = a + b;
    if (op === "-") correctAnswer = a - b;
    if (op === "*") correctAnswer = a * b;

    document.getElementById("question").innerText =
        mode === "attack"
        ? `⚔️ Attack: ${a} ${op} ${b}`
        : `🛡️ DEFEND FAST: ${a} ${op} ${b}`;
}

// Submit Answer
function submitAnswer() {
    let userAns = Number(document.getElementById("answer").value);

    if (userAns === correctAnswer) {

        if (mode === "attack") {
            combo++;
            let damage = 10 + combo * 3;
            enemyHealth -= damage;
            score += 10;

            showEffect(`💥 Attack! Damage ${damage}`, "green");
            document.getElementById("hit").play();

        } else {
            showEffect("🛡️ PERFECT BLOCK!", "cyan");
        }

    } else {

        combo = 0;

        if (mode === "attack") {
            playerHealth -= 10;
            showEffect("❌ Missed!", "red");
        } else {
            playerHealth -= 20;
            showEffect("💥 Hit! Defense Failed", "red");
        }

        document.getElementById("wrong").play();
        shakeScreen();
    }

    updateUI();
    nextTurn();
}

// Next Turn
function nextTurn() {
    document.getElementById("answer").value = "";

    mode = (mode === "attack") ? "defend" : "attack";

    timeLeft = mode === "defend" ? 3 : (score > 100 ? 5 : 10);

    generateQuestion();
}

// UI Update
function updateUI() {
    document.getElementById("playerHealth").innerText = playerHealth;
    document.getElementById("enemyHealth").innerText = enemyHealth;
    document.getElementById("score").innerText = score;
    document.getElementById("combo").innerText = combo;
}

// Effects
function showEffect(text, color) {
    let result = document.getElementById("result");
    result.innerText = text;
    result.style.color = color;
}

// Screen Shake
function shakeScreen() {
    let container = document.querySelector(".container");
    container.classList.add("shake");
    setTimeout(() => container.classList.remove("shake"), 300);
}

// Timer
setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
        if (mode === "defend") {
            playerHealth -= 25;
            showEffect("💥 TOO SLOW!", "red");
            shakeScreen();
        }
        nextTurn();
        updateUI();
    }

    if (playerHealth <= 0 || enemyHealth <= 0) {
        alert(playerHealth <= 0 ? "Game Over 😢" : "You Win 🔥");
        location.reload();
    }

}, 1000);

// Start
generateQuestion();
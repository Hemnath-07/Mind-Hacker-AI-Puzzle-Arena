let playerHealth = 100;
let enemyHealth = 100;
let score = 0;
let combo = 0;
let timeLeft = 10;
let correctAnswer;

function generateQuestion() {
    let difficulty = score < 50 ? 10 : 30;

    let a = Math.floor(Math.random() * difficulty) + 1;
    let b = Math.floor(Math.random() * difficulty) + 1;

    let ops = ["+", "-", "*"];
    let op = ops[Math.floor(Math.random() * ops.length)];

    if (op === "+") correctAnswer = a + b;
    if (op === "-") correctAnswer = a - b;
    if (op === "*") correctAnswer = a * b;

    document.getElementById("question").innerText = `${a} ${op} ${b}`;
}

function submitAnswer() {
    let userAns = Number(document.getElementById("answer").value);

    if (userAns === correctAnswer) {
        combo++;
        let damage = 10 + combo * 3;
        enemyHealth -= damage;
        score += 10;

        document.getElementById("result").innerText = `🔥 Combo x${combo} | Damage ${damage}`;
        document.getElementById("hit").play();

    } else {
        combo = 0;
        playerHealth -= 15;

        document.getElementById("result").innerText = "❌ Wrong!";
        document.getElementById("wrong").play();
    }

    updateUI();
    resetRound();
}

function updateUI() {
    document.getElementById("playerHealth").innerText = playerHealth;
    document.getElementById("enemyHealth").innerText = enemyHealth;
    document.getElementById("score").innerText = score;
    document.getElementById("combo").innerText = combo;
}

function resetRound() {
    document.getElementById("answer").value = "";
    timeLeft = score > 100 ? 5 : 10; // Boss mode
    generateQuestion();
}

setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
        playerHealth -= 10;
        combo = 0;
        resetRound();
        updateUI();
    }

    if (playerHealth <= 0 || enemyHealth <= 0) {
        alert(playerHealth <= 0 ? "Game Over 😢" : "You Win 🔥");
        location.reload();
    }

}, 1000);

generateQuestion();
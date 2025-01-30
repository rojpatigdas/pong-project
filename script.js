// DOM elements
const $paddleLeft = $('#paddle-left');
const $paddleRight = $('#paddle-right');
const $ball = $('#ball');
const $gameContainer = $('#game-container');

// Game state
let ballX = 395, ballY = 195;
let ballSpeedX = 4, ballSpeedY = 4;
let paddleLeftY = 160, paddleRightY = 160;
const paddleSpeed = 5;
const gameHeight = 400, gameWidth = 800, paddleHeight = 80;

// Key state tracking
const keysPressed = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};

// Game loop
function update() {
    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    handleCollisions();
    updatePaddles();
    
    // Update DOM positions
    $ball.css({ left: ballX, top: ballY });
    $paddleLeft.css('top', paddleLeftY);
    $paddleRight.css('top', paddleRightY);

    requestAnimationFrame(update);
}

function handleCollisions() {
    // Wall collisions
    if (ballY <= 0 || ballY >= gameHeight - 10) ballSpeedY *= -1;
    
    // Paddle collisions
    if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + paddleHeight) ballSpeedX *= -1;
    if (ballX >= gameWidth - 30 && ballY >= paddleRightY && ballY <= paddleRightY + paddleHeight) ballSpeedX *= -1;
    
    // Reset ball
    if (ballX <= 0 || ballX >= gameWidth - 10) resetBall();
}

function updatePaddles() {
    // Left paddle
    if (keysPressed.w && !keysPressed.s) {
        paddleLeftY = Math.max(0, paddleLeftY - paddleSpeed);
    }
    if (keysPressed.s && !keysPressed.w) {
        paddleLeftY = Math.min(gameHeight - paddleHeight, paddleLeftY + paddleSpeed);
    }

    // Right paddle
    if (keysPressed.ArrowUp && !keysPressed.ArrowDown) {
        paddleRightY = Math.max(0, paddleRightY - paddleSpeed);
    }
    if (keysPressed.ArrowDown && !keysPressed.ArrowUp) {
        paddleRightY = Math.min(gameHeight - paddleHeight, paddleRightY + paddleSpeed);
    }
}

function resetBall() {
    ballX = gameWidth / 2 - 5;
    ballY = gameHeight / 2 - 5;
    ballSpeedX *= -1;
}

// Event handling
$(document).on({
    keydown: e => {
        if (keysPressed.hasOwnProperty(e.key)) keysPressed[e.key] = true
    },
    keyup: e => {
        if (keysPressed.hasOwnProperty(e.key)) keysPressed[e.key] = false
    }
});

// Initialize game
$(document).ready(() => {
    update();
});
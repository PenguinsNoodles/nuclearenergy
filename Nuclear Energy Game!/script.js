let NuclearPowerPlants = 1;
//scenario
let scenarios = [
  {
    text: "energy demand is rising nationwide",
    image: "reactor.gif",
    options: [
      {
        label: "build nuclear reactor",
        env: 10, soc: -10, eco: -5,
        explain: "nuclear power produces low carbon emissions but faces public opposition and high costs."
      },
      {
        label: "invest in public education",
        env: 0, soc: 10, eco: -5,
        explain: "education improves trust and understanding of nuclear safety."
      },
      {
        label: "expand renewables",
        env: 10, soc: 5, eco: -10,
        explain: "renewables reduce emissions but require large upfront investments."
      }
    ]
  },

  {
    text: "citizens protest nuclear waste storage",
    image: "waste.gif",
    options: [
      {
        label: "build deep geological storage",
        env: 5, soc: -5, eco: -10,
        explain: "deep storage reduces environmental risk but is expensive and controversial."
      },
      {
        label: "relocate waste temporarily",
        env: -5, soc: 0, eco: +20,
        explain: "temporary storage lowers costs but increases long term environmental risk."
      },
      {
        label: "cancel nuclear expansion",
        env: 0, soc: 10, eco: +15,
        explain: "ending nuclear expansion improves public approval but harms long term energy stability."
      }
    ]
  },

  {
    text: "You need Federal Funds to build a Reactor",
    image: "global.gif",
    options: [
      {
        label: "Build a reactor without the funds",
        env: 10, soc: -5, eco: -30,
        explain: "Without the funds, we pay money out of the generation and budget of your reactor."
      },
      {
        label: "Ask for federal funds",
        env: 0, soc: -10, eco: 20,
        explain: "Federal Funds take a long time to be received, or given, losing social trust along the way."
      },
      {
        label: "Cancel Reactor Plan",
        env: 0, soc: 0, eco: -10,
        explain: "You lose money from employment contracts and planning cost."
      }
    ]
  },
  {
    text: "Investing in Nuclear Energy is a expensive and safe option, choose a temperary option to make money",
    image: "global.gif",
    options: [
      {
        label: "Solar Energy",
        env: 5, soc: 5, eco: 2,
        explain: "Solar Energy is Cheap, and economically friendly in some ways, although the energy is not very reliable."
      },
      {
        label: "Coal, Natural Gase",
        env: -50, soc: 0, eco: 50,
        explain: "Easiest known way to make money, socially, using natural gas or coal and split evenly, and causes significant air pollution, water pollution, and carbon emissions that significantly harm the current enviornment."
      },
      {
        label: "Hydroelectric Energy",
        env: -5, soc: 5, eco: -10,
        explain: "Hydroelectric Energy is very expensive, not great if you don't create a giant dam. Giant dams change waterways, so it is a little bad for the enviornment. Socially accepted by civilians."
      }
    ]
  },
]

let currentScenario = 0
let gameOver = false;

let game = {
  environment: 50,
  social: 50,
  economy: 50
}

function updateBars() {
  document.getElementById("envBar").style.width = game.environment + "%"
  document.getElementById("socBar").style.width = game.social + "%"
  document.getElementById("ecoBar").style.width = game.economy + "%"
  
  // Update stat values
  let envValue = document.getElementById("envValue");
  let socValue = document.getElementById("socValue");
  let ecoValue = document.getElementById("ecoValue");
  
  if (envValue) envValue.innerText = game.environment + "%";
  if (socValue) socValue.innerText = game.social + "%";
  if (ecoValue) ecoValue.innerText = game.economy + "%";
}

function choice(env, soc, eco) {
  if (gameOver) return;
  
  game.environment += env
  game.social += soc
  game.economy += eco

  game.environment = Math.max(0, Math.min(100, game.environment))
  game.social = Math.max(0, Math.min(100, game.social))
  game.economy = Math.max(0, Math.min(100, game.economy))

  updateBars()
  checkGameOver()
}

function checkGameOver() {
    let gameOverReason = null;
    
    if (game.environment <= 0) {
      gameOverReason = "Environmental Collapse - The ecosystem has been destroyed. Public confidence in your program has been permanently lost.";
    } else if (game.social <= 0) {
      gameOverReason = "Social Collapse - Public riots and opposition have forced the shutdown of all nuclear operations.";
    } else if (game.economy <= 0) {
      gameOverReason = "Financial Collapse - All funding has been exhausted. You cannot continue operations.";
    }
    
    if (gameOverReason) {
      gameOver = true;
      showGameOver(gameOverReason);
    }
}

function showGameOver(reason) {
  disableAllButtons();
  document.getElementById("gameOverBox").style.display = "block";
  document.getElementById("gameOverReason").innerText = reason;
}

function disableAllButtons() {
  let buttons = document.querySelectorAll(".action-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  });
}

function enableAllButtons() {
  let buttons = document.querySelectorAll(".action-btn");
  buttons.forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  });
}

function restartGame() {
  gameOver = false;
  currentScenario = 0;
  game.environment = 50;
  game.social = 50;
  game.economy = 50;
  selectedButton = 0;
  document.getElementById("gameOverBox").style.display = "none";
  updateBars();
  loadScenario();
  updateButtonHighlight();
  enableAllButtons();
}
function loadScenario() {
  let s = scenarios[currentScenario]

  document.getElementById("scenario").innerText = s.text

  let img = document.getElementById("scenarioImg")
  if (s.image) {
    img.src = s.image
    img.style.display = "block"
  } else {
    img.style.display = "none"
  }

  selectedButton = 0;  // Reset to first button
  s.options.forEach((opt, i) => {
    let btn = document.getElementById("btn" + i)
    btn.innerText = opt.label
    btn.onclick = () => {
      choice(opt.env, opt.soc, opt.eco)
      showExplain(opt.explain)
    }
    // Add hover listeners for mouse
    btn.addEventListener('mouseenter', () => {
      selectedButton = i;
      updateButtonHighlight();
    });
  })
  updateButtonHighlight();  // Highlight first button
}
function nextScenario() {
  currentScenario++

  if (currentScenario >= scenarios.length) {
    currentScenario = Math.floor(Math.random() * scenarios.length)
  }

  loadScenario()
}
//explain function

function showExplain(text) {
  document.getElementById("explainText").innerText = text
  document.getElementById("explainBox").style.display = "block"
  explainBoxOpen = true;
}

function closeExplain() {
  explainBoxOpen = false;
  document.getElementById("explainBox").style.display = "none"
  nextScenario()
}

//stuff that happens

//joystick stuff
let port;
let reader;
let isConnected = false;

let joyX = 512;
let joyY = 512;
let joySW = 1;

let selectedButton = 0;
let lastJoyX = 512;
let lastJoyY = 512;
let lastJoySW = 1;
let explainBoxOpen = false;

async function connectJoystick() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    isConnected = true;
    console.log('Serial port opened successfully');
    let debugEl = document.getElementById("debugStatus");
    if (debugEl) debugEl.innerText = "Connected - Reading data...";

    const decoder = new TextDecoderStream();
    const readable = port.readable.pipeThrough(decoder);
    reader = readable.getReader();

    readLoop();
  } catch (err) {
    isConnected = false;
    console.error('Connection error:', err);
    let debugEl = document.getElementById("debugStatus");
    if (debugEl) debugEl.innerText = "Connection failed: " + err.message;
  }
}

async function readLoop() {
  try {
    let buffer = '';
    while (isConnected) {
      try {
        const { value, done } = await reader.read();
        if (done) {
          console.log('Reader stream ended');
          break;
        }
        if (!value) continue;

        buffer += value;
        let lines = buffer.split("\n");
        
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (let line of lines) {
          line = line.trim();
          if (line) {
            let parts = line.split(",");
            if (parts.length === 3) {
              let x = Number(parts[0]);
              let y = Number(parts[1]);
              let sw = Number(parts[2]);
              
              if (!isNaN(x) && !isNaN(y) && !isNaN(sw)) {
                joyX = x;
                joyY = y;
                joySW = sw;
              }
            }
          }
        }
      } catch (readErr) {
        // If this specific read fails, log it but try to continue
        console.error('Individual read error:', readErr);
        if (readErr.name === 'TypeError') {
          // Reader was cancelled/closed, break out
          break;
        }
        // Wait a bit before trying again
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  } catch (err) {
    console.error('Read loop error:', err);
    isConnected = false;
    let debugEl = document.getElementById("debugStatus");
    if (debugEl) debugEl.innerText = "Connection lost: " + err.message;
  } finally {
    if (isConnected) {
      console.log('Restarting read loop...');
      readLoop();
    }
  }
}



//joystick stuff 3?
function updateJoystickInput() {

  // deadzone so it dont drift
  let dead = 80;

  let moveLeft = joyX < (512 - dead);
  let moveRight = joyX > (512 + dead);
  let moveUp = joyY < (512 - dead);
  let moveDown = joyY > (512 + dead);

  let click = joySW === 0;

  // If explanation box is open, can close it with button
  if (explainBoxOpen && click && lastJoySW !== 0) {
    closeExplain();
    return;
  }

  // If game is over, can restart with button
  if (gameOver && click && lastJoySW !== 0) {
    restartGame();
    return;
  }

  // If game is over, ignore all other input
  if (gameOver) {
    return;
  }

  // Navigate buttons with left/right (only trigger on change)
  if (moveLeft && lastJoyX >= (512 - dead)) {
    selectedButton = (selectedButton - 1 + 3) % 3;
    updateButtonHighlight();
  }
  if (moveRight && lastJoyX <= (512 + dead)) {
    selectedButton = (selectedButton + 1) % 3;
    updateButtonHighlight();
  }

  // Navigate buttons with up/down (only trigger on change)
  if (moveUp && lastJoyY >= (512 - dead)) {
    selectedButton = Math.max(0, selectedButton - 1);
    updateButtonHighlight();
  }
  if (moveDown && lastJoyY <= (512 + dead)) {
    selectedButton = Math.min(2, selectedButton + 1);
    updateButtonHighlight();
  }

  // Click selected button when button is pressed (only trigger on change)
  if (click && lastJoySW !== 0) {
    let btn = document.getElementById("btn" + selectedButton);
    if (btn && btn.onclick) {
      btn.onclick();
    }
  }

  lastJoyX = joyX;
  lastJoyY = joyY;
  lastJoySW = joySW;
}

// Poll joystick input every 100ms
setInterval(updateJoystickInput, 100);

function updateButtonHighlight() {
  for (let i = 0; i < 3; i++) {
    let btn = document.getElementById("btn" + i);
    if (i === selectedButton) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  }
}
// Connect joystick function - triggers the Web Serial API popup
function connectSerial() {
    console.log('Attempting to connect to serial device...');
    connectJoystick().catch(err => console.error('Connection failed:', err));
}





updateBars()
loadScenario()
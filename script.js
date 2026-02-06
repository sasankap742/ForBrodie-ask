// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let noHoverCount = 0;
const MAX_HOVERS = 3;

// Sound helper functions
function playClickSound() {
    const clickSound = new Audio('clickButton.mp3');
    clickSound.volume = 0.5;
    clickSound.play().catch(e => console.log("Click sound failed:", e));
}

function playThudSound() {
    const thudSound = new Audio('thudShocked.mp3');
    thudSound.volume = 0.4;
    thudSound.play().catch(e => console.log("Thud sound failed:", e));
}

// Click Envelope
envelope.addEventListener("click", () => {
    playClickSound(); // Play click sound when envelope opens
    
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// NO button hover
noBtn.addEventListener("mouseover", () => {
    playThudSound(); // Play thud sound when hovering No button
    
    noHoverCount++;
    
    if (noHoverCount < MAX_HOVERS) {
        moveNoButton();
        createAngryCats(3);
    } 
    else if (noHoverCount === MAX_HOVERS) {
        // Return button to original position
        noBtn.style.transition = "transform 0.5s ease";
        noBtn.style.transform = "translate(0, 0)";
        
        // After button returns, show Meryl
        setTimeout(() => {
            showMeryl();
        }, 500);
        
        // Prevent further moves after third hover
        noBtn.style.pointerEvents = "none";
    }
});

// YES button click
yesBtn.addEventListener("click", () => {
    playClickSound(); // Play click sound when Yes is clicked
    
    title.textContent = "Yippeeee!";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";  // This hides buttons
    finalText.style.display = "block";  // This shows final text

    const merylContainer = document.getElementById('meryl-container');
    
    if (merylContainer) {
        // Remove Meryl and show dancing cat
        merylContainer.outerHTML = '<img src="freakyCat.gif" class="cat" id="letter-cat" style="width: 250px; margin: 10px 0;">';
    } else {
        // Just update existing cat
        const existingCat = document.getElementById('letter-cat');
        if (existingCat) {
            existingCat.src = "freakyCat.gif";
        }
    }
    
    

    
    // Use arrow function to maintain context
    setTimeout(() => {
        console.log("5 seconds passed, starting dramatic ending...");
        startDramaticEnding();
    }, 5000);
});

// NEW FUNCTION: Dramatic ending sequence
function startDramaticEnding() {
    console.log("Starting dramatic ending...");
    
    // 1. Make freaky cat disappear
    const currentCat = document.getElementById('letter-cat');
    if (currentCat) {
        console.log("Found cat, fading out...");
        currentCat.style.transition = 'opacity 1s ease';
        currentCat.style.opacity = '0';
        setTimeout(() => {
            currentCat.style.display = 'none';
        }, 1000);
    } else {
        console.log("No cat found!");
    }
    
    // 2. Change the final text after cat fades
    setTimeout(() => {
        console.log("Changing final text...");
        if (finalText) {
            title.style.display = "none";
            finalText.innerHTML = `
                <strong>Alright Pookie, this page is going to self destruct now <3</strong>
                <div id="countdown" style="
                    font-size: 48px;
                    font-weight: bold;
                    color: #ff0000;
                    margin-top: 20px;
                    text-shadow: 2px 2px 0 #000;
                ">5</div>
            `;
            
            // 3. Start countdown
            startCountdown();
        }
    }, 1500);
}

// NEW FUNCTION: Countdown and self destruct
function startCountdown() {
    let count = 5;
    const countdownElement = document.getElementById('countdown');
    
    const countdownInterval = setInterval(() => {
        count--;
        
        if (count > 0) {
            countdownElement.textContent = count;
            // Optional: Add shake effect
            countdownElement.style.animation = 'shake 0.5s';
            setTimeout(() => {
                countdownElement.style.animation = '';
            }, 500);
        } else {
            countdownElement.textContent = 'BOOM!';
            clearInterval(countdownInterval);
            
            // Self destruct after "BOOM!"
            setTimeout(selfDestruct, 1000);
        }
    }, 1000);
}

//Self destruct - black screen
function selfDestruct() {
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 32px;
        flex-direction: column;
        animation: fadeIn 1s forwards;
    `;
    
    //final message
    blackScreen.innerHTML = `
        <div style="text-align: center;">
            <div>See you on Valentine's Day! 💖</div>
            <div style="font-size: 18px; margin-top: 30px; opacity: 0.7;">
            </div>
        </div>
    `;
    
    
    document.body.appendChild(blackScreen);
    
    setTimeout(() => {
        const letterContainer = document.getElementById('letter-container');
        if (letterContainer) {
            letterContainer.style.display = 'none';
        }
    }, 500);
}


//move no button
function moveNoButton() {
    const min = 200;
    const max = 200;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

//angry cat pop-ups
function createAngryCats(numCats) {
    for (let i = 0; i < numCats; i++) {
        setTimeout(() => {
            const cat = document.createElement('img');
            cat.src = 'cat_mad.png';
            cat.className = 'angry-cat';
            cat.style.width = '225px';
            cat.style.height = '225px';
            cat.style.position = 'fixed';
            cat.style.zIndex = '1000';
            
            
            const x = Math.random() * (window.innerWidth - 100);
            const y = Math.random() * (window.innerHeight - 100);
            
            cat.style.left = `${x}px`;
            cat.style.top = `${y}px`;
            
          
            document.body.appendChild(cat);
            
            //remove after
            setTimeout(() => {
                if (cat.parentNode) {
                    cat.parentNode.removeChild(cat);
                }
            }, 1800);
        }, i * 100);
    }
}

//Meryl Streep with gun
function showMeryl() {
    //Store original cat for later restoration
    const originalCat = catImg;
    
    const merylHTML = `
        <div id="meryl-container" style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 250px;
            margin: 10px 0;
        ">
            <img src="merylGun.png" id="meryl-gun" alt="Meryl Streep with gun" style="
                width: 480px;
                max-width: 80%;
                height: auto;
                display: block;
                margin: 0 auto;
            ">
            <p style="
                color: #ff0000;
                font-size: 22px;
                font-weight: bold;
                margin-top: 15px;
                text-align: center;
                width: 100%;
                text-shadow: 2px 2px 0 #000;
            ">
                Don't even think about saying no...That's all.
            </p>
        </div>
    `;
    noBtn.style.display = 'none';
    
    catImg.outerHTML = merylHTML;
    
    //this is ass
    //createShockedCrowd(4); 
    
    playCrowdGasp();
    const merylContainer = document.getElementById('meryl-container');
    
    
}

//shocked crowd pop-ups ////meehhh
function createShockedCrowd(numCrowd) {
    for (let i = 0; i < numCrowd; i++) {
        setTimeout(() => {
            const crowd = document.createElement('img');
            crowd.src = 'crowdShocked.PNG';
            crowd.className = 'shocked-crowd';
            crowd.style.width = '350px';
            crowd.style.height = 'auto';
            crowd.style.position = 'fixed';
            crowd.style.zIndex = '999';
            
            // Position OUTSIDE the letter window (random positions around edges)
            const positions = [
                { left: '-100px', top: Math.random() * window.innerHeight + 'px' },
                { left: window.innerWidth + 'px', top: Math.random() * window.innerHeight + 'px' },
                { left: Math.random() * window.innerWidth + 'px', top: '-100px' },
                { left: Math.random() * window.innerWidth + 'px', top: window.innerHeight + 'px' }
            ];
            
            const randomPos = positions[Math.floor(Math.random() * positions.length)];
            crowd.style.left = randomPos.left;
            crowd.style.top = randomPos.top;
            
            document.body.appendChild(crowd);
            
            setTimeout(() => {
                crowd.style.transition = 'all 0.5s ease';
                
                if (randomPos.left === '-100px') {
                    crowd.style.left = '20px';
                } else if (randomPos.left.includes('window.innerWidth')) {
                    crowd.style.left = (window.innerWidth - 170) + 'px';
                } else if (randomPos.top === '-100px') {
                    crowd.style.top = '20px';
                } else {
                    crowd.style.top = (window.innerHeight - 170) + 'px';
                }
            }, 100);
            
            //Remove after
            setTimeout(() => {
                if (crowd.parentNode) {
                    crowd.parentNode.removeChild(crowd);
                }
            }, 3000);
        }, i * 200);
    }
}

// Function: Play crowd gasp audio/// nvm stand off fuck it 
function playCrowdGasp() {
    const gaspAudio = new Audio('standOff.mp3');
    gaspAudio.volume = 0.7;
    gaspAudio.play().catch(error => {
        console.log("Audio play failed:", error);
    });
}
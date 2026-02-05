// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

// Track no button hover count
let noHoverCount = 0;
const MAX_HOVERS = 3;


envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    noHoverCount++;
    
    // First and second hover: normal behavior
    if (noHoverCount < MAX_HOVERS) {
        moveNoButton();
        createAngryCats(3);
    } 
    // Third hover: special Meryl treatment
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

// Function to move no button (extracted for reuse)
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

// Function to create angry cat pop-ups
function createAngryCats(numCats) {
    for (let i = 0; i < numCats; i++) {
        setTimeout(() => {
            const cat = document.createElement('img');
            cat.src = 'cat_mad.png';
            cat.className = 'angry-cat';
            cat.style.width = '180px';
            cat.style.height = '180px';
            cat.style.position = 'fixed';
            cat.style.zIndex = '1000';
            
            // Random position
            const x = Math.random() * (window.innerWidth - 100);
            const y = Math.random() * (window.innerHeight - 100);
            
            cat.style.left = `${x}px`;
            cat.style.top = `${y}px`;
            
            // Add to document
            document.body.appendChild(cat);
            
            // Remove after animation
            setTimeout(() => {
                if (cat.parentNode) {
                    cat.parentNode.removeChild(cat);
                }
            }, 1800);
        }, i * 100);
    }
}


// Function to show Meryl Streep with gun (Alternative approach)
function showMeryl() {
    // Store original cat for later restoration
    const originalCat = catImg;
    
    // Create a container that will replace the cat's position
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
                Don't even think about saying no...That’s all.
            </p>
        </div>
    `;
    
    // Replace the cat with Meryl
    catImg.outerHTML = merylHTML;
    
    // Get the new container
    const merylContainer = document.getElementById('meryl-container');
    
    // Make clickable to restore
    merylContainer.addEventListener('click', () => {
        // Restore original cat
        merylContainer.outerHTML = '<img src="cat_heart.gif" class="cat" id="letter-cat" style="width: 250px; margin: 10px 0;">';
        
        // Re-enable no button and reset counter
        noBtn.style.pointerEvents = 'auto';
        noHoverCount = 0;
        
        // Re-get the cat element reference
        catImg = document.getElementById('letter-cat');
    });
}

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });



// YES is clicked
// Helper function to restore/update the cat
function updateCatToDancing() {
    const merylContainer = document.getElementById('meryl-container');
    const catContainer = document.querySelector('.letter-window');
    
    if (merylContainer) {
        // Remove Meryl and show dancing cat
        merylContainer.outerHTML = '<img src="cat_dance.gif" class="cat" id="letter-cat" style="width: 250px; margin: 10px 0;">';
    } else {
        // Just update existing cat
        const existingCat = document.getElementById('letter-cat');
        if (existingCat) {
            existingCat.src = "cat_dance.gif";
        }
    }
    
    // Always re-get the cat reference
    catImg = document.getElementById('letter-cat');
}

// YES is clicked (updated version)
yesBtn.addEventListener("click", () => {
    
    title.textContent = "Yippeeee!";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";  // This hides buttons
    finalText.style.display = "block";  // This shows final text

    const merylContainer = document.getElementById('meryl-container');
    const catContainer = document.querySelector('.letter-window');
    
    if (merylContainer) {
        // Remove Meryl and show dancing cat
        merylContainer.outerHTML = '<img src="cat_dance.gif" class="cat" id="letter-cat" style="width: 250px; margin: 10px 0;">';
    } else {
        // Just update existing cat
        const existingCat = document.getElementById('letter-cat');
        if (existingCat) {
            existingCat.src = "cat_dance.gif";
        }
    }
    
    // Always re-get the cat reference
    catImg = document.getElementById('letter-cat');

});
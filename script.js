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

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Create angry cats
    createAngryCats(3);

});

// Function to create angry cat pop-ups
function createAngryCats(numCats) {
    for (let i = 0; i < numCats; i++) {
        setTimeout(() => {
            const cat = document.createElement('img');
            cat.src = 'cat_mad.png';
            cat.className = 'angry-cat';
            cat.style.width = '120px';
            cat.style.height = '120px';
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
        }, i * 100); // Stagger the appearance
    }
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

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});

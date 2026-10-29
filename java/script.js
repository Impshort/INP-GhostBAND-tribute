document.addEventListener("DOMContentLoaded", () => {

    

    // 2. DYNAMIC GREETING & BAND SUGGESTION
    const header = document.querySelector("header");
    if (header) {
        // Calculate current time greeting
        const currentHour = new Date().getHours();
        let timeGreeting = "Welcome!";

        if (currentHour < 12) {
            timeGreeting = "Good morning!";
        } else if (currentHour < 18) {
            timeGreeting = "Good afternoon!";
        } else {
            timeGreeting = "Good evening!";
        }

        // Prompts
        let visitorName = prompt("Welcome to the Ghost Fanpage! What is your name?", "Little Ghoul");
        if (!visitorName || visitorName.trim() === "") {
            visitorName = "Fellow Ghoul";
        }

        let bandSuggestion = prompt(`Hi ${visitorName}! Do you have any other band suggestions you think a Ghost fan would like?`);

        // Display output on header
        const greetingContainer = document.createElement("div");
        greetingContainer.style.marginTop = "1rem";
        greetingContainer.style.color = "#d4af37"; 

        if (bandSuggestion && bandSuggestion.trim() !== "") {
            greetingContainer.innerHTML = `<p><strong>${timeGreeting} Welcome, ${visitorName}!</strong></p>
                                           <p><em>Thanks for suggesting: <strong>${bandSuggestion}</strong>! We'll check them out! 🤘</em></p>`;
        } else {
            greetingContainer.innerHTML = `<p><strong>${timeGreeting} Welcome to the ritual, ${visitorName}!</strong></p>`;
        }

        header.appendChild(greetingContainer);
    }

    const topBtn = document.createElement("button");
    topBtn.textContent = "↑ Top";
    topBtn.id = "backToTopBtn";
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
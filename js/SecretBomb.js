import { questions } from "./questions.js";



document.addEventListener("DOMContentLoaded", () => {
    // === Récupération des éléments du DOM ===
    const startBtn = document.getElementById("start-btn");
    const mainContent = document.getElementById("main-content");

    // Auth
    // const authContainer = document.getElementById("auth-container");
    // const authUsername = document.getElementById("auth-username");
    // const authPassword = document.getElementById("auth-password");
    // const authMessage = document.getElementById("auth-message");
    // const signupBtn = document.getElementById("signup-btn");
    // const loginBtn = document.getElementById("login-btn");

    let currentQuestionCounter = 0;
    let rate = 0;

    // // === Vérifier si l'utilisateur est déjà connecté ===
    // if (getCurrentUser()) {
    //     showQuiz();
    // }

    // function showQuiz() {
    //     authContainer.style.display = "none";
    //     mainContent.style.display = "block";
    // }

    // // SIGNUP
    // signupBtn.addEventListener("click", () => {
    //     const u = authUsername.value;
    //     const p = authPassword.value;

    //     if (u === "" || p === "") {
    //         authMessage.textContent = "Veuillez remplir tous les champs";
    //         return;
    //     }
    //     const res = signup(u, p); // appeler la fonction signup
    //     authMessage.textContent = res.message;
    //     if (res.success) {
    //         showQuiz(); // afficher le quiz si l'inscription est réussie
    //     }
    // });

    // // LOGIN
    // loginBtn.addEventListener("click", () => {
    //     const u = authUsername.value;
    //     const p = authPassword.value;

    //     if (u === "" || p === "") {
    //         authMessage.textContent = "Veuillez remplir tous les champs";
    //         return;
    //     }
    //     const res = login(u, p); // appeler la fonction login
    //     authMessage.textContent = res.message;
    //     if (res.success) {
    //         showQuiz(); // afficher le quiz si la connexion est réussie
    //     }
    // });


    // === Suite du quiz ===
    startBtn.addEventListener("click", () => {
        const firstQuestion = 0;
        currentQuestionCounter = firstQuestion;
        showQuestion(firstQuestion);
    });




    function normalize(str) {
        return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function test(txt) {
        const reponse = normalize(txt);
        const correctAnswers = questions[currentQuestionCounter].correct.map(ans => normalize(ans));

        console.log("Réponse : " + reponse);
        console.log("Corrections possibles : ", correctAnswers);

        if (correctAnswers.includes(reponse)) {
            console.log("✅ bravo");
            rate++
        } else {
            console.log("❌ perdu");
        }

        currentQuestionCounter++;
        if(currentQuestionCounter == questions.length){
            console.log("End Game")
            lunchEndGame();
        }else{
            console.log("Next Question")
            showQuestion(currentQuestionCounter);
        }
    }

    function lunchEndGame() {
        saveResult(rate);

        mainContent.innerHTML = "";
        mainContent.className = "";

        const h2 = document.createElement("h2");
        h2.className = "final-title";
        h2.textContent = "Bravo, tu as fini le questionnaire !";

        const p_rate = document.createElement("p");
        p_rate.className = "rate-text";
        p_rate.textContent = "Tu as " + rate + " / " + questions.length;

        const p_rate_comment = document.createElement("p");
        p_rate_comment.className = "rate-comment";

        switch (true) {
            case (rate >= 0 && rate <= 5):
                p_rate_comment.textContent = "😅 Bon… on va dire que tu peux faire mieux hein !";
                break;

            case (rate >= 6 && rate <= 10):
                p_rate_comment.textContent = "🙂 Pas mal, tu connais un peu mais y’a encore du boulot !";
                break;

            case (rate >= 11 && rate <= 15):
                p_rate_comment.textContent = "🥰 Tu connais vraiment bien, je suis trop fière de toi !";
                break;

            case (rate >= 16 && rate <= 18):
                p_rate_comment.textContent = "😍 Excellent ! Tu me connais presque par cœur !";
                break;

            case (rate >= 19 && rate <= 20):
                p_rate_comment.textContent = "💖 Parfait ! Tu es officiellement la personne qui me connaît le mieux au monde !";
                break;

            default:
                p_rate_comment.textContent = "Erreur dans le score… ?";
        }

        mainContent.appendChild(h2);
        mainContent.appendChild(p_rate);
        mainContent.appendChild(p_rate_comment);
    }


    function showQuestion(index) {
        const currentQuestion = questions[index];

        mainContent.innerHTML = "";
        mainContent.className = `main-content ${currentQuestion.style}`;

        const h2 = document.createElement("h2");
        h2.textContent = currentQuestion.question;
        h2.className="question-title";
        
        const questionCounter = document.createElement("p");
        questionCounter.textContent = currentQuestionCounter;
        questionCounter.className="question-counter";

        mainContent.appendChild(questionCounter);
        mainContent.appendChild(h2);


        switch (currentQuestion.type) {
            case "multiple-choice":
                const div = document.createElement("div");
                div.className = "choice-button-container"

                let selectedOption = null; 


                currentQuestion.options.forEach(opt => {
                    const btn = document.createElement("button");
                    btn.textContent = opt;
                    btn.className = "reponse-option-btn";

                    btn.addEventListener("click", () => {
                        document.querySelectorAll(".reponse-option-btn").forEach(b => {
                            b.classList.remove("selected");
                        });
                        btn.classList.add("selected");
                        selectedOption = opt;
                        submitBtn3.disabled = false; 
                    });



                    div.appendChild(btn);
                });

                const submitBtn3 = document.createElement("button");
                submitBtn3.textContent = "Suivant";
                submitBtn3.className = "submit-button";
                submitBtn3.disabled = true; 

                submitBtn3.addEventListener("click", () => {
                    if (selectedOption) {
                        console.log("Réponse choisie :", selectedOption);
                        test(selectedOption);
                    }
                });

                mainContent.appendChild(div);
                mainContent.appendChild(submitBtn3);



                break;
            case "date":
                const dateInput = document.createElement("input")
                dateInput.type = "date";
                mainContent.appendChild(dateInput);

                const submitBtn2 = document.createElement("button");
                
                submitBtn2.textContent = "Valider";
                submitBtn2.addEventListener("click", () => test(dateInput.value));
                mainContent.appendChild(submitBtn2);

                break;
            case "text":
                const textarea = document.createElement("textarea");
                textarea.className = "text-answer";


                textarea.addEventListener("click", () => {
                    submitBtn.disabled = false; 
                });

                mainContent.appendChild(textarea);

                const submitBtn = document.createElement("button");
                submitBtn.textContent = "Valider";
                submitBtn.className = "submit-button";
                submitBtn.disabled = true; 

                submitBtn.addEventListener("click", () => test(textarea.value));
                mainContent.appendChild(submitBtn);

                break;


            default:
                break;
        }
    }
});


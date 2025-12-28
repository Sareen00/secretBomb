// import { questions } from "./questions.js";

const questions = [
    { 
        id: 1,
        question: "Quelle est la couleur préférée de Julien ?", 
        type: "multiple-choice", 
        options: ["Rose", "Bleu", "Blanc", "Noir", "Rouge","Vert"], 
        style: "question-1-choice",
        correct: ["Noir"]
    },
    { 
        id: 2,
        question: "On est sortit quand ensemble ?", 
        type: "date", 
        style: "question-2-date",
        correct: ["2019-08-30"]
    },
    {
        id: 3,
        question: "C'est quoi le film préféré de Julien ?", 
        type: "text", 
        style: "question-3-text",
        correct: ["Le Seigneur des anneaux", "Oppenheimer", "L'arc de Reze"]
    },
    {
        id: 4,
        question: "Quel manga à lu ou est entrain de lire Julien qu'il a adoré récemment ?", 
        type: "text", 
        style: "question-3-text",
        correct: ["Tokyo Ghoul"]
    },
    {
        id: 5,
        question: "Donne un des plus gros autisme de Julien qui à surtout était présent au lycée mais qui continue parfois ajd ?", 
        type: "text", 
        style: "question-3-text",
        correct: ["evillious chronicles", "evillious", "les chroniques du mal"]
    },
    { 
        id: 6,
        question: "C'était quoi notre premier voyage ?", 
        type: "multiple-choice", 
        options: ["Paris", "Marseille", "Arles", "Toulouse", "Barcelone", "Sisi"], 
        style: "question-1-choice",
        correct: ["Arles"]
    },
    { 
        id: 7,
        question: "Quel mot / expression je spam tout le temps", 
        type: "multiple-choice", 
        options: ["Abuse", "Fou", "Vas y toi", "poR quE", "Dinguerie", "Golmon"], 
        style: "question-1-choice",
        correct: ["Dinguerie"],
    },
    {
        id: 8,
        question: "C'est quoi le surnom préféré de Julien", 
        type: "multiple-choice", 
        options: ["Pepere", "Bebou", "Bebe", "Amour", "Chérie"], 
        style: "question-1-choice",
        correct: ["Chérie"]
    },
    {
        id: 9,
        question: "Lequel on à regarde à irl ensemble", 
        type: "multiple-choice", 
        options: ["Jojo", "Mean Girls", "Shingeki no kyojin s1", "Tsurezure Children", "Heathers", "Squid Game"], 
        style: "question-1-choice",
        correct: ["Squid Game"]
    },
    {
        id: 10,
        question: "Le pays dans lequel on doit absolument voyager", 
        type: "text", 
        style: "question-3-text",
        correct: ["Chine","Japon"]
    },
    {
        id: 11,
        question: "Si tu devais emmener Julien au restaurant demain, tu l’emmènerais où ?", 
        type: "text", 
        style: "question-3-text",
        correct: ["Yuricha"]
    },
    {
        id: 12,
        question: "Qui à le plus d'importance parasocial pour Julien", 
        type: "multiple-choice",
        options: ["Slave et Nedim", "Bob Lennon", "Dany Caligula", "Siphano", "Raz 404", "Usul"], 
        style: "question-1-choice",
        correct: ["Dany Caligula    "]
    },
    {
        id: 13,
        question: "C'est quoi le premier jeu vidéo auquel à jouer Julien", 
        type: "multiple-choice",
        options: ["Kirikou", "Adibou", "Steel Panther", "Minecraft", "Skyrim", "Bataille pour la terre du milieu"], 
        style: "question-1-choice",
        correct: ["Bataille pour la terre du milieu"]
    },
    {
        id: 17,
        question: "C'est quoi le réseau social sur lequel toi et Julien avais commencé à flirter",
        type: "text",
        style: "question-3-text",
        correct: ["Instagram", "Insta"]
    },
    {
        id: 18,
        question: "C'est qui la waifu préféré de Julien ?",
        type: "multiple-choice",
        options: ["Hinata", "Nefer", "Panam", "Tifa", "Hailey", "Mikasa"], 
        style: "question-1-choice",
        correct: ["Tifa", "Hinata"]
    },
    {
        id: 19,
        question: "Julien trans fem elle s'appelerai comment ?",
        type: "multiple-choice",
        options: ["Irene", "Elea", "Leila", "Enora", "Anna", ""], 
        style: "question-1-choice",
        correct: ["Irene"]
    },
    {
        id: 20,
        question: "Ecris une petite phrase pour Juilien", 
        type: "text", 
        style: "question-3-text",
        correct: ["je t'aime"]
    },
];


document.addEventListener("DOMContentLoaded", () => {
    // === Récupération des éléments du DOM ===
    const startBtn = document.getElementById("start-btn");
    const mainContent = document.getElementById("main-content");

 

    let currentQuestionCounter = 0;
    let rate = 0;

    // === Suite du quiz ===
    startBtn.addEventListener("click", () => {
        const firstQuestion = 0;
        console.log("Démarrage du quiz");
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
        // saveResult(rate);

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


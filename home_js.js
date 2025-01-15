const button = document.querySelector ('button');



function getJokeAndDisplay () {
    fetch ("https://official-joke-api.appspot.com/jokes/random", {
        headers: {
            Accept: "application/json",
        } 
    })
        .then ( (joke) => {
            return joke.json();
        })
        .then ( (joke) => {
            console.log ("dada");
            const thank_you_container = document.createElement ('div');
            thank_you_container.style.cssText = `
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 30px;
            `;  

            const thankYouMessage = document.createElement ('h1');
            thankYouMessage.innerText = "Thank you for your feedback! Here is a random joke!";
            const jokeSetup = document.createElement ('h2');
            const jokePunchline = document.createElement ('h2');

            jokeSetup.innerText = joke.setup;
            jokePunchline.innerText = joke.punchline;
            thank_you_container.appendChild (jokeSetup);
            thank_you_container.appendChild (jokePunchline);


            const img = document.createElement ('img');
            img.className = "thank-you thank";
            img.setAttribute ('src', 'images/heart.png');

            thank_you_container.appendChild (img);
            const container = document.querySelector ('.container');

            for (let i = 0; i < 6; ++i) {
                if (container.lastChild) {
                    container.removeChild (container.lastChild);
                } 
            }

            container.appendChild (thankYouMessage);
            container.appendChild (thank_you_container);

            setTimeout (() => {
                img.style.display = "none";
            }, 2800);
        })
        .catch ((error) => {
            console.log ("Found an error while fetching joke", error);
        })
}

function notAllowedCharactersFound () {
    const errorMessage = document.createElement ('h4');
    errorMessage.textContent = "Username cannot be empty and can only contain english letters of the alphabet!";
    errorMessage.style.color = 'red';
    const button = document.querySelector ('.button-holder');
    const previousError = button.previousElementSibling;
    if (previousError.nodeName === "H4") {
        previousError.remove ();
    }

    button.before (errorMessage);
}   

if (localStorage.getItem ("feedback")) {
    getJokeAndDisplay ();
}


button.addEventListener ('click', (event) => {
    event.preventDefault ();

    const usernameRegex = /^[a-zA-Z]+$/;

    const username = document.querySelector ("#name");
    console.log ('nu');

    isValidUsername = (user) => {
        return usernameRegex.test (user);
    }

    if (!isValidUsername (username.value)) {
        notAllowedCharactersFound ();
        return;
    }
    getJokeAndDisplay();
});


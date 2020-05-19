const wordy = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// API key from wordnik
let mykey = config.MY_API_KEY;

function getWords(){      
fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=5&api_key='+mykey)
.then(res => res.json())
    .then(data => {
        // console.log(data.word);
        let getWord = data.word;
        // getWord[Math.floor(Math.random() * getWord.length)]; 
        console.log(getWord); 
        // getWord = getWords();
        wordy.innerHTML = getWord;
        
        // addWordToDOM(getWord);
    })     
    // .catch(error => console.error(error))
    
}



//init word
let random;

//init score
let score = 0;

//init time
let time = 10;

//grab from local storage set the difficulty level 
let difficulty = localStorage.getItem('difficulty') !== null
? localStorage.getItem('difficulty') : 'medium';

//set difficulty even after refresh
difficultySelect.value = localStorage.getItem('difficulty') 
!== null ? localStorage.getItem('difficulty') : 'medium';


//focus on text on start - puts the cursor in the search box
//when page is refreshed - automatically
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);


//update score
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

//update time - countdown
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

//game over, show end screen
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    //error message for when you lose
    //location.reload will reload entire page

    endgameEl.style.display = 'flex';
}

// addWordToDOM();
getWords();


//event listeners
text.addEventListener('input', e => {
    
    let insertedText = e.target.value;
    //what i type in search bar is logged to console
    
    if(insertedText === wordy.innerHTML){
        
        // addWordToDOM();
        getWords();
        updateScore();
                
        

        //clear
        e.target.value = '';
        

        //sets time difficulty to each difficulty
        if(difficulty === 'hard'){
            time += 2;
        } else if(difficulty === 'medium'){
            time+=3;
        }else {
            time += 5;
        }

        updateTime();
    }
});

// getWords();

//settings button click
settingsBtn.addEventListener('click', () => 
settings.classList.toggle('hide'));

//settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
});
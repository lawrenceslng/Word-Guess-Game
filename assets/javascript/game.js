//global variables
var keyPressed = [];
var keyIncorrect = [];
var callsigns = ["speedbird","shamrock","redwood","dynasty","citrus","cactus","dragon","giant","norstar"]; //array containing all the words that have to be guessed
var usedCallsigns = []; //list of all words that are already guessed
var keyWord; // variable that stores the word that is currently being guessed
var winCount = 0;
var numOfGuesses = 10;
var onScreenArray = [];
var onScreenArrayOrig = [];

//original setup of webpage (1st word chosen)
selectKeyWord();
//keyWordGeneration();

//function that selects a random keyWord from the array of keyWords;
function selectKeyWord()
{
    //reset all variables to empty;
    keyPressed = [];
    keyIncorrect = [];
    onScreenArray = [];
    onScreenArrayOrig = [];
    numOfGuesses = 10;
    document.querySelector("#keyWord").innerHTML = "";
    document.querySelector("#Guesses").innerText = numOfGuesses;
    document.querySelector("#letsAlreadyGuessed").innerHTML = "";

    //check if callsigns is empty, if empty alert You Finished the Game
    if(callsigns.length == 0)
    {
        alert("You Finished the Game! Your score is " + winCount);
        alert("Refresh page to start again!");
        //play celebratory music and change page

    }

    var temp = Math.floor(Math.random()*callsigns.length);
    keyWord = callsigns[temp];
    usedCallsigns.push(keyWord); //push the current keyWord into the usedCallsigns array
    callsigns.splice(temp,1); //delete keyWord from callsigns array
    console.log(keyWord);
    //display associated image
    imageLoad();

    //play startupmusic
    // musicStartUp();

    //console.log(usedCallsigns);
    //console.log(callsigns);
    for(i = 0; i<keyWord.length;i++)
    {
        onScreenArray.push("_");
        onScreenArrayOrig.push("_");
    }
    //console.log(onScreenArray);
    document.querySelector("#keyWord").innerHTML = onScreenArray.join(" "); //.join(" ")
}

//function that creates the appropriate number of letter spaces based on word chosen
//function keyWordGeneration()
//{
    //using keyWord.length, create _ for each letter
    //var tempArray = [];
    //var temp = document.querySelector("#keyWord");
    //for(i = 0; i<keyWord.length;i++)
    //{
    //    tempArray.push("_");
    //}
    //temp.innerText = tempArray.join(" ");
    //document.onkeyup = keyReleased;
//}


//function that registers key pressed
function keyReleased(event)
{
    var key = event.key;
    //if key is not an alphabet; skip rest of code
    if(event.keyCode < 64 || event.keyCode > 90)
    {
        alert("Not Valid");
        return;
    }
    var count = 0;

    //console.log(key);
    for(i = 0; i<keyPressed.length;i++)
    {
        if(key == keyPressed[i])
        {
            keyAlreadyInputted(key);
            return;
            //stop function from continuing
        }
    }
    keyPressed.push(key);
    //console.log(keyPressed);
     
    //loop through keyWord and check if letter is in word or not
    for(i = 0; i<keyWord.length;i++)
    {
        //console.log(keyWord[i]);
        if(key == keyWord[i])
        {
            //print out letter in appropriate space
            onScreenArray[i] = key;
            document.querySelector("#keyWord").innerHTML = onScreenArray.join(" ");
            count++;

        }
    }

    //if the number of spaces vs letters did not change then throw letter in used pile and numOfGuesses go down
    if(count==0)
    {
        numOfGuesses = numOfGuesses - 1; //Number of guess goes down
        keyIncorrect.push(key); //throw letter in letter guessed div
        document.querySelector("#Guesses").innerText = numOfGuesses;
        document.querySelector("#letsAlreadyGuessed").innerText = keyIncorrect;
       // console.log(numOfGuesses);
        if(numOfGuesses == 0)
        {
            gameOver();
            
        } 
        
    }
    //else continue
    //if keyPressed contains all letters of keyWord, then win++ and new word generation
    var lettersMatched = 0;
    for(i=0;i<keyWord.length;i++)
    {
        
        if(onScreenArray[i] == keyWord[i])
        {
            //continue
            lettersMatched++;
            
        }
        console.log(lettersMatched);
        if(lettersMatched == keyWord.length)
        {
            winCount++;
            //alert("You scored!");
            document.querySelector("#Wins").innerHTML = winCount;
            selectKeyWord();
        }

    }            
}
   // document.getElementById("LetsGot").innerText = key;


//ignore letters already inputted
function keyAlreadyInputted(x)
{
    alert("Letter Already Guessed");
}

//gameOver function
function gameOver()
{
    alert("You have exhausted all guesses. The callsign is "+ keyWord);
    selectKeyWord();
}

// function musicStartUp()
// {
//     document.getElementById("#startupmusic").play();
// }
// function play_single_sound() {
//     document.getElementById('audiotag1').play();
// }

function imageLoad()
{
   if(keyWord == "speedbird"){
    document.querySelector("#image").src = "assets/images/British_Airways.jpg";
   }
   else if(keyWord == "shamrock"){
    document.querySelector("#image").src = "assets/images/Aer_Lingus.jpg";
   }
   else if(keyWord == "redwood"){
    document.querySelector("#image").src = "assets/images/Virgin_America.jpg";
   }  
   else if(keyWord == "dynasty"){
    document.querySelector("#image").src = "assets/images/China_Airlines.jpg";
   }   
   else if(keyWord == "citrus"){
    document.querySelector("#image").src = "assets/images/Airtran.jpg";
   }   
   else if(keyWord == "cactus"){
    document.querySelector("#image").src = "assets/images/US_Airways.jpg";
   }   
   else if(keyWord == "dragon"){
    document.querySelector("#image").src = "assets/images/Cathay_Dragon.jpg";
   }   
   else if(keyWord == "giant"){
    document.querySelector("#image").src = "assets/images/Atlas_Air.jpg";
   }   
   else if(keyWord == "norstar"){
    document.querySelector("#image").src = "assets/images/Norwegian.jpg";
   }   
        // var x = document.createElement("IMG");
        // x.setAttribute("src", "assets/images/British_Airways.jpg");
        // x.setAttribute("width", "304");
        // x.setAttribute("height", "228");
        // x.setAttribute("alt", "The Pulpit Rock");
        // document.body.appendChild(x); 
 
}
document.onkeyup = keyReleased;
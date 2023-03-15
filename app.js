

//Make a request to the Numbers API 
//(http://numbersapi.com/) to get a fact about your favorite number. 
//(Make sure you get back JSON by including the json query key, specific to this API. Details.


let favoriteNumber=3;

let baseURL="http://numbersapi.com/";


async function infoFav(){

    let response=await $.getJSON(`${baseURL}${favoriteNumber}?json`);
    console.log(response);
}

infoFav();



let favNumbers=[99,30,8];
let $body=$('body');


async function favNumbersInfo(){
    let response=await $.getJSON(`${baseURL}${favNumbers}?json`);
    console.log(response);
    

}

favNumbersInfo();

async function getFourFacts(){
    let facts=await Promise.all(
     Array.from({length:4},()=> $.getJSON(`${baseURL}${favoriteNumber}?json`))

    );
    facts.forEach(data=> {
        $body.append(`<p>${data.text}</p>`);
    });
}

getFourFacts();



//part 2 added on here

//Make a request to the Deck of Cards API to request a 
//single card from a newly shuffled deck. Once you have the card,
// console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).


/*
let nextBaseURL='https://deckofcardsapi.com/api/deck';

async function drawCard(){
    let response=await $.getJSON(`${nextBaseURL}/new/shuffle/?deck_count=1`);
    console.log(response);
    let deckId=response.deck_id;

    let draw=await $.getJSON(`${nextBaseURL}/${deckId}/draw/?count=1`);
    let {suit,value}=draw.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}
//There is a URL to shuffle deck and draw a card from said deck in one turn. 

*/

let nextBaseURL='https://deckofcardsapi.com/api/deck';

async function drawCard(){
    let response=await $.getJSON(`${nextBaseURL}/new/draw/?count=1`);
    console.log(response);
    let {suit,value}=response.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}


async function drawTwoCards(){
    let first=await $.getJSON(`${nextBaseURL}/new/draw/?count=1`);
    
    let deckId=first.deck_id;
    let second=await $.getJSON(`${nextBaseURL}/${deckId}/draw/?count=1`);
   
    [first,second].forEach(card =>{
        let {suit,value}=card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
    console.log(second.remaining);
  
}

let theURL="https://deckofcardsapi.com/api/deck";

async function setup(){
    let $btn=$("button");
    let $cardArea=$("#cardArea");


    let shuffledDeck=await $.getJSON(`${theURL}/new/shuffle/?deck_count=1`);

    $btn.on('click',async function(){
     let cardData = await $.getJSON(`${theURL}/${shuffledDeck.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
    
  }
  setup();



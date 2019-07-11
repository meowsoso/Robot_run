console.log("Robot Run");

// $('div.bigRobot').hide();
$('div.bigRobot').animate({
  opacity: 0  
}, 1);
$('div.robotSpeak').hide();
$('div.robotLog').hide();
$('div.robotBtm').hide();
$(".layer1").hide();

//fade in chat box;
let dialogueCount = 0;
let eventStatus = 'start';
let fireCount = 0;

// libaray to store robot response 
const robotDialogue = {
  intro: ['Thanks for helping me, I was almost barbequed.', 
          'What si this elacp ? it is os drka',
          'Oh my god , what happened to me , I am talking gibberish.', 
          'System failure dectected , please input machine reboot', 
],
  puzzle2: ['System reboot completing...99%', 
            '........99%', 
            '.................99%',
            'Oh noooooo, it"s the 99% cur ^$!^  ssssss @&)@#>? e!%@%!^', 
            'It must be the damn virus , please input Kaspersky to activate antivirus'
          ],
  puzzle3: [

  ]

}


// spot light effect
$(document).on("click mousemove", "body", function(e) {
  if ($('div.toolBar').attr('class') === 'toolBar showTool') {
    $(".layer1").fadeIn(800);
    const x = e.clientX;
    const y = e.clientY;
    const newposX = x - 100;
    const newposY = y - 100;
    $(".layer1").css({"left": `${newposX}px`, "top": `${newposY}px`});
};
});

// item slot toggling
$('#boxIcon').on('click', function() {
    $('.toolBar').addClass('showTool');
    $('#closeTool').css('visibility', 'visible');
    $(this).css("visibility", "hidden");
});

$('#closeTool').on('click', function() {
    $('.toolBar').removeClass('showTool');
    $('#boxIcon').css("visibility", "visible");
    $(this).css('visibility', 'hidden');
});



// TODO
// input: user message. Outout: robot reply
const robotReply = function(string) {
}


//clean message log
const cleanLog = function () {
  if ($('div.robotMessage > p').length >4) {
    $('div.robotMessage').find('p:eq(1)').remove();
    };
};


// puzzle#1 scramble word orders and swap the letters inside 

// turn sentence into scramble level 1
const scramble = function (string) {
  let newSentence = [];
  const array = string.split(' ');
  for (let i = 0; i < array.length; i++) {
    newSentence.push(swapLetters(array[i]));
  };
  return newSentence.join(' ');
}

// turn sentence into mixed words and in random order
const scramble2 = function(string) {
  const mixLetter = scramble(string);
  const mixWords = swapWords(mixLetter);
  return mixWords;
}

// swap first and end letter, mix middle letters
const swapLetters = function(word) {
  const length = word.length;
  let newWord = []; 
  if (length > 2) {
    let array = randomUnique(length-2);
    for (let i = 1; i <= array.length; i++) {
      newWord[i] = word[array[i-1]];
    };
  };
  newWord[0] = word[length-1];
  newWord[length-1] = word[0]; 
  return newWord.join('');
};


// generate random unique number
const randomUnique = function (number) {
  let array = [];
  while (array.length < number) {
    let r = Math.floor(Math.random()*number) + 1;
    if (array.indexOf(r) === -1) array.push(r);
  };
  return array;
}
//swap word order in a sentence
const swapWords = function (sentence) {
  const sentenceArray = sentence.split(' ');
  const length = sentenceArray.length;
  let randomArray = randomUnique(length);
  let newSentence = [];
  for (let i = 0; i < length; i++) {
    newSentence[i] = sentenceArray[randomArray[i]-1];
  }
  return newSentence.join(' ');
};
//put out fire
$('img.fire').on('click', function () {
  $(this).fadeOut(4000);
  fireCount += 1;
});

$('img#brokenRobot').on('click', function () {
  if (fireCount >= 3) {
  $(this).fadeOut(3000, "swing", bigRobotFadeIn);
  };
});
//fade in big Robot
const bigRobotFadeIn = function () {
$('div.bigRobot').animate({
  opacity: 1
}, 5000);
chatFadeIn();
};

//update text in robot big chat box
const updateChatBox = function(message) {
 $('#lines').text(message);
};


//fade robot chat box
const chatFadeIn = function () {
  $('div.robotSpeak').fadeIn(1000);
  dialogueCount = 0;
  updateChatBox(robotDialogue.intro[dialogueCount])
  console.log(dialogueCount);
  dialogueCount += 1;

};


//change dialogue in puzzle 1 
$('div.start').on('click', function () {
  if (eventStatus === 'start') {
    if (robotDialogue.intro.length > dialogueCount) {
      updateChatBox(scramble(robotDialogue.intro[dialogueCount]));
      dialogueCount += 1;
    } else {
      updateChatBox(scramble(robotDialogue.intro[dialogueCount-1]));
      $('div.bigRobot').fadeOut(3000);
      $('div.robotBtm').fadeIn(3000);
      $('div.robotLog').fadeIn(3000);
    };
  };
})

// event when command button is clicked
$('input#sendCommand').on('click', function (){
  const command = $('input#commandLine').val();
  let reply;
  if (eventStatus === 'puzzle2') {
    reply = scramble2(command);
  } else {
    reply = scramble(command);
  };
  const messageBox = $('div.robotMessage');
  cleanLog();
  messageBox.append(`<p>${ reply }</p>`);
});

// event when guessed correct in puzzle1
$('input#sendCommand').on('click', function (){
  const command = $('input#commandLine').val();
  if (command === 'machine reboot' || command === 'skip') {
    $('div.robotLog').hide();
    $('div.robotBtm').hide();
    $('div.bigRobot').fadeIn(3000);
    eventStatus = 'puzzle2';
    dialogueCount = 0;
  };
});

$('div.start').on('click', function () {
  // debugger;
  if (dialogueCount < 4 && eventStatus === 'puzzle2') {
    updateChatBox(robotDialogue.puzzle2[dialogueCount]);
    console.log(dialogueCount);
    dialogueCount += 1;
  } else if (dialogueCount < robotDialogue.puzzle2.length && eventStatus === 'puzzle2') {
    updateChatBox(scramble2(robotDialogue.puzzle2[dialogueCount]));  
    console.log(dialogueCount);
    dialogueCount += 1;
  } else if (eventStatus === 'puzzle2') {
    updateChatBox(scramble2(robotDialogue.puzzle2[dialogueCount-1]));
    $('div.bigRobot').fadeOut(3000);
    $('div.robotBtm').fadeIn(3000);
    $('div.robotLog').fadeIn(3000);
  }
})
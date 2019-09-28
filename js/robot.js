console.log("Robot Run");

// $('div.bigRobot').hide();
$("div.bigRobot").animate(
  {
    opacity: 0
  },
  1
);
Splitting();
$("#intro__container").hide();
$("div.robotSpeak").hide();
$("div.robotLog").hide();
$("div.robotBtm").hide();
$(".layer1").hide();
$("div.squirrel").hide();

// start button event
$("div.start__button").on("click", function() {
  console.log("clicked");
  $("div.title").fadeOut(1000);
  $(this).fadeOut(1000);
  $("#intro__container").fadeIn(3000);
  setTimeout(function() {
    textEffect("You woke up to the sound of explosion.");
    setTimeout(function() {
      textEffect("Seems like you are in a control room?", "45%");
      setTimeout(function() {
        textEffect("To get out. Look around for clues.", "75%");
        setTimeout(function() {
          $("#intro__container").fadeOut(2000);
        }, 6000);
      }, 4000);
    }, 4000);
  }, 3500);
});

//fade in chat box;
let dialogueCount = 0;
let eventStatus = "start";
let fireCount = 0;
let toolCount = 0;

// libaray to store robot response
const robotDialogue = {
  intro: [
    "Thanks for helping me, I was almost barbequed.",
    "What si this elacp ? it is os drka",
    "Oh my god , what happened to me , I am talking gibberish.",
    "System failure dectected , please input machine reboot"
  ],
  puzzle2: [
    "System reboot completing...99%",
    "........99%",
    ".................99%",
    'Oh noooooo, it"s the 99% cur ^$!^  ssssss @&)@#>? e!%@%!^',
    "It must be the damn virus , please input Kaspersky to activate antivirus"
  ],
  puzzle3: [
    'Anti-virus scanning complete, File: "kitty_attack.bin" removed. System reboot 100%.',
    "!&%#ing virus, all I could see was awful furry creatures",
    "What a nightmare.... Thank you for saving me AGAIN.",
    "Where are we?  oh look, there is a door with light over there.",
    "If you could find me some machine parts and tools, we could get out of here.",
    "Help me gather some parts, 5 should be enough.",
    'It"s dark in here, can you see anything useful around?',
    "How are you doing with the gathering?",
    "Oh, you found one, keep it going",
    "zzzz... What took you so long, anyway, let me fix this broken limp."
  ],
  puzzle4: [
    "Wait a second, Where is my titanium custom-made shinny connector.",
    "Hey! that furry damn thing behind you, catch it, it has my connector!",
    "Good Job!"
  ]
};

// set position of robot parts
$("div.robotParts").each(function() {
  $(this).css({
    left: `${Math.floor(Math.random() * ($(window).width() - 100))}px`,
    top: `${Math.floor(Math.random() * ($(window).height() - 100))}px`
  });
});

// spot light effect
$(document).on("click mousemove", "body", function(e) {
  if ($("div#torchLight").attr("class") === "light") {
    $(".layer1").fadeIn("slow");
    const x = e.clientX;
    const y = e.clientY;
    const newposX = x - 100;
    const newposY = y - 100;
    $(".layer1").css({ left: `${newposX}px`, top: `${newposY}px` });
  }
});

// torch icon to switch or off
$("div#torchLight").on("click", function() {
  if ($(this).attr("class") === "light") {
    $(this).removeClass("light");
    $(".layer1").fadeOut("slow");
  } else {
    console.log("click");
    $(this).addClass("light");
  }
});

// item slot toggling
$("#boxIcon").on("click", function() {
  $(".toolBar").addClass("showTool");
  $("#closeTool").css("visibility", "visible");
  $(this).css("visibility", "hidden");
});

$("#closeTool").on("click", function() {
  $(".toolBar").removeClass("showTool");
  $("#boxIcon").css("visibility", "visible");
  $(this).css("visibility", "hidden");
});

//clean message log
const cleanLog = function() {
  if ($("div.robotMessage > p").length > 4) {
    $("div.robotMessage")
      .find("p:eq(1)")
      .remove();
  }
};

// puzzle#1 scramble word orders and swap the letters inside

// turn sentence into scramble level 1
const scramble = function(string) {
  let newSentence = [];
  const array = string.split(" ");
  for (let i = 0; i < array.length; i++) {
    newSentence.push(swapLetters(array[i]));
  }
  return newSentence.join(" ");
};

// turn sentence into mixed words and in random order
const scramble2 = function(string) {
  const mixLetter = scramble(string).split(" ");
  const mixWords = arrayRotate(mixLetter);
  return mixWords.join(" ");
};

// swap first and end letter, mix middle letters
const swapLetters = function(word) {
  const length = word.length;
  let newWord = [];
  if (length > 2) {
    let array = randomUnique(length - 2);
    for (let i = 1; i <= array.length; i++) {
      newWord[i] = word[array[i - 1]];
    }
  }
  newWord[0] = word[length - 1];
  newWord[length - 1] = word[0];
  return newWord.join("");
};

// generate random unique number
const randomUnique = function(number) {
  let array = [];
  while (array.length < number) {
    let r = Math.floor(Math.random() * number) + 1;
    if (array.indexOf(r) === -1) array.push(r);
  }
  return array;
};

// rotate array
const arrayRotate = function(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
  return arr;
};
////////////////// end of puzzle1 logic

//put out fire
$("img.fire").on("click", function() {
  $(this).fadeOut(4000);
  fireCount += 1;
});

//borken robot disappear
$("img#brokenRobot").on("click", function() {
  if (fireCount >= 3) {
    $(this).fadeOut(3000, "swing", bigRobotFadeIn);
  }
});

//fade in big Robot
const bigRobotFadeIn = function() {
  $("div.bigRobot").animate(
    {
      opacity: 1
    },
    5000
  );
  chatFadeIn();
};

//update text in robot big chat box
const updateChatBox = function(message) {
  $("#lines").text(message);
};

//fade robot chat box
const chatFadeIn = function() {
  $("div.robotSpeak").fadeIn(1000);
  dialogueCount = 0;
  updateChatBox(robotDialogue.intro[dialogueCount]);
  console.log(dialogueCount);
  dialogueCount += 1;
};

// big robot fade out
const robotFadeOut = function() {
  $("div.bigRobot").fadeOut(3000);
  $("div.robotBtm").fadeIn(3000);
  $("div.robotLog").fadeIn(3000);
};

const robotFadeIn = function() {
  $("div.robotLog").hide();
  $("div.robotBtm").hide();
  $("div.bigRobot").fadeIn(3000);
};

//change dialogue in puzzle 1
$("div.start").on("click", function() {
  if (eventStatus === "start") {
    if (robotDialogue.intro.length > dialogueCount) {
      updateChatBox(scramble(robotDialogue.intro[dialogueCount]));
      dialogueCount += 1;
    } else {
      updateChatBox(scramble(robotDialogue.intro[dialogueCount - 1]));
      robotFadeOut();
    }
  }
});

// event when command button is clicked
$("input#sendCommand").on("click", function() {
  const command = $("input#commandLine").val();
  let reply;
  if (eventStatus === "puzzle2") {
    reply = scramble2(command);
  } else {
    reply = scramble(command);
  }
  const messageBox = $("div.robotMessage");
  cleanLog();
  messageBox.append(`<p>${reply}</p>`);
});

// event when guessed correct in puzzle1
$("input#sendCommand").on("click", function() {
  const command = $("input#commandLine").val();
  if (command === "machine reboot" || command === "skip") {
    // TODO: group into function
    robotFadeIn();
    eventStatus = "puzzle2";
    dialogueCount = 0;
  } else if (command === "Kaspersky" || command === "skip2") {
    eventStatus = "puzzle3";
    dialogueCount = 0;
    $("div.robotParts").css("display", "inline-block");
    updateChatBox(robotDialogue.puzzle3[dialogueCount]);
    $("div.robotLog").hide();
  }
});

// event dialogue for puzzle 2
$("div.start").on("click", function() {
  // debugger;
  if (eventStatus === "puzzle2") {
    if (dialogueCount < 4 && eventStatus === "puzzle2") {
      updateChatBox(robotDialogue.puzzle2[dialogueCount]);
      console.log(dialogueCount);
      dialogueCount += 1;
    } else if (
      dialogueCount < robotDialogue.puzzle2.length &&
      eventStatus === "puzzle2"
    ) {
      updateChatBox(scramble2(robotDialogue.puzzle2[dialogueCount]));
      console.log(dialogueCount);
      dialogueCount += 1;
    } else if (eventStatus === "puzzle2") {
      word = scramble2(robotDialogue.puzzle2[dialogueCount - 1]);
      robotDialogue.puzzle2[dialogueCount - 1] = word;
      updateChatBox(word);
      robotFadeOut();
    }
  }
});

// event dialogue for puzzle 3
$("div.start").on("click", function() {
  if (eventStatus === "puzzle3") {
    if (dialogueCount < 7) {
      updateChatBox(robotDialogue.puzzle3[dialogueCount]);
      dialogueCount += 1;
    } else {
      dialogueCount = 4;
      updateChatBox(robotDialogue.puzzle3[dialogueCount]);
    }
  }
});
// parts appear when mouse over
$("div.robotParts").on("mouseover", function() {
  if (
    $("div#torchLight").attr("class") === "light" &&
    eventStatus === "puzzle3"
  ) {
    $(this).css("opacity", "1");
  }
});

// on click robot parts
$("div.robotParts").on("click", function() {
  if (toolCount < 4) {
    $(this).fadeOut("slow");
    updateChatBox(robotDialogue.puzzle3[8]);
    toolCount += 1;
  } else {
    $(this).fadeOut("slow");
    updateChatBox(robotDialogue.puzzle3[9]);
    // trigger puzzle 4
    eventStatus = "puzzle4";
    dialogueCount = 0;
  }
});

$("div.start").on("click", function() {
  if (eventStatus === "puzzle4") {
    if (dialogueCount < 1) {
      updateChatBox(robotDialogue.puzzle4[dialogueCount]);
      dialogueCount += 1;
    } else {
      dialogueCount = 0;
      $("div.robotSpeak").fadeOut(1000);
      stopper = setInterval(runSquirrel, 400);
    }
  }
});

const runSquirrel = function() {
  $("div.squirrel").css({
    top: Math.floor(Math.random() * window.innerHeight) + "px",
    left: Math.floor(Math.random() * window.innerWidth) + "px"
  });
  $("div.squirrel")
    .fadeIn(400)
    .fadeOut(400);
};

// click squirrel
$("div.squirrel").on("click", function() {
  clearInterval(stopper);
  $("div.robotLog").fadeIn(1000);
  updateChatBox(robotDialogue.puzzle4[2]);
});

// intro message
const logo = Snap("#logo");

// load logo when finished loading
// Introduction of page
$("#logo").on("click", function() {
  $("#logo text").remove();
  ``;
  textEffect("testing a very");
  textEffect("very long string", "35%");
  textEffect("third line", "55%");
});

// code text effect
const textEffect = function(text, posY = "15%", fontSize = 30) {
  let logoTitle = text;
  let logoRandom = "";
  let logoTitleContainer = logo.text(0, posY, "");
  let possible = '-+*/|}{[]~\\":;?/.><=+-_)(*&^%$#@!)}';
  logoTitleContainer.attr({
    fontSize: fontSize,
    fontFamily: "Dosis",
    fontWeight: "600",
    fill: "greenyellow"
  });

  function generateRandomTitle(i, logoRandom) {
    setTimeout(function() {
      logoTitleContainer.attr({ text: logoRandom });
    }, i * 120);
  }

  for (let i = 0; i < logoTitle.length + 1; i++) {
    logoRandom = logoTitle.substr(0, i);
    for (let j = i; j < logoTitle.length; j++) {
      logoRandom += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }
    generateRandomTitle(i, logoRandom);
    logoRandom = "";
  }
};

 /*
  * @author Semih Ataman
  * @since 9 July 2021
  */

 $("#topOfGrid").hide();
 $("#grid .btn").hide();
 $("#endOfTheGame").hide();

 var allColors = ["orange", "purple", "pink", "yellow", "dark-cyan", "blue", "white", "gray",
   "green", "red", "olive", "brown", "turquoise", "rebecca-purple", "orange-red", "thistle", "lime",
   "magenta", "peru", "sky-blue", "slate-blue", "saddle-brown", "navy", "salmon", "silver", "sienna"
 ];

 var seenColors = []; // This is the array of seen colors on the screen.
 var totalPoint = 0;

 $("#difficulty .btn").click(function() {
   $("#level-title").hide();
   $("#difficulty").hide();
   $("#topOfGrid").show();
 });


 $("#threeToThree").click(function() {

   executeTimer();
   var nextColor = arrangeThreeToThreeColors();

   $("#grid .btn").click(function() {
     if ($(this).attr("id") === nextColor) {
       playSound("Success");
       totalPoint += 10;
       console.log("Total Point: " + totalPoint);
       seenColors = [];
       nextColor = arrangeThreeToThreeColors();
     } else {
       playSound("Failure");
     }
   });
 });

 $("#fourToFour").click(function() {

   executeTimer();
   var nextColor = arrangeFourToFourColors();

   $("#grid .btn").click(function() {
     if ($(this).attr("id") === nextColor) {
       playSound("Success");
       totalPoint += 10;
       console.log("Total Point: " + totalPoint);
       seenColors = [];
       nextColor = arrangeFourToFourColors();
     } else {
       playSound("Failure");
     }
   });
 });

 $("#fiveToFive").click(function() {

   executeTimer();
   var nextColor = arrangeFiveToFiveColors();

   $("#grid .btn").click(function() {
     if ($(this).attr("id") === nextColor) {
       playSound("Success");
       totalPoint += 10;
       console.log("Total Point: " + totalPoint);
       seenColors = [];
       nextColor = arrangeFiveToFiveColors();
     } else {
       playSound("Failure");
     }
   });
 });

 function getRandomColor(colors) {
   var randomNumber = Math.floor(Math.random() * colors.length);
   var randomColor = colors[randomNumber];
   return randomColor;
 }

 // This function provides that one color can only be taken once.
 function getValidColor() {
   var randomColor;
   do {
     randomColor = getRandomColor(allColors);
   }
   while (seenColors.includes(randomColor));
   return randomColor;
 }

 function executeTimer() {
   var counter = 60;
   $("#timer").html(counter);
   var x = setInterval(function() {
     counter--;
     $("#timer").html(counter);

     if (counter == 10) {
       playSound("TimeRunningOut");
     }

     if (counter < 0) {
       clearInterval(x);
       $("#topOfGrid").hide();
       $("#grid").hide();
       $("#endOfTheGame").show();
       $("#point h2").html(totalPoint);
     }
   }, 1000);
 }

 function arrangeThreeToThreeColors() {
   for (let i = 0; i <= 12; i++) {
     let mod = i % 5;
     if (mod === 0 || mod === 1 || mod === 2) {
       var randomColor = getValidColor();
       $("#grid .btn:eq(" + i + ")").attr("id", randomColor);
       $("#grid .btn:eq(" + i + ")").attr("class", "btn " + randomColor);
       $("#grid .btn:eq(" + i + ")").show();
       seenColors.push(randomColor);

     } else {
       continue;
     }
   }
   var nextColor = getRandomColor(seenColors);
   $("#next").attr("class", "btn next " + nextColor);
   return nextColor;
 }

 function arrangeFourToFourColors() {
   for (let i = 0; i <= 18; i++) {
     let mod = i % 5;
     if (mod === 0 || mod === 1 || mod === 2 || mod === 3) {
       var randomColor = getValidColor();
       $("#grid .btn:eq(" + i + ")").attr("id", randomColor);
       $("#grid .btn:eq(" + i + ")").attr("class", "btn " + randomColor);
       $("#grid .btn:eq(" + i + ")").show();
       seenColors.push(randomColor);

     } else {
       continue;
     }
   }
   var nextColor = getRandomColor(seenColors);
   $("#next").attr("class", "btn next " + nextColor);
   return nextColor;
 }

 function arrangeFiveToFiveColors() {
   for (let i = 0; i <= 24; i++) {
     var randomColor = getValidColor();
     $("#grid .btn:eq(" + i + ")").attr("id", randomColor);
     $("#grid .btn:eq(" + i + ")").attr("class", "btn " + randomColor);
     $("#grid .btn:eq(" + i + ")").show();
     seenColors.push(randomColor);
   }
   var nextColor = getRandomColor(seenColors);
   $("#next").attr("class", "btn next " + nextColor);
   return nextColor;
 }

 function playSound(name) {
   var audio = new Audio("Sounds/" + name + ".flac");
   audio.play();
 }

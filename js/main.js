var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;
var pairAmounts = 10;

var playerTurn = 1;
var player1Score = 0;
var player2Score = 0;

var Source = "#boxcard";

var ImgSource = [
  "https://s-media-cache-ak0.pinimg.com/236x/6b/ba/5e/6bba5e1774a9bea1d590efb3ce40402b.jpg",
  "https://images-eu.ssl-images-amazon.com/images/I/51jQQHVniHL._AC_UL320_SR230,320_.jpg",
  "http://cdn.bulbagarden.net/media/upload/a/a4/VenusaurBaseSet15.jpg",
  "https://67.media.tumblr.com/230e8fcbc8a64fea7e01d7ed49fe09dd/tumblr_nhwfgwSDhG1rl27tao4_400.jpg",
  "http://i41.tinypic.com/8vyryo.jpg",
  "http://thumbs4.ebaystatic.com/d/l225/m/m9wXCC-n38OhPt-rQ310H7g.jpg",
  "http://thumbs2.ebaystatic.com/d/l225/m/mal7DNJjiueASzkyevBmvYA.jpg",
  "http://www.pokemon-cards.net/Merchant2/graphics/00000001/fos/FOS012.jpg",
  "https://s-media-cache-ak0.pinimg.com/236x/a9/bf/4b/a9bf4b86acace46d1d08bbac9fb59464.jpg",
  "img/FOS005.jpg"
];

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
  }
  
function ShuffleImages() {
  var ImgAll = $(Source).children();
  var ImgThis = $(Source + " div:first-child");
  var ImgArr = new Array();

  for (var i = 0; i < ImgAll.length; i++) {
    ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
    ImgThis = ImgThis.next();
  }
  
    ImgThis = $(Source + " div:first-child");
  
  for (var z = 0; z < ImgAll.length; z++) {
  var RandomNumber = RandomFunction(0, ImgArr.length - 1);

    $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
    ImgArr.splice(RandomNumber, 1);
    ImgThis = ImgThis.next();
  }
}

function ResetGame() {
  ShuffleImages();
  $(Source + " div img").hide();
  $(Source + " div").css("visibility", "visible");
  Counter = 0;
  $("#success").remove();
  $("#player1Score").html("PLAYER 1: ");
  $("#player2Score").html("PLAYER 2: ");
  $("#counter").html("" + Counter);
  BoxOpened = "";
  ImgOpened = "";
  ImgFound = 0;
  window.location.reload();
  return false;
}

function OpenCard() {
  console.log(playerTurn);
  var id = $(this).attr("id");

  if ($("#" + id + " img").is(":hidden")) {
    $(Source + " div").unbind("click", OpenCard);
  
    $("#" + id + " img").slideDown('fast');

    if (ImgOpened == "") {
      BoxOpened = id;
      ImgOpened = $("#" + id + " img").attr("src");
      setTimeout(function() {
        $(Source + " div").bind("click", OpenCard)
      }, 300);
    } else {
      CurrentOpened = $("#" + id + " img").attr("src");
      if (ImgOpened != CurrentOpened) {
        setTimeout(function() {
          console.log('Inside', playerTurn);
          if(playerTurn === 1) {
            playerTurn = 2;
            swal("Player Two's Turn");
          } else {
            playerTurn = 1;
            swal("Player One's Turn")
          }
          $("#" + id + " img").slideUp('fast');
          $("#" + BoxOpened + " img").slideUp('fast');
          BoxOpened = "";
          ImgOpened = "";
        }, 400);
      } else {
        $("#" + id + " img").parent().css("visibility", "hidden");
        $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
        if (playerTurn === 1) {
          player1Score++
          pairAmounts--
          if(pairAmounts === 0){
            winner(player1Score, player2Score);
          }
          $("#player1Score").html("PLAYER 1: " + player1Score)
        } else {
          player2Score++
          pairAmounts--
          if(pairAmounts === 0){
            winner(player1Score, player2Score);
          }
          $("#player2Score").html("PLAYER 2: " + player2Score)
        }
        BoxOpened = "";
        ImgOpened = "";
      }
      setTimeout(function() {
        $(Source + " div").bind("click", OpenCard)
      }, 400);
    }
    Counter++;
    $("#counter").html("" + Counter);

    if (ImgFound == ImgSource.length) {
      $("#counter").prepend('<span id="success">You Found All Pokemon With </span>');
    }
  }
}

$(function() {

for (var y = 1; y < 3 ; y++) {
  $.each(ImgSource, function(i, val) {
    $(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
  });
}
  $(Source + " div").click(OpenCard);
  ShuffleImages();
});

function winner(player1Score, player2Score){
if(player1Score < player2Score){
  swal("Player Two Wins")
  } else if (player1Score > player2Score) {
  swal("Player One Wins")
  } else {
    swal("Game is a Draw play better next time")
  };
};

window.onload = function() {
    document.getElementById("my_audio").play();
}

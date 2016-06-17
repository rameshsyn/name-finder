// Coded by Ramesh Syangtan (rameshsyn / ramesh_syn on internet)

$(document).ready(function() {
  var stateCond = 1; // which state
  var totLetter = 0; // stores total letters in name
  var checkLetter = 0; // stores letters clicked in second states

  // Name finder Object
  var nameFinder = {
      // First state of letters which are shown to user
      firstState: [
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
        ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
        ['Y', 'Z', ' ', ' ', ' ', ' ', ' ', ' ']
      ],
      // Second state of letters which will be shown to user (after user clicks)
      secondStateCol: [], // Collection of selected rows of letters by user
      secondState: [], // Second state to be shown for user
      thirdStateCol: [], // Third state
      thirdState: [],
      // A function which makes boxes as a state given from argument
      makeBox: function(state) {
        var content = "";
        nameFinder[state].forEach(function(row, index) {
          content += "<div class='content-container'><div class='box-container animated' id='r" + index + "'><div class='line-top' id='line-top'></div><div class='box-row'>";
          row.forEach(function(letter) {
            content += "<div class='box'>" + letter + "</div>";
          });
          content += "</div><div class='line-bottom' id='line-bottom'></div></div><div class='counter-box'><button type='button' class='btn btn-success counter' id='r" + index + "'>Select</button></div></div>";
        });
        $("#main").html(content);
      },
      // A function which makes letters(state) horizontal / column stored in specific state(stateCol)
      makeState: function(stateCol, state) {
        nameFinder[stateCol][0].forEach(function(row, rowIndex) {
          var temp = [];
          nameFinder[stateCol].forEach(function(letter, letterIndex) {
            temp.push(nameFinder[stateCol][letterIndex][rowIndex]);
          });
          nameFinder[state].push(temp);
        });
      },
      // A function which adds rows to the state from previous state
      addRows: function(rowId, fromState, toState) {
        nameFinder[toState].push(nameFinder[fromState][rowId]);
      },
      // A function which shows name 
      showName: function() {
        var name = [];
        nameFinder.thirdState.forEach(function(row, index) {
          name.push(nameFinder.thirdState[index][index]);
        });
        return name.join('').toLowerCase();
      }
    }
    // Makes boxes for first state
  nameFinder.makeBox("firstState");

  // Events handling functions 
  $(document).on("click", ".counter", function(event) {
    var getRowId = event.target.id.split('')[1];
    switch (stateCond) {
      case 1:
        $("#finish").removeClass("unclickable");
        nameFinder.addRows(getRowId, "firstState", "secondStateCol");
        totLetter++;
        break;
      case 2:
        nameFinder.addRows(getRowId, "secondState", "thirdStateCol");
        checkLetter++;
        if (checkLetter === totLetter) {
          $(".show-container").show();
        };
        break;
      default:
        return false;
        break;
    }
    $("#total-letter").text(totLetter);
    $("#r" + getRowId.toString()).addClass("zoomOutDown");

    function timeOut() {
      $("#r" + getRowId.toString()).removeClass("zoomOutDown")
    }
    setTimeout(timeOut, 1000);
  });

  $("#finish").click(function() {
    $(".info").hide();
    $(".instruction").text("Step 2: Do as Step 1 ");
    $("#main").html("");
    nameFinder.makeState("secondStateCol", "secondState");
    nameFinder.makeBox("secondState");
    stateCond++;
  });

  $("#get-name").click(function() {
    nameFinder.makeState("thirdStateCol", "thirdState");
    $(this).hide();
    $("#name").show();
    $("#name").text(nameFinder.showName());
  });

  $("#close").click(function() {
    $(this).attr("href", window.location.href);
    $(".show-container").hide();
  });

});
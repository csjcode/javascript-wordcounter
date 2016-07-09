/*jslint browser: true*/
/*global window */

function getSelectedText() {

    "use strict";
    var text = "";

    if (window.getSelection !== "undefined") {
        text = window.getSelection().toString();
    } else if (document.selection !== "undefined" && document.selection.type === "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

function doSomethingWithSelectedText(sentenceIdRaw) {

    "use strict";
    var selectedText = getSelectedText();
    if (selectedText) {

        var selectedTextCount = selectedText.length;
        var selectedTextCountUnderscores = selectedTextCount + 1;
        var selectedTextBlanks = new Array(selectedTextCountUnderscores).join("_");
        selectedTextBlanks = selectedTextBlanks.slice(0, -1);

        var sentenceIdNum = sentenceIdRaw.replace(/sentence/, '');
        var sentenceText = document.getElementById(sentenceIdRaw).innerText;
        var sentenceTextNew = sentenceText.replace(selectedText,selectedTextBlanks);
        document.getElementById(sentenceIdRaw).innerText = sentenceTextNew + " ";
        var answerKeyNew = document.getElementById(sentenceIdRaw).innerText;


        var sentenceIndex = sentenceText.indexOf(selectedText);

        // Setup AnswerKey object to add to AnswerKey list
        objAnswerKey={};
        objAnswerKey.sentenceId = sentenceIdNum;
        objAnswerKey.wordIndex = sentenceIndex;
        objAnswerKey.selectedText = selectedText;

        arrAnswerKey.push(objAnswerKey);
        var AnswerKeyJSON = JSON.stringify(arrAnswerKey);
        arrAnswerKeyDisplay.push(sentenceIdNum + ':' + sentenceIndex + ' - ' + selectedText + '<br />');

        answerKey.innerHTML = arrAnswerKeyDisplay.join('');
        answerKeyJSON.innerHTML = '<h3>JSON:</h3>' + AnswerKeyJSON;

        return;
        // return selectedText;
    }

}


var arrAnswerKey = [];
var objAnswerKey = {};
var arrAnswerKeyDisplay = [];
var input = document.querySelectorAll('textarea')[0];

input.addEventListener('keyup', function() {

  var sentenceOutput ='';

  // counter logic

  characterCount.innerHTML = input.value.length;

  var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
  if(words){
    wordCount.innerHTML = words.length;
  } else {
    wordCount.innerHTML = 0;
  }
  // sentence count

  if(words){
    var sentences = input.value.split(/[.|!|?]+/g);
    sentenceCount.innerHTML = sentences.length;

    sentenceOutput = '<h4 align="center">Line-by-Line Sentence Output</h4>';
    var arrSentencesAll = [];

    // print sentences individually for Sentence output

    for (i=0; i < sentences.length; i++) {
      var i_adj_count = i+1;
      var currentCurrentSentence = sentences[i];

      currentCurrentSentence = currentCurrentSentence.replace(/\[[0-9]+\]/, '');

      var sentenceOutputOneLine = '<div class="individualSentence" id="sentence' + i + '"><b>[' + i_adj_count + ']</b> ' + currentCurrentSentence + '. </div>';

      arrSentencesAll.push(sentenceOutputOneLine);
    }

    var strSentencesAll = arrSentencesAll.join('');
    strSentencesAll = sentenceOutput + strSentencesAll;
    sentencesOutput.innerHTML = '<div id="sentenceLines">' + strSentencesAll + '</div>';

    var individualSentenceList = document.getElementsByClassName("individualSentence");
    var individualSentenceListCount = individualSentenceList.length;
    for (var k = 0; k <= individualSentenceListCount; k++) {
      document.getElementById("sentence"+k).addEventListener("mouseup",function(){doSomethingWithSelectedText(this.id);});
    }

    document.getElementById("textarea").disabled = true;

  } else {

    sentenceCount.innerHTML = 0;
  }

  // paragraph counter
  if (words) {
    var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }

  // proper nouns

  // reading time calc

  // keyword logic

});

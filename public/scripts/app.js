/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 
// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from tweets.json

// Test / driver code (temporary). Eventually will get this from the server.


function renderTweets(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(tweet of tweets) {
    $('#tweets').prepend(createTweetElement(tweet)); 
  }
  hideShowRetweet();
}

function composeButtonClick() {
  $('#compose')
    .on('click', function(event) {
      $(".new-tweet").slideToggle();
    $("#text").focus();
  });
}

function hideShowRetweet() {
  let $retweet = $(".retweet");
  $retweet.hide();
  $(".tweet-article")
    .hover( function(event) {
      $(this).find($retweet).show();
    },
    function(event) {
      $(this).find($retweet).hide();
    }
  );
}

$(document).ready(function() {
  composeButtonClick();
  $(".retweet").hide();
})

function loadTweets() {
  let tweets = $.get("/tweets", function(data) {
    renderTweets(data);
  });
}

function createTweetElement(tweeterObject) {
  let username = tweeterObject.user.name;
  let avatarLink = tweeterObject.user.avatars.small;
  let handle = tweeterObject.user.handle;
  let content = tweeterObject.content.text;
  let daysOld = moment(tweeterObject.created_at).fromNow();

  let $article = $(`<article class="tweet-article">
    <div style="position: relative">
      <header class="tweet-header">
        <div class="tweet-header-div" style="display: table;">
          <img class="smile" src="${avatarLink}">
          <span class="fullname"><p>${username}</p></span>
          <span class="handle"><p>${handle}</p></span>
        </div>
      </header>
      <div>
        <h3 class="tweet-message">${content}
        </h3>
        </div>
      <footer class="tweet-footer">
        <span class="age" class="age">${daysOld}</span>
        <img class="retweet" src="/images/retweet.png">
      </footer>
      </div>
    </article>
    `);
  return $article
};

// Submit button with validation
$(function() {
  var $button = $('#tweet-form');
  $button.on('submit', function (event) {
    event.preventDefault();
    
    let $inputStr = $("#text");
    let inputStr = $inputStr.val();
    if(inputStr === null || inputStr.length === 0) {
      renderError("*Error: Please enter a tweet.");
      return;
    }
    if(inputStr.length > 140) {
      renderError("*Error: Tweet more than 140 characters.");
      return;
    }

    // clear text and ajax call with new tweet content
    renderError("");
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    })
      .done(function(newTweet) {
        loadTweets([newTweet]);
      })
      $inputStr.val("");
      $("#counter").text("0");
  });
})

// display error message below input box
function renderError(errorString) {
  if(errorString.length === 0) {
    $("#error-message").slideUp();
  } else {
    $("#error-message").slideDown();
  }
  $("#error-message").text(errorString);
}

// async call to fetch the tweets
$.ajax({
  method: "GET",
  url: "/tweets",
})
  .done(function(newTweet) {
    renderError("");
    renderTweets(newTweet)
  })


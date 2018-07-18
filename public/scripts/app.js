/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 
// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from tweets.json

// Test / driver code (temporary). Eventually will get this from the server.

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for(tweet of tweets) {
      $('#tweets').append(createTweetElement(tweet)); 
    }
}


$(document).ready(function() {
  renderTweets(data);
})

function createTweetElement(tweeterObject) {
  let username = tweeterObject.user.name;
  let avatarLink = tweeterObject.user.avatars.small;
  let handle = tweeterObject.user.handle;
  let content = tweeterObject.content.text;
//  let daysOld = moment(tweeterObject.created_at).fromNow();
  let daysOld = tweeterObject.created_at;

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
      </footer>
      </div>
    </article>
    `);
 return $article
};


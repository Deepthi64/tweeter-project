/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behaviour
    // Code to handle the form submission using AJAX
    
    const tweetData = $(this).serialize(); // Serialize the form data into a query string
   
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetData
    })
    .then(function(response) {
      console.log('Tweet submitted:', response);
      // Code to update the UI with the new tweet
    })
    .catch(function(error) {
      console.error('Error submitting tweet:', error);
    });
  });
});
 

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet-container");
  
  let $header = $("<header>");
  let $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars);
  let $name = $("<h2>").text(tweet.user.name);
  let $handle = $("<p>").addClass("handle").text(tweet.user.handle);
  
  $header.append($avatar).append($name).append($handle);
  
  let $content = $("<div>").addClass("userTweet");
  let $text = $("<p>").text(tweet.content.text);
  
  $content.append($text);
  
  let $footer = $("<footer>").addClass("footer");
  let $timeAgo = $("<span>").addClass("timestamp").text(moment(tweet.created_at).fromNow());
  let $heart = $("<i>").addClass("fas fa-heart");
  let $retweet = $("<i>").addClass("fas fa-retweet");
  let $flag = $("<i>").addClass("fas fa-flag");
  
  $footer.append($timeAgo).append($heart).append($retweet).append($flag);
  
  $tweet.append($header).append($content).append($footer);
  
  return $tweet;
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

renderTweets(tweetData);
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(error) {
        console.error(error);
      }
    });
  };
  
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();

    const $error = $(this).find('.error-msg');
    $error.hide(); 
    // Code to handle the form submission using AJAX
    const tweetText = $(this).find('textarea').val().trim(); 
    const maxLength = 140;
    
    // Check if the tweet is empty or exceeds the maximum length
    if (!tweetText) {
      $error.text('Error: Your tweet cannot be empty').slideDown();
    } else if (tweetText.length > maxLength) {
      $error.text('Error: Your tweet is too long').slideDown(); 
    } else {
      const tweetData = $(this).serialize(); 
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetData
    })
    .then(function(response) {
      $(this).find('textarea').val(''); 
      $(this).find('.counter').text(maxLength); 
       loadTweets();
       $error.hide();
    })
    .catch(function(error) {
      console.error('Error submitting tweet:', error);
    });
  }
  loadTweets();
});




const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet-container");
  let $header = $("<span>").addClass("tweetHeader");
  let $avatar = $("<img/>").addClass("avatar").attr("src", tweet.user.avatars);
  let $name = $("<h2>").text(tweet.user.name);
  let $handle = $("<p1>").addClass("handle").text(tweet.user.handle);
  let $span = $("<span>").addClass("avatarNameContainer");
  $span.append($avatar).append($name);
  $header.append($span).append($handle);
  let $content = $("<div>").addClass("userTweet");
  let $text = $("<p>").text(tweet.content.text);
  $content.append($text);
  let $footer = $("<footer>").addClass("footer");
  let $timeAgo = $("<span>").addClass("timestamp").text(moment(tweet.created_at).fromNow());
  let $iconSpan = $("<span>");
  let $heart = $("<i>").addClass("fas fa-heart");
  let $retweet = $("<i>").addClass("fas fa-retweet");
  let $flag = $("<i>").addClass("fas fa-flag");
  $iconSpan.append($heart).append($retweet).append($flag);
  $footer.append($timeAgo).append($iconSpan);
   $tweet.append($header).append($content).append($footer);
   return $tweet;
}

const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweets-container');
  $tweetsContainer.empty(); 

  tweets.forEach(function(tweet) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  });
}

});

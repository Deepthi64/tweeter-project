

$(document).ready(function() {
  $(`#tweet-text`).on('input', function() {
    const $textarea = $(`#tweet-text`);
    const inputLength = $textarea.val().length;
    const maxLength = 140;
    const remainingChars = maxLength - inputLength;
    const $counter = $(this).siblings('.button-counter').find('.counter');
    
    $counter.text(remainingChars);
    
    if (remainingChars < 0) {
      $counter.addClass('counter-red');
    } else {
      $counter.removeClass('counter-red');
    }
  });
});
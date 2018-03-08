$(document).ready(function() {
  var quote;
  var author;

  function getNewQuote() {
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      // JSONP used because of google protection
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      },
      success: function(response) {
        // console.log(response);
        quote = response.quoteText;
        author = response.quoteAuthor;
        $("#quote").text('"' + quote + '"');
        if (author) {
          $("#author").text("said by " + author);
        } else {
          $("#author").text("-unknown");
        }
      }
    });
  }
  getNewQuote();

  $(".get-quote").on("click", function(event) {
    event.preventDefault();
    getNewQuote();

    $(".quote-box")
      .fadeOut("fast")
      .fadeIn("slow");
  });

  $(".share-quote").on("click", function(event) {
    event.preventDefault();
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(
          '"' +
            quote +
            '"' +
            " - " +
            author +
            "- share with Memento by Seke Nikola"
        ),
      "twitter-popup",
      "height=350,width=600"
    );
  });
});
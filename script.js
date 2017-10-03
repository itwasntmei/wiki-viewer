$(document).ready(function() {

  $('#wiki-form input').keypress(function(e) {
    if (e.which == 13) {
      var query = $('input').val();
      if ($.trim(query) == '') {
        $('.no-words').addClass('appear');
      } else {
        $('.no-words').removeClass('appear');
        $('#results').empty();
        var requestURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0&origin=*&search=' + query;
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
          var queries = request.response;
          getQueries(queries);
          $('#contain').addClass('slide');
          setTimeout(function() {
            $('#swiper').addClass('appear');
          }, 400);

        }
      }
    }
  });

  $('#swiper').on('click', function() {
    $('#swiper').removeClass('appear');
    $('#contain').removeClass('slide');
  });

});

function getQueries(jsonObj) {
  $('#results').append('<h1>Results for <b>' + jsonObj[0] + '</b>');

  var getQ = jsonObj[1];
  var holder;

  for (var i = 0; i < getQ.length; i++) {
    holder = '<div class="result">';
    holder += '<h2><a href="' + jsonObj[3][i] + '" target="_blank">' + getQ[i] +
      '</a></h2>';
    holder += '<h6>' + jsonObj[2][i] + '</h6>';
    holder += '</div>';
    $('#results').append(holder);
  }
}

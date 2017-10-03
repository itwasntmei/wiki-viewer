$(document).ready(function() {

  $('#wiki-form input').keypress(function(e) {
    if (e.which == 13) {
      $('#results').empty();
      var query = $('input').val();
      var requestURL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&srwhat=text&srprop=snippet&origin=*&list=search&continue=&srsearch=' + query;
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();
      request.onload = function () {
        var queries = request.response;
        getQueries(queries);
      }
    }
  });
});

function getQueries (jsonObj) {
  var getQ = jsonObj['query']['search'];
  var holder;

  for (var i = 0; i < getQ.length; i++) {
    holder = '<div class="result">';
    holder += '<h2>' + getQ[i]['title'] + '</h2>';
    holder += '<h6>' + getQ[i]['snippet'] + '</h6>';
    holder += '</div>';
    $('#results').append(holder);
  }
}

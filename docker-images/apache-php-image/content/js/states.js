$(function() {
  console.log("Loading states");

  function loadStates() {
    $.getJSON( "/api/states/", function ( states ) {
            console.log(states);
            var message = "No state here";
            if ( states.length > 0 ) {
                    message = states[0].state + ", " + states[0].country;
            }
            $(".state-message").text(message);
    });
  };
  loadStates();
  setInterval(loadStates, 2000);
});
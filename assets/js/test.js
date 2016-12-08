$(document).ready(function () {
  $('.dropdown__state').click(function () {
    $('.dropdown__list').toggleClass("active","active");
  });
    $('.subscribe__cat').select2({
      minimumResultsForSearch: Infinity
    });



    $('.rater').rate({
        max_value: 5,
        step_size: 0.5,
        initial_value: 3.5});

});


$(document).ready(function () {
  var forms = $('#subscribe');
  forms.validate({
    rules: {
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      email: {
        required: 'Корректный адрес email имеет формат author@mail.com.',
        email: 'Корректный адрес email имеет формат author@mail.com.'
      }
    }
  });
});

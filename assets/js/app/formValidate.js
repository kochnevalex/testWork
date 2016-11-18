$(document).ready(function () {
  var forms = $('#subscribe');
    forms.validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        'test[]': {
          required: true,
          maxlength: 2
        }
      },
      messages: {
        email: {
          required: 'Корректный адрес email имеет формат author@mail.com.',
          email: 'Корректный адрес email имеет формат author@mail.com.'
        },
        'test[]': {
          required: "You must check at least 1 box",
          maxlength: "Check no more than {0} boxes"
        }
      },
      submitHandler: function (form) { // for demo
        alert('valid form submitted'); // for demo
        return false; // for demo
      }
    });
});
(function() {
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.blob();
  }
  $(document).ready(function() {
    /* ひらがな \u3040-\u309f */
    /* カタカナ \u30a0-\u30ff */
    /* var inputregex = /^[\u3400-\u4dbf\u4e00-\u9faf]+$/; */
    var inputregex = /^[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]+$/;

    $('.gkysform').submit(function(e) {
      e.preventDefault();
      var ucs = '';
      var kanji = $('input[name=kanji]').val().split('');
      kanji.forEach(k => {
        ucs += '0' + k.charCodeAt(0).toString(16) + '|';
      });
      fetch('https://api.kanjiplusone.com/gkys/', {
          method: 'POST',
          body: 'ucs=' + ucs,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then(handleErrors)
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "kanjiplusone.pdf";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox                       
        a.click();
        a.remove(); //afterwards we remove the element again           
      });
    });
  });
}.call(this));


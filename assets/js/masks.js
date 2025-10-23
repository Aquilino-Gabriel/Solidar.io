// masks.js — máscara simples, sem dependências
(function () {
  function setInputFilter(textbox, inputFilter) {
    ["input","keydown","keyup","mousedown","mouseup","select","contextmenu","drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }

  function maskCPF(v){
    return v
      .replace(/\D/g,'')
      .replace(/(\d{3})(\d)/,'$1.$2')
      .replace(/(\d{3})(\d)/,'$1.$2')
      .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
      .slice(0,14);
  }

  function maskTel(v){
    v = v.replace(/\D/g,'');
    if (v.length <= 10) {
      return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').slice(0,13);
    }
    return v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3').slice(0,14);
  }

  function maskCEP(v){
    return v.replace(/\D/g,'').replace(/(\d{5})(\d{1,3})/, '$1-$2').slice(0,9);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');

    if (cpf) cpf.addEventListener('input', function(e){ e.target.value = maskCPF(e.target.value); });
    if (tel) tel.addEventListener('input', function(e){ e.target.value = maskTel(e.target.value); });
    if (cep) cep.addEventListener('input', function(e){ e.target.value = maskCEP(e.target.value); });

    // Impor padrões para validação nativa
    if (cpf) cpf.addEventListener('blur', function(e){
      cpf.setAttribute('pattern', '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}');
    });
    if (cep) cep.addEventListener('blur', function(e){
      cep.setAttribute('pattern', '\\d{5}-\\d{3}');
    });
  });
})();

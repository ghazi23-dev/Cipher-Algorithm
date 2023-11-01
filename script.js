document.addEventListener('DOMContentLoaded', function () {
  const keyInput = document.getElementById('key');
  const KeyOutput = document.getElementById('keyDecryption');
  const fileInput = document.getElementById('fileInput');
  const fileOutput = document.getElementById('fileInputDecryption');
  const encryptButton = document.getElementById('encryptButton');
  const decryptButton = document.getElementById('decryptButton');
  const downloadLink = document.getElementById('downloadLink');
  const downloadLinkDecr = document.getElementById('downloadLinkDecryption');
  const resultDiv = document.getElementById('result');
  const resultDecryptionDiv = document.getElementById('resultDecryption');
  const chiffrementTab = document.getElementById('chiffrementTab');
  const dechiffrementTab = document.getElementById('dechiffrementTab');
  const cryptographieTab = document.getElementById('cryptographieTab');
  const cryptanalyseButton = document.getElementById('cryptanalyseBtn');
  const fileCryptAnalyse = document.getElementById('fileCryptanalyse');
  const resultCryptanalyse = document.getElementById('resultCryptanalyse');
  const inputkey = document.getElementById('key');

  // ENCRYPTED BUTTON EVENT 
  encryptButton.addEventListener('click', function () {
    const key = parseInt(keyInput.value);
    const file = fileInput.files[0];

    if (!file || isNaN(key) || key<0 || key>25) {
      alert('Veuillez entrer le clé de chiffrement Correcte Ou sélectionner un fichier.');
      return;
    }
 // ALert Function 

    const reader = new FileReader();

    reader.onload = function () {
      const text = reader.result;
      const encryptedText = caesarCipher(text, key);
      resultDiv.textContent = encryptedText;
      downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(encryptedText);
      downloadLink.style.display = 'block';
    };

    reader.readAsText(file);
  });
  // DECRYPT BUTTON EVENT LISTENER 

  decryptButton.addEventListener('click', function () {
    const key = parseInt(KeyOutput.value);
    const file = fileOutput.files[0];

    if (!file || isNaN(key)) {
      alert('Veuillez entrer une clé de déchiffrement et sélectionner un fichier.');
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const text = reader.result;
      const decryptedText = caesarDecipher(text, key);
      resultDecryptionDiv.textContent = decryptedText;
      downloadLinkDecr.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(decryptedText);
      downloadLinkDecr.style.display = 'block';
    };

    reader.readAsText(file);
  });


  // CRYPTANALYSE 


  function cryptanalyse(text) {
    let decryptedText = '';

    for (let shift = 1; shift <= 25; shift++) {
      let currentAttempt = '';
      for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        if (/[a-zA-Z]/.test(char)) {
          const isUpperCase = char === char.toUpperCase();
          const alphabetStart = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
          const newCharCode = ((char.charCodeAt(0) - alphabetStart - shift + 26) % 26) + alphabetStart;
          const shiftedChar = String.fromCharCode(newCharCode);
          currentAttempt += shiftedChar;
        } else {
          currentAttempt += char;
        }
      }
      decryptedText += `Attempt ${shift}: ${currentAttempt}\n`;
      const words = currentAttempt.split(/\s+/);


    }

    return decryptedText;
  }


  // Cryptanalyse Event PART 

  cryptanalyseButton.addEventListener('click', function () {
    const file = fileCryptAnalyse.files[0];

    if (!file) {
      alert('Veuillez entrer un fichier.');
      return;
    } else {
      const reader = new FileReader();

      reader.onload = function () {
        const text = reader.result;
        const decryptedText = cryptanalyse(text);
        downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(decryptedText);
        downloadLink.style.display = 'block';
      };

      reader.readAsText(file);
    }
  });



  // TAB PAGES EVENTS 

  chiffrementTab.addEventListener('click', function (e) {
    e.preventDefault();
    chiffrementView.style.display = 'block';
    dechiffrementView.style.display = 'none';
    cryptanalyseview.style.display = 'none';
  });

  dechiffrementTab.addEventListener('click', function (e) {
    e.preventDefault();
    dechiffrementView.style.display = 'block';
    chiffrementView.style.display = 'none';
    cryptanalyseview.style.display = 'none';
  });

  cryptographieTab.addEventListener('click', function (e) {
    e.preventDefault();
    chiffrementView.style.display = 'none';
    dechiffrementView.style.display = 'none';
    cryptanalyseview.style.display = 'block';
  });

  ////////////////////// TAB PAGES EVENTS END /////////////////////////////

  // FUNCTIONS 

  function caesarCipher(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();

      if (alphabet.includes(char)) {
        const index = (alphabet.indexOf(char) + key) % 26;
        const encryptedChar = alphabet[index];
        result += encryptedChar;
      } else {
        result += text[i];
      }
    }

    return result;
  }




  function caesarDecipher(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let resultDechifrer = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();

      if (alphabet.includes(char)) {
        let index = (alphabet.indexOf(char) - key) % 26;
        if (index < 0) {
          index += 26;
        }
        const decryptedChar = alphabet[index];
        resultDechifrer += decryptedChar;
      } else {
        resultDechifrer += text[i];
      }
    }

    return resultDechifrer;


  }

  function cryptanalyse(text) {
    let decryptedText = '';

    for (let shift = 1; shift <= 25; shift++) {
      let currentAttempt = '';
      for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        if (/[a-zA-Z]/.test(char)) {
          const isUpperCase = char === char.toUpperCase();
          const alphabetStart = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
          const newCharCode = ((char.charCodeAt(0) - alphabetStart - shift + 26) % 26) + alphabetStart;
          const shiftedChar = String.fromCharCode(newCharCode);
          currentAttempt += shiftedChar;
        } else {
          currentAttempt += char;
        }
      }
      decryptedText += `Attempt ${shift}: ${currentAttempt}\n`;
      resultCryptanalyse.innerHTML = decryptedText.replace(/\n/g, '<br>') + '<br>';


    }

    return decryptedText;
  }
});
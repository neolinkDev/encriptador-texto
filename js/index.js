

// `$` hace referencia a que es una varibale del DOM

const d = document;

const encryptionRules = {
  'a': 'ai',
  'e': 'enter',
  'i': 'imes',
  'o': 'ober',
  'u': 'ufat'
};


function encryptText() {

  // elementos del DOM
  const $text = d.querySelector('#text').value;
  const $image = d.querySelector('#image');
  const $heading = d.querySelector('#h3');
  const $displayEncryptText = d.querySelector('#p');
  const $sectionDecrypt = d.querySelector('#section-decrypt');
  
  let encryptText = '';

  for (let i = 0; i < $text.length; i++) {

    let character = $text[i];

    if (encryptionRules.hasOwnProperty(character)) {

      encryptText += encryptionRules[character];

    } else {

      encryptText += character;
    }
  }

  console.log(encryptText)
  

  $image.style.display = 'none';
  $heading.style.display = 'none';
  $displayEncryptText.style.fontSize = '24px';
  $displayEncryptText.style.color = '#495057';
  $displayEncryptText.style.textAlign = 'left';
  $sectionDecrypt.style.display = 'block';
  // $displayEncryptText.innerHTML = encryptText;
  setElementText($displayEncryptText, encryptText)
  

  // return encryptText;
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {string} text 
 */
function setElementText(element, text) {
  element.innerHTML = text;
}


// `$` hace referencia a que es una varibale del DOM

const d = document;

const encryptionRules = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat',
};

function encryptText() {

  // elementos del DOM
  let $text = d.querySelector('#text').value;

  const $displayEncryptText = d.querySelector('#p');
  const $containerMessage = d.querySelector('#container-message');
  const $containerTextDecrypt = d.querySelector('#container-textDecrypt');

  // Validaciones
  if (!textareaValidation($text)) return;
  
  let encryptText = '';

  // iteramos el texto ingresado
  for (let i = 0; i < $text.length; i++) {

    let character = $text[i];

    // válida si el caracter existe en el objeto para aplicar la regla de encriptación
    if (encryptionRules.hasOwnProperty(character)) {
      encryptText += encryptionRules[character];
    } else {
      encryptText += character;
    }
  }

  console.log(encryptText);
  
  $containerMessage.style.display = 'none';
  $containerTextDecrypt.style.display = 'flex';
  $displayEncryptText.style.fontSize = '24px';
  $displayEncryptText.style.color = '#495057';
  $displayEncryptText.style.textAlign = 'left';
  $displayEncryptText.innerHTML = encryptText;
  setElementText($displayEncryptText, encryptText);
  $text = d.querySelector('#text').value = '';

  // return encryptText;
}

/**
 * establece el texto de un elemento
 * 
 * @param {HTMLElement} element
 * @param {string} text
 */
function setElementText(element, text) {
  element.innerHTML = text;
}

/**
 *  validaciones
 * 
 * @param {string} text
 * @returns {boolean}
 */
function textareaValidation(text) {
  
  const $warning = d.querySelector('#warning');

  /* 
      Expresión regular
      - '^' y '$' indican el inicio y el final de la cadena respectivamente.
      - '[a-z\s]' significa cualquier letra minúscula de la 'a' a la 'z' o un 'espacio'.
      - '+' indica que el patrón debe aparecer una o más veces.
  */
  const lowerCaseWithoutAccents = /^[a-z\s]+$/;

  // válida que el textarea no este vacío
  if (!text || text.trim() === '') {
    console.error('El campo de texto está vacío');
    setElementText($warning, 'El campo de texto está vacío');
    return false;
  }

  // válida que el textarea solo acepte letras minúsculas y sin acento
  if (!lowerCaseWithoutAccents.test(text)) {
    console.error('Solo letras minúsculas y sin acento');
    setElementText($warning, 'Solo letras minúsculas y sin acento');
    return false;
  }

  return true;
}

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
  const $text = d.querySelector('#text').value;
  const $image = d.querySelector('#image');
  const $heading = d.querySelector('#h3');
  const $displayEncryptText = d.querySelector('#p');
  const $sectionDecrypt = d.querySelector('#section-decrypt');

  // Validaciones
  if (!validations($text)) return;
  
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

  $image.style.display = 'none';
  $heading.style.display = 'none';
  $displayEncryptText.style.fontSize = '24px';
  $displayEncryptText.style.color = '#495057';
  $displayEncryptText.style.textAlign = 'left';
  $sectionDecrypt.style.display = 'block';
  // $displayEncryptText.innerHTML = encryptText;
  setElementText($displayEncryptText, encryptText);

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
function validations(text) {
  
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

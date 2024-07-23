// `$` hace referencia a que es una varibale del DOM

const d = document;

const encryptionRules = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat',
};

const decryptionRules = {
  ai: 'a',
  enter: 'e',
  imes: 'i',
  ober: 'o',
  ufat: 'u',
};

/**
 * Encripta el texto ingresado
 */
function encryptText() {
  // elementos del DOM
  let $text = d.querySelector('#text').value;
  const $warning = getWarningElement();

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

  updateDOMElements(encryptText);
  setElementText($warning, 'Texto encriptado')
}

/**
 * Desencripta el texto 
 */
function decryptText() {

  // elementos del DOM
  let $text = d.querySelector('#text').value;
  const $warning = getWarningElement();

  // Validaciones
  if (!textareaValidation($text)) return;

  // devuelve un array de keys que iteramos
  Object.keys(decryptionRules).forEach((char) => {

    // define el patrón de busqueda con la variable `char` que son las `key` del objeto `decryptionRules`
    const regex = new RegExp(char, 'g');

    // `replace` busca en el texto todas las ocurrencias que coincidan con la `regex` y las reemplaza con el valor del segundo argumento que son las reglas de desencriptación
    $text = $text.replace(regex, decryptionRules[char]);
  });

  updateDOMElements($text);
  setElementText($warning, 'Texto desencriptado')
}

/**
 * Copia al portapales el texto encriptado/desencriptado
 */
function copyButton() {
  const $copyTextElement = document.getElementById('p');
  const $copyText = $copyTextElement.innerText;
  const $warning = getWarningElement();

  // Crear un objeto Range
  const range = document.createRange();

  // Seleccionar el contenido del nodo:
  range.selectNodeContents($copyTextElement);

  // Obtener la selección actual
  const selection = window.getSelection();

  // Limpiar cualquier selección existente
  selection.removeAllRanges();

  // Añadir el nuevo rango a la selección
  selection.addRange(range);

  // `try/catch` captura errores inmediatos que ocurren al intentar utilizar la Clipboard API.
  try {
    navigator.clipboard
      .writeText($copyText)
      // `then/catch` captura errores que ocurren después de que la llamada a la API se haya iniciado y devuelve una promesa que se rechaza.
      .then(() => {
        console.log('Texto copiado al portapapeles');
        setElementText($warning, 'Texto copiado al portapapeles');
      })
      .catch((err) => {
        console.error('Error al copiar el texto: ', err);
        // Fallback para dispositivos que no soportan la API del portapapeles
        document.execCommand('copy');
      });
  } catch (err) {
    console.error('Error al intentar usar la API del portapapeles: ', err);
    // Fallback para dispositivos que no soportan la API del portapapeles
    document.execCommand('copy');
    setElementText($warning, 'Texto copiado al portapapeles');
  }
}

/**
 *  validaciones
 *
 * @param {string} text
 * @returns {boolean}
 */
function textareaValidation(text) {
  const $warning = getWarningElement();

  /* 
      Expresión regular:
      
      ^: Indica el inicio de la cadena.
      [a-zñ\s,\.!¡¿?]: Un conjunto de caracteres permitidos. Esto incluye:
      a-z: Cualquier letra minúscula de la 'a' a la 'z'.
      ñ: La letra 'ñ'.
      \s: Cualquier carácter de espacio en blanco.
      ,\.!¡¿?: Los caracteres ,, ., !, ¡, ¿, y ?. El punto . se escapa con \ porque el punto tiene un significado especial en las expresiones regulares (coincide con cualquier carácter excepto un salto de línea).
      +: Indica que el patrón anterior (el conjunto de caracteres) debe aparecer una o más veces.
      $: Indica el final de la cadena.
  */
  const lowerCaseWithoutAccents = /^[a-zñ\s,\.!¡¿?]+$/;

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

/**
 * Actualiza los elementos del DOM que se muestran en pantalla
 * 
 * @param {string} text
 */
function updateDOMElements(text) {
  // Selecciona y actualiza los elementos del DOM
  const displayEncryptText = d.querySelector('#p');
  const containerMessage = d.querySelector('#container-message');
  const containerTextDecrypt = d.querySelector('#container-textDecrypt');

  // Configura los estilos y actualiza el contenido HTML
  containerMessage.style.display = 'none';
  containerTextDecrypt.style.display = 'flex';
  displayEncryptText.style.fontSize = '24px';
  displayEncryptText.style.color = '#495057';
  displayEncryptText.style.textAlign = 'left';
  displayEncryptText.innerHTML = text;
  setElementText(displayEncryptText, text);

  // Limpia el textarea
  d.querySelector('#text').value = '';
}

/**
 * Establece el texto de un elemento
 *
 * @param {HTMLElement} element
 * @param {string} text
 */
function setElementText(element, text) {
  element.innerHTML = text;
}

/**
 * obtiene el elemento html con el id warning
 * @returns {HTMLParagraphElement}
 */
function getWarningElement() {
  return document.getElementById('warning');
}

/**
 * Muestra el año actual en el footer
 */
const yearFn = () => {
  const $year = d.getElementById('year');
  const currentYear = new Date().getFullYear();
  $year.textContent = currentYear;
};

yearFn();

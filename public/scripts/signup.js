function updateCharacterCount() {
    const inputField = document.getElementById("username");
    const charCountDisplay = document.getElementById("char-count");
    const maxLength = inputField.getAttribute("maxlength");
    const currentLength = inputField.value.length;
    
    // Atualiza o texto do contador de caracteres
    charCountDisplay.textContent = `${currentLength}/${maxLength}`;
}
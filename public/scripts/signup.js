// REGISTRAR NOVOS USUÁRIOS
function register() {
    firebase.auth().createUserWithEmailAndPassword(form.email().value, form.password().value)
    .then(response => {
        const userCreateSuccess = document.getElementById('user-create-message');
        userCreateSuccess.style.display = 'flex';

        setTimeout(() => {
            userCreateSuccess.style.display = 'none';
        }, 2800);

    }).catch(error => {
        const userCreateError = document.getElementById('user-create-error');
        userCreateError.style.display = 'flex';

        setTimeout(() => {
            userCreateError.style.display = 'none';
        }, 2800);
        resetForm();
    });
}

// REINICIAR FORMULÁRIO
function resetForm() {
    form.email().value = "";
    form.password().value = "";
    form.confirmPassword().value = "";
    form.createButton().disabled = true;
}

//  MENSAGEM DE ERRO FIREBASE
function getErrorMessage(error) {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "Este email já está em uso.";
        case "auth/invalid-email":
            return "O email fornecido é inválido.";
        case "auth/weak-password":
            return "A senha deve ter pelo menos 6 caracteres.";
        case "auth/network-request-failed":
            return "Falha de rede detectada. Verifique sua conexão com a internet e tente novamente.";
        default:
            return "Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.";
    }
}

// MODAL POLITICA DE PRIVACIDAD
const open = document.getElementById('open-privacy-modal');
const close = document.getElementById('close-privacy-modal');
const modal = document.getElementById('privacy-modal');

open.addEventListener('click', () => {
    modal.style.display = 'flex';
})

close.addEventListener('click', () => {
    modal.style.display = 'none';
});

// VALIDACIÓN DE FORMULARIO
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErros();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErros();
    validadePasswordsMatch();
}

const form = {
    createButton: () => document.getElementById("create-button"),
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    password: () => document.getElementById("password"),
    confirmPassword: () => document.getElementById("confirmPassword"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    PasswordLengthError: () => document.querySelectorAll("password-min-length-error"),
    PasswordDoesntMatchError: () => document.getElementById("password-doesnt-match-error")
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }

    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }

    return true;
}

function toggleEmailErros() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "flex";
    form.email().style.border = email ? "none" : ".1rem solid #D14D72";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "flex";
    form.email().style.border = validateEmail(email) ? "none" : ".1rem solid #D14D72";
}

function togglePasswordErros() {
    const password = form.password().value;

    form.passwordRequiredError().style.display = password ? "none" : "flex";
    form.password().style.border = password ? "none" : ".1rem solid #D14D72";

    document.getElementById('password-min-length-error').style.display = password.length >= 8 ? "none" : "flex";
    form.password().style.border = password.length >= 8 ? "none" : ".1rem solid #D14D72";
    form.confirmPassword().style.border = password.length >= 8 ? "none" : ".1rem solid #D14D72";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();
    form.createButton().disabled = !emailValid || !passwordValid;
}

function updateCharacterCount(inputField) {
    const charCountDisplay = inputField.parentElement.querySelector(".char-count");
    const maxLength = inputField.getAttribute("maxlength");
    const currentLength = inputField.value.length;
    
    charCountDisplay.textContent = `${currentLength}/${maxLength}`;
}

function onChangeConfirmPassword() {
    validadePasswordsMatch();
}

function validadePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    const passwordsMatch = password === confirmPassword;
    form.confirmPassword().style.border = passwordsMatch ? "none" : ".1rem solid #D14D72";
    form.PasswordDoesntMatchError().style.display = passwordsMatch ? "none" : "flex";
    form.createButton().disabled = !passwordsMatch;
}
// MOSTRAR SENHA
let a;
function showPassword() {
    if(a == 1) {
        document.getElementById("password").type="password";
        document.getElementById("password-icon").name="eye-off-outline";
        a = 0;
    } else {
        document.getElementById("password").type="text";
        document.getElementById("password-icon").name="eye-outline";
        a = 1;
    }
}
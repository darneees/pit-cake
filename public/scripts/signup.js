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

function updateCharacterCount(inputField) {
    const charCountDisplay = inputField.parentElement.querySelector(".char-count");
    const maxLength = inputField.getAttribute("maxlength");
    const currentLength = inputField.value.length;
    
    charCountDisplay.textContent = `${currentLength}/${maxLength}`;
}

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

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    form.email().style.border = email ? "none" : ".1rem solid #D14D72";
    form.email().style.border = validateEmail(email) ? "none" : ".1rem solid #D14D72";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function register() {
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        const success = document.getElementById('user-create-message');
        success.style.display = 'flex';

        setTimeout(() => {
            success.style.display = 'none';
            window.location.href = "appView.html";
        }, 2800);

        cleanRegister();
    }).catch(error => {
        alert(getErrorMessage(error));

        cleanRegister();
    })
}

function cleanRegister() {
    form.email().value = '';
    form.password().value = '';
    form.confirmPassword().value = '';
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    if (error.code == "auth/invalid-email") {
        return "Email inválido";
    }
    return error.message;
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    
    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
    
    form.password().style.border = password.length >= 8 ? "none" : ".1rem solid #D14D72";
    form.confirmPassword().style.border = password.length >= 8 ? "none" : ".1rem solid #D14D72";

}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}
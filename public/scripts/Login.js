function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErros();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErros();
}

function login() {
    firebase.auth().signInWithEmailAndPassword(
    form.email().value, 
    form.password().value)
    .then(response => {
        window.location.href = "appView.html";
    })
    .catch(error => {
        const userMessageEror = document.getElementById("user-message-error");
        userMessageEror.style.display = "flex";

        setTimeout(() => {
            userMessageEror.style.display = "none";
        }, 2800);
        cleanInputs();
    });
}

function cleanInputs() {
    form.email().value = "";
    form.password().value = "";
}

function recoverPassword() {
    firebase.auth().sendPasswordResetEmail(form.email().value)
    .then(() => {
        const userMessageSuccess = document.getElementById("user-message-sucess");
        userMessageSuccess.style.display = "flex";

        setTimeout(() => {
            userMessageSuccess.style.display = "none";
        }, 2800);
        cleanInputs();
    })
    .catch(error => {
        const userMessageEror = document.getElementById("user-message-error");
        userMessageEror.style.display = "flex";
        cleanInputs();

        setTimeout(() => {
            userMessageEror.style.display = "none";
        }, 2800);
    });
}

// VALIDACIÓN DE FORMULARIO
const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button")
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
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;
    
    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
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
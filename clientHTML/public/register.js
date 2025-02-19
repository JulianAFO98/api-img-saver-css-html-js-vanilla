const inputConfirmPass = document.getElementById("confirm_password");
const inputPass = document.getElementById("password");
const inputEmail = document.getElementById("email");
const inputUsername = document.getElementById("username");
const regForm = document.getElementById("reg-form")


const hasDifferentChars = (password) => {
    const specialPatterns = /[^A-Za-z0-9]/;
    const normalPatters = /[A-Za-z]/;
    const numbers = /\d/;
    return specialPatterns.test(password) && normalPatters.test(password) && numbers.test(password);

}
const isValidPass = (password) => {
    return hasDifferentChars(password) && password.length >= 8
}

const isPassSecure = () => {
    const password = inputPass.value;
    const errId = "error-password-validation";
    const errMsg = "Passwords is too insecure(length:8,1char,1 number,1 special char)";
    if (!isValidPass(password)) {
        showErrorMsg(errId, errMsg, inputPass);
    } else {
        document.getElementById(errId)?.remove();
    }
}

const arePassSimilar = () => {
    return inputPass.value === inputConfirmPass.value
}

const validatePasswords = () => {
    const errId = "error-password-confirm";
    const errMsg = "Passwords have to be similar";
    if (!arePassSimilar()) {
        showErrorMsg(errId, errMsg, inputConfirmPass);
    } else {
        document.getElementById(errId)?.remove();
    }
}


const showErrorMsg = (id, msg, referencia) => {
    let pError = document.getElementById(id);
    if (!pError) {
        pError = document.createElement("p");
        pError.className = "form-error";
        pError.id = id;
        pError.textContent = msg;
        referencia.insertAdjacentElement("afterend", pError);
    }
};


inputConfirmPass.addEventListener("change", () => {
    validatePasswords();
});

inputPass.addEventListener("change", () => {
    isPassSecure();
    validatePasswords();
})

inputUsername.addEventListener("input", () => {
    document.getElementById("user-exist")?.remove();
});

inputEmail.addEventListener("input", () => {
    document.getElementById("email-exist")?.remove();
});

const showFormError = () => {
    alert("Please fill the data correctly");
}


const parseData = () => {
    const urlEncodedData = new URLSearchParams();
    const formElements = regForm.elements;

    for (const element of formElements) {
        if (element.nodeName === "INPUT") {
            urlEncodedData.append(element.name, element.value);
        }
    }
    return urlEncodedData;
}



regForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const urlEncodedData = parseData();
    const password = inputPass.value;

    if (isValidPass(password) && arePassSimilar()) {
        try {
            const response = await fetch("/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: urlEncodedData
            });

            if (response.ok) {
                window.location.href = "/"
            } else if (response.status === 400) {
                let errId;
                let errMsg;
                const data = await response.json();
                if (data.msg === "El usuario ya existe") {
                    errId = "user-exist";
                    errMsg = "User already taken";
                    showErrorMsg(errId, errMsg, inputUsername);
                } else {
                    errId = "email-exist";
                    errMsg = "The email is already taken";
                    showErrorMsg(errId, errMsg, inputEmail);
                }
            } else if (response.status === 500) {
                regForm.textContent = "Server error,try again later";
                setTimeout(() => window.location.href = "/", 3000);
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    } else {
        showFormError();
    }
})
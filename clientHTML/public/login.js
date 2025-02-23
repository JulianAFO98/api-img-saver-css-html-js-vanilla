const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginContainer = document.getElementById("login-section");
const regForm = document.getElementById("login-form");



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

const showLoginMessage = (username) => {
    regForm.style.display = "none";
    const loginMessage = document.createElement("h1");
    const div = document.createElement("div");
    div.className = "login-form";
    loginMessage.id = "logged-msg";
    loginMessage.className = "logged";
    loginMessage.textContent = `Welcome ${username},redirecting to home`;
    document.getElementById("login-section").appendChild(div).appendChild(loginMessage);

    setTimeout(() => {
        window.location.href = "/";
    }, 3000);

}

regForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const userLoginData = parseData();

    try {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: userLoginData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })

        if (!response.ok) {
            throw new Error("User login error");
        }
        const data = await response.json();
        showLoginMessage(data);

    } catch (error) {
        console.log(error);
        showLoginError();
    }
})


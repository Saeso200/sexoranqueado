function register() {
    let newUsername = document.getElementById("newUsername").value;
    let newPassword = document.getElementById("newPassword").value;

    if (newUsername === "" || newPassword === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (localStorage.getItem(newUsername)) {
        alert("Usuário já cadastrado!");
        return;
    }

    localStorage.setItem(newUsername, newPassword);
    alert("Cadastro realizado com sucesso!");
    toggleForm();
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (localStorage.getItem(username) === password) {
        alert("Login bem-sucedido!");
        window.location.href = "dashboard.html"; // Redireciona para outra página após login
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

function toggleForm() {
    document.querySelector(".container").classList.toggle("hidden");
    document.getElementById("registerForm").classList.toggle("hidden");

    // Configuração do Firebase (Substitua com os seus dados do Firebase)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função para Cadastro de Usuário
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html"; // Redireciona para a página de login
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Função para Login do Usuário
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login bem-sucedido!");
            window.location.href = "dashboard.html"; // Redireciona para a página inicial do usuário
        })
        .catch((error) => {
            alert("Erro ao fazer login: " + error.message);
        });
}

// Função para Logout
function logout() {
    auth.signOut().then(() => {
        alert("Usuário deslogado!");
        window.location.href = "index.html"; // Redireciona para a página de login
    });
}

}

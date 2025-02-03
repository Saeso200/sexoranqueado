// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCl2lj53uKlMwnHAMlehXmovODWiGLF7vA",
    authDomain: "sexo-ranqueado.firebaseapp.com",
    projectId: "sexo-ranqueado",
    storageBucket: "sexo-ranqueado.firebasestorage.app",
    messagingSenderId: "963842113798",
    appId: "1:963842113798:web:f6474245a5e3e22c90de87"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Função para enviar código de verificação
let codigoGerado = "";

function enviarCodigo() {
    const email = document.getElementById("cadastro-email").value;
    codigoGerado = Math.floor(100000 + Math.random() * 900000).toString(); // Gera código de 6 dígitos
    
    // Enviar email com o código via EmailJS
    emailjs.send("service_ww3o1mu", "template_udn2gmu", {
        to_email: email,
        message: `Seu código de verificação é: ${codigoGerado}`
    }, "qk0zsSnIl-XQXtR48");

    alert("Código enviado ao email!");
    document.getElementById("verificacao").style.display = "block";
}

// Função para registrar usuário
function registrarUsuario() {
    const email = document.getElementById("cadastro-email").value;
    const usuario = document.getElementById("cadastro-usuario").value;
    const senha = document.getElementById("cadastro-senha").value;
    const codigo = document.getElementById("codigo").value;

    if (codigo !== codigoGerado) {
        alert("Código incorreto!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, senha)
        .then(cred => {
            return db.collection("usuarios").doc(cred.user.uid).set({
                email: email,
                usuario: usuario
            });
        })
        .then(() => {
            // Enviar email de notificação para você
            emailjs.send("service_ww3o1mu", "template_udn2gmu", {
                to_email: "seuemail@gmail.com",
                message: `Novo usuário cadastrado: ${email}`
            });

            alert("Cadastro realizado! Faça login.");
            window.location.href = "index.html";
        })
        .catch(error => alert(error.message));
}

// Função de login
function fazerLogin() {
    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;

    auth.signInWithEmailAndPassword(email, senha)
        .then(() => {
            alert("Login bem-sucedido!");
            window.location.href = "principal.html";
        })
        .catch(error => alert(error.message));
}

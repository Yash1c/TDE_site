document.getElementById("registerButton").addEventListener("click", function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário, se for o caso
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { username: username, email: email, password: password };

    fetch("http://localhost/TDE_site/api/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error("Erro:", error));
});

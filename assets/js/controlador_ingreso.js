let users = null;

const verificarUsers = async () => {
    console.log('aqui estamos');
	const respuesta = await fetch("http://127.0.0.1:3002/clientes", {
		method: "get",
	});
	users = await respuesta.json();
    let UsuarioEnviado = document.getElementById("email").value;
    let ContraseñaEnviado = document.getElementById("password").value;
    let accerder = false;
    users.forEach(usuario => {
        if (usuario.correo ==UsuarioEnviado) {
            if (usuario.contraseña==ContraseñaEnviado) {
                accerder = true;
                let usuarioS = JSON.stringify(usuario);
                localStorage.setItem("usuario", usuarioS);
                window.location.href = "menuPrincipal.html";
            }
        }
    });
};
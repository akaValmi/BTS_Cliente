
const principal = async () => {
	let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if (nombre.length > 0 && apellido.length > 0&& email.length > 0&& password.length > 0) {
        const respuesta = await fetch(
            `http://127.0.0.1:3002/clientes/add`,
            {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreCliente: nombre,
                    apellidoCliente: apellido,
                    correo: email,
                    contraseña: password
                }),
            }
        ); 
        const resJSON = await respuesta.json();
    
        console.log('Respuesta de agregar un cliente',resJSON);
        location.href='menuPrincipal.html'
    }
    
	

}

class Ususario{
    constructor(nombre,apellido,edad,correo,puntos){
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.correo=correo;
        this.puntos=puntos;
    }
}
let enviar=document.getElementById("enviar");

let perfiles=[];
 
enviar.addEventListener("click", AltaUsuario);

function AltaUsuario()
{
    let nombre=document.getElementById("nombre");
    let apellido=document.getElementById("apellido");
    let edad=document.getElementById("edad");
    let correo=document.getElementById("correo");
    puntos=0;
    perfiles.push(new Ususario (nombre.value,apellido.value,edad.value,correo.value,puntos.value));
    console.log(perfiles);
    alert("¡Gracias por registrarse!");
}
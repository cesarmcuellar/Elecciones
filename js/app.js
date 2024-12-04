let candidatos = document.querySelector('#candidatos');
let votos=[];
function cargarCandidatos(){
    const url = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json";
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);
        let fila = document.createElement('div');
        fila.className = "row";
        document.querySelector("#candidatos").appendChild(fila);
        datos.forEach((candidato,index) => {
            votos[index]=0;
            console.log(index%2);
            if(index%2==0 && index>0){
                fila = document.createElement('div');
                fila.className = "row";
                document.querySelector("#candidatos").appendChild(fila);

            }
           
            let caja = document.createElement('div');
            caja.className = "card col-sm-6";
            fila.appendChild(caja);
            let tituloCard = document.createElement('div');
            tituloCard.className = "card-header card-title card text-center";
            caja.appendChild(tituloCard);
            tituloCard.textContent=candidato.curso;
            let cuerpoCard = document.createElement('div');
            cuerpoCard.className = "card-body";
            cuerpoCard.style.margin="0 auto";
            caja.appendChild(cuerpoCard);
            let foto = document.createElement('img');
            foto.src = candidato.foto;
            foto.width=200;
            foto.height=200;
            
            foto.addEventListener('click', () => {
                Swal.fire({
                    title: "Verificación Voto",
                    text: "¿Está usted seguro de Votar por el Candidato " + 
                        candidato.nombre + "  " + candidato.apellido + "?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "SI",
                    cancelButtonText: "NO"
                  }).then((result) => {
                    if (result.isConfirmed) {
                        registrarVotos(index);                        
                      Swal.fire({
                        title: "Registro de Voto",
                        text: "Voto Registrado con Éxito",
                        icon: "success"
                      });
                    }
                  });
            });
            cuerpoCard.appendChild(foto);
            let aprendiz = document.createElement('h5');
            aprendiz.className = "card-text";
            aprendiz.textContent = "Aprendiz: " + candidato.nombre + " " + candidato.apellido;
            cuerpoCard.appendChild(aprendiz);
            let ficha = document.createElement('h5');
            ficha.className = "card-text";
            ficha.textContent = "Ficha: " + candidato.ficha;
            cuerpoCard.appendChild(ficha);
            let footerCard = document.createElement('div');
            footerCard.className = "card-footer";
            caja.appendChild(footerCard);
            let textoFooter  = document.createElement('h5');
            textoFooter.className = "fw-bold text-center";
            textoFooter.textContent = "Elecciones 2024";
            footerCard.appendChild(textoFooter);
            document.querySelector("#candidatos").appendChild(caja);
        });        
    })
    .catch(error => console.error('Error:', error));
}

function registrarVotos(index) {
    votos[index]++;
    console.log("Como van las elecciones: " + votos);
    //document.querySelector("#votosCandidato"+index).textContent = "Votos: " + votos[index];
}
let infoTitulo;
let infoContenido;
let infoImg;
let alumnos;
let notFound = '<img src="./img/icons8_nothing_found_96px.png" alt=""></img>';
let numIncrementos = 1;

document.addEventListener("DOMContentLoaded", function(event) {
    alumnos=[{'codigo':'DAW-1-2020',
                'nombre':'Pepe',
                'ciudad':'Valencia',
                'calificaciones':[{'asignatura':'PRG','nota':9},
                                    {'asignatura':'GBD','nota':6}, 
                                    {'asignatura':'ING','nota':4},
                                    {'asignatura':'FOL','nota':3}
                                    ],
                'edad':24},
                {'codigo':'DAW-2-2020',
                'nombre':'Juan',
                'ciudad':'Castellon',
                'calificaciones':[{'asignatura':'DWC','nota':4},
                                    {'asignatura':'DWS','nota':6}, 
                                    {'asignatura':'DAW','nota':7},
                                    {'asignatura':'DIW','nota':8},
                                    {'asignatura':'ING','nota':9},
                                    {'asignatura':'EIE','nota':2}
                                    ],
                'edad':28},
                {'codigo':'DAW-1-2019',
                'nombre':'Ana',
                'ciudad':'Valencia',
                'calificaciones':[{'asignatura':'PRG','nota':6},
                                    {'asignatura':'GBD','nota':2}, 
                                    {'asignatura':'ING','nota':6},
                                    {'asignatura':'FOL','nota':2}
                                    ],
                'edad':22},
                {'codigo':'DAW-2-2020',
                'nombre':'Maria',
                'ciudad':'Castellon',
                'calificaciones':[{'asignatura':'DWC','nota':4},
                                    {'asignatura':'DWS','nota':6}, 
                                    {'asignatura':'DAW','nota':7},
                                    {'asignatura':'DIW','nota':8},
                                    {'asignatura':'ING','nota':4},
                                    {'asignatura':'EIE','nota':1}
                                    ],
                'edad':30}
                ];
            
    

    infoTitulo = document.getElementById("info-titulo");
    infoImg = document.getElementById("info-img");
    infoContenido = document.getElementById("info-contenido");
    
    
    
    
});

function reset() {
    console.clear();
    infoImg.style = "display:none";
}

function error(msgError) {
    infoImg.innerHTML = notFound;
    infoImg.style = "display:block";
    infoTitulo.innerHTML = msgError;
    infoContenido.innerHTML = "";
}

function notasAlumno() {
    reset();
    let nombreAlumno = capitalize(prompt("Nombre del alumno:", "ana"));
    let notaMedia = 0;
    let notaMasAlta = 0;
    let notaMasBaja = 100;
    let asignaturaAlta = '';
    let asignaturaBaja = '';

    let alumnoBuscado = alumnos.find(alumno => alumno.nombre == nombreAlumno);
    if (alumnoBuscado == undefined) {
        let msgError = "El alumno " + nombreAlumno + " no existe";
        error(msgError);
    } else {
        let notas = alumnoBuscado.calificaciones;
        notas.forEach(calificacion => {
            let nota = calificacion.nota;
            if (nota > notaMasAlta) {
                notaMasAlta = nota;
                asignaturaAlta = calificacion.asignatura;
            }
            if (notaMasBaja > nota) {
                notaMasBaja = nota;
                asignaturaBaja = calificacion.asignatura;
            }
            notaMedia += calificacion.nota;
        });
        infoTitulo.innerHTML = "Notas de " + nombreAlumno;
        notaMedia = notaMedia / notas.length;
        infoContenido.innerHTML = "La nota media de " + nombreAlumno + " es: <span>" + notaMedia + "</span><br> La nota más alta es en " + asignaturaAlta + ": <span>" + notaMasAlta + "</span><br> La nota más baja es en " + asignaturaBaja + ": <span>" + notaMasBaja +"</span>";
    }
} 

function subeUnPunto() {
    reset();
    let contenido = "<div class='tabla-contenedor'>";
    infoTitulo.innerHTML = "Notas de de los alumnos incrementadas en " + numIncrementos + " puntos:";
    alumnos.forEach(alumno => {
        let calificacionesAlumno = alumno.calificaciones;
        contenido +="<div class='tabla-notas'><span>" +  alumno.nombre + ":</span><br>";
        calificacionesAlumno.forEach(calificacion => {
            calificacion.nota +=1;
            let asignatura = calificacion.asignatura; 
            contenido += asignatura + ' => ' + calificacion.nota + '<br>'; 
        });
        contenido += "</div><br><br>"
    });
    infoContenido.innerHTML = contenido + "</div>";
    numIncrementos++;

}

function alumnosCiudad() {
    reset();
    let ciudad = capitalize(prompt("Indica la ciudad;", "Valencia"));
    infoTitulo.innerHTML = 'Alumnos de ' + ciudad + ':<br>';
    let contenido = '';
    let alumnosCiudad = alumnos.filter(alumno => alumno.ciudad == ciudad);
    if (alumnosCiudad.length == 0) {
        let msgError = "No hay alumnos de " + ciudad;
        error(msgError);
        console.log("No hay alumnos de " + ciudad);
    } else {
        alumnosCiudad.forEach(alumno => {
            contenido += alumno.nombre + "<br>";
        });
    }
    infoContenido.innerHTML = contenido;
}

function alumnosCurso() {
    reset();
    let curso = prompt("Indica el curso", "2");
    let existe = false;
    infoTitulo.innerHTML = "Alumnos de " + curso + " curso";
    let contenido = '';

    alumnos.forEach(alumno => {
        let codigo = alumno.codigo;
        let codigoArray = codigo.split("-");
        if (codigoArray[1] == curso) {
            contenido += alumno.nombre + "<br>";
            existe = true;
        }
    });
    if (!existe) {
        let msgError = "Ningún alumno pertenece a " + curso + " curso.";
        error(msgError);
    }
    infoContenido.innerHTML = contenido;
}

function ordenaEdad() {
    console.clear();
    infoTitulo.innerHTML = "Lista de alumnos ordenados por edad ascendente"
    let contenido = "";
    let nombre, edad, codigo, ciudad, calificaciones =[] , asignatura, nota;
    // let edades = [];

    // alumnos.forEach(alumno => {
    //     edades.push({'nombre': alumno.nombre, 'edad': alumno.edad});
    // });
    // console.log(edades.sort((a, b) => a.edad - b.edad));

    console.info(alumnos.sort((a, b) => a.edad - b.edad));
    alumnos.forEach(alumno => {
        nombre = alumno.nombre;
        edad = alumno.edad;
        codigo = alumno.codigo;
        ciudad = alumno.ciudad;
        alumno.calificaciones.forEach(calificacion => {
            asignatura = calificacion.asignatura;
            nota = calificacion.nota;
            calificaciones = asignatura + ': ' + nota + "<br>";
        });
        contenido += edad + nombre + codigo + ciudad + "<br> Calificaciones: " + calificaciones + "<br>";

    });
    infoContenido.innerHTML = contenido;
}

function ordenaNombreAsc() {
    console.clear();
    let nombres = [];
    alumnos.forEach(alumno => {
        nombres.push(alumno.nombre);
    });

    console.log(nombres.sort());
}

function ordenaNombreDesc() {
    console.clear();
    let nombres = [];
    alumnos.forEach(alumno => {
        nombres.push(alumno.nombre);
    });
    nombres = nombres.sort();
    console.log(nombres.reverse());
}

function borraAlumno() {
    console.clear();
    let nombreAlumno = capitalize(prompt("Nombre del alumno que desea borrar:", "ana"));
    let existe = false;
    alumnos.forEach((alumno, index) => {
        if (alumno.nombre == nombreAlumno) {
            alumnos.splice(index,1);
            existe = true;
        }
    });

    console.infoTitulo(alumnos);
    
    if (!existe) {
            console.log("El alumno no existe");
        }
}

function nuevoAlumno() {
    console.clear();
    let codigo = prompt("Indica codigo del alumno: ", "DAW-2-2020");
    let nombre = capitalize(prompt("Indica nombre del alumno: ", "Jose"));
    let ciudad = capitalize(prompt("Indica ciudad del alumno: ", "Asturias"));
    let edad = parseInt(prompt("Indica edad del alumno: ", "31"));

    alumnos.push({'codigo': codigo, 'nombre': nombre, 'ciudad': ciudad, 'edad': edad, 'calificaciones': []});

    console.log(alumnos);
}

function nuevaAsignatura() {
    console.clear();
    let nombreAlumno = capitalize(prompt("Nombre del alumno:", "ana"));
    let existe = false;

    alumnos.forEach(alumno => {
        if (alumno.nombre == nombreAlumno) {
            existe = true;
            let asignaturaNueva = prompt("Indica la asignatura: ", "SMR").toUpperCase();
            let notaNueva = parseInt(prompt("Indica la nota: ", 7));
            let calificaciones = alumno.calificaciones;
            
            calificaciones.forEach((calificacion, index) => {
                let asignatura = calificacion.asignatura;
                if (asignatura == asignaturaNueva) {
                    calificaciones.splice(index, 1);
                }
            });
            alumno.calificaciones.push({'asignatura':asignaturaNueva,'nota':notaNueva});
            console.log(alumno.calificaciones);
        }
    });

    if (!existe) {
        console.log("El alumno no existe");
    }
}

function capitalize(word) {
    if (word != null) {
        word = word.toLowerCase();
        return word[0].toUpperCase() + word.slice(1);
    }
}


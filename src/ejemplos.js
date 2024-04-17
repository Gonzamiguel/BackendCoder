                                                //GENERAR 10 NUMEROS DEL 1 AL 20 Y VERIFICAR CUALES SE REPITEN.


// const MIN = 1;
// const MAX = 20;
// const LIMIT = 10;


// const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * max) + min;
// }


// const numeros = [];
// for (let i = 0; i <= LIMIT ; i++){
//     numeros.push(getRandomNumber(MIN,MAX));
// }


// const totales = {};
// numeros.forEach(nro => {
//     if (totales[nro]) {
//         totales[nro] = totales[nro] + 1;
//     } else {
//         totales[nro] = 1;
//     }
// });

// console.log(numeros)
// console.log(totales)

                                                //MODULO MOMENT

// import moment from 'moment';

// const current_date = moment();
// const birth_date = moment('2000-01-14 16:00:00')

// if(current_date.isValid() && birth_date.isValid()){
//     const days = current_date.diff(birth_date, 'days');
//     console.log(days);
// };


                                                // SERVIDOR CON EXPRESS

//PASO 1 -- importar express

// import express from "express";


//PASO 2 - instanciar el servidor 
// const app = express();

// const data =[
//     {
//     firstName : 'Gonzalo',
//     lastName : 'Miguel',
//     age: '26',
//     active: true
// },
// {
//     firstName : 'Anush',
//     lastName : 'Seferian',
//     age: '24',
//     active: true
// },
// {
//     firstName : 'Lucas',
//     lastName : 'Gimenez',
//     age: '25',
//     active: true
// }
// ] 

// PASO 3 - definir los endpoints (los endpoint son para devolver distintos paquetes de datos)

// app.get('/', (req,res) => {
//     res.send("Sistema activo")
// });

// app.get('/saludo', (req,res) => {
//     res.send("Hola a todos desde Express")
// });

// app.get('/bienvenidos', (req,res) => {
//     res.send('<h1 style="color: #FF0000"> Bienvenidos</h1>');
// });

// app.get('/usuarios', (req,res) => {
//     res.send({ status : 1 , payload : data } );
// });

//Pimer endpoint con parametro de tipo req.params
// app.get('/usuario/:id', (req,res) => {
//     const id = req.params.id;
//     res.send({ status : 1 , payload : data[id] } );
// });


//Primer endpoint con parametro de tipo req.query
// app.get('/usuarioquery', (req,res) => {
    
//     const id = req.query.id;
//     const extended = req.query.extended;

//     if(extended){
//         res.send({ status : 1 , payload : data[id], extended: 'Version extendida' });
//     }else {
//         res.send({ status : 1 , payload : data[id]})
//     }
//     res.send({ status : 1 , payload : data[id] });
// });



//PASO 4 - poner a escuchar el servidor
// app.listen(8080, () => {
//     console.log("Servidor express activo en puerto 8080")
// })
var aPelis=new Array("Que bello es vivir","Solo en casa","Cuento de Navidad");
var aLoc= new Array(50,120,60);
var aSalas=new Array("1","2","3");
//Almacenamos la localidades vendidas por sala: aVendidas1, aVendidas2 y aVendidas3
//y las vendidas en la pelicula seleccionada en el array vendidas
var aVendidas1= new Array();    
var aVendidas2= new Array();
var aVendidas3= new Array();
var vendidas=new Array();   
var asientos=new Array();  //los asientos vendidos en cada compra
var numButacas=0;   //butacas disponibles en la sala seleccionada
var sala=0; //guardamos la sala seleccionada
var butacaSel=0 //numero de butacas que se han elegido para comprar 
var peli="";    //Titulo de la pelicula seleccionada
const precio=3;

/*Al seleccionar la pelicula recuperamos la localidades ya vendidas en esa sala
asi como el numero de localidades de la sala */
function seleccionarPeli(){
    var indice=this.event.target.id.substring(4);
    sala=aSalas[indice-1];
    peli=aPelis[indice-1];
    numButacas=aLoc[indice-1];
    butacaSel=0;
    switch(indice){
        case "1":
            vendidas=aVendidas1.slice(0,aVendidas1.length);
            break;
        case "2":
            vendidas=aVendidas2.slice(0,aVendidas2.length);
            break;
        case "3":
            vendidas=aVendidas3.slice(0,aVendidas3.length);
            break;
    }
    pintarButacas();    
}

/*Se dibujan las localidades de la sala diferenciando si están disponibles o no  */
function pintarButacas(){
    contenedor.innerHTML="<br>";
    contenedor.innerHTML+="<h3>PATIO DE BUTACAS</h3>"
    for (i=1;i<=numButacas;i++){
            if (vendidas.includes(i)){
                contenedor.innerHTML+="<button id='butaca"+i+"' class='ocupado'>"+i+"</button> ";
            }
            else{
                contenedor.innerHTML+="<button id='butaca"+i+"' class='libre' onclick='seleccionar();' title='Seleccionar asiento'>"+i+"</button> ";
            }
            if (i%15==0){
                contenedor.innerHTML+="<br>";
            }
        }
        if (numButacas==vendidas.length){
            contenedor.innerHTML+="<br><img  src='img/soldout.png' alt='Sin localidades'title='Localidades agotadas. Seleccione otra película.'>"
        }
        else{
            contenedor.innerHTML+="<br><br><button id='btnConfirm' onclick='confirmarVenta();' title='Comprar entradas'>Comprar</button>"
        }
}

/*Cuando se selecciona una localidad se comprueba si esta libre y se guarda o se borra
de los arrays de control*/
function seleccionar(){
    var butacaId=this.event.target.id;
    var index=0;
    var indAs=0;       
    butacaId=parseInt(butacaId.substring(6));
    if(this.event.target.className=="libre"){
        vendidas.push(butacaId);
        asientos.push(butacaId);
        this.event.target.className="seleccionado";
        butacaSel++;
    }
    else{
        index=vendidas.indexOf(butacaId);
        vendidas.splice(index,1);
        indAs=asientos.indexOf(butacaId);
        asientos.splice(index,1);
        this.event.target.className="libre";
        butacaSel--;
    }
}

/*Compramos las entradas seleccionadas y se actualiza el array de localidades vendidas 
por sala */
function confirmarVenta(){
    if (butacaSel>0){         
        switch(sala){
            case "1":
                aVendidas1=vendidas.slice(0,vendidas.length)
                break;
            case "2":
                aVendidas2=vendidas.slice(0,vendidas.length);
                break;
            case "3":
                aVendidas3=vendidas.slice(0,vendidas.length);
                break;
            }
        
        document.getElementById("contenedor").innerHTML="";
        imprimirTicket()

    }  
    else{
        alert("No ha seccionado ninguna localidad")
    }
}
/*Mostramos el ticket de compra con la fecha, película, localidades y precio */
function imprimirTicket(){

    var importe=precio*butacaSel;
    var params="top=200,left=500,width=500,height=300,resizable=false";
    localStorage.setItem("pelicula",peli); 
    localStorage.setItem("asientos", asientos);
    alert(asientos);
    localStorage.setItem("importe", importe);
    //Inicilizamos los arrays de localidades vendidas 
    asientos.splice(0,asientos.length);
    vendidas.splice(0,vendidas.length);
    var miEntrada=window.open("ticket.html",'Ticket',params)
    
}
    
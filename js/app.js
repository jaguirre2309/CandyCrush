var inicio=0;
var puntos = 0;
var segundos = 0;
var minutos = 0;
var quitarDulces = 0;
var nuevosDulces = 0;
var intervalo = 0;
var cronometro = 0;
var nuemro = 0;
var imagen = 0;
var coordenada = 0;
var lencolum=["","","","","","",""];
var lenrest=["","","","","","",""];
var maxDulces = 0;
var movimiento = 0;
var reinicio = 0;

//Carga de funciones de jquery
$(function(){
	//Cambio de color en tablero
	color1();

	//Accion de clic en boton inicio
	$('.btn-reinicio').click(function(){
		if (reinicio == 0) {
			inicio = 0;
			puntos = 0;
			movimientos = 0;
			$(".panel-score").css("width","25%");
			$(".panel-tablero").show();
			$(".time").show();
			$("#score-text").html("0");
			$("#movimientos-text").html("0");
			$(this).html("Reiniciar");
			clearInterval(quitarDulces);
			clearInterval(nuevosDulces);
			clearInterval(cronometro);
			clearInterval(intervalo);
			minutos = 2;
			segundos = 0;
			borrartotal();
			//setInteval ejecución de funcion iterativamente, hasta llamado de clearInterval

			intervalo = setInterval(function(){
				iniciar()
			},300);
			cronometro = setInterval(function(){
				timer()
			},1000);
			reinicio = 0;
		}
	});
});

//Alterna color de h1 "MATCH GAME" dandole efecto de animacion
function color2(){
	$('.main-titulo').animate(
		{
			color: '#00e38d'
		}, 1000, function(){
			color1()
		}
	);
}
function color1(){
	$('.main-titulo').animate(
		{
			color: '#DCFF0E'
		}, 1000, function(){
			color2()
		}
	);
}

function timer(){
	if(segundos != 0){
		segundos = segundos-1;}
	if(segundos == 0){
		if(minutos == 0){
			$(".panel-tablero").hide("drop","slow",MovPuntos);
			$(".time").hide();
			clearInterval(quitarDulces);
			clearInterval(nuevosDulces);
			clearInterval(intervalo);
			clearInterval(cronometro);
		}
		segundos = 59;
		minutos = minutos - 1;
	}
	if (segundos == 9 || segundos == 8 || segundos == 7 || segundos == 6 || segundos == 5 || segundos == 4 || segundos == 3 || segundos == 2 || segundos == 1 || segundos == 0) {
		$("#timer").html("0"+minutos+":0"+segundos);
	}else
	$("#timer").html("0"+minutos+":"+segundos);
};

function MovPuntos(){
	$( ".panel-score" ).animate({width:'100%'},3000);
	$(".termino").css({"display":"block","text-align":"center"});
};

//Comenzar llenado de tablero
function iniciar(){
	inicio++;
	var numero=0;
	var imagen=0;
	$(".elemento").draggable({disabled:true});
	if (inicio <= 7) {
		for (var f = 1; f <= 7; f++) {
			if($(".col-"+f).children("img:nth-child("+inicio+")").html()==null){
				numero = Math.floor(Math.random()*4)+1;
				imagen = "image/"+numero+".png";
				$(".col-"+f).prepend("<img src="+imagen+" class='elemento' />").css("justify-content","flex-start")
			}
		}

	}
	if (inicio == 7){
		clearInterval(intervalo);
		quitarDulces = setInterval(function(){
			quitarMatch();
		},300);
	}

}


//Validar cuando se hace match horizontal
function matchHor(){
	var valHor = 0;
	for (var c = 1; c <= 7; c++) {
		for (var f = 1; f <= 5; f++) {
			var d1 = $('.col-'+f).children('img:nth-last-child('+c+')').attr('src');
			var d2 = $('.col-'+(f+1)).children('img:nth-last-child('+c+')').attr('src');
			var d3 = $('.col-'+(f+2)).children('img:nth-last-child('+c+')').attr('src');
			if((d1 == d2) && (d2 == d3) && (d1 != null) && (d2 != null) && (d3 != null)){
				$('.col-'+f).children('img:nth-last-child('+c+')').attr('class','elemento activo');
				$(".col-"+(f+1)).children("img:nth-last-child("+(c)+")").attr("class","elemento activo");
				$(".col-"+(f+2)).children("img:nth-last-child("+(c)+")").attr("class","elemento activo");
				valHor=1;
			}
		}
	}
	return valHor;
}

//Validar cuando se hace match vertical
function matchVer(){
	var valVer=0;
	for(var c = 1;c <= 5; c++){
		for(var f = 1; f <= 7; f++){
			var d1 = $(".col-"+f).children("img:nth-child("+c+")").attr("src");
			var d2 = $(".col-"+f).children("img:nth-child("+(c+1)+")").attr("src");
			var d3 = $(".col-"+f).children("img:nth-child("+(c+2)+")").attr("src");
			if((d1 == d2) && (d2 == d3) && (d1 != null) && (d2 != null) && (d3 != null)){
				$(".col-"+f).children("img:nth-child("+c+")").attr("class","elemento activo");
				$(".col-"+f).children("img:nth-child("+(c+1)+")").attr("class","elemento activo");
				$(".col-"+f).children("img:nth-child("+(c+2)+")").attr("class","elemento activo");
				valVer=1;
			}
		}
	}
	return valVer;
}

//Quitar dulces al hacer match
function quitarMatch(){
	coordenada = 0;
	buscarHor = matchHor();
	buscarVer = matchVer();
	for (var c = 1; c <= 7; c++) {
		coordenada = coordenada+$(".col-"+c).children().length;
	}
	if(buscarHor == 0 && buscarVer == 0 && coordenada != 49){
		clearInterval(quitarDulces);
		matchNuevosDulces = 0;
		nuevosDulces = setInterval(function(){
			rellenar()
		},400);
	}

	if (buscarHor == 1 || buscarVer == 1) {
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$('.activo').hide("fade",1000,function(){
			var puntosAux = $(".activo").length;
			$(".activo").remove("img");
			puntos = puntos + (puntosAux*10)
			$('#score-text').html(puntos);
		});
	}
	if(buscarHor == 0 && buscarVer == 0 && coordenada == 49){
		$(".elemento").draggable({
			cursorAt: {top: 56, left: 56},
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:10,
			opacity: 0.6,
			stack: ".elemento",
			start:function(event,ui){
				movimiento = movimiento + 1;
				$("#movimientos-text").html(movimiento);
			}
		});
	}
	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped = ui.draggable;
			var droppedOn = this;
			espera = 0;
			do{
				espera = dropped.swap($(droppedOn));
			}while(espera == 0);
			buscarHor = matchHor();
			buscarVer = matchVer();
			if(buscarHor == 0 && buscarVer == 0){
				dropped.swap($(droppedOn));
			}
			if(buscarHor == 1 || buscarVer == 1){
				clearInterval(nuevosDulces);
				clearInterval(quitarDulces);
				quitarDulces = setInterval(function(){
					quitarMatch()
				},300);
			}
		}
	});
}

jQuery.fn.swap = function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};

function rellenar(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var c = 1;c <= 7; c++){
		lencolum[c - 1] = $(".col-"+c).children().length;}
	if(matchNuevosDulces == 0){
		for(var c = 0;c <= 6; c++){
			lenrest[c] = (7 - lencolum[c]);}
		maxDulces = Math.max.apply(null,lenrest);
		contadorTotal = maxDulces;}
	if(maxDulces != 0){
		if(matchNuevosDulces == 1){
			for(var c = 1;c <= 7; c++){
				if(contadorTotal > (maxDulces-lenrest[c - 1])){
					$(".col-"+c).children("img:nth-child("+(lenrest[c - 1])+")").remove("img");}}
		}
		if(matchNuevosDulces == 0){
			matchNuevosDulces = 1;
			for(var k = 1;k <= 7; k++){
				for(var j = 0;j < (lenrest[k - 1] - 1); j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
		}
		for(var c = 1;c <= 7; c++){
			if(contadorTotal > (maxDulces - lenrest[c-1])){
				numero = Math.floor(Math.random() * 4) + 1;
				imagen = "image/"+numero+".png";
				$(".col-"+c).prepend("<img src="+imagen+" class='elemento'/>");}
		}
	}
	if(contadorTotal == 1){
		clearInterval(nuevosDulces);
		quitarDulces = setInterval(function(){
			quitarMatch()
		},300);
	}
	contadorTotal = contadorTotal-1;
};




//Borrar tablero para reinicio
function borrartotal(){
	for(var c=1;c<8;c++){
		$(".col-"+c).children("img").detach();}
}







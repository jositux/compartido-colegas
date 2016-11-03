//<![CDATA[ 

$(document).ready(function() {

	// Inicializaciones
	
	// oculto el logo chico

	$('#logo-chab-chico').hide();	

	// oculto los planes secundarios	
	
	$('#abonos-z1').hide();
	$('#abonos-z2').hide();
	$('#select-z1').addClass('active');
	$('#abonos-z0').addClass('visible');
	$('#abonos-z3').hide();
	$('#abonos-z4').hide();
	$('#abonos-z5').hide();
	
	// oculto la imagen ilustrativa de tecnologia
	
	$('#tecnologia aside img').hide();

	var scrolling = 0;
	

	//Inicializa en el primer mapa
	var nombre_ap = 'Cuasar';
	var vista_centro = new google.maps.LatLng(-39.952555, -71.077534);
	var vista_zoom = 12;
	var nodo_ap = new google.maps.LatLng(-39.955035, -71.105591);
	var coordenadas = [
		new google.maps.LatLng(-39.955035, -71.105591),
    	new google.maps.LatLng(-39.983669, -71.106169),
    	new google.maps.LatLng(-39.992739, -71.069081),
    	new google.maps.LatLng(-39.922359, -71.049797),
    	new google.maps.LatLng(-39.916238, -71.088114),
  		];		
  	var color_zona = '#6ace79';
			
	inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);   
	
	$('#select-cobertura a').first().addClass('active');

	// Comportamiento del menú
	
	$('#tecnologia p a').on('click', function(event) {
		event.preventDefault(); 
		$('#tecnologia aside img').fadeIn('slow');
	});
	
	$('#tecnologia aside img').on('click', function(event) {
		event.preventDefault(); 
		$('#tecnologia aside img').fadeOut('fast');
	});
	
	$(window).scroll(function() {
		$('#tecnologia aside img').fadeOut('slow');
	});
	
				
   $('nav ul a').on('click', function(event) {
     	event.preventDefault(); 
				
		// si está activo, se ha clickeado - no hace nada
		if ($(this).hasClass('active')){
			return false;
			}
				
			// si no está activo, lee el índice y salta al valor del array correspondiente con scroll.
		else {	
    		var seccion = $(this).attr('href');
    		$('nav ul a').removeClass('active');		
			$(this).addClass('active');
			scrolling = 1; 		
		
     		var temporizador;
     		temporizador = window.setTimeout(function() {	
     			$('body, html').animate({scrollTop:$(seccion).offset().top-73}, 'slow', function(){scrolling=0;});	 
				}, 150);
			};

		if ($('nav').hasClass('movil')) {
			$('nav').animate({marginLeft: '-160px'}, 500);
			$('nav').removeClass('movil');
			$('#menu-movil').removeClass('active');
		};

		});

					
	//	Leo las alturas de todas las secciones para activar la botonera al escrollar				
	
	var valores_top = [];	

	$('nav ul a').each(function(){			
		valores_top.push ($($(this).attr('href')).position().top-100);
		});
		
	
	$(window).scroll(function() {
		

		// la barra superior se compacta
				
		if($(window).scrollTop() > 115) {
			$('header, #inicio, #sep-header').addClass("fija");
			$('#logo-chab').fadeOut('fast');
			$('#logo-chab-chico').fadeIn('fast');
					
			if(scrolling==0){
						
				$('nav ul a').removeClass('active');
				
				//activa botón empresa			
				if($(window).scrollTop() > 115 && $(window).scrollTop() < valores_top[1]){
					$('nav ul li:nth-child(1) a').addClass('active');
					}
						
				//activa botón tecnologia
				else if($(window).scrollTop() >= valores_top[1] && $(window).scrollTop() < valores_top[2]){
					$('nav ul li:nth-child(2) a').addClass('active');
					}
						
				//activa botón abonos
				else if($(window).scrollTop() >= valores_top[2] && $(window).scrollTop() < valores_top[3]){
					$('nav ul li:nth-child(3) a').addClass('active');
					}
					
				//activa botón cobertura					
				else if($(window).scrollTop() >= valores_top[3] && $(window).scrollTop() < valores_top[4]){
					$('nav ul li:nth-child(4) a').addClass('active');
					}		
						
				//activa botón contacto	
				else {
					$('nav ul li:nth-child(5) a').addClass('active');
					};
					
				};
					
			}
				
			// la barra superior se expande
					
			else {
				$('header, #inicio, #sep-header').removeClass("fija");
				$('#logo-chab').fadeIn('fast');	
				$('#logo-chab-chico').fadeOut('fast');
				$('nav ul li:nth-child(1) a').removeClass('active');
				};

			});	

		// Menú Movil
					
					$('#menu-movil').on('click', function(event){
						event.preventDefault(); 
              				
						if ($(this).hasClass('active')){
							$('nav').animate({marginLeft: '-160px'}, 500);	
							$('#menu-movil').removeClass('active');
							$('nav').removeClass('movil');

						}
						else {
							$('nav').animate({marginLeft: '0px'}, 500);							
							$('#menu-movil').addClass('active');
						}	$('nav').addClass('movil');
					});
			
			
		// Inicio categorías y zonas
		
		var categoria = $('#selector-categoria input[type=radio]:checked').val(); // Inicia con el que se indique como checked	
		var zona = $('#selector-zona a.active').attr('id'); // Inicia en default con el que se indique como active
		    
		// selector de servicio
       		$('#selector-categoria input[type=radio]').change(function() {
			categoria = this.value;
			$('#selector-zona a').removeClass('active'); // Elimina el active para que pueda clickearse
			$('a#' + zona).click(); // Hace click sobre la zona activa nuevamente pero cambiada la categoría
		});

		// selector de zonas de planes    
		$('#selector-zona a').on('click', function(event) {
     			event.preventDefault(); 
     			
     			zona = $(this).attr('id');
     			
     			function complete(){
 
				$('.abono').removeClass('visible');  				
     				
				if(zona == 'select-z2'){
                        		if( categoria == 'empresa' ) {
						$('#abonos-z4').fadeIn('slow');
						$('#abonos-z4').addClass('visible');
					}
                       			else {
                        			$('#abonos-z1').fadeIn('slow');
						$('#abonos-z1').addClass('visible');
					}
				};
					
				if(zona == 'select-prepago') {
					if( categoria == 'empresa' ) {
						$('#abonos-z5').fadeIn('slow');
						$('#abonos-z5').addClass('visible');
					}
                        		else {
						$('#abonos-z2').fadeIn('slow');
						$('#abonos-z2').addClass('visible');
					}
				};
							
				if(zona == 'select-z1'){
					if( categoria == 'empresa' ) {
						$('#abonos-z3').fadeIn('slow');
						$('#abonos-z3').addClass('visible');
					}
                        		else {
						$('#abonos-z0').fadeIn('slow');
						$('#abonos-z0').addClass('visible');
						}
				};    				
	
     			};

			if ($(this).hasClass('active')){
				return false;
			}     						
			else {
				$('#selector-zona a').removeClass('active');
				$(this).addClass('active');				
				$('.visible').fadeOut('slow', complete);							
			};
					     	
    		});	

		// Fin categorías y zonas
    
	// Selector Mapa
    	
	$('#select-cobertura a').on('click', function(event) {
    		event.preventDefault();
	if ($('nav').width() == 150) {
		$('body, html').animate({scrollTop:$('#mapa').offset().top-73}, 'slow', function(){scrolling=0;});
	};
		 
    	if ($(this).hasClass('active')){
			return false;
			}
    	
    	else{
    	$('#select-cobertura a').removeClass('active');
    	$(this).addClass('active');
    	var mapa_link = $('#select-cobertura a').index(this);

		switch (mapa_link) {
			case 0:
				// Mapa 01 - Cuasar
				var nombre_ap = 'Cuasar';
				var vista_centro = new google.maps.LatLng(-39.952555, -71.077534);
				var vista_zoom = 12;
				var nodo_ap = new google.maps.LatLng(-39.955035, -71.105591);
				var coordenadas = [
					new google.maps.LatLng(-39.955035, -71.105591),
    				new google.maps.LatLng(-39.983669, -71.106169),
    				new google.maps.LatLng(-39.992739, -71.069081),
    				new google.maps.LatLng(-39.922359, -71.049797),
    				new google.maps.LatLng(-39.916238, -71.088114),
  				];	
  				var color_zona = '#6ace79';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);    		
    			break
    			
    		case 1:
    			// Mapa 02 - Chacra 30
    			var nombre_ap = 'Chacra 30';
    			var vista_centro = new google.maps.LatLng(-40.125286, -71.245496);
				var vista_zoom = 14;
				var nodo_ap = new google.maps.LatLng(-40.134669, -71.221486);
				var coordenadas = [
					new google.maps.LatLng(-40.134669, -71.221486),
					new google.maps.LatLng(-40.136359, -71.222849),
					new google.maps.LatLng(-40.134655, -71.225556),
					new google.maps.LatLng(-40.137403, -71.229826),
					new google.maps.LatLng(-40.131717, -71.240090),
					new google.maps.LatLng(-40.129554, -71.248949),
					new google.maps.LatLng(-40.129824, -71.264891),
					new google.maps.LatLng(-40.119749, -71.277943),
					new google.maps.LatLng(-40.117962, -71.269749),
					new google.maps.LatLng(-40.128212, -71.260386),
					new google.maps.LatLng(-40.119832, -71.232627),
					new google.maps.LatLng(-40.127851, -71.219696),
  				];	
  				var color_zona = '#6ace79';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);    
      				
    			break
    			
    		case 2:
    			// Mapa 03 - El Abrojal
    			var nombre_ap = 'El Abrojal';
    			var vista_centro = new google.maps.LatLng(-40.131555, -71.297504);
				var vista_zoom = 14;
				var nodo_ap = new google.maps.LatLng(-40.126214, -71.302464);
				var coordenadas = [
					new google.maps.LatLng(-40.126214, -71.302464),				
					new google.maps.LatLng(-40.128924, -71.309504),
					new google.maps.LatLng(-40.141697, -71.294112),
					new google.maps.LatLng(-40.137333, -71.283448),
					new google.maps.LatLng(-40.121962, -71.295615),
  				];	
  				var color_zona = '#6ace79';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);  

       		break
       		
       	case 3:
    			// Mapa 04 - Basalto
    			var nombre_ap = 'Basalto';
    			var vista_centro = new google.maps.LatLng(-40.1511724,-71.3229242);
				var vista_zoom = 13;
				var nodo_ap = new google.maps.LatLng(-40.142729, -71.339164);
				var coordenadas = [
					new google.maps.LatLng(-40.142729, -71.339164),
					new google.maps.LatLng(-40.146880, -71.349152),
					new google.maps.LatLng(-40.174049, -71.324941),
					new google.maps.LatLng(-40.149859, -71.299441),
					new google.maps.LatLng(-40.129898, -71.314893),
  				];	
  				var color_zona = '#6ace79';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);  

       		break
       		
       		
       	case 4:
    			// Mapa 05 - Radio Nacional
    			var nombre_ap = 'Radio Nacional';
    			var vista_centro = new google.maps.LatLng(-40.157127, -71.354174);
				var vista_zoom = 14;
				var nodo_ap = new google.maps.LatLng(-40.158227, -71.344641);
				var coordenadas = [
					new google.maps.LatLng(-40.158227, -71.344641),
					new google.maps.LatLng(-40.146177, -71.351180),
					new google.maps.LatLng(-40.156719, -71.366562),
					new google.maps.LatLng(-40.168158, -71.354461),
  				];	
  				var color_zona = '#6ace79';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);  

       		break
       		
			case 5:
    			// Mapa 06 - Huechulafquen
    			var nombre_ap = 'Huechulafquen';
    			var vista_centro = new google.maps.LatLng(-39.812535, -71.193381);
				var vista_zoom = 13;
				var nodo_ap = new google.maps.LatLng(-39.789815, -71.209955);
				var coordenadas = [
					new google.maps.LatLng(-39.789815, -71.209955),
					new google.maps.LatLng(-39.781650, -71.218442),
					new google.maps.LatLng(-39.786474, -71.223734),
					new google.maps.LatLng(-39.798591, -71.211427),
					new google.maps.LatLng(-39.804478, -71.215149),
					new google.maps.LatLng(-39.839266, -71.187858),
					new google.maps.LatLng(-39.827732, -71.164283)
  				];	
  				var color_zona = '#eba157';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);  

       		break

			case 6:
    			// Mapa 07 - El Desafío
    			var nombre_ap = 'El Desafío';
    			var vista_centro = new google.maps.LatLng(-40.122014, -71.197375);
				var vista_zoom = 13;
				var nodo_ap = new google.maps.LatLng(-40.150815, -71.183299);
				var coordenadas = [
					new google.maps.LatLng(-40.150815, -71.183299),
					new google.maps.LatLng(-40.151204, -71.171755),
					new google.maps.LatLng(-40.143889, -71.160431),
					new google.maps.LatLng(-40.123040, -71.184789),
					new google.maps.LatLng(-40.126568, -71.194981),
					new google.maps.LatLng(-40.094931, -71.209037),
					new google.maps.LatLng(-40.096326, -71.216267),
					new google.maps.LatLng(-40.127831, -71.213690),
					new google.maps.LatLng(-40.126568, -71.194981),
					new google.maps.LatLng(-40.144139, -71.194372),
  				];	
  				var color_zona = '#eba157';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);  

       		break

			case 7:
    			// Mapa 08 - Noregon
    			var nombre_ap = 'Noregon';
    			var vista_centro = new google.maps.LatLng(-40.082063, -71.299671);
				var vista_zoom = 13;
				var nodo_ap = new google.maps.LatLng(-40.099069, -71.289436);
				var coordenadas = [
					new google.maps.LatLng(-40.099069, -71.289436),
					new google.maps.LatLng(-40.102344, -71.292264),
					new google.maps.LatLng(-40.075881, -71.325378),
					new google.maps.LatLng(-40.057459, -71.309049),
					new google.maps.LatLng(-40.085935, -71.282609),
  				];	
  				var color_zona = '#eba157';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);  

       		break

			case 8:
    			// Mapa 09 - Kaleuche
    			var nombre_ap = 'Kaleuche';
    			var vista_centro = new google.maps.LatLng(-40.109852, -71.309069);
				var vista_zoom = 15;
				var nodo_ap = new google.maps.LatLng(-40.108884, -71.316426);
				var coordenadas = [
					new google.maps.LatLng(-40.108884, -71.316426),
					new google.maps.LatLng(-40.107312, -71.317119),
					new google.maps.LatLng(-40.105512, -71.300268),
					new google.maps.LatLng(-40.115474, -71.302942),
					new google.maps.LatLng(-40.111676, -71.315016),
  				];	
  				var color_zona = '#eba157';
			
    			inicializa_mapa(vista_centro, vista_zoom, coordenadas, nodo_ap, nombre_ap, color_zona);  

       		break           		

			default:
				alert (mapa_link+' referencia incorrecta. Consulte con el administrador del sitio');
			} 

		};

	});


			
		// envio de formulario
		
		 $('#contacto').on('submit', '#form-main', function(event) {
   		event.preventDefault();      
  		
    		var form = $(this);
    		var url_post = form.attr('action'); 
    		
			$.post(url_post, {
				'nombre': $('#form-nombre').val(),
				'emailaddress': $('#form-email').val(),
				'telefono': $('#form-telefono').val(),
				'localidad': $('#form-localidad').val(),
				'provincia': $('#form-provincia').val(),
				'mensaje': $('#form-mensaje').val(),
				},
				function(data) {
					$('#resultado').html(data);
					});
				
			$('#form-main').each (function(){
				this.reset();
				});
					
 			});
 			
});
	
	
//]]>   

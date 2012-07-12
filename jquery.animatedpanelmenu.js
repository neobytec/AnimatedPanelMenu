/**
 * AnimatedPanelMenu
 * 
 * @category   jquery
 * @package    plugin
 * @copyright  Víctor Bueno García 2012 neobytec@gmail.com http://www.neobytec.com
 * @license    MIT License (LICENSE.txt)
 * @version    1.0
 * 
 */
(function($) {
    //Función principal del plugin.
    $.fn.AnimatedPanelMenu = function(options) {
 
        //Elemento al que se le aplicado el plugin.
        var $element = null;
 
        //Opciones por defecto.
        var options = $.extend({
            eventTrigger: 'click'
        }, options);
 
		//Añadimos métodos y eventos.
		var methods = {
			init:   function () {
				//En éste método aplicaremos los estilos mediante clases css.
				$element.addClass('AnimatedPanelMenu');

				//Disparador del evento por defecto.
				var trigger = 'click';

				//Identificamos el evento que disparará el menú, si se ha indicado uno no permitido
	            //usamos el de por defecto click.
	            switch (options.eventTrigger) {
	                case 'mouseover':
	                	$element.find('ul > li > a').bind('mouseover', methods.events.mouseover);
	                	trigger = 'mouseover';
	                    break;
	                case 'click':
	                default:
	                	//Aplicamos el evento click a cada item del menu .AnimatedPanelMenu > ul > li > a
	                    $element.find('ul > li > a').click(methods.events.click);
	                    break;
	            }

				//Capturamos el evento click en cualquier parte del documento.
				$(document).bind(trigger, function (event) {
					//Si el elemento clickado no pertenece al menú cerramos los paneles.
					if ($(event.target).parents($element).length == 0) {
						//Quitamos enlaces activos.
						$element.find('a.active').removeClass('active');
						methods.hidePanels();
					}
				});
			},
			events: {
				mouseover:  function (event) {
		 			methods.events.click(event);
				},
				click:      function (event) {
					var panel = $(event.target).parent().find('> div'); 
				
					if (panel.length > 0) {
						//La comprobación de si hay algún panel activo la hacemos comprobando si 
						//algún enlace está marcado como activo.
						if ($element.find('a.active').length > 0) {
							//Comprobamos si el enlace pulsado ya estaba activo.
							if ($(event.target).hasClass('active')) {
								panel.slideUp();
				
								//Y borramos la clase active del enlace.
								$(event.target).removeClass('active');
							} else {
								//Borramos cualquier otro enlace activo...
								$element.find('a.active').removeClass('active');
				
								//Activamos el enlace actual.
								$(event.target).addClass('active');
								
								//Cerramos cualquier panel que esté desplegado.
								methods.hidePanels();
					
								//Por último mostramos el panel clickado con retardo.
								setTimeout(function () {
									panel.slideDown();
								}, 700);
							}
						} else {
							//Por último mostramos el panel clickado sin retardo.
							$(event.target).addClass('active');
							panel.slideDown();
						}
					}
				}
			},
			hidePanels:		function () {
				$element.find('ul > li > div').slideUp();
			}
		};
 
        //Aplicamos el plugin al elemento y devolvemos el objeto para permitir el chaining.
        return this.each(function () {
            //Asignamos elemento para poder manipularlo desde los métodos sin asignarlo en cada uno.
            $element = $(this);
 
            //Inicializamos el plugin.
            methods.init();
        });
    };
})(jQuery);
$(document).ready(
	function() {

		// chargement modules de bootstrap pour afficher les tooltip et modales
		$('[data-toggle="tooltip"]').tooltip()


		// changer la classe css sur les éléments du player au moment du lancement pour montrer quel son est joué
		var isPlaying=false;
    	function playTape () {
    		if (!isPlaying) {
	    		isPlaying=true;
	    		$(".notPlaying").addClass("isPlaying").removeClass("notPlaying");
	    		$('#player').addClass("sticky-top");
			}
    	}

		$(".playlist").on("click",function() {
			playTape();
		});

		$("#playButton").on("click",function() {
			playTape();
		});

		$("#playButtonAsidePlaylist").on("click",function() {
			playTape();
		});



		// module permettant de fixer le player en haut de l'écran si lecture en cours
		// TODO check au début si déjà à un niveau où le player devrait être collé en haut
		// TODO check état player. si c'est en train de play quid si: - on fait pause OU - on joue une autre track
	
		var navYposition = $('#player').offset().top;
		//console.log("navYposition= "+navYposition);

		$(window).on("scroll",function() {
		  var y = $(window).scrollTop();
		  //console.log("y= "+y);
		  if(isPlaying){

			if (y > navYposition) {	
						
				$("#player").addClass('not-top');
				} else {
				$("#player").removeClass('not-top');
				}

			}
		});
		

		/* Teaser image swap function */
	    $("#logoLink").on("hover",function () {
	        $("#logo").src = '/img/Logo_Mailtape.gif';
	    }, function () {
	        $("#logo").src = '/img/Logo_Mailtape.png';
	    });


	// module de redimensionnement auto de la taille des tracks dans la playlist en fonction de leur durée
		function setTracksWidth (tracksDurationArray) {
			console.log(tracksDurationArray);
			if (tracksDurationArray.includes(1)){
				for (i=0;i<7;i++){
					$(".track"+(i+1)).width('14%');} //on réinitialise toujours tant que toutes les durées ne sont pas récupérées
				//console.log("tracksDurationArray n'est pas prêt: "+tracksDurationArray);
			} // on vérifie avant qu'il ne reste pas une track dont on aurait pas encore la durée
			else {
				var totalDuration = tracksDurationArray[0]+tracksDurationArray[1]+tracksDurationArray[2]+tracksDurationArray[3]+tracksDurationArray[4]+tracksDurationArray[5]+tracksDurationArray[6];
				var percentUnit = "%";
				for (i=0;i<7;i++){
					$(".track"+(i+1)).width((tracksDurationArray[i]/totalDuration*100-0.2)+percentUnit);}
				//console.log("tracksDurationArray est prêt! "+tracksDurationArray);
			}
			
			
		}

	// module de récupération de la duration de tracks directement à partir de l'api soundcloud
		var	tracksDuration=[1,1,1,1,1,1,1];

	// array contenant les fichiers audios qui ne viendraient pas de soundcloud
		var audios=[];
		var externalAudioCount=0;

	// nouveauté avec Astro pour récupérer des éléments du frontmatter
		var tracksURL=[];
		const playlist = document.querySelector('.playlist');
		if (playlist) {
			tracksURL = JSON.parse(playlist.dataset.links);
		}

		function getTracksDuration () {
			//console.log("trying to get tracks duration");
			var count = tracksURL.length;
			//console.log("how many tracks? -> "+tracksURL.length);
			$.each(tracksURL,function(i,trackURL){
				audios[i] = new Audio(trackURL);
				audios[i].addEventListener('canplaythrough', function() {
				count--;
				//console.log("count: "+count+" trackURL: "+audios[i].src+" duration: "+audios[i].duration);
				//console.log("AMZ shit: "+Math.round(audios[i].duration));
			    tracksDuration[i]=Math.round(audios[i].duration);
			    //console.log("tracksDuration: "+tracksDuration);
			    setTracksWidth(tracksDuration);
			    });
			});
		}

		// avoid getTracksDuration on Firefox as it's provoking errors and doesn't let user stream full tracks
		// temporary fix till I (or you?!) find time to fix that ^^
		var isFirefox = typeof InstallTrigger !== 'undefined';
		if (!isFirefox) {
			getTracksDuration();
		}
		

		$(".playlist").on("click",function() {
			$("#playButton").fadeOut("slow");
		});


// désactivé car pas certain que les gens aiment qu'on leur impose un scroll. A voir si ça influe sur les usages..
	// // petit défilement doux et lent qui se déclenche après la lecture pour plonger l'auditeur dans la lecture du texte..
 //    	var scrolledDown=false;
 //		var page = $("html, body");

 //    	$(".playlist a , #playButtonAsidePlaylist, #playButton").on("click",function() {

 //    	 	if (!scrolledDown && $(document).scrollTop()<100) {
	//     	 	setTimeout(function(){

	//     	 	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
 //  					page.stop();
	// 			});

	//     		page.animate({
	// 				scrollTop: $("#player").offset().top+1
	// 				}, 20000, 'easeInOutSine' , function(){
	// 					page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
	// 				});
	//     		}, 5000);
	//     		scrolledDown=true;
 //    	 	}
 //    	});

// mini fleur musicolor

		// toggle() function deprecated in jQuery 1.9. Here it is then to keep musiColor action working.
		$.fn.toggleClick = function(){
	    	var functions = arguments ;
		    return this.on("click",function(){
		            var iteration = $(this).data('iteration') || 0;
		            functions[iteration].apply(this, arguments);
		            iteration = (iteration + 1) % functions.length ;
		            $(this).data('iteration', iteration);
		    });
		};

    	var timeoutMusiColorMiniIcon;
    	$("#musiColorMiniIcon").toggleClick(function(){
    			$(".icon-control").addClass("musiColorHelperVisible");
    			setTracksWidth ([1,1,1,1,1,1,1]);
				$(".musiColorHelper").fadeIn(1000);
				timeoutMusiColorMiniIcon = setTimeout(function() {
					$("#musiColorMiniIcon").trigger("click");
				},5000);
			}, function() {
				$(".icon-control").removeClass("musiColorHelperVisible");
				setTracksWidth (tracksDuration);
				$(".musiColorHelper").fadeOut(500);
				clearTimeout(timeoutMusiColorMiniIcon);
			}
    	);



		// if ($)
		// $(".stretchMe").each(function(index){
		// 	$(this).backstretch([
		// 		{ url:$(this).attr('data-stretch'),alignY: 0.22 }
		// 	]);
		// });

		// // affichage des images avec module d'adaptation responsive
		// $(".stretchMe").each(function(index){
		// 	$(this).backstretch([
		// 		{ url:$(this).attr('data-stretch'), alignY: 0.2 }
		// 	]);
		// });
		

		//toDo: sccript de redimensionnement automatique des titres de sons qui pourraient etre trop long et prendre 2 lignes. Probleme vu sur mobile.
		
		// affichage de la nouvelle version des credits à partir de l'épisode 200
		if ($("#illustrator").html() != "Illustrator: ") {
			$("#credit").removeClass("d-none");
		}
		else {
			$("#signature").removeClass("d-none");
		}

	}
);

document.addEventListener("DOMContentLoaded", function(event) {
    // affichage des images avec module d'adaptation responsive
	var bigHeader = document.getElementById("bigHeader");
	console.log(bigHeader);
	var alignY = parseFloat(bigHeader.dataset.stretchaligny);
	console.log("Alignement:"+alignY);

	// affichage des images avec module d'adaptation responsive
		$(".stretchMe").each(function(index){
			$(this).backstretch([
				{ url:$(this).attr('data-stretch'), alignY: alignY }
			]);
		});

});

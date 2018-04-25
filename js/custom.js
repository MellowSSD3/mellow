/* Theme Name:Mellow Bootstrap Theme
 */
$(document).ready( function() {
    $('#myCarousel').carousel({
    	interval:   4000
	});
    var checkEvent = false;
    $('#myCarousel').on('slid.bs.carousel', function (e)
    {
                var count = $('#mellonavbar').children().length - 1;
        		var id = $(".active", e.target).index();
        		if (checkEvent) {
        		    $('#mellonavbar li').last().removeClass('active');
        		    $('#mellonavbar li').first().addClass('active');
        		    checkEvent = false;
        		}
        		else {
        		    var current = $('#mellonavbar li.active');
        		    current.removeClass('active').next().addClass('active');
        		}
        		if (count == id) {
        		    checkEvent = true;
        		}
        
	});
	

var wavesurfer;
var openitem;
$('.popup-img-main').magnificPopup({
  // main options
  disableOn: 400,
  type:"image",
  preloader: true,
  image: {
      markup: '<div class="mfp-figure" style="text-align: center;">'+
            '<div class="mfp-close"></div>'+
      '<div class="mfp-img"></div>' +
          '<a href="javascript:void(0);"  class="hidden" id="stopplayaudio" style="font-size: 50px;"><i class="fa fa-pause"></i></a>' +
          '<input type="range" min="0" max="100" value="50" class="hidden" id="myRange">'+
            '<div id="waveform" class="white-bg text-center" style="position: relative;"><div id="loaddiv">Loading Audio....</div></div>' +
            '<div class="mfp-bottom-bar ">'+
              '<div class="mfp-title"></div>'+
              '<div class="mfp-counter"></div>'+
            '</div>'+
          '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

  

  titleSrc: 'title' // Attribute of the target element that contains caption for the slide.
  // Or the function that should return the title. For example:
  // titleSrc: function(item) {
  //   return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
  // }

  
},

  gallery: {
    // options for gallery
    enabled: false,
    },
    callbacks:{
    	elementParse: function(item) {openitem=item;},
    	close: function() {wavesurfer.stop();},
     open: function() {
    	var song=openitem.el.attr('song');
    	 wavesurfer = WaveSurfer.create({
                            container: '#waveform',
                            scrollParent: false
                        });
    	wavesurfer.pause();
        wavesurfer.load('audio/'+song);
        wavesurfer.on('ready', function () {
            var elem = document.getElementById('loaddiv');
            $("#stopplayaudio").removeClass("hidden");
            $("#myRange").removeClass("hidden");
            $("#stopplayaudio").on('click', function () {
                wavesurfer.playPause();
                if (wavesurfer.isPlaying()) {
                    $("#stopplayaudio").children().first().attr("class", "fa fa-pause");
                }
                else {
                    $("#stopplayaudio").children().first().attr("class", "fa fa-play");
                }

            });
           
            elem.parentNode.removeChild(elem);
            wavesurfer.setVolume($('#myRange').val() / 100);
            $('#myRange').on('input', function () {
                wavesurfer.setVolume($('#myRange').val() / 100);


               
            });
         wavesurfer.play();

                        });
    }}
});
    
var audiopalyers=[];
$('.audiocontrol').on('click', function ()
    {
    	var audioplayerindex=$(this).attr('playerindex');
    	if (typeof audioplayerindex !== typeof undefined && audioplayerindex !== false) {
    		for (var i = audiopalyers.length - 1; i >= 0; i--) {
    			if(audiopalyers[i].idx==$(this).attr('playerindex'))
    				audiopalyers[i].wave.playPause();
    			if(audiopalyers[i].wave.isPlaying()){
    				audiopalyers[i].runcontrol.children().first().attr("class","fa fa-pause");
    			}
    			else{
    				audiopalyers[i].runcontrol.children().first().attr("class","fa fa-play");
    			}
    		};

    	}
    	else{
    		
    		var sound=$(this).attr('sound');
    		var playerindex=audiopalyers.length;
    		var divplayer=$(this).parent().children().last();
    		divplayer.attr("id","player"+playerindex)
    		 divplayer.children().first().removeClass("hidden");
    		 //alert(playerindex);
    		var wavesurfe = WaveSurfer.create({
                            container: "#"+divplayer.attr("id"),
                            scrollParent: false,
                            height:30,
                            barHeight:10
                        });
    		wavesurfe.load('audio/'+sound);
        wavesurfe.on('ready', function () {
        divplayer.children().first().addClass("hidden");
        
         wavesurfe.play();
                        });
        wavesurfe.on('finish', function () {
        
        
         wavesurfe.play();
                        });
        var volume=$(this).next().children().first().val();
        wavesurfe.setVolume(volume/100);
        $(this).children().first().attr("class","fa fa-pause");
        var audiopalayer={idx:playerindex , wave:wavesurfe , runcontrol:$(this)};
        $(this).attr("playerindex",playerindex);
        audiopalyers.push(audiopalayer);

    		

    	}
    	
    	});
$('.slidertext').on('input', function ()
    {
    	var playeridx=$(this).parent().prev().attr("playerindex");
    	for (var i = audiopalyers.length - 1; i >= 0; i--) {
    			if(audiopalyers[i].idx==playeridx)
    				audiopalyers[i].wave.setVolume($(this).val()/100);
    			
    			
    		};
    	});

$('.animated_bg2').animatedBG({
			colorSet: ['#abebfe', '#aad667', '#57e6ee', '#ff7ebb'],
			speed: 10000
		});


    
    $("#HowItWorks").on('show.bs.modal', function () {
        document.getElementById("howworkvideo").play();
    });
    $("#HowItWorks").on('hide.bs.modal', function () {
        document.getElementById("howworkvideo").pause();
    });

    $("#YahyaHowItWorks").on('show.bs.modal', function () {
        document.getElementById("howworkvideoYahya").play();
    });
    $("#YahyaHowItWorks").on('hide.bs.modal', function () {
        document.getElementById("howworkvideoYahya").pause();
    });

    $("#FazHowItWorks").on('show.bs.modal', function () {
        document.getElementById("howworkvideoFaz").play();
    });
    $("#FazHowItWorks").on('hide.bs.modal', function () {
        document.getElementById("howworkvideoFaz").pause();
    });

    $("#RubelHowItWorks").on('show.bs.modal', function () {
        document.getElementById("howworkvideoRub").play();
    });

    $("#RubelHowItWorks").on('hide.bs.modal', function () {
        document.getElementById("howworkvideoRub").pause();
    });

    $("#Disclaimer").modal("show");
});

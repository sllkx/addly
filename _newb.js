		window.addEventListener('load', function() {
			var images = document.querySelectorAll('img');
			images.forEach(function(img) {
				if (!img.hasAttribute('alt')) {
					img.setAttribute('alt', 'image');
				}
			});
		});
		//alt


        function unlockContent() {
          $('#lock-overlay').css('opacity', '0');
          $('#ad-close-btn').hide();
          
          setTimeout(() => {
              $('#lock-overlay').hide();
              $('#locked-content').removeClass('h-[50px] overflow-hidden'); 
          }, 300);

          setTimeout(() => {
              $('#locked-content').addClass('h-[50px] overflow-hidden');   
              $('#lock-overlay').show();
              $('#ad-close-btn').show();
              setTimeout(() => { $('#lock-overlay').css('opacity', '1'); }, 100);
          }, 1000); 
      }

	  document.write('<style>.close-x-btn {width:7px !important;height:7px !important}</style>');
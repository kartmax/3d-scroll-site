document.addEventListener('DOMContentLoaded', function() {

	let zSpacing = -1000,
       lastPos = zSpacing / 5,
       framesArray = [...document.getElementsByClassName('frame')],
       zVals = [];

      window.onscroll = function() {

         let top = document.documentElement.scrollTop,
             delta = lastPos - top;
         
         lastPos = top;

         framesArray.forEach((item, idx) => {
            zVals.push( (idx * zSpacing) + zSpacing );
            zVals[idx] += delta * -3; //скорость прокрутки фреймов
            
            let frame = framesArray[idx],
                transform = `translateZ(${zVals[idx]}px)`,
                opacity = zVals[idx] < Math.abs(zSpacing) / 1.8 ? 1 : 0;

            frame.setAttribute('style', `transform : ${transform}; opacity : ${opacity}` )
         })

      };

      window.scrollTo(0, 2);

      // Audio
      let btnAudio = document.querySelector('.soundBtn'),
          audio = document.querySelector('.audio');
          text = {
             'play' : 'Turn on the sound',
             'pause' : 'Turn the sound off'
          }

      btnAudio.addEventListener('click', (e) => {
         btnAudio.classList.toggle('paused');
         audio.paused ? audio.play() : audio.pause();
         if (btnAudio.classList.contains('paused')) {
            btnAudio.setAttribute('aria-label', text.play);
            btnAudio.setAttribute('title', text.play);
         } else {
            btnAudio.setAttribute('aria-label', text.pause);
            btnAudio.setAttribute('title', text.pause);
         }
      });

      window.onblur = function() {
         audio.pause();
      };
      window.onfocus = function() {
         btnAudio.classList.contains('paused') ? audio.pause() : audio.play();
      };

});

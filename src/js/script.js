$(document).ready(function() {
    $('.photo__wrapper').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery:{enabled:true},
        mainClass: 'mfp-fade', // Добавьте анимацию появления и исчезновения
        removalDelay: 300, // Задержка перед закрытием всплывающего окна
        closeBtnInside: false // Кнопка закрытия всплывающего окна внутри контента
      });
      $('.open-popup-link').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        }
    });
});
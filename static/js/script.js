$(document).ready(function() {
    var audio = document.getElementById('audio');
    var isPlaying = false;

    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Play or pause audio on spacebar press
    $(document).on('keydown', function(event) {
        if (event.which === 32) { // 32 is the keycode for spacebar
            event.preventDefault(); // Prevent default action (e.g., scrolling)
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            } else {
                audio.play();
                isPlaying = true;
            }
        }
    });

    audio.addEventListener('timeupdate', function() {
        var currentTime = audio.currentTime * 1000; // Convert to milliseconds

        $('#transcript span').each(function() {
            var start = parseInt($(this).data('start'));
            var end = parseInt($(this).data('end'));

            if (currentTime >= start && currentTime <= end) {
                $(this).addClass('highlight');
            } else {
                $(this).removeClass('highlight');
            }
        });

        $('#transcript span').on('click', debounce(function() {
            var start = parseInt($(this).data('start')) / 1000; // Convert to seconds
            audio.currentTime = start;
            audio.play();
        }, 100)); // Debounce with 100ms delay
    });
});

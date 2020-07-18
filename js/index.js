(function () {
    var list = Array.prototype.slice.call(document.getElementsByTagName('button'));
    var audio = document.getElementById('audio');
    list.forEach(function (btn) {
        btn.onclick = function () {
            if (btn.getAttribute('id') == 'stop') {
                audio.src = ''
                audio.pause();
            } else {
                audio.src = btn.getAttribute('data-url');
                audio.play();
            }

        }
    });
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then(function () { console.log("Service Worker Registered"); });
    }
})()
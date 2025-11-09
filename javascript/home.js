document.querySelectorAll('.hoverText a').forEach(function(element) {
    element.addEventListener('mouseenter', function() {
        // マウスが入ったときの処理
        element.style.animationPlayState = 'paused';
    });

    element.addEventListener('mouseleave', function() {
        // マウスが離れたときの処理
        element.style.animationPlayState = 'running';
    });
});
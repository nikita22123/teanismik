let $sls, interval, $selectors, $btns, currentIndex, nextIndex;
let cycle = index => {
    let $currentSlide, $nextSlide, $currentSelector, $nextSelector;
    nextIndex = index !== undefined ? index : nextIndex;
    $currentSlide = $($sls.get(currentIndex));
    $currentSelector = $($selectors.get(currentIndex));
    $nextSlide = $($sls.get(nextIndex));
    $nextSelector = $($selectors.get(nextIndex));
    $currentSlide.removeClass("sl-active").css("z-index", "0");
    $nextSlide.addClass("sl-active").css("z-index", "1");
    $currentSelector.removeClass("sl-current");
    $nextSelector.addClass("sl-current");
    currentIndex = index !== undefined
    ? nextIndex
    : currentIndex < $sls.length - 1 
    ? currentIndex + 1 
    : 0;    
    nextIndex = currentIndex + 1 < $sls.length ? currentIndex + 1 : 0;
};
$(() => {
    currentIndex = 0;
    nextIndex = 1;
    $sls = $(".sl");
    $selectors = $(".selector");
    $btns = $(".sl-btn");
    $sls.first().addClass("sl-active");
    $selectors.first().addClass("sl-current");
    interval = window.setInterval(cycle, 8000);
    $selectors.on("click", e => {
        let target = $selectors.index(e.target);    
        if (target !== currentIndex) {
            window.clearInterval(interval);
            cycle(target);
            interval = window.setInterval(cycle, 8000);
        }
    });
    $btns.on("click", e => {
        window.clearInterval(interval);
        if ($(e.target).hasClass("sl-prev")) {
            let target = currentIndex > 0 ? currentIndex - 1 : $sls.length - 1;
            cycle(target);
            } else if ($(e.target).hasClass("sl-next")) {
            cycle();
        }
        interval = window.setInterval(cycle, 8000);
    });
});

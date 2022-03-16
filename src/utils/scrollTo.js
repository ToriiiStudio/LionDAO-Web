
function easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

export function scrollTo(duration = 1, targetY = 0) {

    const startTimestamp = (new Date()).getTime();
    const nowPageYOffset = window.pageYOffset;
    let animating;
    
    const handleScrolling = () => {
        const nowTimestamp = (new Date()).getTime();
        const delta = (nowTimestamp - startTimestamp) * 0.001;
        
        const t = 1 - Math.min(1, delta / duration);
        const d = targetY - nowPageYOffset;

        window.autoScrolling = true;
        window.scrollTo(0, targetY - easeInOutQuart(t) * d);

        if (delta <= duration) {
            animating = requestAnimationFrame(handleScrolling);
        }
        else {
            window.autoScrolling = false;
            cancelAnimationFrame(animating);
        }

    }

    if (!window.autoScrolling) {
        handleScrolling();
    }
    
}

export function scrollToTop(duration = 1) {
    scrollTo(duration);
}

export function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}
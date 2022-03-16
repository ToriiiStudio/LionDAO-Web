export const xs = 360;
export const sm = 576;
export const md = 768;
export const lg = 992;
// export const lgPlus = 1280;
export const xl = 1280;

const breakpoints = { xs, sm, md, lg, xl };
const _respondTo = breakpoint => ` @media (max-width: ${breakpoint}px)`
const _respondFrom = breakpoint => ` @media (min-width: ${breakpoint + 1}px)`

const respondTo = {};
const respondFrom = {};

Object.keys(breakpoints).forEach(key => {
  respondTo[key] = _respondTo(breakpoints[key]);
})

Object.keys(breakpoints).forEach(key => {
  respondFrom[key] = _respondFrom(breakpoints[key]);
})

function toRespond ( pointWithBreakpoint, renderer ) {
    if (pointWithBreakpoint === undefined || pointWithBreakpoint === null) return '';

    let renderOutput = '';

    if (typeof pointWithBreakpoint === 'object') {
        
        if (pointWithBreakpoint['default']) {
            renderOutput = renderer(pointWithBreakpoint['default']);
            if (typeof renderOutput === 'object') {
                renderOutput = renderOutput.join?.('').trim?.();
            }
        }

        Object.keys(pointWithBreakpoint).forEach(key => {
            if ( respondTo[key] ) {
                let renderResult = renderer(pointWithBreakpoint[key]);
                if (typeof renderResult === 'object') {
                    renderResult = renderResult.join?.('').trim?.();
                }
                renderOutput = `${respondTo[key]} { ${renderResult} };` + renderOutput;
            }
        })
    } 
    else if (typeof pointWithBreakpoint === 'number' || typeof pointWithBreakpoint === 'string') {
        renderOutput = renderer(pointWithBreakpoint);
    }
    
    return renderOutput;
}

function attrToRespond (attributeName, pointWithBreakpoint, unit = 'px') {
    return toRespond(pointWithBreakpoint, value => `${attributeName}: ${value}${unit}`)
}

export { respondTo, respondFrom, breakpoints, toRespond, attrToRespond };
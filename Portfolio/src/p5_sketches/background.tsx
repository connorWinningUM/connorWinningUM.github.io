import { useLayoutEffect, useRef} from 'react';
import P5 from 'p5'

const SketchComp = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const sketch = (p5: P5) => {
        let animationSpeed = 0.01;
        let x = 0;
        let inlineGap = 45;
        let lineGap = 90;

        let largeRadius = 15;
        let smallRadius = 5;

        let canvasWidth = window.screen.width;
        let canvasHeight = window.screen.height;
        p5.setup = () => {
            p5.createCanvas(canvasWidth, canvasHeight);
            p5.background('rgba(255, 220, 81, 1)');
            p5.frameRate(30);
            canvasWidth = p5.width;
            canvasHeight = p5.height;
        }

        const drawSmallCircles = (x: number) => {
            p5.fill('rgb(255,255,255)');
            p5.stroke('rgb(255,0,0)');

            for(let y = 0; y < canvasHeight; y+=lineGap){
                for(let i = 0; i < canvasWidth; i+=lineGap) {
                    p5.circle(x+i,x+y,smallRadius);
                    p5.circle(x-i,x+y,smallRadius);
                    p5.circle(x-i,x-y,smallRadius);
                    p5.circle(x+i,x-y,smallRadius);
                }
            }
        }

        const drawLargeCircles = (x: number) => {
            p5.fill('rgb(255,255,255)');
            p5.stroke('rgb(0,0,0)');
            for(let y = inlineGap; y < canvasHeight; y+=lineGap){
                for(let i = inlineGap; i < canvasWidth; i+=lineGap) {
                    p5.circle(x+i,x-y,largeRadius);
                    p5.circle(x-i,x+y,largeRadius);
                    p5.circle(x-i,x-y,largeRadius);
                    p5.circle(x+i,x+y,largeRadius);
                }
            }
        }

        p5.draw = () => {
            p5.background('rgba(255, 222, 131, 1)');
                
            let deltaX = animationSpeed * p5.deltaTime;
            x += deltaX;
                
            if(x > canvasHeight){
                x = 0;
            }
                
            drawSmallCircles(x);
            drawLargeCircles(x);
        }

        p5.windowResized = function() {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
            canvasWidth = p5.width;
            canvasHeight = p5.height;
        }
    };

    useLayoutEffect(
        () => {
            // Make sure the p5.js canvas is a child of the component in the DOM
            if (!containerRef.current) return;
            let s = new P5(sketch, containerRef.current);

            // Remove the sketch when the component is removed/replaced
            return () => s.remove();
        },
        // This empty list tells React that this effect never needs to get re-rendered
        []
    );

    return (
        <div className="sketch-container" ref={containerRef}></div>
    );
};

export default SketchComp;
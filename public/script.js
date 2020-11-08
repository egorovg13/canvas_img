import Dot from './dot.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const img = document.querySelector('img')
img.crossOrigin = "Anonymous"

let isImage = false;

const animateDot = (dot, canvas) => {
    const rand = Math.random() * Math.PI * 2;

    let x = Math.sin(rand)*300+canvas.width/2;
    let y = Math.cos(rand)*300+canvas.height/2;

    if (isImage) {
        x = dot.imageX;
        y = dot.imageY
    }

    gsap.to(dot, {
        duration: 1.5 + Math.random(),
        x, 
        y, 
        ease: 'cubic.inOut',
        onComplete: () => {
            animateDot(dot, canvas)
        }
    })
}

addEventListener('click', () => {
    isImage = !isImage;
}) 
addEventListener('load', () => {
    c.drawImage(img, 0, 0)
    const imgageData = c.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;

    const dots = [];
    const pixels = [];

    for (let index = 0; index < imgageData.length; index+=4) {
        const alpha = imgageData[index+3];
        if (alpha === 0) continue
        const x = (index/4) % img.naturalWidth;
        const y = Math.floor(Math.floor(index/img.naturalWidth)/4);
        if (x % 5 === 0 && y % 5 === 0) {
            pixels.push({
                x: x,
                y: y,
                r: imgageData[index],
                g: imgageData[index+1],
                b: imgageData[index+2]
            })
        }
    }

    pixels.forEach((pixel, i) => {
        const imageX = pixel.x + canvas.width/2 - img.naturalWidth /2 ;
        const imageY = pixel.y + canvas.height/2 - img.naturalHeight /2;

        const rand = Math.random() * Math.PI * 2;
        const x = Math.sin(rand)*200+canvas.width/2;
        const y = Math.cos(rand)*200+canvas.height/2;

        dots.push(new Dot (x, y, pixel.r, pixel.g, pixel.b, imageX, imageY))
        animateDot(dots[i], canvas);

    })





    const animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0,0, innerWidth, innerHeight);

        dots.forEach(dot => {
            dot.draw(c);
            // dot.r++
            // dot.g++
        })
    };

    animate();
})



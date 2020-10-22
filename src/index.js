import { animeInit, fadeIn } from "./helpers";
import "./style.css";

const main = document.querySelector("main");
main.style.opacity = 0;

function animateText() {
    let material;
    const deep = 0.5;
    const fluid = 0.015;
    const uniforms = {
        speed: 0,
        volatility: 0,
    };

    const root = document.getElementById("text");
    material = new Blotter.RollingDistortMaterial();
    material.uniforms.uSineDistortSpread.value = 0.4;
    material.uniforms.uSineDistortCycleCount.value = 2;
    material.uniforms.uSineDistortAmplitude.value = 0.1;
    material.uniforms.uNoiseDistortVolatility.value = 0;

    const text = new Blotter.Text(root.innerText, {
        weight: 800,
        family: "Helvetica Neue",
        size: 50,
        fill: "white",
        paddingLeft: 80,
        paddingRight: 80,
        paddingBottom: 80,
        paddingTop: 80,
    });
    root.innerText = "";

    var blotter = new Blotter(material, {
        texts: text,
    });
    var canvas = blotter.forText(text).domElement;
    root.appendChild(canvas);

    animate();

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        uniforms.volatility += (deep * 0.5 - uniforms.volatility) * fluid;
        uniforms.speed += (deep * 0.5 - uniforms.speed) * fluid;
    }
}

function colorText() {
    const max = 360;
    const colorArr = document.querySelectorAll(".color svg path");
    let hue = 0;
    let inc = true;

    const render = () => {
        colorArr.forEach((colorEl) => {
            colorEl.style.fill = `hsl(${hue}, 63%, 59%)`;
        });

        if (hue >= 360) {
            inc = false;
        } else if (hue <= 0) {
            inc = true;
        }

        if (inc === true) {
            hue += 1;
        } else {
            hue -= 1;
        }
    };

    const animate = () => {
        requestAnimationFrame(animate);
        render();
    };
    animate();
}

const countdown = () => {
    const count = document.getElementById("daycount");
    const dateNow = new Date().getTime();
    const dateThen = new Date("November 20, 2020 00:00:00").getTime();
    const daysRemaining = Math.ceil((dateThen - dateNow) / (1000 * 60 * 60 * 24));
    count.innerText = daysRemaining.toString();
};

window.onload = () => {
    animeInit([".delay", "#text"]);
    animateText();
    colorText();
    countdown();
    main.style.opacity = 1;
    setTimeout(() => {
        fadeIn("#text").then(() => {
            fadeIn(".delay");
        });
    }, 100);
};

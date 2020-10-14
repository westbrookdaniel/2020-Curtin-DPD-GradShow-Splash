let material
const deep = 0.5
const fluid = 0.015
const uniforms = {
	speed: 0,
	volatility: 0,
}

function init() {
	const root = document.getElementById('app')
	material = new Blotter.RollingDistortMaterial()
    material.uniforms.uSineDistortSpread.value = 0.44
    material.uniforms.uSineDistortCycleCount.value = 2
    material.uniforms.uSineDistortAmplitude.value = 0.1
    material.uniforms.uNoiseDistortVolatility.value = 0
    
	const text = new Blotter.Text('curtin', {
		weight: 800,
		size: 80,
		fill: 'white',
		paddingLeft: 80,
		paddingRight: 80,
		paddingBottom: 80,
		paddingTop: 80,
	})
	var blotter = new Blotter(material, {
		texts: text,
	})
	var canvas = blotter.forText(text).domElement
	root.appendChild(canvas)

	animate()
}

function animate() {
	requestAnimationFrame(animate)
	render()
}

function render() {
	uniforms.volatility += (deep * 0.5 - uniforms.volatility) * fluid
	uniforms.speed += (deep * 0.5 - uniforms.speed) * fluid
	
	// material.uniforms.uVolatility.value = uniforms.volatility
	// material.uniforms.uSpeed.value = uniforms.speed
}

window.onload = init()

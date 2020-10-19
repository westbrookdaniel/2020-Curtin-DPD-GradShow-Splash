import anime from 'animejs'

const trans = 'var(--transition)'
const ease = 'easeInOutCubic'
const dur = 500
const sta = 200

export const animeInit = (selector) => {
	selector.forEach((sel) => {
		const el = document.querySelectorAll(sel)
		el.forEach((el) => {
			el.style.transition = 'unset'
			el.style.opacity = '0'
		})
	})
}

export const fadeIn = (selector, t = trans) => {
	return new Promise((resolve, reject) => {
        try {
            const el = document.querySelectorAll(selector)
            if (el.length === 0) { resolve() }
            anime({
                targets: el,
                easing: ease,
                duration: dur,
                opacity: 1,
                delay: anime.stagger(sta),
                complete: () => {
                    el.forEach((el) => {
                        el.style.transition = t
                    })
                    resolve()
                },
            })
        } catch (err) {
            reject(err)
        }
	})
}
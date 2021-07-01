<template>
  <div id="mount-point">
    <main>
<section class="tabs">

<div class="tab">
	<img src="https://raw.githubusercontent.com/DanialZahid/Tabbed-Window-List/Main/src/images/svg/codepen.svg" alt="CodePen">
	<h2>CodePen</h2>
</div>

<div class="tab">
	<img src="https://raw.githubusercontent.com/DanialZahid/Tabbed-Window-List/Main/src/images/svg/dribbble.svg" alt="Dribbble">
	<h2>Dribbble</h2>
</div>

<div class="tab">
	<img src="https://raw.githubusercontent.com/DanialZahid/Tabbed-Window-List/Main/src/images/svg/github.svg" alt="GitHub">
	<h2>GitHub</h2>
</div>

<div class="tab">
	<img src="https://raw.githubusercontent.com/DanialZahid/Tabbed-Window-List/Main/src/images/svg/linkedin.svg" alt="LinkedIn">
	<h2>LinkedIn</h2>
</div>

<div class="tab">
	<img src="https://raw.githubusercontent.com/DanialZahid/Tabbed-Window-List/Main/src/images/svg/twitter.svg" alt="Twitter">
	<h2>Twitter</h2>
</div>

<div class="tab">
	<img src="https://raw.githubusercontent.com/DanialZahid/Tabbed-Window-List/Main/src/images/svg/vimeo.svg" alt="Vimeo">
	<h2>Vimeo</h2>
</div>

</section>

</main>
  </div>
</template>

<script>
export default {
  name: "Options",
  mounted() {
    browser.runtime.sendMessage({});
  },

  data() {
      return {
          items: [
        "Apples",
        "Broccoli",
        "Chicken",
        "Bacon",
        "Eggs",
        "Salmon",
        "Granola",
        "Bananas",
        "Beer",
        "Wine",
        "Yogurt"
      ]
      }
  }
};
</script>


<style lang="scss" scoped>
// Page Setup

* {
	box-sizing: inherit;
	padding: 0;
	margin: 0;
	border: 0;
	outline: 0;
}

*::before,
*::after {
	box-sizing: inherit;
}

html {
	box-sizing: border-box;
	font-size: 10px;
}

body {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1.6rem;
	background: url("https://raw.githubusercontent.com/DanialZahid/Tabbed-Window-List/Main/src/images/background.jpg")
		fixed center center / cover no-repeat;
	color: #fff;
}

main {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 3rem;
}

img {
	display: block;
	max-width: 100%;
}

// Core

.tabs {
	display: flex;
	flex-flow: column wrap;
	text-align: center;
	border-right: 1px solid rgba(51, 51, 51, 0.5);
	background: #3333334d;

	h2 {
		font-size: 2rem;
	}
}

.tab {
	display: flex;
	align-items: center;
	gap: 1rem;
	flex: 1;
	flex-wrap: wrap;
	padding: 2rem;
	cursor: pointer;
	transition: all 300ms ease-in-out;

	&:focus,
	&:hover,
	&:active {
		background: #3333334d;
	}

	img {
		width: 3.2rem;
	}
}

.tab-active {
	background: #1a1a1a80;
}

.content-pane {
	cursor: default;
	display: flex;
	flex-flow: column wrap;
	padding: 3rem;
}

.tab-content {
	display: none;
	animation: scaleUp 500ms ease-in-out;

	p {
		margin: 1rem 0;
	}
}

.tab-content-active {
	display: block;
}

@keyframes scaleUp {
	0% {
		opacity: 0;
		transform: scale(0.8);
	}

	100% {
		opacity: 1;
		transform: scale(1);
	}
}

// Media Queries

@media (max-width: 768px) {
	.tabbed-window-list {
		grid-template-columns: auto;
		width: auto;
	}

	.tabs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		border-right: 0;
		border-bottom: 1px solid rgba(51, 51, 51, 0.5);
	}

	.tab {
		justify-content: center;
	}
}

@media (max-width: 425px) {
	body {
		font-size: 1.2rem;
	}

	main {
		padding: 1rem;
	}

	.tabs {
		img {
			width: 2.4rem;
		}

		h2 {
			font-size: 1.6rem;
		}
	}

	.tab {
		padding: 1rem;
	}
}

</style>

<script>
const tab = document.querySelectorAll(".tab");
const tabContent = document.querySelectorAll(".tab-content");

for (let i = 0; i < tab.length; i++) {
	tab[i].onclick = tabActive;
}

function tabActive() {
	for (let i = 0; i < tab.length; i++) {
		this.classList.add("tab-active");

		if (tab[i] !== this) {
			tab[i].classList.remove("tab-active");
		}
	}

	for (let i = 0; i < tabContent.length; i++) {
		tabContent[i].classList.add("tab-content-active");

		if (tab[i] !== this) {
			tabContent[i].classList.remove("tab-content-active");
		}
	}
}
</script>

<template>
    <div>
      <header>
        <div class="container">
          <a href="#" class="anchor"><span class="span"></span></a>
          <div class="row hero">
            <div class="eight columns">
              <div class="content small">
                <h2>Bl0Ka</h2>
                <h2>Bl0Ka</h2>
              </div>
              <h1 class="header ">Keep the browsing safe <span>:)</span></h1>
              <h2 class="subheader">
                This Extension Keeps blocks adult-rated websites.
              </h2>
              <p class="paragraph" style="font-size: 20px;">
                Bloka uses efficient code that updates the list automatically,<br>
                and needs no further setup. Just install and you're good to go.
              </p>
            </div>
            <div class="four columns">
            <div id="text" data-text="Keep Kids Safe">
              Keep kids safe
            </div>
            </div>
          </div>
        </div>
      </header>
  </div>
</template>

<script>
export default {
  mounted() {

  let text = document.getElementById('text');
  let shadow = '';

  for(let i = 0; i < 20; i++) {
    shadow += (shadow? ',' : '') + -i * 1 + 'px ' + i * 1 + 'px 0 #e47056';
  }

  text.style.textShadow = shadow;

  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e47056;
  overflow: hidden;

  #text {
    position: relative;
    color: #f19c89;
    font-size: 12vw;
    line-height: 0.9em;
    letter-spacing: 2px;
    text-align: center;
    transform: rotate(-28deg) skew(25deg);

    &:before {
      content: attr(data-text);
      position: absolute;
      top: 30px;
      left: -30px;
      color: rgba(0, 0, 0, 0.3);
      text-shadow: none;
      filter: blur(5px);
      z-index: -1;
    }
  }
}

.small {
  display: inline;
  font: caption;
  align-self: center;
}
.anchor {
  font-style: normal;
  font-weight: bolder;
  font-size: 40px;
  padding: 20px;
}

.span {
  font-style: oblique;
  font-size: 60px;
}

body {
  margin: 0px;
  padding: 0px;
  font-family: "Poppins" !important;
  font-size: 16px;
  font-weight: 300;
  color: #525252;
}

.container {
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.column,
.columns {
  width: 100%;
  float: left;
  box-sizing: border-box;
}

.column,
.columns {
  margin-left: 4%;
}

.column:first-child,
.columns:first-child {
  margin-left: 0;
}

.one.column,
.one.columns {
  width: 4.66667%;
}

.two.columns {
  width: 13.33333%;
}

.three.columns {
  width: 22%;
}

.four.columns {
  width: 30.66667%;
}

.five.columns {
  width: 39.33333%;
}

.six.columns {
  width: 48%;
}

.seven.columns {
  width: 56.66667%;
}

.eight.columns {
  width: 65.33333%;
}

.nine.columns {
  width: 74%;
}

.ten.columns {
  width: 82.66667%;
}

.eleven.columns {
  width: 91.33333%;
}

.twelve.columns {
  width: 100%;
  margin-left: 0;
}

.one-third.column {
  width: 30.66667%;
}

.two-thirds.column {
  width: 65.33333%;
}

.one-half.column {
  width: 48%;
}

.offset-by-one.column,
.offset-by-one.columns {
  margin-left: 8.66667%;
}

.offset-by-two.column,
.offset-by-two.columns {
  margin-left: 17.33333%;
}

.offset-by-three.column,
.offset-by-three.columns {
  margin-left: 26%;
}

.offset-by-four.column,
.offset-by-four.columns {
  margin-left: 34.66667%;
}

.offset-by-five.column,
.offset-by-five.columns {
  margin-left: 43.33333%;
}

.offset-by-six.column,
.offset-by-six.columns {
  margin-left: 52%;
}

.offset-by-seven.column,
.offset-by-seven.columns {
  margin-left: 60.66667%;
}

.offset-by-eight.column,
.offset-by-eight.columns {
  margin-left: 69.33333%;
}

.offset-by-nine.column,
.offset-by-nine.columns {
  margin-left: 78%;
}

.offset-by-ten.column,
.offset-by-ten.columns {
  margin-left: 86.66667%;
}

.offset-by-eleven.column,
.offset-by-eleven.columns {
  margin-left: 95.33333%;
}

.offset-by-one-third.column,
.offset-by-one-third.columns {
  margin-left: 34.66667%;
}

.offset-by-two-thirds.column,
.offset-by-two-thirds.columns {
  margin-left: 69.33333%;
}

.offset-by-one-half.column,
.offset-by-one-half.columns {
  margin-left: 52%;
}

.container:after,
.row:after,
.u-cf {
  content: "";
  display: table;
  clear: both;
}

a {
  color: #ffffff;
}
img {
  max-width: 100%;
  height: auto;
  width: auto\9; /* ie8 */
}
/* Typography
********************************************************************* */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
  margin: 0;
}
h1 {
  font-size: 44px;
}
/* Header Section
********************************************************************* */

header {
  background: #e45737;
  min-height: 800px;
  padding: 0px 0 50px 0;
  box-sizing: border-box;
  background-size: cover;
}
header h1 {
  font-size: 66px;
  color: #ffffff;
  padding-top: 70px;
  font-weight: 600;
}
header h2 {
  color: #ffffff;
}
header p {
  color: #ffffff;
}
.hero {
  margin-top: 80px;
}
.appstorebutton {
  display: inline-block;
  max-height: 50px;
  width: auto;
  padding-top: 40px;
  padding-right: 10px;
}
.phone {
  max-width: 220px;
  height: auto;
  float: right;
}
.logo {
  position: absolute;
  left: 20px;
  top: 20px;
  max-width: 100px;
  height: auto;
}

/* Animation */
.content {
  position: relative;
}

.content h2 {
  color: #fff;
  font-size: 8em;
  position: absolute;
  transform: translate(-50%, -50%);
}

.content h2:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 2px #d4aba2;
}

.content h2:nth-child(2) {
  color: #d4aba2;
  animation: animate 4s ease-in-out infinite;
}

@keyframes animate {
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}
</style>

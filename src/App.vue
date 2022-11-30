<template>
  <nav :class="{'open':mobileBool}">
      <router-link to="/"><h1 @click="setHamburger(false)">Iguana Perdida</h1></router-link>
    <div class="inner">
      <ol id="nav_list">
        <li @click="setHamburger(false)"><router-link to="/">Home</router-link></li>
        <li @click="setHamburger(false)">
          <router-link  to="/about">About</router-link>
        </li>
        <li @click="setHamburger(false)">
          <router-link  to="/restaurant">Restaurant</router-link>
        </li>
        <li @click="setHamburger(false)">
          <router-link  to="/activities">Activities</router-link>
        </li>
        <li @click="setHamburger(false)"><router-link to="/faq">FAQ</router-link></li>
        <li @click="setHamburger(false)">
          <router-link  to="/reviews">Reviews</router-link>
        </li>
        <li @click="setHamburger(false)">
          <router-link  to="/contact">Contact us</router-link>
        </li>
      </ol>
      <ol class="ml30">
      <li @click="setHamburger(false)">
          <router-link class="link__booking" to="/booking">Booking</router-link>
        </li>
      </ol>
    </div>
   
    <a class="hamburger" @click="setHamburger()"></a>
  </nav>
  <router-view />
</template>
<script>

import {ref} from "vue";
export default {
  setup() {
    const mobileBool = ref(false);
    const setHamburger = (bool) =>{
     mobileBool.value = (bool === false) ? bool : !mobileBool.value;
    }

    return{
      mobileBool,
      setHamburger
    }
  },
}
</script>



<style lang="scss">
@import "@/assets/css/global.scss";
@import "@/assets/css/mobile.scss";

$nav: #384f55;
$nav: #183c75;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: darken($nav, 15%);
}
p {
  font-size: 15px;
}
h1,
h2,
h3,
h4,
legend {
  color: #445873;
}

nav {
  height: 50px;
  background: darken($nav, 15%);
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: flex-end;
  >div{
    display: flex;
  justify-content: flex-end;
  width:100%;
  position: relative;
  }

  h1 {
    display: block;
    height: 50px;
    width: 320px;
    position: absolute;
    margin: 0px;
    padding: 0px;
    transform: scale(0.6);
    text-indent: -10000px;
    left: -15px;
    z-index: 99;
    top: 0px;
    &:after {
      content: "";
      display: block;
      height: 50px;
      width: 320px;
      position: absolute;
      background-image: url("~@/assets/imgs/h1logo2.png");
      background-repeat: no-repeat;
      background-size: cover;
      top: -1px;
      left: 0px;
      z-index: 99;
    }
    &:before {
      content: "";
      display: block;
      width: 400px;
      background-color: #317063;
     background-color: #fff;
     border-bottom:solid 1px #317063;
      height: 62px;
      top: -17px;
      left: -30px;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      position: absolute;
      z-index: -999;
    }
  }
  ol {
    justify-content: flex-end;
    height: 50px;
    margin-right: 3.5%;
    align-items: center;

    > li {
      margin-right: 14px;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 40px;
        padding: 12px 18px;
        color: lighten($nav, 60%);
        min-width: 60px;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          width: 115%;
          height: 30px;
          border-radius: 4px;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          z-index: -1;
        }
        &:hover {
          &:before {
            background: darken(desaturate($nav, 10%), 10%);
          }
        }
      }
      a.router-link-active {
        position: relative;
        z-index: 99;
        color: #fff;
        &:before {
          content: "";
          background: #43565c;
          border-radius: 4px;
          background: lighten(desaturate($nav, 30%), 5%);
        }
      }
      a.link__booking {
        padding: 10px 20px;
        font-size: 110%;
        min-width: 100px;
        color: #fff;
        &:hover {
          cursor: pointer;
          transform: scale(1.03);
          transition: transform 0.1s ease;
          &:before {
            background: #cc0000;
          }
        }
        &:before {
          width: 150%;
          height: 36px;
          top: 55%;
          background: #990000;
        }
      }
    }
  }
}

.container {
  margin-top: 50px;
  text-align: left;
  position: relative;
  min-height: calc(100vh - 50px);
  background-color: #fff;
  z-index: 0;
}
.base__btn {
  min-width: 200px;
  background-color: #990000;
  color: #fff;
  min-height: 45px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 19px;
  &:hover {
    cursor: position;
  }
}

$header: #183c75;
$header: #445873;
@keyframes colorFade {
  0% {
    filter: grayscale(0);
    opacity: 0.9;
  }
  100% {
    filter: grayscale(1);
    opacity: 0.6;
  }
}

header {
  height: 110px;
  background-color: #fff;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: solid 1px lighten($header, 20%);
  box-shadow: 0px 2px 12px #ccc;


  em {
    width: 80px;
    height: 80px;
    position: absolute;
    right: 65px;
    background-image: url("~@/assets/imgs/tripAdvisor.png");
    background-repeat: no-repeat;
    background-size: cover;

    animation: colorFade 3s linear infinite alternate;
  }

  h1 {
    text-align: center;
    color: $header;
    font-size: 50px;
    font-weight: 300;
    line-height: 110px;
    z-index: 3;
  }

}
nav {
  z-index: 99;
}

section {
  min-height: 100vh;
}
input.inpRadio {
  width: 26px;
  height: 26px;
}


</style>

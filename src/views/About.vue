<template>
  <div class="container about">
    <header>
      <h1>{{ aboutObj.title }}</h1>
        <em></em>
    </header>
    <div class="full">
    <section v-for="(sect,index) in aboutObj.blocks" :key="sect.title" :class="['sect__about', 'bg-about'+(index+1)]">
      <div class="sect" 
      :style="{'background-image': 'url(' + require('@/assets/imgs/'+sect.img) + ')'}">

      <div class="flex max-width-80vw space-between">
          <blockquote>
          <h2>{{ sect.title }}</h2>
          <p>{{ sect.desc }}</p>
        </blockquote>
      </div>
      </div>

         <div class="sect-buffer"></div>
    </section>
  </div>
  <btn @click="showNextAbout()" :btnClass="['btn-next',{'btn-return':lastBool}]" label="Next"/>
  </div>
</template>
<script>
import { computed} from "vue";
import { useStore } from "vuex";
import btn from "@/components/button";
import {ref} from "vue";
export default {
  name: "About",
  setup(){
    const store = useStore();
    const aboutObj = computed(() => store.getters.GETABOUT);
    const lastBool = ref(false);
    
    let num = 1;
    const showNextAbout = () =>{
      let len =document.querySelectorAll('.sect__about').length-1;
      (num === len) ? num = 1 : num++
        window.scrollTo({
          top:document.getElementsByClassName('bg-about'+num)[0].offsetTop,
          left: 0,
          behavior: 'smooth'
      });  
    }
  

    return{
      aboutObj,
      lastBool,
      showNextAbout
    }
  },
  components: {
    btn
  }
};
</script>

<style lang="scss" scoped>
body{
  scroll-behavior: smooth;
}
header {
  position: fixed;
  z-index: 99999999;
  top: 50px;
  right: 0px;
  left: 0px;
  background:#fff;
  z-index: 11;
  &:after,
  &:before {
    display:none;
  }
  h1 {
   color:#183c75;
  }
}

blockquote {
  width: 32%;
  min-width:350px;
  min-height: 400px;
  border: solid 20px rgb(120, 2, 35);
  font-size: 21px;
  line-height: 35px;
   top:170px;
   left:0px;
  padding: 0px 30px 20px 30px;
  position: absolute;
  color: #fff;
      color:#183c75;
  p{
    font-size:17px;
    line-height:170%;
  }

  h3 {
    font-size: 35px;
  }

  &:before {
    content: "";
    background: rgb(120, 2, 35);
    display: block;
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    mix-blend-mode: multiply;
    top: 0px;
    left: 0px;
    opacity: 0.96;
  }
}

button.btn-next{
  position:fixed;
  bottom:40px;right:50px;
  width:300px;
  height:60px;
  background:#fff;
  color:#cc0000;
  border-radius:30px;
  z-index:9999999;
  font-size:20px;
  box-shadow: 2px 2px 6px #222;
  &:before,
  &:after{
    content:'';
    display: block;
    position: absolute;
    width:30px;height:2px;
  }
  &:before{
    background:#cc0000;
    right:20px;
  }
  &:after{
    width:12px;height:12px;
    border-top:solid 2px #cc0000;
    border-right:solid 2px #cc0000;
    transform: rotate(44deg);
     right:20px;
  }
}

div.full{
min-height:700vh;

background-repeat: no-repeat;
background-size:cover;
height:auto;
position: relative;
z-index:9;
display:flex;
flex-direction: column;
justify-content: flex-start;
}

section.bg-about1,
section.bg-about2,
section.bg-about3,
section.bg-about4,
section.bg-about5{
  
  height:250vh;
  z-index:99;
  div.sect{
  height:150vh;
  background-image: url("~@/assets/imgs/iguanaPerdidaGate.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: cover;
   position:relative;
   width:100%;
   z-index: inherit;
  }

  blockquote{
     z-index:99;
    color:#183c75;
       border-color:#fff;
     &:before{
      background:#fff;
     }
     p > a{
      text-decoration:underline;
     }
    
  }
}


 .sect-buffer{
  height:100vh;
  background-image: url('~@/assets/imgs/fencebg.gif');
  background-repeat: repeat;
  mix-blend-mode: screen;
  position:relative;
  width:100%;
  clear:both;
  &:after{
    content:'';
    background:#fff;
    opacity:.2;
    z-index: 2;
    position:absolute;
    top:0px;left:0px;right:0px;bottom:0px;
  }
 }

.bg-about1 {
  width: 100%;
  position: relative;
  height: 100vh;
  top: 0px;
}

</style>


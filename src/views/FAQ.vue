<template>
  <div class="container faq">
    <header>
      <h1>{{ faqObj.title }}</h1>
        <em></em>
    </header>

    <div class="wrapper__faq max-width-80vw">
      <ul class="list__faq">
        <li
          v-for="itm in faqObj.list"
          :key="itm.q"
          @click="clicked($event, itm)"
          :class="['li__faqitm', { 'open': itm.itmBool }]"
        >
          <dt><em></em> {{ itm.q }}</dt>
          <dd>{{ itm.a }}</dd>
        </li>
      </ul>
    </div>
  </div>
  <foot />
</template>

<script>
// @ is an alias to /src
import {computed, onUnmounted} from "vue";
import { useStore } from "vuex";
import foot from "@/components/Footer.vue";

export default {
  name: "FAQ",
  setup() {
    const store = useStore();
    const faqObj = computed(() => store.getters.GETFAQ);
    const clicked = (evt, itm) => {
      store.commit('SETFAQOPEN', evt.currentTarget.classList.contains("open") ? null : itm);
    };
    onUnmounted(() =>{
        store.commit('SETFAQOPEN',null);
    });
    return {
      faqObj,
      clicked,
    };
  },

  components: {
    foot,
  },
};
</script>

<style lang="scss" scoped>
.faq {
  min-height: 100vh;
}
h2 {
  width: 60%;
  max-width: 960px;
  color: #999;
  margin: 20px auto;
  padding-left: 5px;
  font-size: 19px;
  font-weight: bold;
}
ul.list__faq {
  width:90%;
  margin:50px auto 60px auto;
  border-top:solid 1px #ccc;
  border-right:solid 1px #ccc;
  > li {
    height: 60px;
    overflow: hidden;
    transition: height 0.2s ease-in;
    border-bottom: dotted 1px #999;
    position: relative;

    dt,
    dd {
      border-left: solid 10px #ccc;
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      justify-items: flex-start;
      width: 100%;
      padding: 0px;
      margin: 0px;
      position: relative;
      clear: both;
      padding-left: 40px;
    }
    dd {
      height: 100px;
    }
    dt {
      height: 60px;
      background: #fff;
      position: relative;
      font-weight: bold;
      padding-left: 50px;
      font-size:20px;
      cursor: pointer;
      &:before {
        content: "+";
        position: absolute;
        left: 16px;
        top: 7px;
        color: #999;
        font-size: 33px;
      }
      &:after {
        content: "";
        position: absolute;
        right: 18px;
        border-top: solid 2px #999;
        border-right: solid 2px #999;
        height: 8px;
        width: 8px;
        display: block;
        transform: rotate(133deg);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
  $open: lightblue;
  > li.li__faqitm.open {
    height: 160px;
    transition: height 0.2s ease-in;
   
    dt {
      font-weight: bold;
      color: #0764b3;
      
      &:after {
        transform: rotate(-44deg);
        border-color:#0764b3;
      }
      &:before {
        content: "-";
        font-size: 50px;
        color: #0764b3;
        font-weight: normal;
        top: -8px;
      }
    }
    dt,
    dd {
      border-left: solid 10px #0764b3;
      background: lighten($open, 20%);
       background:#e0f0fa;
    }
    dd {
      align-items: flex-start;
      align-content: flex-start;
    }
  }
}
</style>

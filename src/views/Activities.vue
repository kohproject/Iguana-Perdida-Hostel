<template>
  <div class="container activities">
    <header>
      <h1>{{ actObj.title }}</h1>
      <ol>
        <li v-for="(itm,index) in actObj.list" :key="itm.name">
          <a @click="clicked($event, itm)"
            :id="'link_act'+index"
            :class="['link__act', { 'active': itm.actBool }]"
            >{{ itm.name }}</a>
        </li>
      </ol>
    </header>
     <main :class="['main__activities', getSelectedAct()]">
      <div class="flex guest__activities">
        <activitiesBlock :imgSelected="actPhoto" v-on:setActivity="clicked" />
      </div>
    </main>
  </div>
  <foot />
</template>

<script>
// @ is an alias to /src
import { useStore} from "vuex";
import { ref,onMounted,computed } from "vue";
import activitiesBlock from "@/components/actBlock.vue";
import foot from "@/components/Footer.vue";
export default {
  name: "activities",
  setup() {
    const store = useStore();
    const act = ref("Diving");
    const actPhoto = ref("act-diving.jpg");
    const getSelectedAct = () => {
      return "main-" + act.value.trim();
    };

    const actObj = computed(() =>store.getters.GETACTIVITIES);

    const clicked = (evt, itm) => {
      evt.preventDefault();
      if (evt.currentTarget.classList.contains("active")) 
      return;

      store.dispatch("SETACT", itm);
      act.value = itm.name;
      actPhoto.value = itm.img;
      return;
    };

    onMounted(() =>{
      store.commit("RESETACTIVIES","Diving");
    })

    return {
      act,
      actObj,
      actPhoto,
      clicked,
      getSelectedAct,
    };
  },
  // computed: mapGetters({ actObj: "GETACTIVITIES" }),
  components: {
    activitiesBlock,
    foot,
  },
};
</script>

<style lang="scss">
.activities {
  min-height: 400vh;
  height: 100%;

  position: relative;
  header {
    display: block;
    position: fixed;
    min-height:120px;
    height:auto;
    top: 50px;
    left: 0px;
    right: 0px;
    border-bottom: dotted 1px #999;

    h1 {
      margin: 0px;
      line-height: 80px;
      color: #0b1b36;
      position: relative;
      z-index: 999999;
    }
    ol {
      display: flex;
      flex-wrap: wrap;
      max-width: calc(100vw - 40px);
      position: relative;
      margin: auto;
      margin-top: 0px;
      /* width: auto; */
      justify-content: center;
      align-items: center;
      z-index: 999999;

      > li {
        display: inline-block;
        margin-right: .25%;
        margin-bottom: 5px;
        position: relative;
        &:after {
          content: "";
          margin-left: 3px;
          color: #666;
        }
        > a {
          color: #666;
          font-size: 13px;
          padding: 1px 8px 2px 8px;
          display: inline-block;
          min-width: 70px;
          text-align: center;
          border-radius: 2px;
          &:hover {
            border-top: solid 2px #ddd;
            cursor: pointer;
            font-weight: bold;
          }
        }
        > a.active {
          padding-top: 4px;
          text-decoration: none;
          color: #fff;
          font-weight: bold;
          position: relative;
          z-index: 99999;
          border-top: none;
          &:after {
            content: "";
            background: #cc0000;
            border-radius: 2px;
            z-index: -1;
            display: block;
            position: absolute;
            min-height: 24px;
            min-width: 40px;
            height: 100%;
            width: 112%;
            top: 2px;
            left: 50%;

            transform: translateX(-50%);
          }
        }
      }
      > li:last-of-type {
        &:after {
          content: "";
        }
      }
    }
  }
}

main.main__activities {
  position: relative;
  width: 100%;
  display: flex;
  min-height: 250vh;
  height: 100%;
  margin-top: 140px;
  height: 100%;
}

.guest__activities {
  width: 100%;
  justify-content: space-between;
  position: absolute;
  top: 0px;
//background: orange; 
  overflow: hidden;
  &:after{
    content:'';
    display:block;
    width:100%;
    height:65px;
    background:#fff;
    position:fixed;
    top:160px;
  }
}
footer{
  position: relative;
}
</style>

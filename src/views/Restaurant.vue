<template>
  <div class="container restaurant">
    <header>
      <h1>{{ restObj.title }}</h1>
        <em></em>
    </header>
    <p class="tagline max-width-80vw">{{ restObj.header }}</p>
    <div class="flex max-width-80vw space-between">
      <div class="card">
        <h3>{{ restObj.food[0].name }} <span class="sp__time"><em class="clock"></em>{{ restObj.food[0].time }}</span></h3>
        <p class="txt__cost"><b>Cost:</b>{{ restObj.food[0].cost }} <span>{{ restObj.food[0].costSub }}</span>
        </p>
        <btn
          btnClass="btn-menu"
          @click="signDinner(true)"
          label="Signup for Dinner"
        />

        <img :src="require('@/assets/imgs/'+restObj.food[0].photo)" />

        <p>{{ restObj.food[0].desc }}</p>
      </div>
      <div class="card">
        <h3>{{ restObj.food[1].name}} <span class="sp__time"><em class="clock"></em>{{ restObj.food[1].time }}</span></h3>
        <p class="txt__cost"><b>Cost:</b>{{ restObj.food[1].cost }}
        </p>
        <btn
          btnClass="btn-menu"
          @click="viewMenu(restObj.food[1].name)"
          :label="getBtnLabel(restObj.food[1].name)"
        />

        <img :src="require('@/assets/imgs/'+restObj.food[1].photo)" />

        <p>{{ restObj.food[1].desc }}</p>
      </div>
      <div class="card">
        <h3>{{ restObj.food[2].name}}<span class="sp__time"><em class="clock"></em>{{ restObj.food[2].time }}</span></h3>
         <p class="txt__cost"><b>Cost:</b>{{ restObj.food[2].cost }}
          
         </p>
        <btn
          btnClass="btn-menu"
          @click="viewMenu(restObj.food[2].name)"
          :label="getBtnLabel(restObj.food[2].name)"
        />

        <img :src="require('@/assets/imgs/'+restObj.food[2].photo)" />

        <p>{{ restObj.food[2].desc }}</p>
      </div>
    </div>
    <DinnerModal :modalBool="modalView" :clicked="signDinner" />
    <MenuModal :modalBool="modalViewMenu" @closeWin="setModalStatus" :type="menuType" :menu="menuData"/>
  </div>
  <foot />
</template>

<script>
// @ is an alias to /src
import { ref,computed} from "vue";
import { useStore } from "vuex";

import {Breakfast} from "@/assets/data/Breakfast.js";
import {Lunch} from "@/assets/data/Lunch.js";
import DinnerModal from "@/components/modals/modalDinner.vue";
import MenuModal from "@/components/modals/modalMenu.vue";
import btn from "@/components/button.vue";
import foot from "@/components/Footer.vue";

export default {
  name: "restaurant",
  setup() {
    const store = useStore();
    const modalView = ref(false);
    const modalViewMenu = ref(false);
    const menuType = ref(null);
    const restObj = computed(() => store.getters.GETRESTAURANT);
    const menuData  = ref({});

    const setModalStatus =(bool) =>{
       modalViewMenu.value = bool;
       if(!bool) menuData.value = null; 
    }

    const signDinner = (bool) => {
      modalView.value = bool;
    };
    const viewMenu = (type) => {
      
       menuType.value = type;
     
     if(menuType.value ==='breakfast'){
        menuData.value = Breakfast;
     }
     else{
        menuData.value = Lunch;
     }
      setModalStatus(true);
    };

    const getBtnLabel = (type) => {
      return "View Our " + type + " Menu";
    };

    return {
      setModalStatus,
      signDinner,
      viewMenu,
      getBtnLabel,
      menuData,
      restObj,
      menuType,
      modalView,
      modalViewMenu
    };
  },
 
  components: {
    foot,
    btn,
    DinnerModal,
    MenuModal,
  },
};
</script>
<style scoped lang="scss">
header {
  h1 {
    margin: 0px;
  }
  p {
    margin: 0px;
    color: #fff;
  }
}
p.tagline {
  margin: 40px auto;
  font-size: 30px;
  padding: 0px 10px 0px 20px;
  color:#445873;
}
p.txt__cost{
  font-size:20px;
  span{
    font-size:15px;
  }
}

button.btn-menu {
  width: 70%;
  text-transform: capitalize;
  height: 60px;
  border-radius: 40px;
  margin: 0px 0px 40px 0px;
  clear: both;
  border-radius: 6px;
  height: 50px;
  width: 99%;
}
.card {
  text-align: left;
  padding: 20px 20px;
  h3 {
    border-bottom: solid 4px #d2e3e5;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0px;
    margin-top:20px;
    text-transform: capitalize;
    color:#445873;
    font-size: 20px;
    span.sp__time{
      display:block;
      float:right;
      background: #fafafa;
      padding: 4px 10px 5px 36px;
      margin-bottom:-2px;
      border-radius: 20px;
      font-size: 14px;
      text-shadow: 1px 1px 1px #fff;
      position: relative;
    }
  }
  p.txt__cost{
    margin-top: 30px;
    margin-bottom: 10px;
    color:#445873;
    font-size:18px;
  }
  img {
    width: 100%;
  }
}

em.clock {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: solid 2px #445873;
  box-sizing: border-box;
  border-radius: 20px;
  left: 7px;
  top: 4px;
  position: absolute;
  &:before {
    content: "";
    width: 3px;
    height: 3px;
    border-radius: 4px;
    position: absolute;
    background: #445873;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:after {
    content: "";
    width: 8px;
    height: 2px;
    border-radius: 4px;
    position: absolute;
    background: #445873;
    top: 7px;
    left: 6px;
    transform: rotate(33deg);
  }
}
</style>
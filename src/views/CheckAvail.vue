<template>
  <div class="container checkAvail">
    <header>
      <h1>{{ checkAvail.title }}</h1>
      <em></em>
    </header>
    <section>
    <div class="flex rel max-width-80vw">
     <Booking res-class="book-res" 
              @clicked="viewAvailability"  
              :legend="checkAvail.homeLegend"/>
    </div>
     <loadingAnim :class="{'sho':loadingStatus}"/>
    </section>
  </div>
</template>
<script>
import {ref,watch,computed,onMounted,onUnmounted} from 'vue';
import Booking from "@/components/BookingBlock.vue";
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
export default {
  name: "checkAvail",
  setup(){
    const store = useStore();
    const router = useRouter();
    const checkin = ref(0);
    const checkout = ref(0);
    const defaultDates = ref({});
    const loadingStatus = ref(false);
    const availRms = computed(() => store.getters.GETROOMS);
    const body = document.getElementsByTagName("body")[0];

    const checkAvailRooms = () =>{
      alert(checkin.value);
    };
    const checkAvail = computed(() => store.getters.GETCHECKOBJ);

    const viewAvailability = (params) => {
 
      loadingStatus.value = true;

      store.commit("SETSTAYDATES",params);
      store.dispatch("SUBTRACTDAYS",params);
      store.dispatch("FINDAVAILABLE",params);

     watch(availRms.value, (newAvailRms) => {
        loadingStatus.value = false;
        router.push({ name:'available', params: { rooms: newAvailRms } 
        })
    });
  
     onMounted(()=>{
      defaultDates.value= computed(()=>store.getters.GETDEFAULTDATES);
    });

    };
    onUnmounted(() =>{
      body.classList.remove('body-booking');
    })
    onMounted(() =>{
      body.classList.add('body-booking');
    });

    return{
      loadingStatus,
      checkAvail,
      checkin,
      checkout,
      viewAvailability,
      checkAvailRooms
    }
  },
  components: {
    Booking 
  }
};
</script>


<style scoped lang="scss">

section{
   background-image:url('~@/assets/imgs/hanging.jpg');
  background-image:url('~@/assets/imgs/arcs.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  &:after{
    content:'';
    position: absolute;
    top:0px;left:0px;right:0px;bottom:0px;
    background-color:#5c0303;
    mix-blend-mode:screen;
    opacity:.5;
  }
}
form{
  width:100%;
  position: relative;
}
</style>
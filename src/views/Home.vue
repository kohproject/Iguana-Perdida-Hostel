<template>
  <div :class="['container home', loaded]">
    <h1>
      {{ homeObj.title1 }}<span>{{ homeObj.title2 }}</span>
    </h1>
    <div class="flex">
      <div class="wrap pl1">
        <Booking @clicked="viewAvailability" res-class="homeres" />
      </div>
      <div class="wrap pl4">
        <h3>{{ homeObj.wrap.head }}</h3>
        <p>{{ homeObj.wrap.desc }}</p>
      </div>
    </div>
    <loadingAnim :class="{ sho: loadingStatus }" />
  </div>
  <foot />
</template>

<script>
// @ is an alias to /src
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Booking from "@/components/BookingBlock.vue";
import loadingAnim from "@/components/loadingRoomAnim.vue";
import foot from "@/components/Footer.vue";
export default {
  name: "Home",
  setup() {
    const loaded = ref(null);
    const loadingStatus = ref(false);
    const defaultDates = ref({});
    const store = useStore();
    const router = useRouter();
    const availRms = computed(() => store.getters.GETROOMS);
    const homeObj = computed(() => store.getters.GETHOMEOBJ);

    const loadbg = () => {
      setTimeout(function () {
        loaded.value = "loaded";
      }, 200);
    };

    const viewAvailability = (params) => {
      loadingStatus.value = true;
      store.commit("SETSTAYDATES", params);
      store.dispatch("SUBTRACTDAYS", params);

      //store.dispatch("FINDAVAILABLE",params);
      // async FINDAVAILABLE({commit},payload){

      (async() => {
        const roomsUrl = `http://localhost:5000/api/availrooms`;
       
        try {
          let res = await axios.get(roomsUrl, {
            params: {
              staydates: JSON.stringify({
                checkIn: new Date(params.checkIn),
                checkOut: new Date(params.checkOut)
              })
            }
          });

          let respRooms = res.data;
              respRooms = respRooms.rooms.filter((rm) => rm.child >= params.child);
         // console.log(respRooms);
          store.commit("SETAVAILROOMS", { rooms: respRooms });
          setTimeout(()=>{
              loadingStatus.value = false;
              router.push({ name: "available", params: { rooms: availRms.value } });
          },200)
          
        } catch (error) {
          console.log(error);
        }
      })();
    };
    onMounted(() => {
      defaultDates.value = computed(() => store.getters.GETDEFAULTDATES);
    });

    return {
      loaded,
      homeObj,
      availRms,
      loadingStatus,
      loadbg,
      viewAvailability,
    };
  },
  mounted: function () {
    this.loadbg();
  },
  components: {
    Booking,
    loadingAnim,
    foot,
  },
};
</script>
<style scoped lang="scss">
@keyframes blend {
  0% {
    background-color: hsl(105, 96%, 28%);
    opacity: 0.4;
  }
  100% {
    background-color: hsl(225, 95%, 60%);
    opacity: 0.5;
  }
}
.container.home {
  background-color: #444;
  margin-top: -50px;
  position: relative;
  background-image: url("~@/assets/imgs/atitlan9_small.jpg");
  background-size: cover;

  * {
    z-index: 999;
  }

  &:after {
    content: "";
    display: block;
    width: 100%;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    position: absolute;
    z-index: 2;
    mix-blend-mode: multiply;
    animation: blend 5s linear infinite alternate;
    transition: background-color 1s ease-in-out;
  }
}
.container.home.loaded {
  background-image: url("~@/assets/imgs/atitlan9.jpg");
}

.wrapper__loading.sho {
  display: block;
}

h1 {
  font: normal 5vw/175% "Times New Roman";
  margin: 100px 0px 30px 0px;
  color: #fff;
  text-align: left;
  text-shadow: 1px 1px 3px #666;
  padding: 30px;
  position: relative;
  &:before {
    position: absolute;
    content: "Welcome | Bienvenido";
    font: normal 25px "Times New Roman";
    top: 30px;
    left: 35px;
    color: #fff;
    text-shadow: none;
  }
  span {
    text-shadow: none;
    margin-left: 7%;
    font: normal 3vw "Times New Roman";
    text-shadow: 1px 1px 3px #666;
    display: inline-block;
    padding-left: 0.1em;
    color: lightcyan;
    position: relative;
    &:before {
      content: "&";
      position: absolute;
      left: -25%;
      top: -20px;
      font-size: 5vw;
    }
  }
}

.wrap {
  > h3 {
    color: #fff;
    margin: 0px;
    margin-bottom: 12px;
    font-family: "Open Sans";
    font-weight: normal;
    font-size: 36px;
  }
  > p {
    color: lightcyan;
    margin: 0px;
    font-family: "Open Sans";
    font-weight: normal;
    font-size: 56px;
    line-height: 110%;
  }
}
</style>

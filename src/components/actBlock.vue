<template>
  <div class="wrap__img">
    <img :src="getImgsrc()" />
  </div>
  <div class="wrap__list">
    <div class="inner__activities">
      <ul>
        <li
          v-for="itm in actBlock.list"
          :key="itm.name"
          :class="['li__activity',{'active': itm.actBool},getliClass(itm.name)]"
          @click="this.$emit('setActivity', $event, itm)">
          <div class="block__activity">
            <h3>{{ itm.name }}</h3>
            <p>
              {{ itm.desc }}
            </p>

            <div class="inner-when">
              <p>
                When? <span>{{ itm.when }}</span>
              </p>
              <p>
                Cost? <span>{{ itm.cost }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { mapGetters } from "vuex";
export default {
  props: ["imgSelected"],
  name: "activitiesBlock",
  setup(props) {
    const imgsrc = ref(props.imgSelected);
    const getliClass = (_na) => {
      return "li-" + _na.replace(" ", "-");
    };

    const getImgsrc = () => {
      return require(`@/assets/imgs/activities/` + imgsrc.value);
    };

    watch(
      () => props.imgSelected,
      (newImg) => {
        imgsrc.value = newImg;
      }
    );

    return {
      getImgsrc,
      getliClass,
    };
  },
  computed: mapGetters({ actBlock: "GETACTIVITIES" }),
};
</script>

<style scoped lang="scss">
.wrap__img {
  width: 50%;
   position: relative;
  height: 100%;
   min-height: 100vh;
  > img {
    position: fixed;
    left: 10%;
    max-width: 550px;
    width: 100%;
    min-height: 540px;
    top: 230px;
  }
}
.wrap__list {
  width: 50%;
  position: relative;
  height: 100%;
  min-height: 100vh;
  margin-top:50px;
  .inner__activities {
    position: relative;
    top: 0px;
    left: 0px;
    display: block;
    width: 100%;
    height: 100%;
    > ul {
      max-width: 750px;
      margin-top: 40px;
      > li {
        width: 100%;
        justify-content: space-between;
        display: flex;
        height: auto;
        margin-bottom: 20px;
        div.block__activity {
          display: block;
          min-height: 120px;
          border-left: solid 8px #ccc;
          padding: 12px 240px 40px 20px;
          margin-right: 20px;
          background: #f6faf4;
          position: relative;
          width: 100%;
          h3 {
            margin: 0px 0px 10px 0px;
          }
        }
        .inner-when {
          display: flex;
          flex-direction: column;
          font-style: normal;
          position: absolute;
          top: 0px;
          right: 0px;
          height: 100%;
          width: 190px;
          background: #f6faf4;
          border-left: solid 8px #ddd;
          justify-content: flex-start;
          padding: 15px 4px 4px 15px;
          font-size: 14px;
          p {
            margin: 0px 0px 12px 0px;
            font-weight: bold;
            span {
              font-size: 16px;
              font-weight: normal;
              display: block;
            }
          }
        }
      }
      > li.active {
        position: relative;
        h3 {
          color: #fff;
        }
        em {
          background: #cc0000;
          border-color: #cc0000;
          color: #fff;
          width: 230px;
          padding-left: 40px;
          border-top: solid 1px #990000;
          border-bottom: solid 1px #990000;
          border-right: solid 1px #990000;
        }
        &:before {
          content: "";
          display: block;
          position: absolute;
          left: -30px;
          top: 40px;
          height: 0px;
          width: 0px;
          border-left: solid 30px transparent;
          border-right: solid 30px transparent;
          border-bottom: solid 30px #990000;
          transform: rotate(-90deg);
        }
        div.block__activity {
          border-color: #990000;
          background: #cc0000;
          border-top: solid 1px #990000;
          border-bottom: solid 1px #990000;
          color: #fff;
          h3 {
            border-bottom: dotted 1px #fff;
            padding-bottom: 12px;
          }
        }
        div.inner-when {
          background: #cc0000;
          border-color: #cc0000;
        }
      }
    }
  }
}
</style>

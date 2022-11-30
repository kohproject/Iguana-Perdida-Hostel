<template>
  <div class="block__stay-dates">
    <h2>{{ title }}</h2>
    <div class="inner flex">
      <ol class="list__checkin">
        <li><span>checkin</span> {{ aDate }}</li>
        <li class="divider"><span>checkout</span> {{ dDate }}</li>
      </ol>

      <ol>
        <li class="li__num-guests">
          <span>number of adults</span> {{ nAdults }}
        </li>
        <li class="li__num-guests">
          <span>number of children</span> {{ nChild }}
        </li>
      </ol>

      <ol class="list__total-nights" v-if="!sho">
        <li><span> total nights</span>8</li>
        <li><span> total amount</span>n4444</li>
      </ol>

      <a class="link__edit-stay" v-if="sho" @click="clicked($event)">edit stay dates</a
      >
    </div>
  </div>
</template>

<script>



import { ref } from "vue";
export default {
  props: ["numChild", "numAdults", "arrivalDate", "departDate", "nightsBool"],
  name: "blockStayDates",
  setup(props,{emit}) {
    const title = ref("Stay Dates");
    const aDate = ref(props.arrivalDate);
    const dDate = ref(props.departDate);
    const nAdults = ref(props.numAdults);
    const nChild = ref(props.numChild);
    const sho = ref(props.nightsBool);

    const clicked = (evt) => {
      evt.preventDefault();
      emit("shoEditStayDates", {
        aDate: aDate.value,
        dDate: dDate.value,
        nAdults: nAdults.value,
        nChild: nChild.value,
      });
      return false;
    };

    return {
      title,
      aDate,
      dDate,
      nAdults,
      nChild,
      sho,
      clicked,
    };
  },
};
</script>

<style scoped lang="scss">
.block__stay-dates {
  width: 100%;
  height: 120px;
  background: #fff;
  z-index: 999;
  position: fixed;
  top: 50px;
  right: 0px;
  left: 50%;
  transform: translateX(-50%);
  &:before,
  &:after {
    content: "";
    max-width: 96vw;
    width: 100%;
    height: 1px;
    position: absolute;
    display: block;
    background: #ccc;
    z-index: 99;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
  }
  &:after {
    top: auto;
    height: 1px;
    bottom: 30px;
  }
  h2 {
    font-size: 14px;
    position: absolute;
    top: 20px;
    left: 3%;
  }
  .inner {
    position: absolute;
    top: 30px;
    width: 100%;
    height: 50px;
    padding-left: 3%;

    a.link__edit-stay {
      position: absolute;
      right: 40px;
      text-decoration: underline;
      padding-bottom: 10px;
      display: flex;
      justify-self: flex-end;
      align-self: end;
    }
    ol {
      position: relative;
      margin-top: 22px;

      margin-left: 0px;

      > li {
        margin-right: 25px;
        white-space: nowrap;

        > span {
          &:after {
            content: ":";
          }
        }
      }
    }

    ol.list__checkin {
      margin-right: 3.5%;
      &:after {
        content: "";
        width: 1px;
        height: 45px;
        background: #ccc;
        position: absolute;
        left: 105%;
        top: -15px;
      }
      > li {
        min-width: 150px;
      }
    }

    ol.list__total-nights {
      justify-self: flex-end;
      position: absolute;
      right: 2%;
    }
  }
}
</style>
<template>
  <div class="container availrooms">
    <div class="wrapper__table-rooms wide85 px20">
      <table class="table__header">
        <thead>
          <tr>
            <th class="wide25"><img src="@/assets/imgs/pixel.gif" /></th>
            <th class="wide50"><img src="@/assets/imgs/pixel.gif" /></th>
            <th class="wide25"><img src="@/assets/imgs/pixel.gif" /></th>
          </tr>
        </thead>
      </table>

      <table class="table__rooms">
        <tbody v-if="availRoomsBool">
          <tr
            v-for="(row, index) in rms"
            :key="row.name"
            :class="['row', { selected: hiliteRow(row) }]"
          >
            <td class="wide25">
              <em class="em__selected"
                ><span class="outer"><span class="inner"></span></span
              ></em>
              <div class="flex col">
                {{ row.name }}
                <img :src="require('@/assets/imgs/rooms/' + row.photo)" />
              </div>
            </td>
            <td :class="['wide75', { 'cell-hover': getRowHover(row) }]">
              <h3>{{ row.name }}</h3>
              <p class="txt__desc">{{ row.desc }}</p>
              <hr />
              <div class="flex flex-between">
                <p class="txt__price">
                  <span class="sp__price">{{ row.price }}</span
                  ><em></em>
                </p>
                <div class="flex col pr30">
                  <p class="txt__stay">
                    total stay: <b>${{ calculateStay(row.price) }}</b> USD
                  </p>
                  <btn
                    :btnClass="['btn-select-row', { selected: hiliteRow(row) }]"
                    label="select"
                    @click="selectRow($event, row, index)"
                    @mouseover="selectRow($event, row, index)"
                    @mouseout="selectRow($event, row, index)"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <!--- ==================================== //-->
        <!--- ======= START NO AVAIL ROOMS ======= //-->
        <!--- ==================================== //-->
        <tbody v-if="!availRoomsBool">
          <tr>
            <td colspan="2">
              <div class="wrap__no-rooms">
                <h2>No rooms are available for the dates you requested</h2>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="wrapper__total-amt wide15 pr20">
      <boxTotalAmt
        :guest="guest"
        :startDate="checkIn"
        :endDate="checkOut"
        :taxPercentage="taxPercentage"
        :taxAmount="taxAmount"
        :totalAmount="totalAmount"
      />

      <div class="btn-wrap">
        <btn
          label="next"
          :btnClass="['btn-reserve-next', reserveBtnClass()]"
          @click="clicked"
        />
      </div>
    </div>
    <blockStayDates
      v-on:shoEditStayDates="editStayDates"
      nightsBool="true"
      :arrivalDate="checkIn"
      :departDate="checkOut"
      numAdults="1"
      numChild="0"
    />
    <div :class="['modal modal-booking', { sho: changeDatesBool }]">
      <Booking
        nochild="0"
        noAdults="1"
        :startIn="checkIn"
        :startOut="checkOut"
      />
    </div>
  </div>
</template> 
<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import blockStayDates from "@/components/blockStayDates.vue";
import boxTotalAmt from "@/components/boxTotalAmt.vue";
import Booking from "@/components/BookingBlock.vue";
import btn from "@/components/button.vue";

export default {
  name: "availRooms",
  setup() {
    const router = useRouter();
    const store = useStore();

    const hoverRow = ref(null);
    const clickRow = ref(null);
    const totalDays = ref(0);
    const checkIn = ref(0);
    const checkOut = ref(0);
    const taxAmount = ref(0);
    const totalAmount = ref(0);
    const taxPercentage = ref(3.2);
    const changeDatesBool = ref(false);
    const availRoomsBool = ref(false);
    const staydates = computed(() => store.getters.GETSTAYDATES);
    const guest = computed(() => store.getters.GETGUEST);
    const rms = computed(() => store.getters.GETROOMS);


console.log(rms.value);

    availRoomsBool.value =
      Array.from(rms.value.availRooms.rooms).length > 0 ? true : false;

    checkIn.value = staydates.value.checkIn;
    checkOut.value = staydates.value.checkOut;
    totalDays.value = guest.value.totalNights;
    taxAmount.value = 0;
    totalAmount.value = 0;

    const calculateStay = (price) => price * totalDays.value;
    const setTaxAmt = (price) => {
      let subAmt = parseInt(calculateStay(price));
      taxAmount.value = subAmt * store.getters.GETROOMTAXAMT;
      totalAmount.value = (subAmt + taxAmount.value).toFixed(2);
    };

    const editStayDates = (obj) => {
      // alert("x1111");
      console.log(obj);
    };

    const reserveBtnClass = () => {
      let rType = guest.value.roomType;
      return rType === undefined || rType === null ? "inactiv" : "activ";
    };

    const clicked = () => {
      if (reserveBtnClass() === "inactiv") return;

      store.commit("SETSTAYDATES", {
        checkIn: checkIn.value,
        checkOut: checkOut.value,
      });

      let purl = "http://localhost:5000/api/setstay";
      let checkoutVal = new Date(checkOut.value);

      fetch(purl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          params: {
            checkin: new Date(checkIn.value),
            checkout: checkoutVal,
            expireAt: checkoutVal,
            rmType: guest.value.roomType,
            numAdults: 1,
            child: 0,
          },
        }),
      }).then((resp) => {
        console.log(resp);
      });

      router.push({ name: "guestReserve" });
    };

    const hiliteRow = (row) => {
      return row === clickRow.value ? true : false;
    };

    const getRowHover = (row) => {
      return row === hoverRow.value ? true : false;
    };

    const scrollToSelected = (btn) => {
      window.scrollTo({
        top: btn.closest("tr").offsetTop - 5,
        behavior: "smooth",
      });
      return;
    };

    const selectRow = (evt, itm) => {
      if (evt.type === "mouseover") {
        hoverRow.value = itm;
        return;
      }
      if (evt.type === "mouseout") {
        hoverRow.value = null;
        return;
      }

      let obj = { roomType: null, perNight: 0, totalNights: 0, stayAmt: 0 };

      if (evt.currentTarget.classList.contains("selected")) {
        clickRow.value = null;
      } else {
        clickRow.value = itm;

        obj = {
          roomType: itm.name,
          perNight: itm.price,
          stayAmt: calculateStay(itm.price),
        };
      }
      scrollToSelected(evt.currentTarget);
      setTaxAmt(obj.perNight);
      store.commit("SETGUESTSTAY", obj);
    };

    return {
      guest,
      rms: rms.value.availRooms.rooms,
      availRoomsBool,
      checkIn,
      checkOut,
      taxPercentage,
      taxAmount,
      totalAmount,
      changeDatesBool,
      calculateStay,
      hiliteRow,
      editStayDates,
      getRowHover,
      selectRow,
      setTaxAmt,
      reserveBtnClass,
      clicked,
    };
  },

  components: {
    btn,
    Booking,
    blockStayDates,
    boxTotalAmt,
  },
};
</script>

<style lang="scss" scoped>
div.container.availrooms {
  display: flex;
  .block__reserve-block {
    width: 100%;
    justify-content: center;
    form {
      display: block;
      position: relative;
      width: 100%;
      fieldset.fieldset__stay {
        min-width: 960px;

        width: 100%;
        box-shadow: none;
        height: 100px;
        ul.list__reserve-block {
          flex-direction: row;
          width: 100%;
          justify-content: flex-start;
          > li ol.list__num-guests {
            display: flex;
            flex-direction: row;
            margin-top: 25px;
          }
          .wrapper__date-picker {
            margin: 20px 40px 0px 0px;
          }
        }
      }
    }
  }
}

table.table__header {
  width: calc(100vw - 60px);
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  top: 168px;
  border: 0px;
  z-index: 99999;
  background: #eceff4;
  border-top: solid 2px #0b1b36;

  thead {
    th {
      position: relative;
      > img {
        width: 250px;
        height: 27px;
      }
      &:after {
        color: #445873;
        content: "Rooms";
        font-size: 15px;
        top: 6px;
        left: 14px;
        position: absolute;
      }
    }

    th:nth-child(1) {
      width: 250px;
    }
    th:nth-child(2) {
      width: 99%;
      &:after {
        content: "Description";
      }
    }
    th:nth-child(3) {
      min-width: 300px;
      &:after {
        content: "Total Summary";
      }
    }
  }
}

table.table__rooms {
  margin-top: 165px;
  width: 100%;
  min-width: 74vw;
  tbody {
    tr {
      td {
        vertical-align: top;
        border-top: dashed 1px #999;

        hr {
          height: 0px;
          width: 100%;
          border-top: outset 1px #ccc;
        }
        .cell-room {
          padding-left: 12px;
          padding-right: 10px;
        }
        a.link__sho-details {
          font-size: 14px;
          padding: 0px 2px 4px 2px;
          white-space: nowrap;
          text-decoration: underline;
        }
        p.txt__stay {
          font-size: 14px;
          margin: 0px;
          text-align: center;
        }
        p.txt__desc {
          font-size: 13px;
          margin: 4px 10px 30px 0px;
        }
      }
      td:nth-child(1) {
        padding: 10px 10px;
        img {
          max-width: 240px;
        }
      }
      td:nth-child(2) {
        padding-left: 12px;
        padding-right: 10px;
        h3 {
          margin: 25px 0px 0px 0px;
        }
        p {
          font-size: 14px;
        }
      }
    }
    tr:nth-child(1) {
      td {
        border-top: none;
      }
    }

    .row.selected {
      background: #fafefe;
      outline: solid 3px #534f7f;
      td {
        border-top: none;
      }
      td:nth-child(1) {
        .flex.col {
          text-indent: 5%;
        }
        img {
          transform: scale(0.9);
        }
      }
      td {
        position: relative;
        button.base__btn.btn-select-row {
          background: #990000;
          opacity: 0.4;
        }

        em.em__selected {
          width: 30px;
          height: 30px;
          background: #cc0000;
          border-radius: 50%;
          position: absolute;
          outline: solid 4px #fff;
          top: 25%;
          left: -7px;
          z-index: 999;
          text-align: center;
          > .outer {
            position: absolute;
            transform: rotate(45deg);
            background: #fff;
            width: 35%;
            height: 60%;
            top: 15%;
            left: 32%;
            > .inner {
              position: absolute;
              background: #34a853;
              background: #cc0000;
              width: 67%;
              height: 87%;
              top: -10%;
              left: -10%;
            }
          }
        }
      }
    }
  }
}

p.txt__price {
  padding-top: 1px;
  line-height: 32px;
  position: relative;
  z-index: 1;
  overflow: hidden;

  em {
    position: relative;
    font-style: normal;
    &:before,
    &:after {
      content: "USD ";
      font-weight: bold;
      display: inline-block;
      margin-right: 3px;
    }
    &:after {
      font-weight: normal;
      content: " / per night";
    }
  }

  span.sp__price {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color: #0b1b36;
    border-top: solid 2px #990000;
    border-top:solid 2px #d2e3e5;
    text-shadow: 0px 1px 1px #fff;
    position: relative;
    min-width: 65px;
    display: inline-block;
    background-color: #eff3f9;
    padding: 6px 14px 6px 12px;
    margin-right: 8px;
    &:after {
      font-size: 14px;
      margin-right: 10px;
    }

    &:before {
      content: "$";
    }
  }
}
button.btn-select-row {
  height: 50px;
  &:hover {
    opacity: 0.9;
    transition: opacity 0.2s ease;
  }
}

.wrapper__total-amt {
  min-width: 320px;
  position: relative;

  .btn-wrap {
    position: fixed;
    top: 540px;
    width: 300px;
    height: 300px;
    padding: 20px 2px;
  }
}

.modal-booking {
  display: none;
}
</style>
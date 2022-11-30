<template>
  <div :class="['block__reserve-block', secClass]">
    <form>
      <fieldset class="fieldset__stay">
        <legend>{{ legendTitle }}</legend>
        <ul class="list__reserve-block">
          <li>
            <div class="wrapper__date-picker">
              <div class="wrap__calendar-inp">
                <label>check in</label
                ><input
                  type="text"
                  class="inp__check-in-out"
                  id="inp_check-start"
                  v-model="checkin"
                />
                <div
                  class="icon__calendar endDate"
                  style="left: 3px; top: 20px"
                >
                  <em></em>
                </div>
              </div>
              <div class="wrap__calendar-inp">
                <label>check out</label
                ><input
                  type="text"
                  class="inp__check-in-out"
                  id="inp_check-end"
                  v-model="checkout"
                />
                <div
                  class="icon__calendar endDate"
                  style="left: 3px; top: 20px"
                >
                  <em></em>
                </div>
              </div>
              <hotelDatePicker @emitStayDates="setStayDates"  />
            </div>
          </li>
          <li>
            <ol class="list__num-guests">
              <li>
                <div :class="['wrap__num-children', { active: childBool }]">
                  <label for="chx_children">children</label>

                  <select
                    class="sel__children"
                    id="sel_children"
                    @change="setDrop($event, 'child')"
                  >
                    <option value="0" selected>n/a</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </li>
              <li>
                <div class="wrap__num-guests">
                  <label>adults</label>
                  <select
                    id="sel_num-adults"
                    @change="setDrop($event, 'adult')"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </li>
              <li>
                <button
                  @click="checkAvailRooms"
                  class="base__btn after__arrow no-left-corner btn-check-avail"
                  style="background: rgb(195, 0, 0)">
                  check availability
                </button>
              </li>
            </ol>
          </li>
        </ul>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { ref,onMounted } from "vue";
import { useStore } from "vuex";
import hotelDatePicker from "@/components/vendor/datePick.vue";
export default {
  name: "Booking",
  props: ["resClass", "legend"],
  setup(props, {emit}) {
    const store = useStore();
    const childBool = ref(false);
    const checkin = ref();
    const checkout = ref();
    const secClass = ref(props.resClass);
    const legendTitle = ref(props.legend);
    const numGuests = ref({ adults: 1, children: 0 });

    const formatDates = (checkIn, checkOut) => {
      let getInnerMonth = (mon) => {
        return mon < 10 ? "0" + mon : mon;
      };

      let checkInDate =
        getInnerMonth(checkIn.getMonth() + 1) +
        "/" +
        checkIn.getDate() +
        "/" +
        checkIn.getFullYear();
      let checkOutDate =
        getInnerMonth(checkOut.getMonth() + 1) +
        "/" +
        checkOut.getDate() +
        "/" +
        checkOut.getFullYear();

      return { checkIn: checkInDate, checkOut: checkOutDate };
    };

    const setDrop = (evt, type) => {
      let val = evt.currentTarget.value;
      if (type === "child") {
        childBool.value = val > 0 ? true : false;
        numGuests.value.children = val;
        return;
      }
      numGuests.value.adults = val;
      return;
    };

    const setStoreDates = (obj) => {
      store.commit("SETSTAYDATES", obj);
      checkin.value = store.getters.GETSTAYDATES.checkIn;
      checkout.value = store.getters.GETSTAYDATES.checkOut;
    };

    const setStayDates = (obj) => {
      setStoreDates(formatDates(obj.checkIn, obj.checkOut));
    
    };

    const checkAvailRooms = () => {
  
      let params = {
        checkIn: checkin.value,
        checkOut: checkout.value,
        adults: numGuests.value.adults,
        child: numGuests.value.children,
      };
      emit("clicked", params);
    };

    onMounted(() =>{
      let today = new Date();
      let varDate = new Date(today);
      let before = new Date();
      let checkInDate = new Date();
      let checkOutDate = new Date();

      before.setDate(varDate.getDate() - 1);
      checkInDate.setDate(varDate.getDate() + 1);
      checkOutDate.setDate(varDate.getDate() + 2);

      setStoreDates(formatDates(checkInDate, checkOutDate));
       
    });

    return {
      checkin,
      checkout,
      childBool,
      secClass,
      legendTitle,
      setStayDates,
      setDrop,
      checkAvailRooms,
    };
  },
  components: {
    hotelDatePicker
  }
}
</script>

<style  lang="scss" scoped>
select {
  outline: None;
  background: transparent;
  border: 0px;
  font-size: 18px;
  font-weight: bold;
  width: 90%;
  text-align: center;
  color: #fff;
  margin-left: 4px;
  margin-right: 4px;
  > option {
    text-align: center;
  }
}
</style>

<style lang="scss">
@import "~@/assets/css/hotel-datepicker.css";
.container.checkAvail{
  header{
    box-shadow: none;
  }
}

.block__reserve-block {
  width: 490px;
  display: flex;
  overflow: hidden;
  position: relative;
  * {
    z-index: 99;
  }
}

.block__num-guests-wrapper {
  margin-top: 40px;
  position: relative;
  float: left;
}

.inp__check-in-out {
  background: transparent;
  border: none;
  outline: none;
  height: 20px;
  position: absolute;
  top: 23px;
  font: bold 14px arial;
}

button.btn-check-avail.btn-check-avail {
  font: normal 20px helvetica;
  height: 60px;
  border: solid 2px #cc0000;
  border-radius: 5px;
  position: relative;
  min-width: 265px;
  text-indent: -20px;
  &:after,
  &:before {
    content: "";
    width: 25px;
    height: 1px;
    display: block;
    position: absolute;
  }
}

button.base__btn.no-left-corner {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

/* ===================== */
fieldset {
  padding: 0px 0px 0px 20px;
  margin: 10px auto 0px auto;
  height: 160px;
  position: relative;
  box-sizing: border-box;
  border: solid 7px white;
  border-radius: 6px;
  background: #e9f2f8;
  box-shadow: 3px 3px 20px #000033;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  min-width: 490px;
  overflow: hidden;
  height: 240px;
  border: none;
  position: relative;
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: palegoldenrod;
    opacity: 0.2;
  }
  legend {
    color: #333;
    text-align: left;
    position: absolute;
    height: 225px;
    width: 340px;
    font-size: 20px;
    left: 0px;
    top: 0px;
    display: block;
    z-index: 1;
  }
  ul.list__reserve-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;
    > li {
      margin-bottom: 20px;
      ol.list__num-guests {
        display: flex;
        flex-direction: row;
        > li {
          display: block;
          .wrap__num-guests,
          .wrap__num-children {
            position: relative;
            background-color: #cc0000;
            height: 60px;
            overflow: hidden;
            margin: 10px 2px 0px 0px;
            width: 75px;
            color: #fff;
            label {
              font-size: 14px;
              padding-left: 8px;
            }
          }
          .wrap__num-guests {
            width: 85px;
            label {
              padding-left: 20px;
            }
          }
          .wrap__num-children {
            background: #ccc;
            &:hover {
              background: #cc0000;
              cursor: pointer;
            }
          }
          .wrap__num-children.active {
            background: #ff0000;
            &:hover {
              background: #ff0000;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

.block__reserve-block.homeres {
  overflow: visible;
  fieldset {
    box-shadow: 10px 10px 20px #2b2b4d;
    mix-blend-mode: screen;
  }
}

.block__reserve-block.book-res {
  margin-top: 50px;
  box-shadow: none;
  width: 100%;
  form {
    width: 100%;
    fieldset {
      width: 96%;
      height: 150px;
      padding: 0px;
      padding-left: 40px;
      margin: 120px auto 20px auto;
      overflow: visible;
      box-shadow: none;
      border-radius: 4px;
      background: none;
      position: relative;
      z-index: 99;
      box-shadow: 0px 4px 10px #222;
      border: solid 10px #fff;
      justify-content: flex-start;
      justify-content: flex-start;

      &:before {
        content: "";
        display: block;
        z-index: -1;
        opacity: 0.9;

        width: 100%;
        height: 100%;
        background: #fff;
      }

      legend {
        top: 10px;
        left: 60px;
        font-size: 15px;
        color: #76a4ae;
        font-weight: 600;
      }
      ul.list__reserve-block {
        flex-direction: row;
        margin: auto;

        > li {
          margin-bottom: 0px;
          margin-right: 50px;
          .wrapper__date-picker {
            margin: 0px 10px 0px 0px;
            position: relative;

            .wrap__calendar-inp {
              margin-right: 20px;
            }
            .wrap__calendar-inp:nth-child(2){
              margin-right:0px;
            }
          }
          .wrap__num-guests {
            width: 150px;
          }

          button.btn-check-avail.btn-check-avail {
            min-width: 305px;
          }
        }
      }
    }
  }
}

.wrapper__date-picker {
  margin: 40px 10px 0px 0px;
  background: white;
  box-shadow: 0px 0px 2px #b6ced4;
  height: 48px;
  border-radius: 4px;
  padding-left: 14px;
  position: relative;
  .wrap__calendar-inp {
    height: 50px;
    width: 150px;
    float: left;
    position: relative;
    margin-right: 40px;

    label {
      left: 30px;
      width: 100px;
      color: #76a4ae;
      position: absolute;
      height: 24px;
      text-align: left;
      display: block;
      top: 7px;
      left: 30px;
      font: bold 13px arial;
      letter-spacing: 0.01em;
      text-indent: 2px;
    }
    .inp__check-in-out {
      left: 30px;
      width: 100px;
      color: #76a4ae;
      background: transparent;
      border: none;
      outline: none;
      height: 20px;
      position: absolute;
      top: 23px;
      font: bold 14px arial;
    }
  }
  .wrap__calendar-inp:nth-child(2) {
    &:before,
    &:after {
      content: "";
      display: block;
      width: 18px;
      height: 2px;
      background: #96b9c1;
      position: absolute;
      top: 24px;
      left: -40px;
    }
    &:after {
      width: 8px;
      height: 8px;
      background: none;
      border-top: solid 2px #96b9c1;
      border-right: solid 2px #96b9c1;
      transform: rotate(44deg);
      top: 20px;
      left: -30px;
    }
  }
}

//calendar icon
div.icon__calendar {
  width: 20px;
  height: 18px;
  box-sizing: border-box;
  border: solid 3px #84bddd;
  border-top: solid 5px #84bddd;
  border-radius: 4px;
  position: absolute;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 3px;
    height: 6px;
    background: #84bddd;
    border-radius: 2px;
    top: -8px;
    left: 1px;
    right: auto;
  }
  &:after {
    right: 1px;
    left: auto;
  }
  em {
    position: absolute;
    width: 5px;
    height: 4px;
    left: 2px;
    top: 4px;
    background: #84bddd;
    display: block;
  }
}
</style>


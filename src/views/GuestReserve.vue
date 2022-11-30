<template>
  <div class="container guest">
    <blockStayDates 
      nightsBool=true 
      @shoEditStayDates="editStayDates" 
      :arrivalDate="stayDates.checkIn" 
      :departDate="stayDates.checkOut" 
      :numAdults="guestPerson.guests" 
      :numChild="guestPerson.child" />

 
    <div class="wrapper__guest mt220">
    <p>Room Name: <span></span> | Nights: <span>{{guestPerson.totalNights}}</span> | Total: <span>299.80</span></p>
    <ul class="list__name-email">
      <li class="li-req">
          <label for="nickname">Name</label>
          <input
            type="text"
            id="nickname"
            v-model="guestPerson.email"
            name="nickname"
          />
      </li>
      <li class="li-req">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="guestPerson.email"
            name="email"
          />
      </li>
    </ul>
  </div>
    <hr/>
     <div class="wrapper__guest">
      <ul class="list__name-email">
        <li class="li-req">
          <label for="name">Name on Credit Card</label>
          <input
            type="text"
            id="name"
            v-model="guestPerson.name"
            name="name"
          />
        </li>
        
      </ul>
      <div class="wrapper__credit">
        <div class="card">
          <ul class="list__card">
            <li class="li-req">
              <label for="address">Address</label>
              <input
                type="text"
                name="address"
                v-model="guestPerson.address"
                id="address"
                class="inp"
              />
            </li>
            <li>
              <ol>
                <li class="li-req">
                  <label for="zip">Zip</label>
                  <input
                    type="text"
                    maxlength="7"
                    v-model="guestPerson.zip"
                    name="zip"
                    id="zip"
                    class="inp"
                  />
                </li>
                <li class="li-req-drop">
                  <label for="Country">Country Credit Card</label>
                    <dropdownCountries v-model="guestPerson.creditcountry"/>
                </li>
              </ol>
            </li>
            <li class="li-req">
              <label for="creditcard">Credit card</label>
              <input
                type="text"
                v-model="guestPerson.credit"
                name="creditcard"
                id="creditcard"
                class="inp"
              />
            </li>
            <li>
              <ol>
                <li class="li-req">
                  <label for="monthyear">Month / Year</label>
                  <input
                    type="text"
                    v-model="guestPerson.creditexp"
                    name="monthyear"
                    id="monthyear"
                    class="inp"
                  />
                </li>
                <li class="li-req">
                  <label for="CVC">CVC</label>
                  <input
                    type="text"
                    v-model="guestPerson.cvc"
                    maxlength="4"
                    name="cvc"
                    id="cvc"
                    class="inp"
                  />
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
      <btn @click="setUserGuest" label="reserve" />
    </div>
  </div>
</template>
<script>

import router from "../router/index.js";
import { useStore } from 'vuex'
import btn from "@/components/button.vue";
import dropdownCountries from "@/components/dropdownCountries.vue";
import blockStayDates from "@/components/blockStayDates.vue";


export default {
  name: "GuestInfo",
  setup() {
    const store = useStore();
    const guestPerson = store.getters.GETGUEST;
    const stayDates = store.getters.GETSTAYDATES;

    const validateUserGuest = () => {
      let $bool = true;
      let reqlist = document.querySelectorAll(".li-req");
          reqlist.forEach((itm) => {
          if (itm.getElementsByTagName("input")[0].value == "") {
              itm.classList.add("err");
              $bool = false;
          }
      });
      return $bool;
    };
    const setUserGuest = () => {
        if(!validateUserGuest()) return;

       let obj ={
            name:guestPerson.value.name,
            email:guestPerson.value.email,
            address:guestPerson.value.address,
            zip:guestPerson.value.zip,
            creditcountry:guestPerson.value.creditcountry,
            credit:guestPerson.value.credit,
            creditexp:guestPerson.value.creditexp,
            cvs:guestPerson.value.cvs
        }
        
        store.commit('SETGUESTCREDIT',obj);
        router.push({path:'/confirmation'});
        alert('done');
    };

    return {
      guestPerson,
      stayDates,
      setUserGuest
    };
  },
  components: {
    btn,
    blockStayDates,
    dropdownCountries
  },
};
</script>

<style lang="scss" scoped>
.wrapper__guest {
  margin: 40px auto 20px auto;
  width: 25%;
  max-width: 440px;
}
.wrapper__guest.mt220{
  margin-top:220px;
}

ul.list__name-email,
ul.list__card {
  > li {
    margin-bottom: 15px;
    width: 100%;
    label,
    input {
      display: block;
      width: 100%;
    }
    select {
      display: block;
      width: 100%;
      height: 35px;
      text-align: center;
      border: solid 1px #ccc;
      border-left:none;
    }
    label {
      color: #666;
      font-size: 14px;
      padding-left: 2px;
    }
    input {
      height: 35px;
      border: solid 1px #ccc;
      padding-left: 4px;
    }
    ol {
      width: 100%;
      li {
        width: 49.99%;
      }
      li:nth-child(2) {
        input {
          border-left: none;
        }
      }
    }
  }
  li.li-req,.li-req-drop {
    label {
      position: relative;
      &:before {
        content: "*";
        color: #ff0000;
        position: absolute;
        left: -6px;
      }
    }
  }
}

ul.list__name-email,
ul.list__card {
  li.li-req.err {
    label {
      &:after {
        content: "required! ";
        color: #cc0000;
        display: inline-block;
        position: absolute;
        top: 0px;
        right: 4px;
        text-align: right;
      }
    }
    input {
      border: solid 1px orangeRed;
      background: rgb(254, 216, 222);
    }
  }
}
</style>

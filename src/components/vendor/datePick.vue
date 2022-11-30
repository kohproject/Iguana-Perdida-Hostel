<template>
  <div>
    <datepicker range multiCalendars 

    @open="initEndDateClose"
    @update:modelValue="handleDate" 
    
    :min-date="todayDate"
   
    ></datepicker>
  </div>
</template>

<script>
import { ref} from "vue";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// import {emit} from "process";

export default {
  name: "hotelDatePicker",
  setup(props,context) {
    const todayDate = new Date();
    const dateRange = ref(null);
    // const disabledDates = ref(null);
  
    const initEndDateClose = async ()=>{
     
      await (()=> {
          var getLen = () => document.getElementsByClassName('dp__range_end').length;
          var calInstance = document.querySelectorAll('.dp__cell_inner');
            calInstance.forEach(el =>{
            el.addEventListener('click', function(e){
              e.preventDefault();

               setTimeout(()=>{
                  if(getLen()){
                    document.getElementById('closeSelect').click();
                  }
                },300)
                  
            el.removeEventListener('click',function(e){
                e.stopPropagation();
              return;
              });
          })
      })
      document.getElementsByClassName('dp__select')[0].setAttribute('id','closeSelect');
      })();
    }

    const handleDate = (arr) =>{
      let datestay ={checkIn:arr[0],checkOut:arr[1]};
        context.emit('emitStayDates',datestay);
    }

      
    return { 
      handleDate,
      initEndDateClose,
      todayDate,
      dateRange
    };
  },
  components: {
    Datepicker,
  },
};
</script>
<style lang="scss">
body {
  .dp__menu.dp__menu_index.dp__theme_light {
    transform: translateX(-49%) translateY(50px) !important;
  }
  .dp__instance_calendar {
    padding-top: 25px;
    font-size: 14px;
  }

  .dp__button {
    svg {
      display: none;
    }
  }

  .dp__action_buttons {
    .dp__action.dp__select {
      display: inline;
    }
    .dp__action.dp__cancel {
      display: block;
      width: 36px;
      height: 36px;
      text-indent: 1000px;
      border-radius: 0px;
      overflow: hidden;

      position: absolute;
      right: 14px;
      top: 10px;
      border: solid 1px transparent;
      &:hover {
        border: dashed 1px #ccc;
      }
      &:before,
      &:after {
        content: "";
        display: block;
        background: #330000;
        width: 28px;
        height: 4px;
        position: absolute;
        top: 14px;
        left: 3.5px;
        transform: rotate(44deg);
      }
      &:after {
        top: 14px;

        transform: rotate(-44deg);
      }
    }
  }

  .dp__input {
    height: 50px;
    min-width: 400px;
    position: absolute;
    border: 0 !important;
    background: transparent !important;
    color:transparent !important;
    top: 0px;
  }
  .dp__main {
    position: absolute;
    z-index: 9999999;
    top: 0px;
    left: 0px;
    min-width: 400px;

    .dp__input_wrap {
      left: 0px;
      position: relative;

      svg {
        display: none;
      }
    }
  }
}
body.body-booking {
  .dp__menu.dp__menu_index.dp__theme_light {
    transform: translateX(-59%) translateY(50px) !important;
  }
}
</style>

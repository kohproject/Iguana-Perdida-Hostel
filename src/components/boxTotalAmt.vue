<template>

    <div class="box__total-amt">
        <p>Checkin: <span class="sp__check-in-out"> {{ checkIn }}</span>  
        </p>
        <p class="line__checkout">Checkout: <span class="sp__check-in-out"> {{ checkOut }}</span>
        </p>
        <p>
          <span style="white-space:nowrap; margin-right:12px">Room Type:</span> <span style="text-align:right">{{ gueststay.roomType }}</span>
        </p>
        <p>
          <span>Total nights:</span> <span>{{ gueststay.totalNights }}</span>
        </p>
        <p class="subtotal-amt">
          <span>Subtotal:</span> <span>{{ gueststay.stayAmt }}</span>
        </p>
        <p>
          <span>Tax ({{ taxPercentage }}):</span> <span>{{ taxAmount }}</span>
        </p>

        <p class="total-amt">
          <span>Total:</span> <span>{{ totalAmount }}</span>
        </p>
      </div>

</template>

<script>
import {ref} from "vue";
    export default{
        props:["guest","startDate","endDate","taxPercentage","taxAmount","totalAmount"],
        name:"boxTotalAmt",
        setup(props){
            const gueststay = ref(props.guest);
            const checkIn = ref(props.startDate);
            const checkOut = ref(props.endDate);
            return {
                gueststay,
                checkIn,
                checkOut
            }
        }
    }
</script>

<style lang="scss" scoped>
  .box__total-amt {
    border: solid 1px #999;
    border-top:solid 3px #888;
    position: fixed;
    padding: 10px 20px 30px 20px;
    width: 300px;
    min-height: 310px;
    top:215px;
    p {
      display: flex;
      width: 100%;
      justify-content: space-between;
      span.sp__check-in-out{
        min-width:140px;
        display:block;
        text-align:right;
      }
    }
    p.line__checkout{
        margin-bottom:10px;
        padding-bottom:15px;
        border-bottom: solid 1px #ccc;
    }
    p.total-amt {
      margin: 20px 0px 0px 0px;
      padding-top: 10px;
      border-top: solid 1px #ccc;
    }
  }

</style>
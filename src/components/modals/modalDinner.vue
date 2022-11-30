<template>
  <div :class="['modal modal-wrapper', {'sho': getModalStatus()}]">
    <div class="modal-content">
      <div class="signup-dinner">
      <h2>Add me to tonight's dinner list</h2>
        <ul class="list__signup">
          <li>
            Dinner Guest Name
            <input type="text" class="inp__guest-name" v-model="gDinner.name" />
          </li>
          <li>
            
            <div class="wrap__veg">
            <h3>We need an accurate count of vegetarians</h3>
               <ol>
               <li>
            <input type="radio" class="inpRadio" name="foodinp" checked v-model="gDinner.veg" value="meat" />
           <label>Meat eater</label>
               </li>
               <li>
               
                <input type="radio" class="inpRadio" name="foodinp" v-model="gDinner.veg" value="veg" />
        <label>Vegetarian</label>
           </li></ol>
            </div>
          </li>
          <li>
            <btn @click="AddMeDinner" btn-class="btn-adddinner" label="Sign me up" />
          </li>
        </ul>
        <a class="close-win" @click="closeModal"></a>
      </div>
    </div>
  </div>
</template>
<script>
 import { ref,watch } from "vue";
 import btn from "@/components/button.vue";

export default {
  props: ["modalBool"],
  name: "DinnerModal",
  setup(props,context) {
    const modalSho = ref(props.modalBool);
    const gDinner = ref({name:"",veg:false});

    const resetForm = () =>{
        gDinner.value.name ="";
        gDinner.value.veg = false;
      return true;
    }

    const getModalStatus =() =>{
      return modalSho.value;
    }

    const closeModal = () =>{
        if(resetForm()) context.emit('clicked',false)
    }

    const AddMeDinner = () => {
      if(gDinner.value.name ===""){
        alert("please add a name");
        return;
      }
     // store.commit("ADDDINNERGUEST",gDinner.value)
      context.emit('clicked',false)
      return false;
    };

    watch(() => props.modalBool, (newBool) =>{
         modalSho.value = newBool;
    });

    return {
      gDinner,
      modalSho,
      getModalStatus,
      closeModal,
      AddMeDinner,
    };
  },
  components: {
    btn,
  },
};
</script>
<style lang="scss" scoped>
.modal-wrapper {
  display: none;
  position: relative;

  min-width: 99vw;
  min-height: 99vh;
  z-index: 9999;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #222;
    opacity: 0;
  }
  .modal-content {
    width: 100%;
    max-width: 440px;
    height: 0px;
    overflow: hidden;
    margin: auto;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
  }
  h2{
    margin:0px 0px 12px 0px;
  }
  button.btn-adddinner{
    width:100%;
    height:55px;
  }
  .signup-dinner {
    width: 100%;
    max-width: 440px;
    margin: auto;
 
    min-height: 300px;
    background-color: #fff;
    position: absolute;
    padding: 30px;
    top: 0px;
    left: 50%;
    border: solid 1px #333;
    transform: translate(-50%, -150%);
    a.close-win{
      display:block;
      width:50px;height:50px;
      position: absolute;
      right:-50px;
      top:0px;background:#990000;
      &:before,&:after{
        content:'';
        width:36px;height:2px;
        display:block;background:#fff;
        position: absolute;
        top:35px;left:40%;
        transform:rotate(44deg) translateX(-50%)
      }
      &:after{
        top:10px;
         transform:rotate(-44deg) translateX(-50%)
      }
    }
    ul.list__signup{
      >li{
        margin-bottom:10px;
        .wrap__veg{
          border:solid 1px #ccc;
          margin:20px 0px;
          padding:10px 10px 20px 10px;
          h3{
            margin:2px 0px 20px 0px;
            font-size:18px;
          }
        }
        ol{
          >li{
            display:flex;
            flex-direction: row;
            align-items:center;
            margin-right:40px;
          }
        }
        input.inp__guest-name{
          width:100%;height:35px;
        }
      }
    }
  }
}
.modal-wrapper.sho {
  transition: all 0.2s ease;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: fixed;
  display: block;
  &:before {
    opacity: 0.9;
    transition: opacity 1.5s ease;
  }
  .modal-content {
    overflow: visible;
    .signup-dinner {
      transform: translate(-50%, 0%);
      transition: transform 1s ease;
    }
  }
}
</style>
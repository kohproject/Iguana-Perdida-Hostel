<template>
  <div :class="['modal modal-wrapper', {'sho': modalSho}]">

    <div class="modal-content">
      <div class="menu-wrap">
      <h2>{{type}} Menu</h2>
        
        <ul class="list__menu-items">
          <li v-for="itm in menu" :key="itm.name">
            <h4>{{itm.head}}</h4>
            <ol>
              <li v-for="listItm in itm.list" :key="listItm.name">
                <dt>{{listItm.name}}</dt>
                <dd>{{listItm.price}}Q</dd>
              </li>
            </ol>
          </li>
        </ul>
        <a href="javascript:void(0)" class="link__close-win" @click="clicked()"></a>
      </div>
    </div>
  </div>
</template>
<script>
import {ref,watch} from "vue";
export default {
  props: ["modalBool","type","menu"],
  name: "ModalMenu",
  setup(props,context) {
    const modalSho = ref(props.modalBool);
    const mytype = ref(props.type);

    const clicked = () =>{
    
       context.emit("closeWin", false);
    }


    watch(() => props.modalBool, (newBool) =>{
         modalSho.value = newBool;
    });

    return {
      modalSho,
      mytype,
      clicked
    }
  }
}
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
    max-width: 1200px;
    height: 0px;
    overflow: hidden;
    margin: auto;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    .menu-wrap{
      background:#fff;
      width:100%;
      height:100%;
      min-height:1000px;
      position: relative;
      padding-bottom:200px;
      overflow-y:scroll;
    a.link__close-win{
  display:block;
  width:36px;
  height:36px;
  position:absolute;
  top:15px;
  right:15px;
  overflow:hidden;
  border-radius:4px;
  background:#000;
  text-indent:-1000px;
  &:before,&:after{
        content: "";
    display: block;
    width: 18px;
    height: 4px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(44deg);
  }
  &:after{
      transform: translate(-50%, -50%) rotate(-44deg);
  }
}
       h2{
        margin:10px 10px 12px 10px;
        background:#333;color:#fff;
        padding:6px 6px 6px 20px;
        text-transform: capitalize;
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
  }
}


ul.list__menu-items{
  display: flex;
  flex-wrap:wrap;
  margin:20px;
  height:98%;
  >li{
    display: block;
     width:550px;
    h4{
      display: block;
      font-size:18px;
      padding:4px 2px 4px 6px;
      border-bottom:solid 1px #ccc;
      background:#eee;
      margin-bottom:12px;
    }
    ol{
      display: flex;
      flex-direction: column;
      li{
         display: flex;
         flex-direction:row;
         margin-bottom:10px;
         padding-bottom:4px;
         padding-left:4px;
         width:100%;
         border-bottom: dotted 1px #ccc;
         dt{
          width:86%;
         }
         dt,dd{
          display: inline-block;
          font-size:15px;
         }
      }
    }

  }
}
</style>
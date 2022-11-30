<template>
    <div class="wrapper__loading">
         <ol class="loading__bar-animation" id="list_loading-anim">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
     </ol>

    </div>
</template>
<script>

export default{
    name:"loadingAnim",
    setup() {
        
    },
}
</script>
<style lang="scss">

    .wrapper__loading{
        position:fixed;
        display:none;
        top:0px;right:0px;bottom:0px;left:0px;
        z-index: 99;
        &:before{
            content:'';
            position: absolute;
            top:0px;right:0px;bottom:0px;left:0px;
            display:block;
            background:#fff;
            opacity:.9;
            
        }
    }
  

@keyframes loadingBar {
  0% {
    opacity: 0.5;
    height: 0px;
    transform: scale(1);
  }
  100% {
    opacity: 1;
     height: 12px;
    background:#eee;
    transform: scale(1.5);
  }
}


ol.loading__bar-animation{
    position:absolute;
        top:50%;
        left:50%;
        opacity:1;
        transform:scale(1.5) translate3d(-50%,-50%,2);
        transition:opacity 1.5s ease-in;
        li {
            display: inline-block;
            margin: 0px 2px 0px 1px;
            padding: 0px;
            width: 4px;
            height: 5px;
            position: relative;
            background: brown;
            animation: loadingBar .55s ease-in-out infinite alternate;
          }
           li:nth-child(1) {
              animation-delay: 0.15s; 
          }
           li:nth-child(2) {
              animation-delay: 0.25s; 
          }
           li:nth-child(3) {
              animation-delay: 0.35s; 
          }
           li:nth-child(4) {
              animation-delay: 0.45s; 
          }
           li:nth-child(5) {
              animation-delay: 0.55s; 
          }
      }


</style>

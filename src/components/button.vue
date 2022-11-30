<template>
  <button :class="['base__btn', btnClass]">{{ label }}</button>
</template>
<script>
export default {
  props: ["btnClass", "label"],
  name: "btn",
};
</script>

<style lang="scss" scoped>
.base__btn {
  outline: none;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }
}
button.btn-menu {
  min-width: 300px;
  width: 96%;
  margin-top:20px;
  text-transform: capitalize;
  background:#115f8c;
}

button.btn-send {
  width: 75%;
  height: 55px;
  border-radius: 34px;
  margin-top:20px;
  text-shadow: 0px 1px 1px #cc0000;
  &:hover{
    box-shadow: -2px 2px 6px #ffffcc;
    transform:scale(1.02);
    font-size:19.5px;
    transition:transform 0.1s ease;
  }
}


button.btn-select-row{
  min-width:250px;
  margin-top:5px;
 // background:#226f7d;
}

button.btn-reserve-next{
   min-width:250px;
   height:55px;
   width:100%;
   background-color:#cc0000;
}
button.inactiv {
  opacity: 0.4;
  background-color: #ccc;
  cursor: not-allowed;
  &:hover{
      opacity: 0.4;
  background-color: #ccc;
  }
}


</style>
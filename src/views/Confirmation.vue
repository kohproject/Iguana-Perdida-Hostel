<template>
<div class="container confirmation">
    <header><h1>Confirmation</h1></header>
    <div class="box__confirm">
    <ul>
        <li>
            <label>Name</label>
        </li>
    </ul>
    </div>
    <btn label="confirm"/>
</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import btn from "@/components/button";
export default ({
    name:"Confirmation",
    setup() {
        const store  = useStore();
        const guestObj = computed(()=> 'GETGUESTOBJ');

        return{
         store,
         guestObj
        }
    },
    components:{
        btn
    }
})
</script>

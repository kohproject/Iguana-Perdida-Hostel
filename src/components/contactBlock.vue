<template>
    <div class="box__guest-contact">
        <h2>{{title.value}}</h2>
        <ul>
            <li id="li_name" class="">
                <label class="req">name <span class="sp-error">required field</span>
              </label><input type="text" v-model="inpObj.name" name="name"></li>
            <li id="li_subject">
                <label class="req">subject <span class="sp-error">required field</span></label>
                <input type="text" v-model="inpObj.subject" name="subject"></li>
            <li id="li_email">
                <label class="req">email <span class="sp-error">required field</span></label>
                <input type="text" v-model="inpObj.email" name="email"></li>
            <li id="li_message">
                <label class="req">message <span class="sp-error">required field</span></label>
                <textarea name="message" v-model="inpObj.message"></textarea>
            </li>
            <li><btn btnClass="btn-send" label="send"/></li>
        </ul>
    </div>
</template>
<script>

import {ref} from "vue";
import btn from "@/components/button";
export default({
    name:"contactForm",
    setup() {
        const title = ref('Send Us a Message');
        const inpObj = ref({
            name:'',
            subject:'',
            email:'',
            message:''
        });

        return{
            title,
            inpObj
        }
    },
    components: {
        btn
    }
})
</script>

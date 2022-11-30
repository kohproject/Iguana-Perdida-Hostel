<template>
  <section>
    <h2>{{ title.value }}</h2>
    <form id="form_contact">
      <ul>
        <li :class="['li__form-validate', { err: emailObj[0].errBool }]">
          <label class="before__required" for="name">Name</label>
          <input
            name="name"
            class="inp-req"
            placeholder="name"
            v-model="emailObj[0].value"
            @keyup="checkErr(emailObj[0])"
            type="text"
          />
        </li>
        <li :class="['li__form-validate', { err: emailObj[1].errBool }]">
          <label class="before__required" for="subject">Subject</label>
          <input
            name="subject"
            placeholder="subject"
            class="inp-req"
            v-model="emailObj[1].value"
            @keyup="checkErr(emailObj[1])"
            type="text"
          />
        </li>
        <li
          :class="[
            'li__form-validate',
            { err: emailObj[2].errBool },
            { errEmail: emailObj[2].errEmailBool },
          ]"
        >
          <label class="before__required" for="email">Email </label>
          <input
            name="email"
            placeholder="email"
            class="inp-req"
            v-model="emailObj[2].value"
            @keyup="checkErr(emailObj[2])"
            type="text"
          />
        </li>

        <li :class="['li__form-validate', { err: emailObj[3].errBool }]">
          <label class="before__required" for="message">Message </label>
          <textarea
            name="message"
            class="inp-req"
             v-model="emailObj[3].value"
            @keyup="checkErr(emailObj[3])"
           
          ></textarea>
        </li>
        <li>
          <btn label="send" btnClass="btn-send" @click="sendBtn($event)" />
        </li>
      </ul>
    </form>
   </section>
</template>
<script>
import { ref } from "vue";
import btn from "@/components/button";
export default {
  name: "contactForm",
  setup() {
    const title = ref("Send Us a Message");
    const emailObj = ref([
      { name: "name", value: "", errBool: false },
      { name: "subject", value: "", errBool: false },
      { name: "email", value: "", errBool: false, errEmailBool: false },
      { name: "message", value: "", errBool: false },
    ]);

    const checkErr = (itm) =>{
     itm.errBool = (itm.value ==='') ? true : false;
     if(itm.name ==='email'){
        itm.errBool = (itm.value.indexOf('@') == -1 || itm.value.indexOf('.') == -1) ? true : false;
     }

    }


    const sendBtn = (evt) => {
      evt.preventDefault();
      if (validateContact()) {
        var request = new XMLHttpRequest();
        var url = "@/contactEmail.php";
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
          if (request.readyState === 4 && request.status === 200) {
            var jsonData = JSON.parse(request.response);
            console.log(jsonData);
          }
        };

        var emailObj = JSON.stringify({
          name: this.emailObj.name,
          email: this.emailObj.email,
          subject: this.emailObj.subject,
          message: this.emailObj.message,
        });

        request.send(emailObj);
        this.thxBool = resetEmailObj();

        return false;
      }
    };

    const validateContact = () => {
      let validBool = true;

      emailObj.value.forEach((itm) => {
        if (itm.value === "") {
          itm.errBool = true;
          validBool = false;
        }
        if ((itm.name === "email" && itm.value.indexOf("@") == -1) ||
          (itm.name === "email" && itm.value.indexOf(".") == -1)) {
          itm.errEmailBool = true;
          validBool = false;
        }
      });
      return validBool;
    };

    const resetEmailObj = () => {
      this.emailObj.value.forEach((itm) => {
        if (itm.name == "email") itm.errEmailBool = false;
        itm.value = "";
        itm.errBool = false;
      });
      return true;
    };

    return {
      title,
      emailObj,
      checkErr,
      sendBtn,
    };
  },

  components: {
    btn,
  },
};
</script>
<style scoped lang="scss">
h2 {
  font-size: 90px;
  line-height: 110%;
  font-weight: normal;
  color: #fff;
  width: 80%;
  max-width: 310px;
  position: relative;
  margin: auto auto 10px auto;
  text-align: left;
}
section{
  position: relative;
  padding-top:20px;
}

form {
  width: 86%;
  display: block;
  clear: both;
  float: left;
  background: #fffffc;
  padding-left:5%;
  > ul > li.li__form-validate {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0px;
    padding: 0px;
    list-style: none;
    text-align: left;
    margin-bottom: 10px;
    min-height: 32px;
    clear: both;
    position: relative;
    label {
      display: block;
      text-align: left;
      font-size: 15px;
      width: 100%;
      height: 22px;
      margin-top: 6px;
      position: relative;
      text-transform: capitalize;
      &:before {
        content: "*";
        position: absolute;
        color: #ff0000;
        font-size: 14px;
        top: 1px;
        left: -12px;
      }
    }
    input,
    textarea {
      width: 100%;
      outline: none;
      border: 0;
      color: #333;
      max-width: 440px;
      height: 38px;
      background: #eee;
      text-indent: 10px;
    }
    textarea {
      height: 100px;
    }
  }
  > ul > li.li__form-validate.err {
    label {
      display: flex;
      justify-content: space-between;
      &:after {
        content: "required!";
        margin-right: 60px;
        margin-bottom: -4px;
        font-size: 13px;
        color: #990000;
      }
    }
    input,
    textarea {
      background: pink;
      border: solid 1px #990000;
    }
  }
}
</style>
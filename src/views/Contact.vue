<template>
  <div class="container">
    <div class="contact">
      <header>
        <h1>{{ contactObj.title }}</h1>
        <em></em>
      </header>
      <div class="flex flex-between pt20 max-width-80vw pb100">
        <div class="wide45">
          <div class="wrap__content">
            <h3>{{ contactObj.head1 }}</h3>
            <h4>{{ contactObj.desc.head1 }}</h4>
            <p>{{ contactObj.desc.txt1 }}</p>
            <div :class="['map', { open: mapBool }]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15434.039437980551!2d-91.2062!3d14.740281!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcbbad7143ba9b68a!2sLa%20Iguana%20Perdida-%20Santa%20Cruz!5e0!3m2!1sen!2sgt!4v1629217931508!5m2!1sen!2sgt"
                width="100%"
                height="250"
                style="border: 0"
                allowfullscreen="true"
                loading="lazy"
              ></iframe>
            </div>
            <p>{{ contactObj.desc.txt2 }}</p>
            <h4>{{ contactObj.desc.head2 }}</h4>

            <p>{{ contactObj.desc.txt3 }}</p>
          </div>
        </div>
        <div class="wide50">
          <div class="contact-wrap">
            <contactForm />
          </div>
        </div>
      </div>
    </div>
    <foot />
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import contactForm from "@/components/contactForm";
import foot from "@/components/Footer.vue";
export default {
  name: "contact",
  setup() {
    const store = useStore();
    const mapBool = ref(false);
    const contactObj = computed(() => store.getters.GETCONTACT);

    onMounted(() => {
      mapBool.value = setTimeout(() => {
        return true;
      }, 200);
    });

    return {
      mapBool,
      contactObj,
    };
  },

  components: {
    contactForm,
    foot,
  },
};
</script>
<style scoped lang="scss">
.container {
  background: transparent;
}
.contact {
  min-height: 95vh;
  overflow: hidden;
  clear: both;
}
.contact-wrap {
  width: auto;
  margin-top: 40px;
  margin-left: 5%;
  min-height: 530px;
  padding: 0px 20px 0px 20px;
  border-radius: 10px;
  background: #fffffc;
  border-left: dotted 1px #ccc;
  border-top: dotted 1px #ccc;
  box-shadow: 12px 5px 20px #ccc;
  position: relative;
  z-index: 9;
  section {
    min-height: 1px;
  }
}

.map {
  margin: 10px 0px 20px 0px;
  height: 0px;
  overflow: hidden;
  outline: solid 5px #eee;
  transition: height 0.2s ease-in-out;
  * {
    opacity: 0;
  }
}
.map.open {
  height: 255px;
  transition: height 0.2s ease;
  * {
    opacity: 1;
    transition: all 0.5s ease;
  }
}
.wrap__content {
  padding: 10px 0px 0px 0px;
  overflow: hidden;
  h3 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  h4 {
    font-size: 20px;
    margin: 20px 0px 5px 0px;
  }
  p {
    line-height: 150%;
    margin: 0px 0px 20px 0px;
  }
}
</style>

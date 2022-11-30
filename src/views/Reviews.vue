<template>
  <div class="container reviews">
    <header>
      <h1>{{ reviewsObj.title }}</h1>
      <em></em>
    </header>

    <div class="wrapper__bynumber max-width-80vw">
      <h2 class="mt30 mb10">By the Numbers</h2>
      <ol class="list__bynum">
        <li v-for="itm in reviewsObj.byNum" :key="itm.title">
          <div class="box-num">
            <h3>{{ itm.title }}</h3>
            <p class="txt-num">
              <span>{{ getHalfNum(itm.num) }}</span>
              <em>{{ itm.num }}</em>
            </p>
          </div>
        </li>
      </ol>
      <h2 class="max-width-80vw mt100 mb40">What our Guests Have to Say</h2>
      <div class="wrapper__reviews max-width-80vw flex">
        <div class="wrap__review wide70">
          <ul class="list__reviews">
            <li v-for="itm in reviewsObj.reviews" :key="itm.author">
              <h3>
                <b><em></em>{{ itm.author }}</b>
                <span>{{ itm.from }}</span>
                <span>{{ itm.date }}</span>
              </h3>
              <p class="txt__desc">
                <stars :starNum="itm.stars" />
                {{ itm.desc }}
              </p>
            </li>
          </ul>
        </div>
        <div class="wide30">
          <div class="wrap__avg-review">
            <h2>
              Average Reviews: <span>{{ reviewsAvg }}</span>
            </h2>
            <div>
              <ul class="list__star-bars">
                <li>
                  <dt>4 stars</dt>
                  <dd class="bar-stars" :style="getStarsBar(4)"></dd>
                </li>
                <li>
                  <dt>3 stars</dt>
                  <dd class="bar-stars" :style="getStarsBar(3)"></dd>
                </li>
                <li>
                  <dt>2 stars</dt>
                  <dd class="bar-stars" :style="getStarsBar(2)"></dd>
                </li>
                <li>
                  <dt>1 stars</dt>
                  <dd class="bar-stars" :style="getStarsBar(1)"></dd>
                </li>
                <li>
                  <dt>0 stars</dt>
                  <dd class="bar-stars" :style="getStarsBar(0)"></dd>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <foot />
</template>

<script>
// @ is an alias to /src
import { ref, computed } from "vue";
import { useStore } from "vuex";
import stars from "@/components/stars.vue";
import foot from "@/components/Footer.vue";
export default {
  name: "Reviews",

  setup() {
    const store = useStore();
    const reviewsAvg = ref(0);
    const revObj = ref([]);
    const reviewsObj = computed(() => store.getters.GETREVIEWS);

    const setRevObj = (obj) => {
      revObj.value = obj.reviews;
    };

    const updateNum = () => {
      document.querySelectorAll(".txt-num").forEach((el) => {
        let sp = el.getElementsByTagName("span")[0];
        let num = sp.innerText;
        let truNum = el.getElementsByTagName("em")[0].innerText;
        animateNum(sp, num, truNum);
      });
    };

    const animateNum = (sp, num1, num2) => {
      sp.innerText = parseInt(num1);
      setInterval(function () {
        if (parseInt(sp.innerText) < parseInt(num2)) {
          sp.innerText = parseInt(sp.innerText) + 1;
        }
      }, 1);
    };
    const getHalfNum = (num) => {
      let $num = parseInt(num) - 90;
      return $num;
    };
    const updateAvg = () => {
      let arr = revObj.value;
      let len = arr.length;
      let starsTotal = 0;

      arr.forEach((itm) => {
        starsTotal += itm.stars;
      });

      reviewsAvg.value = (starsTotal / len).toFixed(2);
    };

    const getStarsBar = (num) => {
      let arr = revObj.value;
      let len = arr.length;
      let $compareNum = String(num)[0];
      let starAmt = 0;
      let highestScore = 4;

      arr.forEach((itm) => {
        if ($compareNum == String(itm.stars)[0]) {
          starAmt += itm.stars;
        }
      });
      starAmt = starAmt / len;
      console.log(starAmt);
      starAmt = starAmt / highestScore;

      starAmt = starAmt * 100;
      starAmt = starAmt.toFixed(2);

      if (starAmt > 0) starAmt = starAmt + "%";

      return "--width:" + starAmt;
    };

    return {
      reviewsAvg,
      reviewsObj,
      setRevObj,
      getStarsBar,
      getHalfNum,
      updateAvg,
      updateNum,
    };
  },
  mounted() {
    this.setRevObj(this.reviewsObj);
    this.updateAvg();
    this.updateNum();
  },

  components: {
    foot,
    stars,
  },
};
</script>

<style scoped lang="scss">
h2 {
  font-size: 22px;
}
ol.list__bynum {
  margin: 0px auto;
  width: 100%;
  justify-content: space-between;

  > li {
    width: 24%;
    display: flex;
    flex: 1;
    align-items: stretch;
    margin-right: 2%;
  }
  > li:nth-child(4) {
    margin-right: 0%;
  }
}
.wrapper__reviews {
  width: 100%;
  justify-content: flex-start;
  margin: 20px auto 40px auto;
  ul {
    color: #666;
    > li {
      margin-bottom: 20px;
      display: flex;
      align-items: flex-start;
      width: 100%;

      h3 {
        margin: 0px 0px 0px 0px;
        padding:6px 12px 8px 12px;
        border:solid 1px #ddd;
        border-top:solid 2px #354c71;
        width: 25%;
        b{
          padding-left:26px;
          font-style:normal;
          position: relative;
          em{
            position: absolute;
            width:24px;
            height:24px;
            border:solid 1px #ddd;
            background-color:#eee;
            background-image:url(../assets/imgs/userIcon.svg);
            background-repeat: no-repeat;
            background-size: 80%;
            background-position: center;
            border-radius:30px;
            left:-3px;
            top:2px;
            transform:scale(.75)
          }
        }
        span {
          display: block;
          padding-top: 4px;
          font-size: 13px;
          margin-top: 5px;
          
        }
         span:nth-child(1){
            border-top: dotted 1px #ccc;
         }
          span:nth-child(2){
            padding-top: 6px;
            color:#666;
         }
      }
      p.txt__from {
        display: block;
        font-size: 12px;
      }
      p.txt__desc {
        width: 75%;
        font-size: 14px;
        padding: 10px 0px 0px 20px;
        position: relative;

        .stars {
          display: block;
          width: 120px;
          height: 24px;
          position: absolute;

          top: -20px;
          position: absolute;
        }
      }
    }
  }
}

.wrap__avg-review {
  border: solid 1px #ccc;
  padding: 12px 25px;
  margin-left: 40px;

  .list__star-bars {
    > li {
      display: flex;
      dt,
      dd {
        margin: 0px;
        padding: 0px;
        display: flex;
        min-height: 22px;
      }
      dt {
        width: 20%;
      }
      dd {
        width: 79.9%;
        background: #ccc;
        display: block;
      }
      dd {
        position: relative;
        --width: 0px;
        &:after {
          content: "";
          display: block;
          width: 0px;
          width: var(--width, 0px);
          height: 22px;
          background: gold;
          transition: width 0.9s ease;
        }
      }
    }
  }
}

.box-num {
  border: solid 1px #ccc;
  width: 100%;

  min-height: 140px;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  h3,
  p {
    text-align: center;
    line-height: 20px;
  }
  h3 {
    font-size: 20px;
    color: #999;
    margin: 0px;
  }
  p {
    font-size: 5vw;
    font-weight: bold;
    line-height: 90px;
    color: #666;
    margin: 0px;
    margin-top: 10px;
    em {
      display: none;
    }
  }
}
</style>

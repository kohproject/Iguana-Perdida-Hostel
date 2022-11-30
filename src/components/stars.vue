<template>
  <div :class="['stars', getStars()]">
    <ul>
      <li><span></span></li>
      <li><span></span></li>
      <li><span></span></li>
      <li><span></span></li>
    </ul>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "stars",
  props: ["starNum"],
  setup(props) {
    const numStars = ref(props.starNum);
    const getStars = () => {
        var nstars = numStars.value.toString();
        var $starString ="stars-";

        if(nstars.indexOf('.') < 1){
            return $starString += nstars;
        }
        return $starString += nstars.replace('.','-');
    };
    return {
      numStars,
      getStars,
    };
  },
};
</script>
<style scoped lang="scss">
.stars {
  display: block;
  width: 100px;
  height: 24px;

  > ul {
    display: flex;
    width: 100px;
    height: 24px;
    justify-content: space-evenly;
    flex-direction: row;
    > li {
      position: relative;
      display: block;
      position: relative;
      width: 20px;
      height: 20px;
      &:before {
        font-size: 19px;
        content: "\2605";
        color: #ddd;
        position: absolute;
      }

      span {
        display: block;
        position: absolute;
        width: 10px;
        height: 20px;
        overflow: hidden;
        left: 0px;
        &:after {
          font-size: 19px;
          content: "\2605";
          position: absolute;
          color: gold;
        }
      }
    }
  }
}
.stars.stars-0 {
  > ul > li span {
    display: none;
  }
}
.stars.stars-5 {
  > ul > li span {
    display: none;
  }
  > ul > li:nth-child(1) span {
    display: block;
  }
}
.stars.stars-1 {
  > ul > li span {
    display: none;
  }
  > ul > li:nth-child(1) span {
    display: block;
    width: 20px;
  }
}
.stars.stars-1-5 {
  > ul > li span {
    display: none;
  }
  > ul {
    > li:nth-child(1) span {
      display: block;
      width: 20px;
    }
    > li:nth-child(2) span {
      display: block;
      width: 10px;
    }
  }
}
.stars.stars-2 {
  > ul > li span {
    display: none;
  }
  > ul {
    li:nth-child(1),
    li:nth-child(2) {
      span {
        display: block;
        width: 20px;
      }
    }
  }
}
.stars.stars-2-5 {
  > ul > li span {
    display: none;
  }
  > ul {
    li:nth-child(1),
    li:nth-child(2),
    li:nth-child(3) {
      span {
        display: block;
        width: 20px;
      }
    }
    li:nth-child(3) {
      span {
        width: 10px;
      }
    }
  }
}
.stars.stars-3 {
  > ul > li span {
    display: none;
  }
  > ul {
    li:nth-child(1),
    li:nth-child(2),
    li:nth-child(3) {
      span {
        display: block;
        width: 20px;
      }
    }
  }
}
.stars.stars-3-5 {
  > ul > li span {
    width: 20px;
  }
  > ul > li:nth-child(4) > span {
    width: 10px;
  }
  > ul > li:nth-child(5) > span {
    display: none;
  }
}
.stars.stars-4 {
  > ul > li span {
    width: 20px;
  }
  > ul > li:nth-child(5) > span {
    display: none;
  }
}
.stars.stars-4-5 {
  > ul > li span {
    width: 20px;
  }
  > ul > li:nth-child(5) span {
    width: 10px;
  }
}
.stars.stars-5 {
  > ul > li span {
    width: 20px;
  }
}
</style>
<template>
    <swiper :options="swiperOption" class="wapper">
    <swiper-slide v-for="item in list" :key="item.id">
        <img class="swiper-img" :src="item.src">
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    list: Array
  },
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        loop: true
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.wapper >>> .swiper-pagination-bullet-active {
  background: white !important;
}

.wapper >>> .swiper-pagination {
  position: absolute !important;
  top: 26vw !important;
}

.wapper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 31.25%;
  background: #eee;
  touch-action: none;

  .swiper-img {
    width: 100%;
    height: auto;
  }
}
</style>

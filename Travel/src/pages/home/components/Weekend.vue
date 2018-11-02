<template>
    <div class="weekend-wrapper">
        <div class="title">
            <h2 class="title-content">周末去哪儿</h2>
        </div>
        <ul class="product-list">
            <li class="product-wrapper" v-for="item in list" :key="item.id">
                <div class="product-img">
                    <img :src="item.imgUrl">
                </div>
                <div class="product-info">
                    <p class="product-name">{{item.name}}</p>
                    <p class="product-desc">{{item.desc}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "HomeWeekend",
  data() {
    return {
      list: [
        {
          id: "0001",
          imgUrl:
            "http://img1.qunarzz.com/sight/source/1505/74/a665dfecf12ae.jpg_r_640x214_5d22909a.jpg",
          name:'南昌必游top10',
          desc:'看山看水,看看历史对南昌的浸润'
        },
        {
          id: "0002",
          imgUrl:
            "http://img1.qunarzz.com/sight/source/1505/df/9bcc134d126bc4.jpg_r_640x214_58a1f389.jpg",
          name:'陶醉青山绿水间',
          desc:'整个城市青山环绕，湖泊点缀其间'
        }
      ]
    };
  }
};
</script>
<style lang="stylus" scoped>
    @import '~style/mixins.styl'
    .weekend-wrapper
        .title-content
            background #f5f5f5
            height .8rem
            padding-left .26rem
            line-height .8rem
            color #212121
        .product-list
            .product-img
                overflow hidden
                width 100%
                height 0
                padding-bottom 37.1%
                img
                    width 100%
            .product-info
                padding .14rem .2rem .2rem .2rem
                color #212121
                ellipsis()
                .product-name
                    overflow hidden
                    font-size .28rem
                    line-height .48rem
                .product-desc
                    color #161661
                    font-size .24rem
                    line-height .42rem
                 

</style>


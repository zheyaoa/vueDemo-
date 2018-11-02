<template>
  <div>
    <home-header :city = city></home-header>
    <home-swiper :list = imgList></home-swiper>
    <home-icons :list = iconsList></home-icons>
    <home-recommend></home-recommend>
    <home-weekend></home-weekend>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons  from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from'axios'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data () {
    return {
      city : '',
      iconsList :[],
      imgList:[],
    }
  },
  mounted (){
    this.getHomeInfo()
  },
  methods: {
    getHomeInfo () {
      axios.get('/static/mock/index.json')
      .then(this.getHomeInfoSucc,this.getHomeInfoFail)
    },
    getHomeInfoSucc (res){
      const data = res.data
      this.city = data.city;
      this.iconsList = data.iconsList
      this.imgList = data.imgList
    },
    getHomeInfoFail (res){
      console.log(res)
    }
  }
}
</script>
<style lang="stylus" scoped>
    
</style>


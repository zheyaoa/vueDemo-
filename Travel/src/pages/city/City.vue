<template>
    <div class="warpper">
        <city-header></city-header>
        <city-main :info = resInfo></city-main>
    </div>
</template>
<script>
import axios from 'axios'
import CityHeader from '@/pages/city/components/Header'
import CityMain from '@/pages/city/components/Main'
export default {
    name:'city',
    components:{
        CityHeader,
        CityMain,
    },
    data () {
        return {
            resInfo:{}
        }
    },
    mounted (){
        this.getCityInfo()
    },
    methods: {
        getCityInfo () {
            axios.get('/static/mock/city.json').then(this.handeGetSuccInfo)
        },
        handeGetSuccInfo (res) {
            this.resInfo = res.data.data
        }
    }
}
</script>
<style lang="stylus" scoped>
    .warpper
        background #f5f5f5
</style>


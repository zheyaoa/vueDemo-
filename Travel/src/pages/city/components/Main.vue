<template>
<div>
    <div class="tab-con">
        <ul>
            <li v-for="(text,index) in list" :key="index" :class="{active:num==index}" @click="tab(index)">{{text}}</li>
        </ul>
    </div>
    <div class="city-list">
        <h2 class="title">热门城市</h2>
        <ul class="mp-list">
            <li v-for="item in info.hotCities" :key="item.id" class="item">{{item.name}}</li>
        </ul>
        <h2 class="title">字母排序</h2>
        <city-alphabet :info = info.cities @change="handleLetterChange"></city-alphabet>
        <div class="mp-list">
            <div v-for="(item,index) of info.cities" :key="index" :ref="index" class="innerBox">
                <div class="title">{{index}}</div>
                <div v-for="(innerItem,index) of item" :key="index" :class="{innerItem,item}">{{innerItem.name}}</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CityAlphabet from '@/pages/city/components/Alphabet'
export default {
    name:'CityMain',
    components:{
        CityAlphabet
    },
    props:{
        info:Object
    },
    data () {
        return { 
            list:['境内','境外 港澳台'],
            num : 0, 
            letter:''
        }
    },
    methods:{
        tab(index){
            this.num = index
        },
        handleLetterChange (letter) {
                this.letter = letter
                const element = this.$refs[this.letter][0]
                element.scrollIntoView()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~style/varibles.styl';
    .tab-con
        background $bgColor
        padding .2rem 1rem
        margin-top  -0.02rem
        ul
            display flex
            border 1px solid #fff 
            border-radius .04rem
            color #fff
            height .4rem
            line-height .4rem
            li
                flex 1
                text-align  center
                font-size .28rem
    .city-list 
        .title
            font-size .24rem  
            padding .24rem .3rem
            background #F5F5F5
        .mp-list
            overflow hidden
            .item
                float left
                height .9rem
                line-height .9rem
                background #fff
                text-align center
                box-sizing border-box
                border-bottom 0.02rem solid #ddd
                border-right  0.02rem solid #ddd
                color #212121
                width 33.33%
            .innerBox
                overflow hidden
                background #fff
                .innerItem
                    width 25%
    .active
        background #fff
        color $bgColor
</style>


<template>
    <div class="wrapper">
        <div v-for="(item,index) in info" class="AlpItem" :key="index" @click="handleClick">{{index}}</div>
    </div>
</template>
<script>
export default {
    name:'HandleAlphabet',
    props:{
        info:Object
    },
    methods:{
        handleClick(e){
            this.$emit('change',e.target.innerHTML)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .wrapper
        overflow hidden
        background #fff
        .AlpItem
             float left
             width 16.66%
             text-align center
             height .9rem
             line-height .9rem
    //     width 16.66%

</style>



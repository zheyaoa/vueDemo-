<template>
    <div class="header">
        <div class="header-left">
          <div class="iconfont back-icon">&#xe624;</div>
        </div>
        <div class="header-input">
          <span class="iconfont">&#xe632;</span>
          输入城市/景点/游玩主题
        </div>
        <router-link to="./city">
        <div class="header-right">
          {{city}}
          <span class="iconfont">&#xe64a;</span>
        </div>
        </router-link>
    </div>
</template>

<script>
export default {
  name: "HomeHander",
  props: {
    city: String
  }
};
</script>

<style lang="stylus" scoped>
@import '~style/varibles.styl';

.header {
  display: flex;
  line-height: 0.86rem;
  background: $bgColor;
  color: #fff;

  .header-left {
    width: 0.64rem;
    float: left;

    .back-icon {
      text-align: center;
      font-size: 0.4rem;
    }
  }

  .header-input {
    flex: 1;
    background: #fff;
    height: 0.62rem;
    margin-top: 0.12rem;
    padding-left: 0.1rem;
    border-radius: 0.1rem;
    color: #ccc;
    line-height: 0.62rem;
  }

  .header-right {
    width: 1.24rem;
    float: right;
    text-align: center;
    color #fff
  }
}
</style>

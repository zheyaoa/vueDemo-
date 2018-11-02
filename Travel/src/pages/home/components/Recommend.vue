<template>
    <div class="recommend-warpper">
        <div class="title">
            <img src="http://img1.qunarzz.com/piao/fusion/1711/89/ebc329f16c55bb02.png" class="title-img">
            <span class="title-content">推荐列表</span>
        </div>
        <ul class="item-list">
            <li class="item-warpper" v-for="item in list" :key="item.id">
                <img :src="item.imgUrl" class="item-img">
                <div class="item-info">
                    <div class="item-name">{{item.name}}</div>
                    <div class="item-comment">
                        <span class="item-star-level"></span>
                        <span class="item-comment-num">{{item.commentNum}}条评论</span>
                    </div>
                    <div class="item-price">
                        <span class="price">￥<em class="price-num">{{item.priceNum}}</em></span>
                        起
                        <span class="location">{{item.location}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  data() {
    return {
      list: [
        {
          id: "0001",
          name: "保利冰雪水世界",
          imgUrl:
            "http://img1.qunarzz.com/sight/p0/1806/d4/d4387968b66885f0a3.img.jpg_200x200_8d629c01.jpg",
          commentNum: 8,
          priceNum: 85,
          location: "南昌"
        },
        {
          id: "0002",
          name: "南昌新中原大剧场",
          imgUrl:
            "http://img1.qunarzz.com/sight/p0/1701/c0/c0899de1bcef6f9a3.img.jpg_200x200_b5b00164.jpg",
          commentNum: 126,
          priceNum: 98,
          location: "西湖区"
        }
      ]
    };
  }
};
</script>
<style lang="stylus" scoped>
.recommend-warpper {
    .title {
        margin: 0.24rem 0;

        .title-img {
            width: 0.3rem;
            height: 0.3rem;
            padding-left: 0.2rem;
            vertical-align: top;
        }

        .title-content {
            font-size: 0.32rem;
            line-height: 0.44rem;
        }
    }

    .item-list {
        padding-left: 0.24rem;

        .item-warpper {
            display: flex;
            height: 2rem;
            padding: 0.2rem 0;

            .item-img {
                width: 2rem;
                height: 2rem;
            }

            .item-info {
                flex: 1;
                padding-left: 0.24rem;

                .item-name {
                    margin-top: 0.26rem;
                    height: 0.44rem;
                    color: #212121;
                    font-size: 0.32rem;
                    line-height: 0.44rem;
                }

                .item-comment {
                    margin-top: 0.14rem;
                    height: 0.34rem;

                    .item-star-level, .item-comment-num {
                        color: #616161;
                        font-size: 0.24rem;
                        line-height: 0.34rem;
                        text-align: bottom;
                    }
                }

                .item-price {
                    margin-top: 0.22rem;
                    font-size: 0.24rem;
                    line-height: 0.4rem;

                    .price {
                        color: #ff8300;

                        .price-num {
                            font-size: 0.4rem;
                        }
                    }

                    .location {
                        float: right;
                        padding-right: 0.24rem;
                    }
                }
            }
        }
    }
}
</style>


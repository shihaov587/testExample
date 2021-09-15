<template>
  <div class="dataTotalBox">
    <div class="infoRow">
      <div class="infoItemBox">
        <p class="num">
          <span>{{totalObj.totalProjectNum}}</span>个
        </p>
        <p class="info">项目总数</p>
      </div>
      <div class="infoItemBox">
        <p class="num">
          <span>{{totalInverstNum.totalInverstNum}}</span>{{totalInverstNum.unit}}
        </p>
        <p class="info">投资总额</p>
      </div>
      <div class="infoItemBox">
        <p class="num">
          <span>{{totalObj.nowYearStartNum}}</span>个
        </p>
        <p class="info">当年开工</p>
      </div>
    </div>
    <div class="infoRow">
      <div class="infoItemBox">
        <p class="num">
          <span>{{totalObj.preYearMoveNum}}</span>个
        </p>
        <p class="info">上年结转</p>
      </div>
      <div class="infoItemBox">
        <p class="num">
          <span>{{totalPayNum.totalPayNum}}</span>{{totalPayNum.unit}}
        </p>
        <p class="info">年度投资额</p>
      </div>
      <div class="infoItemBox">
        <p class="num">
          <span>{{totalObj.nowYearApproveNum}}</span>个
        </p>
        <p class="info">当年批复</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getShortSummaryData } from "@/api/regulatory/screen.js";
export default {
  data() {
    return {
      totalObj: {
        totalProjectNum: "", //项目总数
        nowYearStartNum: "",//当年开工
        preYearMoveNum: "", //上年结转
        nowYearApproveNum: "", //当年批复
      },
      // 年度投资额
      totalPayNum: {
        unit: "", //单位
        totalPayNum: "",
      },
      // 投资总额
      totalInverstNum: {
        unit: "", //单位
        totalInverstNum: "",
      }
    }
  },
  created() {
    this.getTotal();
  },
  methods: {
    getTotal() {
      getShortSummaryData({}).then((res) => {
        if (res) {
          this.totalObj = res.data ? res.data : {};
          this.totalPayNum = this.totalObj.totalPayNum;
          this.totalInverstNum = this.totalObj.totalInverstNum;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/pagescss/regulatory/screen/handScreenTheme.scss';
.dataTotalBox {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 0;
  //一行
  .infoRow {
    display: flex;
    height: 50%;
    max-height: 120px;
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
    // 每个数据盒子
    .infoItemBox {
      width: 33.3333%;
      overflow: hidden;
      height: 100%;
      @include getScreenThemeStyle(background-color, data-item-bg);
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }

      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-size: 14px;
      // 数字行
      .num {
        width: 100%;
        line-height: 25px;
        margin-bottom: 12px;
        @include getScreenThemeStyle(color, data-font-color);
        span {
          font-size: 18px;
          font-weight: 500;
        }
      }
      // 信息行
      .info {
        width: 100%;
        line-height: 20px;
        @include textOverflow;
      }
    }
  }
}
</style>
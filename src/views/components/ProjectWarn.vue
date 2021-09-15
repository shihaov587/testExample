<template>
  <div class="Echarts" style="height:100%">
    <div id="warnChart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import { getImportantWaringSummaryData } from '@/api/regulatory/screen.js'
export default {
  data() {
    return {
      myChart: null
    }
  },
  methods: {
    // 初始化图表
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("warnChart"));

      // 指定图表的配置项和数据
      var option = {
        grid: {
          x: 1,
          y: 10,
          x2: 10,
          y2: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['超概算', '重大签证变更', '超进度付款', '施工产值超过 合同价10%', '无施工许可证'],
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function (value) {
              var ret = "";//拼接加\n返回的类目项  
              var maxLength = 5;//每项显示文字个数  
              var valLength = value.length;//X轴类目项的文字个数  
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
              if (rowN > 1)//如果类目项的文字大于4,  
              {
                for (var i = 0; i < rowN; i++) {
                  var temp = "";//每次截取的字符串  
                  var start = i * maxLength;//开始截取的位置  
                  var end = start + maxLength;//结束截取的位置  
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串  
                }
                return ret;
              }
              else {
                return value;
              }
            },
            // textStyle: {
            //   color: "#9bd8ed", //X轴文字颜色
            //   padding: [0, 0, 0, 0],
            //   fontSize: 12
            // }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [5, 7, 4, 12, 8],
          type: 'bar',
          barWidth: '30px',
          itemStyle: {
            barBorderRadius: [20, 20, 0, 0],
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#0049FF",
              },
              {
                offset: 1,
                color: "#05EAFF",
              },
            ]),
          }
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },

    // 重置图表
    chartResize() {
      this.myChart.resize()
    },

    // 获取数据
    getData() {
      getImportantWaringSummaryData({}).then(res => {
        // console.log(res);
      })
    }
  },
  mounted() {
    this.getData()
    this.myEcharts();
    window.addEventListener('resize', this.chartResize)
  },
}
</script>

<style>
</style>
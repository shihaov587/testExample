<template>
  <div id="baiduMap">
    <baidu-map class="map" center="南京" :scroll-wheel-zoom="true">
      <div v-for="(marker, index) in markers" :key="index">
        <bm-marker
          :position="{ lng: marker.lng, lat: marker.lat }"
          @click="infoWindowOpen(marker)"
          color="blue"
        >
          <bm-info-window
            :title="index+1+'、'+marker.projectName"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @close="infoWindowClose(marker)"
            :show="marker.showFlag"
          >
            <p>开工时间：{{marker.jieShouTime}}</p>
            <p>项目地点： {{marker.pro_AddressDetial}}</p>
            <p>投资金额： {{marker.pro_Investment}}元</p>
            <p>建设单位： {{marker.jianLiDanWeiName}}</p>
            <p>设计单位： {{marker.sheJiDanWeiName}}</p>
            <p>施工单位： {{marker.shiGongDanWeiName}}</p>
          </bm-info-window>
        </bm-marker>
      </div>
      <bm-polygon :path="borderSolid" stroke-color="red" strokeStyle="dashed"></bm-polygon>
    </baidu-map>
  </div>
</template>

<script>
import { getProjectMapSummaryData } from '@/api/regulatory/screen.js'
export default {
  data() {
    return {
      // 标记点坐标
      markers: [
        // {
        //   lng: 118.812367,
        //   lat: 31.970143,
        //   showFlag: false,
        // },
        // {
        //   lng: 118.8,
        //   lat: 32.090143,
        //   showFlag: false,
        // },
        // {
        //   lng: 118.804341,
        //   lat: 31.975024,
        //   showFlag: false,
        // },
        // {
        //   lng: 118.960901,
        //   lat: 32.152949,
        //   showFlag: false,
        // },
        // {
        //   lng: 118.750965,
        //   lat: 31.988061,
        //   showFlag: false,
        // },
        // {
        //   lng: 118.816748,
        //   lat: 32.082903,
        //   showFlag: false,
        // },
        // {
        //   lng: 118.824371,
        //   lat: 32.047651,
        //   showFlag: false,
        // },
      ],
      // 凸集坐标
      borderSolid: []
    };
  },
  methods: {
    // 显示标记详情
    infoWindowOpen(marker) {
      marker.showFlag = !marker.showFlag;
    },
    // 关闭标记详情
    infoWindowClose(marker) {
      marker.showFlag = false;
    },
    // 叉积，正弦的判断
    multiply(p0, p1, p2) {
      return (
        (p1.lng - p0.lng) * (p2.lat - p0.lat) - (p2.lng - p0.lng) * (p1.lat - p0.lat)
      );
    },
    // 叉积，正弦的判断
    distance_no_sqrt(p1, p2) {
      return (
        (p1.lng - p2.lng) * (p1.lng - p2.lng) + (p1.lat - p2.lat) * (p1.lat - p2.lat)
      );
    },
    // 求凸包凸集算法
    Graham_scan(pointSet, ch, n) {
      var i,
        j,
        k = 0,
        top = 2;
      var tmp = new Object();
      // 找到一个基点，基本就是保证最下面最左面的点
      for (i = 1; i < n; i++) {
        if (
          pointSet[i].lat < pointSet[k].lat ||
          (pointSet[i].lat == pointSet[k].lat &&
            pointSet[i].lng < pointSet[k].lng)
        ) {
          k = i;
        }
      }
      tmp = pointSet[0];
      pointSet[0] = pointSet[k];
      pointSet[k] = tmp;
      let use = n;
      for (i = 1; i < use - 1; i++) {
        k = i;
        for (j = i + 1; j < use; j++) {
          var direct = this.multiply(pointSet[0], pointSet[k], pointSet[j]);
          if (direct > 0) {
            k = j;
          } else if (direct == 0) {
            var dis =
              this.distance_no_sqrt(pointSet[0], pointSet[j]) - this.distance_no_sqrt(pointSet[0], pointSet[k]);
            use--;
            if (dis > 0) {
              pointSet[k] = pointSet[j];
              pointSet[j] = pointSet[use];
              j--;
            } else {
              tmp = pointSet[use];
              pointSet[use] = pointSet[j];
              pointSet[j] = tmp;
            }
          }
        }
        tmp = pointSet[i];
        pointSet[i] = pointSet[k];
        pointSet[k] = tmp;
      }
      ch.push(pointSet[0]);
      ch.push(pointSet[1]);
      ch.push(pointSet[2]);
      for (i = 3; i < use; i++) {
        while (!(this.multiply(pointSet[i], ch[top - 1], ch[top]) < 0)) {
          top--;
          ch.pop();
        }
        top++;
        ch.push(pointSet[i]);
      }
    },
    // 求包围圈点集
    // 求地图显示项目标记点
    getMarkets() {
      getProjectMapSummaryData({}).then((res) => {
        if (res) {
          let data = res.data.obj.map(x => {
            x.lng = Number(x.projectArea.split('|')[0])
            x.lat = Number(x.projectArea.split('|')[1])
            x.showFlag = false
            return x
          })
          // 非空处理
          this.markers = data.map(x => { return x.pro_AddressDetial ? x : null }).filter(n => n)
          // 求包围标记点
          // this.Graham_scan(this.markers, this.borderSolid, this.markers.length)
        }


      })
    }
  },
  created() {
    this.getMarkets();
  }
};
</script>

<style lang="scss" scoped>
#baiduMap {
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
    .BMap_pop {
      div:last-child {
        left: 0px !important;
        top: 0px;
      }
    }
    .BMap_bubble_title {
      background-color: red;
    }
  }
}

</style>
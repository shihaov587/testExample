<template>
  <div id="baiduMap">
    <baidu-map class="map" center="南京" :scroll-wheel-zoom="true">
      <div v-for="(marker, index) in markers" :key="index">
        <bm-marker
          :position="{ lng: marker.lng, lat: marker.lat }"
          animation="BMAP_ANIMATION_BOUNCE"
          @click="infoWindowOpen(marker)"
          color="blue"
        >
          <bm-info-window
            title="测试标题"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @close="infoWindowClose(marker)"
            :show="marker.showFlag"
          >
            <p>这是测试数据</p>
          </bm-info-window>
        </bm-marker>
      </div>
      <bm-polygon :path="borderSolid" stroke-color="red" strokeStyle="dashed"></bm-polygon>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 标记点坐标
      markers: [
        {
          lng: 118.812367,
          lat: 31.970143,
          showFlag: false,
        },
        {
          lng: 118.8,
          lat: 32.090143,
          showFlag: false,
        },
        {
          lng: 118.804341,
          lat: 31.975024,
          showFlag: false,
        },
        {
          lng: 118.960901,
          lat: 32.152949,
          showFlag: false,
        },
        {
          lng: 118.750965,
          lat: 31.988061,
          showFlag: false,
        },
        {
          lng: 118.816748,
          lat: 32.082903,
          showFlag: false,
        },
        {
          lng: 118.824371,
          lat: 32.047651,
          showFlag: false,
        },
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
        (p1.lng - p0.lng) * (p2.lat - p0.lat) -
        (p2.lng - p0.lng) * (p1.lat - p0.lat)
      );
    },
    // 叉积，正弦的判断
    distance_no_sqrt(p1, p2) {
      return (
        (p1.lng - p2.lng) * (p1.lng - p2.lng) +
        (p1.lat - p2.lat) * (p1.lat - p2.lat)
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
              this.distance_no_sqrt(pointSet[0], pointSet[j]) -
              this.distance_no_sqrt(pointSet[0], pointSet[k]);
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
    getSolid() {
      // let arr=this.markers.map(x=>delete x.showFlag)
      this.Graham_scan(this.markers, this.borderSolid, this.markers.length)
    }
  },
  created() {
    // 求包围圈点集
    this.getSolid()
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}

/*地图标题*/
.BMap_bubble_title {
	color:white;
	font-size:13px;
	font-weight:bold;
	text-align:left;
	padding-left:5px;
	padding-top:5px;
	border-bottom:1px solid gray;
	background-color:#0066b3;
}
/* 消息内容 */
.BMap_bubble_content {
	background-color:white;
	padding-left:5px;
	padding-top:5px;
	padding-bottom:10px;
}
/* 内容 */
.BMap_pop div:nth-child(9) {
	top:35px !important;
	border-radius:7px;
}
/* 左上角删除按键 */
.BMap_pop img {
	top:43px !important;
	left:215px !important;
}
.BMap_top {
	display:none;
}
.BMap_bottom {
	display:none;
}
.BMap_center {
	display:none;
}
/* 隐藏边角 */
.BMap_pop div:nth-child(1) div {
	display:none;
}
.BMap_pop div:nth-child(3) {
	display:none;
}
.BMap_pop div:nth-child(7) {
	display:none;
}

</style>
<template>
  <div class="frontpage">
    <!-- <div class="userInfo">
      <div class="user-avatar">
        <el-avatar :size="80" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
      </div>
      <div class="">
        <h2>{{welMessage}}, {{usrName}}</h2>
      </div>
    </div> -->
    <!-- 数据面板 -->
    <div class="data-panel">
      <el-col :xs="24" :sm="11" :lg="5" v-for="infor in inforPanel" :key="infor.name" :style="{ backgroundColor: infor.color }">
        <div>
          <div class="panelTitle">
            {{infor.name}}
          </div>
          <div class="inforNumber">
            {{Number(infor.number).toFixed(2)}}
          </div>
          <div>
            较昨日相比 {{(infor.add).toFixed(2)}}
            <el-icon><CaretTop /></el-icon>
          </div>
          {{nowTime}}
        </div>
      </el-col>
    </div>
    <div class="data-chart">
      <el-col :xs="24" :sm="24" :md="14">
        <div class="chartTitle">访问量变化趋势</div>
        <div class="change-line"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="9">
        <div class="chartTitle">热门旅游景点排名</div>
        <div class="jd-grade"></div>
      </el-col>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      usrName: this.$store.state.userInfo.name,
      welMessage: "",
      inforPanel: [
        {
          name: "访问次数",
          number: "380.054",
          add: 1000,
          color:  "#f05654"
        },
        {
          name: "累计交易额度",
          number: "580",
          add: 1000,
          color:  "#f0c239"
        },
        {
          name: "注册用户总数",
          number: "114",
          add: 1010,
          color:  "#00BC8B"
        },
        {
          name: "收纳景点数量",
          number: "380.0",
          add: 1000,
          color:  "#177cb0"
        }
      ],
      nowTime: ""
    };
  },
  methods: {
    changeLine() {
      let myCharts = echarts.init(document.querySelector(".change-line"));
      window.addEventListener("resize", function () {
        myCharts.resize();
      });
      let xDataArr = ["11.11", "11.12", "11.13", "11.14", "11.15", "11.16", "11.17"];
      let yDataArr = [141, 252, 288, 320, 257, 221, 185];
      let yDataArr2 = [35, 42, 58, 62, 37, 71, 45];
      let option = {
        grid: {
          top: "30px",
          left: "50px",
          right: "10px",
          bottom: "25px"
        },
        legend:{
          // data:["新增访问点击量", "新增注册新用户"]
        },
        xAxis: {
          // 类目轴
          type: "category",
          data: xDataArr,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#8F94B2"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#8F94B2"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            name: "新增访问点击量",
            type: "line",
            data: yDataArr,
            // 线条平滑 smooth
            smooth: true,
            // 折点颜色
            itemStyle: {
              color: "#455AE5"
            },
            // 改变线条样式 lineStyle
            lineStyle: {
              color: "#455AE5",
              type: "solid",
              with: 50,
              // 折线的X偏移
              shadowOffsetX: 0,
              // 折线的Y偏移
              shadowOffsetY: 9,
              // 折线模糊
              shadowBlur: 6,
              shadowColor: "rgba(77, 121, 255, 0.7)"
            }
          },
          {
            name: "新增注册新用户",
            type: "line",
            data: yDataArr2,
            // 线条平滑 smooth
            smooth: true,
            itemStyle: {
              color: "#FFD700"
            },
            // 改变线条样式 lineStyle
            lineStyle: {
              color: "#FFD700",
              type: "solid",
              with: 50,
              // 折线的X偏移
              shadowOffsetX: 0,
              // 折线的Y偏移
              shadowOffsetY: 9,
              // 折线模糊
              shadowBlur: 6,
              shadowColor: "rgba(255, 215, 0, 0.7)"
            }
          }
        ]
      };
      myCharts.setOption(option);
    },
    jdGrade() {
      let mCharts = echarts.init(document.querySelector(".jd-grade"));
      window.addEventListener("resize", function () {
        mCharts.resize();
      });
      let xDataArr = ["故宫博物院", "西安兵马俑", "华清池", "大足石刻景区", "滕王阁", "上海野生动物园", "颐和园"];
      let yDataArr = [28, 25, 16, 14, 26, 21, 14];
      let yDataArr2 = [5, 8, 3, 2, 7, 9, 3];
      let option = {
        grid: {
          top: "20px",
          left: "100px",
          right: "15px",
          bottom: "20px"
        },
        legend: {
          // left: "55%",
          // data: ["订单量", "总成交金额"]
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#8F94B2"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        yAxis: {
          type: "category",
          data: xDataArr,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#8F94B2"
            }
          },
          axisTick: {
            show: false
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        series: [
          {
            name: "订单量",
            type: "bar",
            barWidth: "12px",
            data: yDataArr,
            itemStyle: {
              color: "#455AE5",
              borderRadius: [2, 2, 2, 2]
            }
          },
          {
            name: "总成交金额",
            type: "bar",
            barWidth: "12px",
            data: yDataArr2,
            itemStyle: {
              color: "#7CCC70",
              borderRadius: [2, 2, 2, 2]
            }
          }
        ]
      };
      mCharts.setOption(option);
    },
    getTime() {
      const date = new Date();
      let year = date.getFullYear().toString();
      let month = (date.getMonth() + 1).toString();
      let day = date.getDate().toString();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      const time = year + "年" + month + "月" + day + "日";
      console.log(time);
      this.nowTime = time
    },
    wel() {
      const date = new Date();
      let hours = date.getHours().toString();
      // console.log(hours)
      if (hours > 0 && hours <= 5) {
        this.welMessage = "凌晨好"
      } else if (hours >= 6 && hours <= 8) {
        this.welMessage = "早上好"
      } else if (hours >= 9 && hours <= 10) {
        this.welMessage = "上午好"
      } else if (hours >= 11 && hours <= 13) {
        this.welMessage = "中午好"
      } else if (hours >= 14 && hours <= 18) {
        this.welMessage = "下午好"
      } else if (hours >= 19 && hours <= 24) {
        this.welMessage = "晚上好"
      }
    }
  },
  computed: {},
  mounted() {
    this.wel();
    this.changeLine();
    this.jdGrade();
    // let obj = JSON.parse(localStorage.getItem("userInfo"))
    // console.log(obj)
  },
  created() {
    this.getTime();
  }
};
</script>

<style scoped>
.frontpage {
  overflow-y: auto;
  /* width: 98%; */
  padding: 10px 20px;
}
.userInfo {
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px 0px rgba(135, 139, 180, 0.25);
  display: flex;
  align-items: center;
}
.user-avatar{
  width: 120px;
  text-align: center;
  margin-left: 12px;
}
.data-panel {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: space-between;
  margin: 12px 0;
  color: #ffffff;
}
.data-panel > div {
  height: 150px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 4px 4px 8px 0px rgba(135, 139, 180, 0.25);
  margin: 8px 0;
  padding: 12px 8px 12px 12px;
}
.panelTitle{
  font-size: 22px;
  font-weight: 600;
}
.inforNumber{
  font-size: 22px;
  font-weight: 700;
}
.data-chart {
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  margin: 12px 0;
  height: 350px;
  flex-wrap: wrap;
}
.data-chart > div {
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 5px 4px 8px 0px rgba(135, 139, 180, 0.25);
  margin: 8px 0;
}
.chartTitle {
  margin: 4px 8px;
  font-size: 18px;
  font-weight: 700;
  color: #2f2f2f;
}
.change-line,
.jd-grade {
  width: 100%;
  height: 310px;
}
</style>

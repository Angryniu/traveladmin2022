<template>
  <div class="header">
    <div class="left-header">
      <el-button style="margin-right: 20px;" size="small" @click="changeMenu">
        <el-icon style="width: 20px">
          <!-- 关 -->
          <Fold style="width: 1.3em; height: 1.3em;" v-show="!this.$store.state.isCollapse"/>
          <!-- 开 -->
          <Expand style="width: 1.3em; height: 1.3em;" v-show="this.$store.state.isCollapse"/>
        </el-icon>
      </el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="tag in tagsList" :key="tag.home" :to="{ path: tag.path }">{{tag.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-header">
      <el-icon size="25px" style="margin-right: 20px;"><Bell /></el-icon>
      <el-dropdown>
        <span class="el-dropdown-link">
          <div style="color: #ffffff">{{welMessage}}, {{this.$store.state.userInfo.name}}</div>
          <el-avatar :size="30" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderContent",
  data() {
    return {
      welMessage: ""
    };
  },
  methods: {
    changeMenu() {
      // this.$store.state.isCollapse = !this.$store.state.isCollapse;
      this.$store.commit("changeMenu")
    },
    loginOut () {
      this.$store.commit('loginOut')
      window.localStorage.removeItem('userInfo')
      this.$router.push({
        path: '/login'
      })
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
  mounted() {
    this.wel();
  },
  computed: {
    // 获取vuex中变化的面包屑数据
    tagsList() {
      // console.log(this.$store.state.tabsList)
      return this.$store.state.tabsList;
    }
  }
};
</script>

<style scoped>
.header {
  height: 60px;
  background-color: #2f2f2f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: #fff;
}
.left-header{
  display: flex;
  align-items: center;
}
::v-deep .el-breadcrumb__item .el-breadcrumb__inner.is-link{
  color: #939393;
  font-weight: normal;
}
::v-deep .el-breadcrumb__item .el-breadcrumb__inner.is-link:hover{
  color: #dfdfdf;
  font-weight: normal;
}
::v-deep .el-breadcrumb__item:last-child .is-link{
  color: #ffffff;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown>span{
  display: flex;
  align-items: center;
}
.el-dropdown>span>span{
  margin: 0 8px;
}
</style>

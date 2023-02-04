<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#e3e3e3"
        active-text-color="#0592f0"
        background-color="#21252b"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <h3 v-show="!isCollapse" class="animate__animated animate__fadeIn">旅游APP后台管理</h3>
        <el-menu-item :index="menu.path" v-for="menu in menuData" :key="menu.name" @click="menuContent(menu)">
          <el-icon>
            <component :is="menu.icon" />
          </el-icon>
          <span>{{menu.label}}</span>
        </el-menu-item>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>设置</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      // isCollapse: this.$store.state.isCollapse,
      menuData: [
        {
          path: "/",
          name: "frontpage",
          label: "首页",
          icon: "House"
        },
        {
          path: "/usermanage",
          name: "usermanage",
          label: "用户管理",
          icon: "User"
        },
        {
          path: "/attractions",
          name: "attractions",
          label: "景点管理",
          icon: "MapLocation"
        },
        {
          path: "/article",
          name: "article",
          label: "文章管理",
          icon: "document"
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    menuContent(menu) {
      // console.log(menu)
      this.$router.push(menu.path)
      this.$store.commit("selectMenu", menu)
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  }
};
</script>

<style scoped>
.el-menu {
  border: none;
  /* height: 100%;
  z-index: 99;
  position: fixed; */
  height: 100vh;
}
.el-menu h3 {
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
  /* background-color: #3e3e3e; */
}
img{
  margin: 500px auto 0;
}
</style>

<template>
  <div class="home">
    <el-container>
      <el-aside width="auto" class="menu" style="height: 100%;">
        <!-- 侧边栏导航菜单 -->
        <AsideMenu />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <Tagnav />
        <el-main>
          <router-view v-slot="{ Component }">
            <transition
              appear
              enter-active-class="animate__animated animate__fadeInUp"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "@/views/AsideMenu"
import Header from "@/components/Header.vue"
import Tagnav from "@/views/TagNav.vue"
export default {
  name: 'HomeView',
  data () {
    return {
      // isCollapse: false
    }
  },
  components: {
    AsideMenu, Header, Tagnav
  }
}
</script>

<style scoped>
.menu{
  overflow: auto;
  background-color: #3e3e3e;
}
.el-header{
  padding: 0;
}
.el-main{
  background-color: #eeeeee;
  padding: 0;
}
.el-main>div{
  /* background-color: #ffffff;
  height: 100%;
  border-radius: 5px; */
}
</style>

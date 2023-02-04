import { createStore } from 'vuex'

export default createStore({
  state: {
    // 控制侧边栏菜单收缩
    isCollapse: false,
    tabsList: [
      {
        path: "/",
        name: "frontpage",
        label: "首页",
        icon: "House"
      }
    ],
    userInfo: JSON.parse(localStorage.getItem("userInfo"))
  },
  getters: {
  },
  mutations: {
    changeMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑
    selectMenu(state, menu) {
      // console.log(menu)
      // 判断添加的数据是否为首页
      if (menu.name !== 'home') {
        const index = state.tabsList.findIndex(item => item.name === menu.name)
        // 如果不存在
        if (index === -1) {
          state.tabsList.push(menu)
        }
      }
    },
    closeTag(state, tag) {
      console.log(tag, 'item')
      const index = state.tabsList.findIndex(val => val.name === tag.name)
      state.tabsList.splice(index, 1)
    },
    loginOut (state) {
      state.userInfo = "";
      state.tabsList = [
        {
          path: "/",
          name: "frontpage",
          label: "首页",
          icon: "House"
        }
      ];
    }
  },
  actions: {
  },
  modules: {
  }
})

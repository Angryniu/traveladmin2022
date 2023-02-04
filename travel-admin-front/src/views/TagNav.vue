<template>
  <div class="tagnav">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      class="mx-1"
      closable
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "TagNav",
  data() {
    return {};
  },
  methods: {
    // 点击tag跳转的功能
    changeMenu(tagsItem) {
      // console.log(tagsItem)
      this.$router.push({ path: tagsItem.path });
    },
    // 删除tag
    handleClose(tag, index) {
      console.log(tag, index);
      // console.log(this.tags.length)
      console.log(this.$route, tag)
      this.$store.commit("closeTag", tag);
      const length = this.tags.length
      // 删除之后的跳转逻辑
      if (tag.name !== this.$route.name) {
        // return
      }
      // 表示的是删除的最后一项
      // this.$router.push({
      //   path: this.tags[length].path
      // });
      if (index === length) {
        // console.log(length)
        this.$router.push({
          path: this.tags[index - 1].path
        });
      } else {
        // console.log(this.tags[index - 1])
        this.$router.push({
          path: this.tags[index].path
        });
      }
    }
  },
  computed: {
    // 获取vuex中变化的面包屑数据
    tags() {
      // console.log(this.$store.state.tabsList)
      return this.$store.state.tabsList;
    }
  }
};
</script>

<style scoped>
.tagnav{
  /* border-radius: 10px; */
  background-color: #eeeeee;
}
.tagnav > span {
  margin: 12px 8px;
  cursor: pointer;
}
</style>

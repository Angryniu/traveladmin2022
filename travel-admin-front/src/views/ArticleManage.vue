<template>
  <div class="articleManage">
    <div class="operate">
      <div>
        <el-button type="info" @click="getAllArticle">
          <el-icon><Refresh /></el-icon>
        </el-button>
        <el-button type="primary" @click="addDataBtn(this.addJdData)">
          <el-icon><Plus /></el-icon>
          新增数据
        </el-button>
      </div>
      <div style="display: flex">
        <el-select v-model="value" placeholder="请选择" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="input" placeholder="通过文章名称模糊搜索" @keydown.enter="search(input)"/>
        <el-button plain @click="search(input)">
          <el-icon><Search /></el-icon>
        </el-button>
      </div>
    </div>
    <el-table :data="wzTable" border stripe style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="articleId" label="文章ID" width="100" sortable></el-table-column>
      <el-table-column prop="userName" label="作者名" width="120" sortable></el-table-column>
      <el-table-column prop="articleTitle" label="文章名称" width="250"></el-table-column>
      <el-table-column prop="content" label="内容" width="220"></el-table-column>
      <el-table-column prop="count" label="文章字数" width="110" sortable></el-table-column>
      <el-table-column prop="uploadDate" label="发布日期" width="120" sortable></el-table-column>
      <el-table-column prop="address" label="地址" > </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="success" @click="handleView(scope.$index, scope.row)" >
            <el-icon><View /></el-icon>
            详情
          </el-button>
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)" >
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-popconfirm
            title="确定删除选中记录？"
            @confirm="handleDelete(scope.$index, scope.row)"
            confirm-button-text="确认"
            cancel-button-text="取消"
          >
            <template #reference>
              <el-button size="small" type="danger" >
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="page.currentPage"
      v-model:page-size="page.pageSize"
      :total="page.totalCount"
      layout="prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="changePage">
    </el-pagination>
    <el-dialog title="文章详情" v-model="dialogTableVisible" width="50%">
      <div>文章ID:{{articleDetails.articleId}}</div>
      <div>作者名:{{articleDetails.userName}}</div>
      <div>文章名称:{{articleDetails.articleTitle}}</div>
      <!-- <div>文章内容:{{articleDetails.content}}</div> -->
      <div>文章内容:<p v-html="articleDetails.content"></p></div>
      <div>文章字数:{{Number(articleDetails.count).toFixed(2)}}</div>
      <div>发布日期:{{articleDetails.uploadDate}}</div>
      <div>地址:{{articleDetails.address}}</div>
    </el-dialog>
    <!-- 编辑文章数据 -->
    <el-dialog title="修改文章数据" v-model="changeData" width="50%">
      <el-form :model="articleDetails" label-position="left">
        <el-form-item label="文章ID" label-width="100px">
          <el-input v-model="articleDetails.articleId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者名" label-width="100px">
          <el-input v-model="articleDetails.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章名称" label-width="100px">
          <el-input v-model="articleDetails.articleTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" label-width="100px">
          <!-- <el-input v-model="articleDetails.content" autocomplete="off" type="textarea" :autosize="{ minRows: 4 }"></el-input> -->
          <Editor v-model="articleDetails.content"></Editor>
        </el-form-item>
        <el-form-item label="文章字数" label-width="100px">
          <el-input v-model="articleDetails.count" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" label-width="100px">
          <el-input v-model="articleDetails.uploadDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="articleDetails.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="changeData = false">取 消</el-button>
          <el-button type="primary" @click="replaceData(articleDetails)">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增文章数据 -->
    <el-dialog title="新增文章数据" v-model="isAdd" width="50%">
      <el-form :model="addWzData" label-position="left">
        <el-form-item label="文章ID" label-width="100px">
          <el-input v-model="addWzData.articleId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者名" label-width="100px">
          <el-input v-model="addWzData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章名称" label-width="100px">
          <el-input v-model="addWzData.articleTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" label-width="100px">
          <!-- <el-input v-model="addWzData.content" autocomplete="off" type="textarea" :autosize="{ minRows: 3 }"></el-input> -->
          <Editor v-model="addWzData.content"></Editor>
        </el-form-item>
        <el-form-item label="文章字数" label-width="100px">
          <el-input v-model="addWzData.count" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" label-width="100px">
          <el-input v-model="addWzData.uploadDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="addWzData.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isAdd = false">取 消</el-button>
          <el-button type="primary" @click="upload(this.addWzData)">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Editor from "@/components/Editor.vue";
export default {
  data() {
    return {
      input: "",
      loading: true,
      dialogTableVisible: false,
      changeData: false,
      isAdd: false,
      articleDetails: "",
      wzTable: [],
      addWzData: {
        // 添加文章内容数据
        articleId: "",
        userName: "",
        articleTitle: "",
        content: "",
        count: "",
        uploadDate: "",
        address: ""
      },
      page: {
        pageSize: 5,
        currentPage: 1,
        totalCount: 1
      },
      options: [{
        value: "userName",
        label: "作者名"
      }, {
        value: "articleTitle",
        label: "文章名称"
      }, {
        value: "content",
        label: "内容"
      }, {
        value: "address",
        label: '地址'
      }],
      value: ''
    }
  },
  methods: {
    handleView(index, row) {
      console.log(index, row);
      this.articleDetails = row;
      this.dialogTableVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.articleDetails = row;
      this.changeData = true;
    },
    handleDelete(index, row) {
      console.log(index, row.articleId);
      axios.post("http://localhost:3000/article/delete", {
        articleId: row.articleId
      })
        .then((res) => {
          console.log(res.data)
          this.getAllArticle();
          this.$message.success({
            showClose: true,
            message: "成功删除文章信息",
            type: 'success'
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllArticle() {
      // setInterval(() => {
      //   axios.get("http://localhost:3000/article")
      //     .then((res) => {
      //       console.log(res.data.data);
      //       this.wzTable = res.data.data;
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }, 10 * 1000)
      axios.get("http://localhost:3000/article", {
        params: {
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage
        }
      })
        .then((res) => {
          console.log(res.data.data);
          this.wzTable = res.data.data.rows;
          this.page.totalCount = res.data.data.count;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = true;
        });
    },
    // 搜索
    search(e) {
      if (e !== "") {
        console.log(e)
        axios.post("http://localhost:3000/article/search", {
          articleTitle: e,
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage,
          searchValue: this.value
        })
          .then((res) => {
            console.log(res.data)
            this.wzTable = res.data.data.search.rows;
            this.page.totalCount = res.data.data.search.count;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addDataBtn(addData) {
      // console.log("新增数据", addData)
      this.isAdd = true;
    },
    upload(addData) {
      console.log(addData)
      axios.post("http://localhost:3000/article/add", {
        articleId: addData.articleId,
        userName: addData.userName,
        articleTitle: addData.articleTitle,
        content: addData.content,
        count: addData.count,
        uploadDate: addData.uploadDate,
        address: addData.address
      })
        .then((res) => {
          console.log(res.data)
          this.addWzData = { articleId: "", userName: "", articleTitle: "", count: "", uploadDate: "", address: "" }
          this.getAllArticle();
          this.$message({
            showClose: true,
            message: "成功添加数据",
            type: 'success'
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.isAdd = false;
    },
    replaceData(e) {
      console.log(e)
      axios.post("http://localhost:3000/article/update", {
        articleId: e.articleId,
        userName: e.userName,
        articleTitle: e.articleTitle,
        content: e.content,
        count: e.count,
        uploadDate: e.uploadDate,
        address: e.address
      })
        .then((res) => {
          this.changeData = false
          console.log(res.data)
          this.getAllArticle();
          this.$message({
            showClose: true,
            message: "成功修改文章信息",
            type: 'success'
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(val);
    },
    changePage(val) {
      this.getAllArticle()
    }
  },
  created() {
    this.getAllArticle()
  },
  components: {
    // 富文本组件
    Editor
  }
};
</script>

<style scoped>
.articleManage{
  padding: 10px 20px;
}
.operate{
  width: 100%;
  display: flex;
  margin: 12px 0;
  justify-content: space-between;
}
.el-pagination{
  margin-top: 12px;
  justify-content: flex-end;
}
::v-deep .el-table__row td:nth-child(4) .cell,
::v-deep .el-table__row td:nth-child(5) .cell{
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>

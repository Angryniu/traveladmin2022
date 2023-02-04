<template>
  <div class="attractions">
    <div class="operate">
      <div>
        <el-button type="info" @click="getAllAttractions">
          <el-icon><Refresh /></el-icon>
        </el-button>
        <el-button type="primary" @click="addDataBtn(this.addJdData)">
          <el-icon><Plus /></el-icon>
          新增数据
        </el-button>
      </div>
      <div style="width: 220px; display: flex">
        <el-input v-model="input" placeholder="通过景点名称模糊搜索" @keydown.enter="search(input)"/>
        <el-button plain @click="search(input)">
          <el-icon><Search /></el-icon>
        </el-button>
      </div>
    </div>
    <el-table :data="jdTable" border stripe style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="jdId" label="景点ID" width="100" sortable></el-table-column>
      <el-table-column prop="jdName" label="景点名称" width="220" sortable></el-table-column>
      <el-table-column prop="jdDesc" label="景点介绍" class-name="desc" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="所在地区" width="400"> </el-table-column>
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
          <!-- 删除事件 -->
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
    <!-- 分页 -->
    <el-pagination
      v-model:currentPage="page.currentPage"
      v-model:page-size="page.pageSize"
      :total="page.totalCount"
      layout="prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="changePage">
    </el-pagination>
    <el-dialog title="景点详情" v-model="dialogTableVisible" width="50%">
      <div>景点ID:{{jdDetails.jdId}}</div>
      <div>景点名称:{{jdDetails.jdName}}</div>
      <div>所在地区:{{jdDetails.address}}</div>
      <div>
        景点介绍:
        <p v-html="jdDetails.jdDesc"></p>
      </div>
    </el-dialog>
    <!-- 编辑景点数据 -->
    <el-dialog title="修改景点数据" v-model="changeData" width="50%">
      <el-form :model="jdDetails" label-position="left">
        <el-form-item label="景点ID" label-width="100px">
          <el-input v-model="jdDetails.jdId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点名称" label-width="100px">
          <el-input v-model="jdDetails.jdName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" label-width="100px">
          <el-input v-model="jdDetails.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点介绍" label-width="100px">
          <!-- <el-input v-model="jdDetails.jdDesc" autocomplete="off" type="textarea" :autosize="{ minRows: 3 }"></el-input> -->
          <Editor v-model="jdDetails.jdDesc"></Editor>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="changeData = false">取 消</el-button>
          <el-button type="primary" @click="changeJD(jdDetails)">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增数据 -->
    <el-dialog title="添加景点数据" v-model="isAdd" width="50%">
      <el-form :model="addJdData" label-position="left">
        <el-form-item label="景点ID" label-width="100px">
          <el-input v-model="addJdData.jdId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点名称" label-width="100px">
          <el-input v-model="addJdData.jdName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" label-width="100px">
          <el-input v-model="addJdData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点介绍" label-width="100px">
          <!-- <el-input v-model="addJdData.jdDesc" autocomplete="off" type="textarea" :autosize="{ minRows: 3 }"></el-input> -->
          <Editor v-model="addJdData.jdDesc"></Editor>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isAdd = false">取 消</el-button>
          <el-button type="primary" @click="upload(this.addJdData)">
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
  name: "AttraCtions",
  data() {
    return {
      input: "",
      loading: true,
      dialogTableVisible: false,
      changeData: false,
      isAdd: false,
      jdDetails: "",
      jdTable: [],
      addJdData: {
        jdId: "",
        jdName: "",
        jdDesc: "",
        address: ""
      },
      page: {
        pageSize: 5,
        currentPage: 1,
        totalCount: 1
      }
    };
  },
  methods: {
    handleView(index, row) {
      console.log(index, row);
      this.jdDetails = row;
      this.dialogTableVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.jdDetails = row;
      this.changeData = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      axios.post("http://localhost:3000/jindian/delete", {
        jdId: row.jdId
      })
        .then((res) => {
          console.log(res.data)
          this.getAllAttractions();
          this.$message.error({
            showClose: true,
            message: "成功删除文章信息",
            type: 'error'
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 从数据库获取数据
    getAllAttractions() {
      axios.get("http://localhost:3000/jindian/getJindian", {
        params: {
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage
        }
      })
        .then((res) => {
          console.log(res.data.data)
          this.jdTable = res.data.data.rows;
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
        axios.post("http://localhost:3000/jindian/search", {
          jdName: e,
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage
        })
          .then((res) => {
            console.log(res.data)
            this.jdTable = res.data.data.search.rows;
            this.page.totalCount = res.data.data.search.count;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    changeJD(e) {
      console.log(e)
      this.changeData = false;
      axios.post("http://localhost:3000/jindian/update", {
        jdId: e.jdId,
        jdName: e.jdName,
        address: e.address,
        jdDesc: e.jdDesc
      })
        .then((res) => {
          this.changeData = false
          console.log(res.data)
          this.getAllAttractions();
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
    addDataBtn(addJD) {
      // console.log("新增数据", addJD)
      this.isAdd = true;
    },
    upload(addData) {
      axios.post("http://localhost:3000/jindian/addJD", {
        jdId: addData.jdId,
        jdName: addData.jdName,
        address: addData.address,
        jdDesc: addData.jdDesc
      })
        .then((res) => {
          console.log(res.data)
          this.addJdData = { jdId: "", jdName: "", jdDesc: "", address: "" }
          this.getAllAttractions();
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
    handleSizeChange(val) {
      console.log(val);
    },
    changePage(val) {
      console.log("切换分页", val)
      this.getAllAttractions()
    }
  },
  created() {
    this.getAllAttractions();
  },
  components: {
    Editor
  }
};
</script>

<style>
.attractions{
  padding: 10px 20px;
}
.operate{
  width: 100%;
  display: flex;
  margin: 12px 0;
  justify-content: space-between;
}
.el-popper {
  max-width: 500px;
  font-size: 14px;
}
.el-pagination{
  margin-top: 12px;
  justify-content: flex-end;
}
</style>

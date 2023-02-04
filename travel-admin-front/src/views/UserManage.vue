<template>
  <div class="userManage">
    <div class="operate">
      <div>
        <el-button type="info" @click="getAllUsers">
        <el-icon><Refresh /></el-icon>
      </el-button>
      </div>
      <div style="width: 220px; display: flex">
        <el-input v-model="input" placeholder="通过用户名模糊搜索" @keydown.enter="search(input)"/>
        <el-button plain @click="search(input)">
          <el-icon><Search /></el-icon>
        </el-button>
      </div>
    </div>
    <el-table :data="userTable" border stripe style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="userId" label="用户ID" width="120" sortable></el-table-column>
      <el-table-column prop="username" label="用户名" width="120" sortable></el-table-column>
      <el-table-column prop="password" label="密码" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="60">
        <template #default="scope">
          <el-tag
            :type="scope.row.sex === '男' ? '' : 'success'"
            disable-transitions
          >
            {{ scope.row.sex }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
      <el-table-column prop="date" label="注册日期" width="150" sortable></el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
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
    <!-- 查看详情 -->
    <el-dialog title="用户详情" v-model="dialogTableVisible" width="40%">
      <div class="xiang">
        <div>
          <label>用户ID:</label>
          {{userDetails.userId}}
        </div>
        <div>
          <label>用户名:</label>
          {{userDetails.username}}
        </div>
        <div>
          <label>性别:</label>
          {{userDetails.sex}}
        </div>
        <div>
          <label>联系电话:</label>
          {{userDetails.phone}}
        </div>
        <div>
          <label>注册日期:</label>
          {{userDetails.createdAt}}
        </div>
        <div>
          <label>地址:</label>
          {{userDetails.address}}
        </div>
      </div>
    </el-dialog>
    <!-- 编辑数据 -->
    <el-dialog title="修改用户数据" v-model="changeData" width="35%">
      <el-form :model="userDetails" label-position="left">
        <el-form-item label="用户ID" label-width="100px">
          <el-input v-model="userDetails.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="userDetails.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px">
          <el-radio-group v-model="userDetails.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="userDetails.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" label-width="100px">
          <el-input v-model="userDetails.date" autocomplete="off"></el-input>
          <el-col :span="12">
            <el-date-picker
              v-model="userDetails.date"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="userDetails.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="changeData = false">取 消</el-button>
          <el-button type="primary" @click="replaceData(userDetails)">
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
      dialogTableVisible:false,
      changeData: false,
      userDetails: "",
      userTable: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        totalCount: 1
      }
    }
  },
  methods: {
    handleView(index, row) {
      console.log(index, row);
      this.userDetails = row
      this.dialogTableVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.userDetails = row
      this.changeData = true;
    },
    // 搜索
    search(e) {
      if (e !== "") {
        console.log(e)
        axios.post("http://localhost:3000/user/search", {
          username: e,
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage
        })
          .then((res) => {
            console.log(res.data)
            this.userTable = res.data.data.search.rows;
            this.page.totalCount = res.data.data.search.count;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
      // this.userTable.splice(index, 1)
      axios.post("http://localhost:3000/user/delete", {
        userId: row.userId
      })
        .then((res) => {
          console.log(res.data)
          this.getAllUsers()
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
    getAllUsers() {
      axios.get("http://localhost:3000/user/getAllUser", {
        params: {
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage
        }
      })
        .then((res) => {
          console.log(res.data)
          this.userTable = res.data.data.rows;
          this.page.totalCount = res.data.data.count;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = true;
        });
    },
    // 修改数据
    replaceData(e) {
      console.log(e)
      axios.post("http://localhost:3000/user/update", {
        userId: e.userId,
        username: e.username,
        sex: e.sex,
        phone: e.phone,
        date: e.date,
        address: e.address
      })
        .then((res) => {
          this.changeData = false
          console.log(res.data)
          this.getAllUsers();
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
      // console.log("切换分页", val)
      this.getAllUsers()
    }
  },
  created() {
    this.getAllUsers();
  }
};
</script>

<style scoped>
.userManage{
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
.xiang{
  font-size: 16px;
}
.xiang label{
  width: 80px;
  display: inline-block;
  margin-right: 8px;
}
</style>

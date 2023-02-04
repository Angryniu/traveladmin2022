<template>
  <div class="loginPage">
    <div class="loginForm">
      <div class="login-title">
        <div>
          <div>欢迎来到</div>
          <div>后台管理系统</div>
        </div>
      </div>
      <div class="login-form">
        <el-form
          label-position="left"
          label-width="80px"
          :model="loginUser"
          style="max-width: 460px"
        >
          <el-form-item label="用户名">
            <el-input v-model="loginUser.name" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginUser.pwd" type="password"/>
          </el-form-item>
        </el-form>
        <el-button type="success" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginUser",
  data() {
    return {
      loginUser: {
        name: "admin",
        pwd: "123456"
      }
    };
  },
  methods: {
    login() {
      console.log(this.loginUser)
      this.$store.state.userInfo = this.loginUser
      localStorage.setItem("userInfo", JSON.stringify(this.loginUser))
      this.$router.push("/")
    }
  }
}
</script>

<style>
.loginPage{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("https://iw233.cn/api.php?sort=pc") no-repeat;
  background-size: cover;
}
.loginForm{
  width: 50%;
  height: 400px;
  border-radius: 12px;
  background-color: #f7f7f785;
  box-shadow: 5px 4px 8px 0px rgba(79, 79, 79, 0.25);
  margin: 10% auto 0;
  display: flex;
  align-items: center;
}
.login-title{
  width: 50%;
  height: 100%;
  border-radius: 12px 0 0 12px;
  background-color: #46464745;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form{
  width: 50%;
  text-align: center;
  padding: 0 20px;
}
label{
  font-weight: 600;
}
.el-input__inner{
  height: 35px;
}
.el-button{
  width: 40%;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
}
</style>

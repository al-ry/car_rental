<template>
    <el-form ref="form" :model="form" label-width="120px" class="login-form">
        <span class="login-label">Authorization</span>
        <el-form-item label="Login">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        
        <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">Submit</el-button>
            <router-link class="go-back-button" to="/"><el-button>Go back to start page</el-button></router-link>
            <router-link class="have-account-link" to="/registration">Don`t have an account?</router-link>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          login: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
.login-form
{
    max-width: 650px;
    margin: 50px auto 0px auto;
}

.go-back-button
{
    margin-left: 20px;
}

.have-account-link
{
    color:royalblue;
    margin-left: 20px;
}

.login-label
{
    margin: 0 auto 50px auto;
    display: block;
    font-size: 25px;
    max-width: 150px;
}

</style>
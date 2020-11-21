<template>
    <el-form ref="form" :model="form" label-width="120px" class="registration-form">
        <span class="registration-label">Registration</span>
        <el-form-item label="First name">
            <el-input v-model="form.firstName"></el-input>
        </el-form-item>
        <el-form-item label="Last name">
            <el-input v-model="form.lastName"></el-input>
        </el-form-item>

        <el-form-item label="Sity">
            <el-select v-model="form.region" placeholder="please select your sity">
                <el-option label="Казань" value="value1"></el-option>
                <el-option label="Йошкар-Ола" value="value2"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Birthday">
            <el-input v-model="form.birthday" type="date" placeholder="Pick a day"></el-input>
        </el-form-item>

        <el-form-item label="Login">
            <el-input v-model="form.login"></el-input>
        </el-form-item>

        <el-form-item label="Password">
            <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="Confirm password">
            <el-input v-model="form.confirmPassrowd"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <router-link class="go-back-button" to="/"><el-button>Go back to start page</el-button></router-link>
        </el-form-item>
    </el-form>
</template>


<script>
  export default {
    data() {
      return {
        form: {
            firstName: '',
            lastName: '',
            region: '',
            password: '',
            confirmPassword: '',
            birthday: '',
            login: ''
        }
      }
    },
    methods: {
      onSubmit() {
        
      },

      OnChange()
      {
          console.log("test");
      }
    }
  }
</script>

<style scoped>

.registration-form
{
    max-width: 600px;
    margin: 50px auto 0px auto;
}

.registration-label
{
    margin: 0 auto 50px auto;
    display: block;
    font-size: 25px;
    max-width: 150px;
}

</style>
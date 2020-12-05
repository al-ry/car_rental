<template>
    <el-form ref="form" :model="form" label-width="120px" class="login-form">
        <span class="login-label">Authorization</span>
        <el-form-item label="Phone">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
  
        <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item v-if="isEmptyInput == true" class="error_message">
            <span>All fields should be filled</span>
        </el-form-item>
		<el-form-item v-if="isLogged == false" class="error_message">
            <span>Invalid phone or password</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Submit</el-button>
            <router-link class="go-back-button" to="/"><el-button>Go back to start page</el-button></router-link>
            <router-link class="have-account-link" to="/registration">Don`t have an account?</router-link>
        </el-form-item>
    </el-form>
</template>

<script>
import {loginUser} from '../../services/loginUser'
  export default {
    data() {
      return {
        form: {
          phone: '',
          password: '',
        },

		isEmptyInput: false,
		isLogged: true
      }
    },
    methods: {
	checkInput() {
		for(const field in this.form)
		{
			if(!this.form[field])
			{
				this.isLogged = true
				this.isEmptyInput = true;
				return;
			}
		}
	},
	
	onSubmit() {
		this.checkInput() 
		if(this.isEmptyInput === false)
		{
				loginUser(this.form).then(res => {
				if(res.status == 200)
				{
					this.$router.push({name : "main_page"})
				}
				else
				{
					this.isEmptyInput = false;
					this.isLogged = false;
				}
				
				}).catch(err => {
					console.log(err)
				})
			}
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


.error_message
{
    color : red;
}

</style>
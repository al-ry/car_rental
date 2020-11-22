<template>
    <el-form ref="form" :model="form" label-width="120px" class="registration-form">
        <span class="registration-label">Registration</span>
        <el-form-item label="Name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="City">
            <el-select v-model="form.city" placeholder="please select your city">
                <el-option label="Казань" value="1"></el-option>
                <el-option label="Йошкар-Ола" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Birthday">
            <el-input v-model="form.birthday" type="date" placeholder="Pick a day"></el-input>
        </el-form-item>

        <el-form-item label="Password">
            <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="Confirm password">
            <el-input v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item v-if="doesPasswordsMatch == false" class="error_message">
            <span>Passwords does not math</span>
        </el-form-item>
        <el-form-item v-if="isEmptyInput == true" class="error_message">
            <span>All fields should be filled</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <router-link class="go-back-button" to="/"><el-button>Go back to start page</el-button></router-link>
        </el-form-item>
    </el-form>
</template>


<script>
import {registerUser} from '../../services/registerUser'
  export default {
    data() {
      return {
        form: {
            name: '',
            city: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthday: '',
            phone: ''
        },

        doesPasswordsMatch: true,
        isEmptyInput: false,
      }
    },
    methods: {
      onSubmit() {
        this.isEmptyInput = false
        console.log("Form", this.form);
        for(const field in this.form)
        {
            if(!this.form[field])
            {
                this.isEmptyInput = true;
                console.log("error", field);
                return;
            }
        } 
        
        if (this.form.password != this.form.confirmPassword)
        {
            this.doesPasswordsMatch = false
            return;
        }

        let user = {
            name: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            id_city: this.form.city,
            password: this.form.password
        }

        registerUser(user).then(res => {
                this.$router.push({name : "main_page"})
        }).catch(err => {
                console.log(err)
        })
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

.error_message
{
    color : red;
}

</style>
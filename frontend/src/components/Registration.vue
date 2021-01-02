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
                <el-select filterable v-model="form.city" class="model-select">
                    <el-option v-for="(city, index) in cities" :value="city" v-bind:key="index"/>
                </el-select>
        </el-form-item>
        <el-form-item label="Birthday">
            <el-input v-model="form.birthday" type="date" placeholder="Pick a day"></el-input>
        </el-form-item>

        <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="Confirm password">
            <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item v-if="errorMessage != ''" class="error_message">
            <span>{{errorMessage}}</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <router-link class="go-back-button" to="/"><el-button>Go back to start page</el-button></router-link>
        </el-form-item>
    </el-form>
</template>


<script>
import {registerUser} from '../../services/registerUser'
import {getCities} from '../../services/getCities'
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
        isValidInput: true,
        isRegistered : true,
        errorMessage : '',
        cities : []

      }
    },
    methods: {
        checkInput() {
            for(const field in this.form)
            {
                if(!this.form[field])
                {
                    this.errorMessage = "All fields should be filled"
                    return false;
                }
            }

            if (this.form.phone.length != 11) {
                this.errorMessage = "Phone number should contain 11 digits"
                return false
            }

            return true
        },
        onSubmit() {
            if(this.checkInput() ) {
                let user = {
                    name: this.form.name,
                    phone: this.form.phone,
                    email: this.form.email,
                    cityName: this.form.city,
                    password: this.form.password
                }

                if (this.form.password != this.form.confirmPassword) {
                    console.log(this.form.password, this.form.confirmPassword)
                    this.errorMessage = "Passwords does not match"
                    return
                }
                registerUser(user).then(res => {
                    console.log(user)
                        if (res.status == 200) {
                            this.$router.push({name : "main_page"})
                            this.$store.commit('LoginUser', this.form)
                        }        
                        else {
                            console.log(res)
                        }
                    }).catch(err => {
                        console.log(err.response.data)
                    })
            }  
        },
    },
    created() {
        getCities().then(res => {
			for(var i in res.data) {
				this.cities.push(res.data[i]['name'])
				
			}
		}).catch(err => {
			console.log(err)
		})
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
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
        <el-form-item v-if="doesPasswordsMatch == false" class="error_message">
            <span>Passwords does not math</span>
        </el-form-item>
        <el-form-item v-if="isValidInput == false" class="error_message">
            <span>All fields should be filled</span>
        </el-form-item>
        <el-form-item v-if="isRegistered == false" class="error_message">
            <span>User already exists</span>
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
        cities : []

      }
    },
    methods: {
        checkInput() {
            for(const field in this.form)
            {
                if(!this.form[field])
                {
                    this.isRegistered = true
                    this.doesPasswordsMatch = true,
                    this.isValidInput = false;
                    return;
                }
            }

            this.isValidInput = true;
        },
        onSubmit() {
            this.checkInput() 
            if(this.isValidInput === true) {
                if (this.form.password != this.form.confirmPassword) {
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
                    if (res.status == 200) {
                        this.$router.push({name : "main_page"})
                        this.$store.commit('LoginUser', this.form)
                    }        
                    else {
                        this.isEmptyInput = false;
                        this.isRegistered = false;
                        this.doesPasswordsMatch = true;
                        console.log('user exists')
                    }
                    }).catch(err => {
                        console.log(err, "sdasdasd")
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
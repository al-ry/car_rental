<template>
    <div>
    <el-form ref="form" class="form" :model="form">
        <el-form-item label="Year" > 
            <el-select v-model="advertisementInfo.form.year" class="model-select" placeholder="Select">
            <el-option v-for="year in years" :value="year" v-bind:key="year"/>
            </el-select>
        </el-form-item>

        <el-form-item label="City" >   
            <el-select filterable v-model="advertisementInfo.form.city" class="model-select">
            <el-option v-for="(city, index) in cities" :value="city" v-bind:key="index"/>
            </el-select>
        </el-form-item>

        <el-form-item label="Body" > 
            <el-select v-model="advertisementInfo.form.body" class="model-select" placeholder="Select">
                <el-option v-for="(body, index) in bodies" :label='body' :value='index+1' v-bind:key="index"/>
            </el-select>
        </el-form-item>

        <el-form-item label="Fuel" >   
            <el-select filterable v-model="advertisementInfo.form.fuel" class="model-select">
                <el-option label='Petrol' value='1' />
                <el-option label='Diesel' value='2' />
                <el-option label='Hybrid/Electro' value='3' />
            </el-select>
        </el-form-item>
<!-- 
        
        <el-form-item>
 

            <el-form-item label="Fuel" >   
                <el-select filterable v-model="advertisementInfo.form.fuel" class="model-select">
                    <el-option label='Petrol' value='1' />
                    <el-option label='Diesel' value='2' />
                    <el-option label='Hybrid/Electro' value='3' />
                </el-select>
            </el-form-item>

            <el-form-item label="Transmisson" >   
                <el-select filterable v-model="advertisementInfo.form.transmission" class="model-select">
                    <el-option label='Manual' value='1'/>
                    <el-option label='Auto' value='2'/>
                </el-select>
            </el-form-item>

            <el-form-item label="Price a day ₽" >   
                <el-input v-model="advertisementInfo.form.cost" type="number" min="1"></el-input>
            </el-form-item> -->
        <!-- </el-form-item> -->
        <el-form-item label="Uploaded photos">
            <div class="photos">
                <div class="photo_container" v-for="(photo, index) in fileList" v-bind:key="index">
                    <img class="car_photo" :src="getModifiedPath(photo)" alt="">
                    <div class="overlay" @click="handleImageRemove(photo)">
                        <i class="el-icon-delete icon"></i>
                    </div>
                </div>
            </div>
        </el-form-item>
        <!-- <el-form-item label="New photos" class="upload_photo_block" style={text-align:left}>
            <el-upload class="upload-demo" :auto-upload="false" :file-list="fileList" :limit=6 :on-change="handleChange"
                :on-remove="handleRemove" :list-type=picture>
                <template #default>
                    <el-button size="medium" type="primary">select file</el-button>
                </template>
            </el-upload>
            </el-form-item> -->
            <!-- <el-form-item class="description_block">
                <el-form-item label="Description">
                    <el-input type="textarea"  resize="none" size="medium" v-model="advertisementInfo.form.description"></el-input>
                </el-form-item>
                <el-form-item v-if="errorMessage != ''" class="error_message">
                    <span>{{errorMessage}}</span>
                </el-form-item>
            </el-form-item>

            <el-form-item class="form_buttons_block">
                <el-button type="submit" v-on:click="onSubmit">Create</el-button>
                <el-button v-on:click="$emit('close')">Cancel</el-button>
            </el-form-item> -->
    </el-form>
    
    </div>
</template>


<script>
//import {getAdvertismentInfo} from '../../services/getAdvertisementInfo'
// import { getCities } from '../../services/getCities'
import {continueSession} from '../../services/continueSession'
import {getMutableAdvertisement} from '../../services/editAdvertisement'
import { getCities } from '../../services/getCities'
// import {}

export default {
    created() {
        console.log(this.$route.params)
        this.getCitiesList()
        this.requireInfo()
    },

    data() {
        return {
            advertisement: [],
            fileList: [],
            visibleCarPhotos: [],
            cities: [],
            advertisementInfo: {
                form : {
                    description: '',
                    cost: 0,
                    transmission: 0,
                    fuel: 0,
                    year: 0
                }
            }
        }
    },

    computed: {
        years () {
			const year = new Date().getFullYear()
			return Array.from({length: year - 1900}, (value, index) => 1901 + index).reverse()
		},

		bodies () {
			return ["Sedan", "Cabriolet", "Coupe", "Crossover","Hatchback", "Limousine", "Wagon", "SUV", "Track"]
		},
    },

    methods: {

        getCitiesList() {
            getCities().then(res => {
                for(var i in res.data) {
                    this.cities.push(res.data[i]['name'])
                }
            }).catch(err => {
                console.log(err)
            })
        },

        handleChange(file) {
			this.fileList.push(file['raw'])
			console.log(this.fileList, file,  "That was on select file action")
		},

        getModifiedPath(photo) {          
            return '../../uploads/' + photo
        },

        handleImageRemove(photo) {
            console.log(photo)
            for (var index in this.visibleCarPhotos) {
                if (this.visibleCarPhotos[index] == photo) {
                    this.visibleCarPhotos.splice(index, 1); 
                }
            }
        },

        async requireInfo() {
            await continueSession().then(res => {
                if (res.status == 200) {
                    this.$store.commit('LoginUser', res.data)
                }
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })

            console.log(this.$route.params.id)
            await getMutableAdvertisement(this.$route.params.id).then(res =>{
                console.log(res)
                console.log(res.data.photo_path)
                this.advertisement = res.data
                this.fileList = res.data.photo_path
            }).catch(err => {
                console.log(err)
            })



            // await getAdvertismentInfo(this.$route.params.id).then(res => {
            //     this.advertisement = res.data
            //     this.visibleCarPhotos = res.data.photo_path 
            // }).catch(err => {
            //     this.showErrorAlert(err.response.data.err)
            // })
        },
    }
}
</script>


<style scoped>

.form {
    max-width: 700px;
    margin:auto
}

.photos {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.car_photo
{
    width: 100%;
    height: 100%;
}

.photo_container
{
    position: relative;
    max-height: 200px;
    max-width: 200px;
    width: 200px;
    margin: 5px 5px 5px 5px;
}
.photo_container:hover 
    .overlay {
        opacity: 1;
    }

.icon {
  color: white;
  font-size: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .3s ease;
  background-color: red;
}

</style>
<template>
    <div class="edit_advertisement_container">
    <h2 class="edit_header">Edit advertisement</h2>
    <el-form ref="form" class="form" :model="form">
        <el-form-item label="Year" > 
            <el-select v-model="advertisement.year" class="car_info_select" placeholder="Select">
            <el-option v-for="year in years" :value="year" v-bind:key="year"/>
            </el-select>
        </el-form-item>

        <el-form-item label="City" >   
            <el-select filterable v-model="advertisement.city" class="car_info_select">
            <el-option v-for="(city, index) in cities" :value="city" v-bind:key="index"/>
            </el-select>
        </el-form-item>

        <el-form-item label="Body" > 
            <el-select v-model="advertisement.body" class="car_info_select" placeholder="Select">
                <el-option v-for="(body, index) in bodies" :label='body' :value='index+1' v-bind:key="index"/>
            </el-select>
        </el-form-item>

        <el-form-item label="Fuel" >   
            <el-select filterable v-model="advertisement.fuel"  :value='advertisement.fuel' class="car_info_select">
                <el-option v-for="(type, index) in fuel" v-bind:key="index" :label='type' :value='index + 1'/>
            </el-select>
        </el-form-item>

        <el-form-item label="Transmisson" >   
            <el-select filterable v-model="advertisement.transmission" class="car_info_select">
                <el-option v-for="(type, index) in transmission" v-bind:key="index" :label='type' :value='index + 1'/>
            </el-select>
        </el-form-item>

        <el-form-item label="Price a day ₽" >   
            <el-input v-model="advertisement.cost" :value="getModifiedPrice(advertisement.cost)" type="number" min="1"></el-input>
        </el-form-item>
        <el-form-item label="Uploaded photos">
            <div class="photos">
                <div class="photo_container" v-for="(photo, index) in visibleCarPhotos" v-bind:key="index">
                    <img class="car_photo" :src="getModifiedPath(photo)" alt="">
                    <div class="overlay" @click="handleImageRemove(photo)">
                        <i class="el-icon-delete icon"></i>
                    </div>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="New photos" class="upload_photo_block" style={text-align:left}>
            <el-upload class="upload-demo" :auto-upload="false" :file-list="newPhotos" :limit=getPhotoCount() :on-change="handleChange"
                :on-remove="handleRemove" :list-type=picture>
                <template #default>
                    <el-button size="medium" type="primary">select file</el-button>
                </template>
            </el-upload>
            </el-form-item>
            <el-form-item class="description_block">
                <el-form-item label="Description">
                    <el-input type="textarea"  resize="none" size="medium" v-model="advertisement.description"></el-input>
                </el-form-item>
                <el-form-item v-if="errorMessage != ''" class="error_message">
                    <span>{{errorMessage}}</span>
                </el-form-item>
            </el-form-item>

            <el-form-item class="form_buttons_block">
                <el-button type="submit" v-on:click="onSubmit">Submit</el-button>
                <el-button v-on:click="back">Back</el-button>
            </el-form-item>
    </el-form>
    
    </div>
</template>


<script>

import {continueSession} from '../../services/continueSession'
import {getMutableAdvertisement, postMutableAdvertisement} from '../../services/editAdvertisement'
import { getCities } from '../../services/getCities'

export default {
    async created() {
        await this.loginUser()
        this.getCitiesList()
        this.requireInfo()
    },

    data() {
        return {
            advertisement: [],
            newPhotos: [],
            visibleCarPhotos: [],
            deletedPhotos: [],
            cities: [],
            imageDirectory: '',
            errorMessage: ''
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
        
        transmission() {
            return ["Manual", "Auto"]
        },

        fuel() {
            return ["Petrol", "Diesel", "Hybrid/Electro"]
        }
    },


    methods: {

        back() {
            this.$router.push("/user_page")
        },
        
        getPhotoCount() {
            return 6 - this.visibleCarPhotos.length
        },

        getModifiedPrice(stringPrice) {
            if (stringPrice != undefined) {
                stringPrice = stringPrice.slice(0, stringPrice.length - 5)
                stringPrice = stringPrice.replace(/\D/g, '');
                
                return parseInt(stringPrice, 10)
            }
        },

        isCorrectInfo() {
			for(const field in this.advertisement) {
				if(!this.advertisement[field]) {
                    this.errorMessage = "All fields should be filled"
					return false;
				}
			}

			if (this.advertisement.cost < 1) {
                this.errorMessage = "Price should be at least 1 RUB"
				return false
            }
            
			else if (this.advertisement.cost > 500000 || 
			this.advertisement.cost < 500) {
				this.errorMessage = "Price cant be > 500000 and < 500"
				return false
			}
			else if(this.newPhotos.length + this.visibleCarPhotos.length == 0) {
                this.errorMessage = "No photo attached"
				return false
			}

			return true
		},

        async loginUser() {
            await continueSession().then(res => {
                if (res.status == 200) {
                    this.$store.commit('LoginUser', res.data)
                }
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

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
			this.newPhotos.push(file['raw'])
        },
        
        handleRemove(file) {
			for (let i = 0; i < this.newPhotos.length; i++) {
				if(this.newPhotos[i].uid == file.uid)
				{
					this.newPhotos.splice(i, 1)
					return;
				}
			}
		},

        getModifiedPath(photo) {          
            return '../../uploads/' + photo
        },

        handleImageRemove(photo) {
            for (var index in this.visibleCarPhotos) {
                if (this.visibleCarPhotos[index] == photo) {
                    this.deletedPhotos.push(this.visibleCarPhotos[index])
                    this.visibleCarPhotos.splice(index, 1); 
                }
            }
        },

        onSubmit() {
            console.log(this.advertisement)
            if (this.isCorrectInfo()) {
                const data = new FormData();


                for(const field in this.advertisement) {
                    data.append(field, this.advertisement[field])
                }
                
                data.append('deletedPhotos', JSON.stringify(this.deletedPhotos))
                data.append('idAdvertisment', this.$route.params.id)
                data.append('folder', this.imageDirectory)

                this.newPhotos.forEach(element => {
                    data.append('files', element)
                });

                console.log(this.imageDirectory)

                postMutableAdvertisement(data).then(res => {
                    this.$router.push('/user_page')
                    res
                }).catch(err => {
                    console.log(err)
                })
            }
        },

        getPhotoFolder(imagePath) {
            return imagePath[0].split('/')[0]
        },

        async requireInfo() {
            await continueSession().then(res => {
                if (res.status == 200) {
                    this.$store.commit('LoginUser', res.data)
                }
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })

            await getMutableAdvertisement(this.$route.params.id).then(res => {
                this.advertisement = res.data
                this.visibleCarPhotos = res.data.photo_path
                this.imageDirectory = this.getPhotoFolder(this.advertisement.photo_path)
            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>


<style scoped>

.car_info_select
{
    width: 100%;
}

.form {
    max-width: 600px;
    padding: 0 5px 30px 5px;
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
    max-height: 150px;
    max-width: 150px;
    width: 200px;
    margin: 10px 5px 5px 5px;
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

.edit_advertisement_container
{
    max-width: 600px;
    margin: 40px auto 0 auto
}

.edit_header
{
    margin: 20px auto 20px auto
}
.error_message
{
    color : red;
}

</style>
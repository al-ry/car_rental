<template>
	<div id="myModal" class="modal">
		<div class="modal-content">
			<el-form ref="form" :model="form">
                <el-form-item>
                    <el-form-item  label="Mark">
						<el-select filterable v-model="selectedMark" class="mark-select" placeholder="Select">
							<el-option v-for="(mark, index) in marks" :value="mark" v-bind:key="index"/>
						</el-select>
                    </el-form-item>

                    <el-form-item label="Model" >   
                      <el-select filterable :disabled="selectedMark.length == 0" v-model="selectedModel" class="model-select" placeholder="Select">
                        <el-option v-for="(model, index) in models" :value="model" v-bind:key="index"/>
                      </el-select>
                    </el-form-item>

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
                </el-form-item>

                <el-form-item>
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

                    <el-form-item label="Transmisson" >   
						<el-select filterable v-model="advertisementInfo.form.transmission" class="model-select">
							<el-option label='Manual' value='1'/>
							<el-option label='Auto' value='2'/>
						</el-select>
                    </el-form-item>
        
                    <el-form-item label="Price a day ₽" >   
						<el-input v-model="advertisementInfo.form.cost" type="number" min="1"></el-input>
                    </el-form-item>
                </el-form-item>

                <el-form-item label="Photos" class="upload_photo_block" style={text-align:left}>
                    <el-upload class="upload-demo" :auto-upload="false" :file-list="fileList" :limit=6 :on-change="handleChange"
						:on-remove="handleRemove" :list-type=picture>
						<template #default>
							<el-button size="medium" type="primary">select file</el-button>
						</template>
					</el-upload>
					</el-form-item>
					<el-form-item class="description_block">
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
                    </el-form-item>
            </el-form>
		</div>
	</div>
</template>

<script>
import { addCar } from '../../services/addCar'
import { getMarks } from '../../services/getMarks'
import { getModels } from '../../services/getModels'
import { getCities } from '../../services/getCities'
import {mapGetters} from 'vuex'
import { v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
			fileList: [],
            advertisementInfo:
            {
                form: {
					model: '',
					mark: '',
					transmission: '',
					fuel: '',
					body: '',
                    year: '',
					description: '',
					cost: '',
					city: '',
					uid: 1,
					phone: 1,		
                },
            },

			errorMessage : "",
            selectedMark : '',
            selectedModel : '',
            marks : [],
			models: [],
			cities: []
		}
    },

    watch: {
		selectedMark() {
			this.models = []
			getModels(this.selectedMark).then(res => {
				for(var i in res) {
					this.models.push(res[i]['name']) 
				}
			}).catch(err => {
				console.log(err, "asdasd")
			});
			this.selectedModel = ''
		}
	},

	computed : {
		years () {
			const year = new Date().getFullYear()
			return Array.from({length: year - 1900}, (value, index) => 1901 + index).reverse()
		},

		bodies () {
			return ["Sedan", "Cabriolet", "Coupe", "Crossover","Hatchback", "Limousine", "Wagon", "SUV", "Track"]
		},

		...mapGetters(['isLoggedIn']),

		userPhone() {
            return this.$store.getters.GetUserPhone;
        }
	},

	created() {
		getMarks().then(res => {
			for(var i in res) {
				this.marks.push(res[i]['name']) 
			}
		}).catch(err => {
				console.log(err)
		})

		getCities().then(res => {
			for(var i in res.data) {
				this.cities.push(res.data[i]['name'])
			}
		}).catch(err => {
				console.log(err)
		})
	},

	methods: {
		handleChange(file) {
			this.fileList.push(file['raw'])
			console.log(this.fileList, file,  "That was on select file action")
		},

		handleRemove(file) {
			for (let i = 0; i < this.fileList.length; i++) {
				if(this.fileList[i].uid == file.uid)
				{
					this.fileList.splice(i, 1)
					console.log(this.fileList,  "That is file array after delete")
					return;
				}
			}
		},

		onSubmit() {
			this.advertisementInfo.form.mark = this.selectedMark
			this.advertisementInfo.form.model = this.selectedModel
			if(this.isCorrectInfo() && this.isLoggedIn)
			{
				this.advertisementInfo.form.uid = uuidv4();
				this.advertisementInfo.form.phone = this.userPhone
				const data = new FormData();
				for(const field in this.advertisementInfo.form) {
					data.append(field, this.advertisementInfo.form[field])
				}

				this.fileList.forEach(element => {
					data.append('files', element)
				});

				addCar(data).then(res => {
					this.$emit('add-new-advetisement');
					console.log(this.fileList)
					res
				}).catch(err => {
					this.errorMessage = err.response.data.err
				})
			}
		},

		isCorrectInfo() {
			for(const field in this.advertisementInfo.form)
			{
				if(!this.advertisementInfo.form[field])
				{
					this.errorMessage = "All fields should be filled"
					console.log(field)
					return false;
				}
			}

			if (this.advertisementInfo.form.cost < 1) {
				this.errorMessage = "Price should be at least 1 RUB"
				return false
			}
			else if (this.advertisementInfo.form.cost > 500000 || 
			this.advertisementInfo.form.cost < 500) {
				this.errorMessage = "Price cant be > 500000 and < 500"
				return false
			}
			else if(this.fileList.length == 0) {
				this.errorMessage = "No photo attached"
				return false
			}

			return true
		},
    }
  }
</script>


<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 700px;
	height: auto; /*HERE*/
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

label.el-form-item__label
{
	text-align: left;
	font-size: 20px;
}

.el-form-item__label
{
	text-align:left;
	color:white
}


html, body 
{
  margin: 0px;
}

h2 {
    max-width: 400px;
    margin: 20px auto 20px auto;
}

.description_block
{
	min-width: 500px;
	margin-bottom: 20px;
}

/* .modal-mask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 550px;
  margin: 0px auto;
  padding: 20px 30px 20px 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow: hidden;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
} */

/* .modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */

.error_message
{
    color : red;
}

.el-upload--picture-card
{
  height: 60px;
  width: 60px;
  line-height: 70px;
}

.el-form-item
{
  margin-left: 20px;
}

.el-form
{
  display: flex;
  flex-wrap: wrap;
}

.upload_photo_block
{
	display:flex;
	align-items: flex-start;
	flex-direction: column;
	margin-left: 40px;
}

.form_buttons_block
{
	margin-left: 40px;
}

.el-upload-list
{
    display: flex;
    flex-wrap: wrap;
}

.el-upload-list__item
{
	width: auto;
	margin-top: 10px;
}

.mark-select, .model-select
{
  display: block;
}
</style>
<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
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
                        <el-option label='Manual' value='1'/>
                      </el-select>
                    </el-form-item>
                    </el-form-item>
                  <el-form-item>
                    <el-form-item label="Body" > 
                      <el-select v-model="advertisementInfo.form.body" class="model-select" placeholder="Select">
                        <el-option v-for="(body, index) in bodies" :value="body" v-bind:key="index"/>
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
                      <el-input v-model="advertisementInfo.form.price" type="number" min="1"></el-input>
                    </el-form-item>
                  </el-form-item>

                  <el-form-item label="Photos" class="upload_photo_block" style={text-align:left}>
                    <el-upload
						class="upload-demo"
						:auto-upload="false"
						:file-list="fileList"
						:on-change="handleChange"
						:on-remove="handleRemove"
						:list-type=picture
						>
						<template #default>
							<el-button size="medium" type="primary">select file</el-button>
						</template>
					</el-upload>
					</el-form-item>
					<el-form-item class="description_block">
                    <el-form-item label="Description">
                        <el-input type="textarea" v-model="advertisementInfo.form.desc"></el-input>
                    </el-form-item>
                    <el-form-item v-if="isValidInput == false" class="error_message">
                         <span>All fields should be filled</span>
                    </el-form-item>
                  </el-form-item>

                    <el-form-item class="form_buttons_block">
                        <el-button type="submit" v-on:click="onSubmit">Create</el-button>
                        <el-button v-on:click="$emit('close')">Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
import { addCar } from '../../services/addCar'
import {getMarks} from '../../services/getMarks'
import {getModels} from '../../services/getModels'


export default {
    data() {
        return {
			fileList: [],
            advertisementInfo:
            {
                form: {
                    desc: '',
                    mark: '',
                    model: '',
                    transmission: '',
                    fuel: '',
                    year: '',
                    body: '',
                    city: '',
                    price: ''
                },
            },

            isValidInput : true,

            selectedMark : '',
            selectedModel : '',
            marks : [],
            models: []
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
		}
	},

	computed : {
		years () {
			const year = new Date().getFullYear()
			return Array.from({length: year - 1900}, (value, index) => 1901 + index).reverse()
		},

		bodies () {
			return ["Sedan", "Cabriolet", "Coupe", "Crossover","Hatchback", "Limousine", "Wagon", "SUV", "Track"]
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
			this.checkInput();
			if(this.isValidInput === true)
			{
				const fd = new FormData();
				this.fileList.forEach(element => {
					fd.append('files', element)
				});

				fd.append('model', JSON.stringify(this.advertisementInfo.form))
				addCar(fd).then(res => {
					this.$emit('add-new-advetisement', this.advertisementInfo.form);
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		},

		checkInput() {
			for(const field in this.advertisementInfo.form)
			{
				if(!this.advertisementInfo.form[field])
				{
					this.isValidInput = false;
					console.log(field)
					return;
				}
			}
			this.isValidInput = true;

		},

		createUniqueId() {

		}
    }
  }
</script>


<style scoped>

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

.modal-mask {
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
}

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
	align-items: start;
	flex-direction: column;
	margin-left: 40px;
}

.form_buttons_block
{
	margin-left: 40px;
}
/* .el-upload-list--picture-card .el-upload-list__item 
{
  height: 60px;
  width: 60px;
  line-height: 70px;
} */
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
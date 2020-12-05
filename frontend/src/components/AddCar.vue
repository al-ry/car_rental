<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <h2>Create new advertisement</h2>
                <el-form ref="form" :model="form" label-width="120px">
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
                  </el-form-item>
                  <el-form-item>
                    <!-- <el-upload
						class="upload-demo"
						:auto-upload="false"
						:file-list="fileList"
						:on-change="handleChange"
						:list-type=picture
						>
						<template #trigger>
							<el-button size="small" type="primary">select file</el-button>
						</template>
						<el-button
							size="small"
							type="success"
							@click="submitUpload"
							>upload to server</el-button
						>
						<template #tip>
							<div class="el-upload__tip">
							jpg/png files with a size less than 500kb
							</div>
						</template>
						</el-upload> -->
                    <el-form-item label="Photo path">
                         <input type="file" @change="handleChange">
                    </el-form-item>

                    <el-form-item label="Description">
                        <el-input type="textarea" v-model="advertisementInfo.form.desc"></el-input>
                    </el-form-item>
                    <el-form-item v-if="isValidInput == false" class="error_message">
                         <span>All fields should be filled</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="onSubmit">Create</el-button>
                        <el-button v-on:click="$emit('close')">Cancel</el-button>
                    </el-form-item>
                  </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>

import {getMarks} from '../../services/getMarks'
import {getModels} from '../../services/getModels'
import axios from 'axios'

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
      this.fileList.push(file.target.files[0])
			console.log(this.fileList, "That was on select file action")
		},
		onSubmit() {
			// this.checkInput();
			if(this.isValidInput === true)
			{
				this.advertisementInfo.form.mark = this.selectedMark
				this.advertisementInfo.form.model = this.selectedModel

				const fd = new FormData();
				this.fileList.forEach(element => {
          fd.append('files', element)
        });

        fd.append('model', this.advertisementInfo.form.model)
        // this.$emit('add-new-advetisement', fd);
        
        axios.post('/addCar', fd)
			}
		},

		checkInput() {
			for(const field in this.advertisementInfo.form)
			{
				if(!this.advertisementInfo.form[field])
				{
					this.isValidInput = false;
					return;
				}
			}

		},
    }
  }
</script>


<style>
html, body 
{
  margin: 0px;
}

h2 {
    max-width: 300px;
    margin: 20px auto 20px auto;
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
  width: 900px;
  margin: 0px auto;
  padding: 20px 30px 20px 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
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

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

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


.el-upload-list--picture-card .el-upload-list__item 
{
  height: 60px;
  width: 60px;
  line-height: 70px;
}

.mark-select, .model-select
{
  display: block;
}

</style>
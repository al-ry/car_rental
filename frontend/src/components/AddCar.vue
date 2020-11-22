<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <h2>Create new advertisement</h2>
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="Mark">
                        <el-input v-model="advertisementInfo.form.mark"></el-input>
                    </el-form-item>
                    <el-form-item label="Model">
                        <el-input v-model="advertisementInfo.form.model"></el-input>
                    </el-form-item>
                    <el-form-item label="Photo path">
                         <input type="file" @change="addPhoto">
                    </el-form-item>
                    <el-form-item label="Transmisson">
                        <el-radio-group v-model="advertisementInfo.form.transmission">
                        <el-radio label="Manual"></el-radio>
                        <el-radio label="Auto"></el-radio>
                        </el-radio-group>
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
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    data() {
        return {
            advertisementInfo:
            {
                form: {
                    mark: '',
                    model: '',
                    desc: '',
                    transmission: '',
                    path: 'kalina.jpg'
                },

                photos: [],
            },
            isValidInput : true
        }
    },
    methods: {
        onSubmit() {
        // // for(const field in this.form)
        // // {
        // //     if(!this.form[field])
        // //     {
        // //         this.isValidInput = false;
        // //         console.log("error");
        // //         return;
        // //     }
        // // } надо как то проверять на прикрепление файла
        
        // const fd = new FormData();
        // this.form.photo = fd;
        // this.photos.forEach(element => {
        //   console.log(element)
        //   fd.append('files', element)
        // });
        
        this.$emit('add-new-advetisement', this.advertisementInfo.form);
      },

      addPhoto(event)
      {
        this.advertisementInfo.photos.push(event.target.files[0]);
      }
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
    margin: 40px auto 40px auto;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
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
  width: 500px;
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

</style>
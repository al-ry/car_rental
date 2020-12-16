<template>
    <div class="main_container" v-loading.fullscreen.lock="fullscreenLoading">
		<el-header><navbar v-on:show-add-car="isVisibleAddMenu = true"/></el-header>
		<el-main>
            <car-container ref="car_container" v-bind:cars="cars"/>  
        </el-main>
        <AddCar v-if="isVisibleAddMenu == true" v-on:close="isVisibleAddMenu = false"
         v-on:add-new-advetisement="AddNewAdvertisement"/>
	</div> 
</template>

<script>
import Navbar from './Navbar.vue'
import CarContainer from './CarsContainer.vue'
import AddCar from './AddCar.vue'
import {continueSession} from '../../services/continueSession.js'
import {mapGetters} from 'vuex'

export default {

    data() {
        return {
            isVisibleAddMenu : false,
            cars: [],
            fullscreenLoading : false
        }
    },

    computed: {
        ...mapGetters(['GetUserInfo'])
    },

    components: {
		Navbar, 
        CarContainer,
        AddCar,
    },

    methods: {
        AddNewAdvertisement(car) {
            this.$refs.car_container.AddNewCar(car);
            this.isVisibleAddMenu = false;
        },
        openFullScreen1() {
            this.fullscreenLoading = true;
            setTimeout(() => {
            this.fullscreenLoading = false;
            }, 500);
        },
    },

    async created() {
        this.openFullScreen1()
        await continueSession().then(res => {
            if (res.status == 200) {
                this.$store.commit('LoginUser', res.data)
            }
        }).catch(err => {
            console.log(err, 'error')
        })
    },


}

</script>

<style>
#app
{
    margin: 0;
    padding: 0;
    height: 100%;
}



html, body {
    overflow: auto;
	height: 100%;
    margin: 0px;
}

.main {
    overflow: auto;
}

* {
	margin : 0;
	padding : 0;
}

.main_container
{
	height: 100%;
 
}

.el-header {
	padding: 0;
}

.el-main {
	padding: 0px;
	height: 100%;
    overflow: hidden; 
}
.el-main
{
    overflow: auto;
}
</style>
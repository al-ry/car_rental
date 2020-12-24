<template>
    <el-main class="user_page_container" v-loading.fullscreen.lock="fullscreenLoading" element-loading-background="rgba(1, 1, 1, 1)">
        <el-alert title="Success" type="success" @close="handleClose" :description="successMessage" v-if="successMessage != ''" center show-icon></el-alert>
        <el-alert title="Error" type="error" @close="handleClose" :description="errorMessage" show-icon v-if="errorMessage != ''"></el-alert>
        <div id="myModal" class="modal" v-if="isVisiblePopup">
            <div class="modal-content">
                <h2>Give feedback for car lessor to improve our servese!</h2>
                <div class="review_creation_block">
                    <el-rate v-model="reviewRating" class="rate_field"></el-rate> 
                    <el-input type="textarea" class="review_input" resize="none" size="medium" placeholder="Please input" v-model="reviewText"></el-input>
                </div>
                <div class="button_block">
                    <el-button type="success" :disabled="isLoggedIn == false" @click="createReview">Success</el-button>
                     <el-button @click="closePopup">Close</el-button>
                </div>
            </div>
        </div>
     <el-page-header @back="Back" content="User page"></el-page-header>
        <div class="user_info_container">
            <div>
                <el-avatar :size="200" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="info_block">
                <span><i class="el-icon-user icon"></i> <span class="info_text">{{userInfo.name}}</span></span>
                <span><i class="el-icon-phone-outline icon"></i> <span class="info_text">{{userInfo.phone}}</span></span>
                <span><i class="el-icon-postcard icon"></i> <span class="info_text">{{userInfo.email}}</span></span>
                <span><i class="el-icon-location icon"></i> <span class="info_text">{{userInfo.city}}</span></span>
            </div>
        </div>
        <el-tabs type="border-card" class="user_activity_tabs" @tab-click="tabClicked">
            <el-tab-pane label="Your book requests">
                <el-table :data="incomingRequests" v-loading="tableLoading" max-height="500" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="mark_name" label="Car" width="180">
                        <template #default="scope">
                            <el-tag size="medium" @click="showAdvertisement(scope.$index, scope.row)">
                                {{ scope.row.mark_name }} {{scope.row.model_name}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="renter_name" label="User" width="180">
                        <template #default="scope">
                            <el-tag size="medium" @click="showAdvertisement(scope.$index, scope.row)">{{ scope.row.renter_phone }}</el-tag>
                            <span style="margin-left: 10px">{{scope.row.renter_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="start" label="Start" width="180"></el-table-column>
                    <el-table-column prop="end" label="End" width="180"></el-table-column>
                    <el-table-column prop="state" label="Status" width="100"></el-table-column>
                    <el-table-column  label="Operations" width="120">
                        <template #default="scope">
                            <el-button icon="el-icon-check" circle v-if="scope.row.state == 'Waiting'" @click="handleAccept(scope.$index, scope.row)"></el-button>
                            <el-button icon="el-icon-error" circle v-if="scope.row.state == 'Waiting'" type="danger" @click="handleDecline(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <el-tab-pane label="Your advertisement" >
                <el-table :data="cars" v-loading="tableLoading" max-height="500" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="mark_name" label="Car" width="180">
                        <template #default="scope">
                            <el-tag size="medium" @click="showAdvertisement(scope.$index, scope.row)">
                                {{ scope.row.mark }} {{scope.row.model}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="city" label="City" width="180"></el-table-column>
                    <el-table-column prop="cost" label="Price a day" width="180"></el-table-column>
                    <el-table-column prop="is_open" label="Status" width="180"></el-table-column>
                    <el-table-column  label="Operations" width="250">
                        <template #default="scope">
                            <el-button icon="el-icon-remove" title="Close advertisement" circle v-if="scope.row.is_open == 'Open'" type="danger" @click="handleAdvertisementClose(scope.$index, scope.row)"></el-button>
                            <el-button icon="el-icon-refresh" circle title="Reopen advertisement" v-if="scope.row.is_open == 'Closed'" type="danger" @click="hanbleAdvertisementReopen(scope.$index, scope.row)"></el-button>
                            <el-button icon="el-icon-setting" circle title="Edit advertisement" type="info" @click="handleEditClicked(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <el-tab-pane label="Your rents" @tab-click="showOutgoingRequests">
                <el-table :data="outgoingRequests" v-loading="tableLoading" max-height="500" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="mark_name" label="Car" width="180">
                        <template #default="scope">
                            <el-tag size="medium" @click="showAdvertisement(scope.$index, scope.row)">
                                {{ scope.row.mark_name }} {{scope.row.model_name}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="start" label="Start" width="180"></el-table-column>
                    <el-table-column prop="end" label="End" width="180"></el-table-column>
                    <el-table-column prop="state" label="Status" width="180"></el-table-column>
                    <el-table-column label="Operations" width="180">
                        <template #default="scope">
                            <el-button icon="el-icon-edit" circle v-if="scope.row.state == 'Accepted'" @click="showCreateReview(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script>

import {continueSession} from '../../services/continueSession'
import {getUserAdvertisement} from '../../services/getUserAdvertisements'
import {getIncomingRequests} from '../../services/getIncomingRequests'
import {acceptBooking} from '../../services/acceptBooking'
import {declineBooking} from '../../services/declineBooking'
import {getOutgoingRequests} from '../../services/getOutgoingRequests'
import {giveReview} from '../../services/giveReview'
import {closeAdvertisement} from '../../services/closeAdvertisement'
import {reopenAdvertisement} from '../../services/reopenAdvertisement'
import {mapGetters} from 'vuex'

export default {

    computed: {
        ...mapGetters(['GetUserInfo', 'isLoggedIn']),
    },

    data() {
        return {
            fullscreenLoading: false,
            userInfo: {},
            cars: [],
            incomingRequests: [],
            outgoingRequests: [],
            reviewFor : 0,
            isVisiblePopup: false,
            reviewRating: 0,
            reviewText : '',
            errorMessage : '',
            successMessage : '',
            tableLoading: false
        }
    },

    async created() {
        this.openLoadingScreen()
        await this.relogUser()
        if  (this.isLoggedIn) {
            this.showIncomingRequests()
        }
        this.closeLoadingScreen()
    },

    methods: {

        handleClose() {
            this.errorMessage = ''
            this.successMessage = ''
        },

        getModifiedPrice(cost) {
            return cost.slice(0, cost.length - 5)
        },

        async showIncomingRequests() {
            await getIncomingRequests().then(res => {
                this.incomingRequests = this.formatRequests(res.data)
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

        openLoadingScreen() {
            this.fullscreenLoading = true;
        },

        closeLoadingScreen() {
            this.fullscreenLoading = false;
        },

        showSuccessAlert(message) {
            this.successMessage = message
            this.errorMessage = ''
        },

        showErrorAlert(message) {
            this.errorMessage = message
            this.successMessage = ''
        },

        async relogUser() {
            await continueSession().then(res => {
                if (res.status == 200) {
                    this.$store.commit('LoginUser', res.data)
                    this.userInfo = this.$store.getters.GetUserInfo
                }
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

        showOutgoingRequests() {
            getOutgoingRequests().then(res => {
                console.log(res.data, 'show outgoing')
                this.outgoingRequests = this.formatRequests(res.data)
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },
        
        closePopup() {
            this.isVisiblePopup = false;
        },

        createReview() {
            if (this.reviewText == '') {
                this.showErrorAlert('Review should not be empty')
            } else if (this.reviewRating == 0) {
                this.showErrorAlert('You should pick rate')
            } else {
                giveReview(this.reviewFor, this.reviewRating, this.reviewText).then(res => {
                    this.closePopup()
                    this.showSuccessAlert('You have sent review! Thanks!')
                    res
                }).catch(err => {
                    this.showErrorAlert(err.response.data.err)
                })
            }
        },

        showCreateReview(index, data) {
            this.isVisiblePopup = true;
            this.reviewFor = data.id_advertisment
        }, 

        showAdvertisement(index, data) {
            this.$router.push({ name:'advertisement', params: {id: data.id_advertisment}})
        },

        formatUsersCars() {
            for (var index in this.cars) {
                this.cars[index].cost = this.getModifiedPrice(this.cars[index].cost) + ' RUB'

                switch (this.cars[index].is_open) {
                    case 0:
                        this.cars[index].is_open = 'Closed';
                        break;
                    case 1:
                        this.cars[index].is_open = 'Open'; 
                        break;
                }
            }
        },

        formatRequests(requests) {
            for(var index in requests) {
                let startDate = new Date(requests[index].start)
                let endDate = new Date(requests[index].end)
                startDate.setDate(startDate.getDate() + 1)
                endDate.setDate(endDate.getDate() + 1)
                requests[index].start = startDate.toDateString()
                requests[index].end = endDate.toDateString()
                switch (requests[index].state) {
                    case 0:
                        requests[index].state = 'Waiting';
                        break;
                    case 1:
                        requests[index].state = 'Accepted'; 
                        break;
                    case 2: 
                        requests[index].state = 'Declined'  
                        break;
                }
            }

            return requests
        },

        tabClicked(tab)  {
            if (tab.props.label == "Your advertisement") {  
                this.showUserAdvertisement()
            }

            if (tab.props.label == "Your rents") { 
                this.showOutgoingRequests()               
            }
        },

        showUserAdvertisement() {
            getUserAdvertisement(this.GetUserInfo.phone).then(res => {
                this.cars = res.data
                this.formatUsersCars()
                console.log(this.cars)
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

        Back() {
            this.$router.replace("/")
        },

        handleEditClicked(index, data) {
            this.$router.push({ name:'edit_page', params: {id: data.id_advertisment, info: data}})
        },

        handleAccept(index, data) {
            this.tableLoading = true
            acceptBooking(data.id_booking).then(res => {
                this.showSuccessAlert("Request of " + this.userInfo.name + " accepted!")
                this.showIncomingRequests()
                this.tableLoading = false
                res
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

        handleAdvertisementClose(index, data) {
            closeAdvertisement(data.id_advertisment).then(res => {
                this.showUserAdvertisement()
                this.showSuccessAlert("Advertisement was hidden from users, but you can reopen it")
                res
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

        hanbleAdvertisementReopen(index, data) {
            reopenAdvertisement(data.id_advertisment).then(res => {
                this.showUserAdvertisement()
                this.showSuccessAlert("Advertisement was reopened for users")
                res
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

        handleDecline(index, data) {
            this.tableLoading = true
            declineBooking(data.id_booking).then(res => {
                this.showSuccessAlert("Request of " + this.userInfo.name + " declined!")
                this.showIncomingRequests()
                this.tableLoading = false
                res
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        }
    },
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.el-alert
{
    z-index: 2001;
}

.modal-content {
  background-color: #fefefe;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 700px;
height: auto; /*HERE*/
}

.el-page-header__title
{
    font-size: 30px;
}
.user_info_container
{
    max-width: 900px;
    margin: 50px auto;
    display: flex;
    flex-direction: row;
}

.user_page_container
{
    margin: auto;
    height: 100%;
    overflow: auto; 
}

.el-tabs__header
{
    margin-bottom: 0px;
}

.user_activity_tabs
{
    margin: 20px auto 50px auto;
    max-width: 1000px;
    height: auto;
}

.el-page-header 
{
    padding: 10px 0 10px 20px;
}

.icon
{
    margin-right: 5px;
    font-weight: 700;
}

.info_block
{
    display: flex;
    flex-direction: column;
    font: Courier, monospace;
    font-size: 20px;
    line-height: 40px;
    color:black;
    margin: auto 0 auto 50px 
}

.rate_field
{
    margin-bottom: 15px;
}

.review_input
{
    margin-bottom: 40px;
}

.review_creation_block
{
    padding: 15px 5px 0 5px;
}


</style>
/* eslint-disable vue/no-deprecated-slot-attribute */ /* eslint-disable
vue/no-deprecated-slot-attribute */
<template>
	<ion-page>
		<ion-content class="ion-padding">
			<!--* Online -->
			<ion-list style="margin-bottom:1rem" v-if="onlineDevices.length > 0">
				<ion-list-header lines="full">
					<ion-item style="width:100%">
						<ion-icon
							:md="checkmarkCircleSharp"
							:ios="checkmarkCircleOutline"
							slot="start"
						></ion-icon>
						<ion-title style="background-color:rgba(0,0,0,0)">
							Online
						</ion-title>
						<ion-badge slot="end" color="success">{{
							onlineDevices.length
						}}</ion-badge>
					</ion-item>
				</ion-list-header>
				<DeviceSlidingItem
					v-for="device in onlineDevices"
					:key="device.id"
					:device="device"
				>
				</DeviceSlidingItem>
			</ion-list>
			<!--* Warnings -->
			<ion-list style="margin-bottom:1rem" v-if="warningDevices.length > 0">
				<!-- List header -->
				<ion-list-header lines="full">
					<ion-item style="width:100%">
						<ion-icon
							:md="alertCircleSharp"
							:ios="alertCircleOutline"
							slot="start"
						></ion-icon>
						<ion-title style="background-color:rgba(0,0,0,0)">
							Warning / Alert
						</ion-title>
						<ion-badge slot="end" color="warning">{{
							warningDevices.length
						}}</ion-badge>
					</ion-item>
				</ion-list-header>
				<!-- Items -->
				<DeviceSlidingItem
					v-for="device in warningDevices"
					:key="device.id"
					:device="device"
				></DeviceSlidingItem>
			</ion-list>
			<!--* Offline/Errors -->
			<ion-list v-if="offlineDevices.length > 0">
				<ion-list-header lines="full">
					<ion-item style="width:100%">
						<ion-icon
							:md="closeCircleSharp"
							:ios="closeCircleOutline"
							slot="start"
						></ion-icon>
						<ion-title style="background-color:rgba(0,0,0,0)">
							Offline / Critical error
						</ion-title>
						<ion-badge slot="end" color="danger">{{
							offlineDevices.length
						}}</ion-badge>
					</ion-item>
				</ion-list-header>
				<DeviceSlidingItem
					v-for="device in offlineDevices"
					:key="device.id"
					:device="device"
				></DeviceSlidingItem>
			</ion-list>
			<!--* No devices registered -->
			<full-page-text
				v-if="
					!(onlineDevices.length > 0) &&
						!(warningDevices.length > 0) &&
						!(offlineDevices.length > 0)
				"
				title="Start by adding a device!"
				text="Add a new device with the add floating button below"
			></full-page-text>
			<!--* Create fab -->
			<!-- TODO Add feature to create device by scanning qr in it -->
			<ion-fab vertical="bottom" horizontal="end" slot="fixed">
				<ion-fab-button router-link="/devices/add">
					<ion-icon :md="addSharp" :ios="addOutline"></ion-icon>
				</ion-fab-button>
			</ion-fab>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonPage,
	IonContent,
	IonIcon,
	IonTitle,
	IonBadge,
	IonList,
	IonListHeader,
	IonItem,
	IonFab,
	IonFabButton,
	actionSheetController,
} from '@ionic/vue';
import {
	checkmarkCircleSharp,
	checkmarkCircleOutline,
	alertCircleSharp,
	alertCircleOutline,
	closeCircleSharp,
	closeCircleOutline,
	addSharp,
	addOutline,
	trashBinSharp,
	trashBinOutline,
	createSharp,
	createOutline,
	ellipsisHorizontalSharp,
	ellipsisVerticalOutline,
	analyticsSharp,
	shareSocialSharp,
	peopleCircleSharp,
} from 'ionicons/icons';
import DeviceSlidingItem from '../../components/DeviceSlidingItem.vue';
import FullPageText from '../../components/FullPageText.vue';
export default {
	name: 'DevicesList',
	components: {
		IonPage,
		IonContent,
		IonIcon,
		IonTitle,
		IonBadge,
		IonList,
		IonListHeader,
		IonItem,
		IonFab,
		IonFabButton,
		FullPageText,
		DeviceSlidingItem,
	},
	methods: {
		async moreActionSheet(device) {
			const actionSheet = await actionSheetController.create({
				header: `Device ${device.name}`,
				buttons: [
					{
						text: 'View Data',
						icon: analyticsSharp,
						handler: () => {
							console.log('Clicked view data');
						},
					},
					{
						text: 'Share',
						icon: shareSocialSharp,
						handler: () => {
							console.log('Clicked share');
						},
					},
					{
						text: 'Permissions',
						icon: peopleCircleSharp,
						handler: () => {
							console.log('Clicked permissions');
						},
					},
				],
			});
			return actionSheet.present();
		},
		async clickFab() {
			console.log('Fab clicked');
		},
	},
	computed: {
		onlineDevices() {
			return this.$store.getters.onlineDevices;
		},
		warningDevices() {
			return this.$store.getters.warningDevices;
		},
		offlineDevices() {
			return this.$store.getters.offlineDevices;
		},
	},
	setup() {
		return {
			checkmarkCircleSharp,
			checkmarkCircleOutline,
			alertCircleSharp,
			alertCircleOutline,
			closeCircleSharp,
			closeCircleOutline,
			addSharp,
			addOutline,
			trashBinSharp,
			trashBinOutline,
			createSharp,
			createOutline,
			ellipsisHorizontalSharp,
			ellipsisVerticalOutline,
		};
	},
};
</script>

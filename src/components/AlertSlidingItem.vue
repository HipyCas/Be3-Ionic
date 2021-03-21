<template>
	<ion-item-sliding :inset="true">
		<!-- Left side options: Delete (expandable) -->
		<ion-item-options side="start" @ionSwipe="confirmDelete(alert)">
			<ion-item-option color="danger" @click="confirmDelete(alert)" expandable>
				<ion-icon
					slot="top"
					:md="trashBinSharp"
					:ios="trashBinOutline"
				></ion-icon>
				Delete
			</ion-item-option>
		</ion-item-options>
		<!-- Item content -->
		<ion-item :router-link="`/messages/alert/${alert.id}`">
			<ion-label>
				<div class="title">
					<h6>#{{ alert.id }}: {{ alert.title }}</h6>
					<ion-note>{{ alert.timestamp }}</ion-note>
				</div>
				<p class="text">{{ alert.message }}</p>
			</ion-label>
		</ion-item>
		<!-- Right side options: edit + more -->
		<ion-item-options side="end" @ionSwipe="moreActionSheet(alert)">
			<ion-item-option color="primary">
				<ion-icon slot="top" :md="cubeSharp" :ios="cubeOutline"></ion-icon>
				Device
			</ion-item-option>
			<ion-item-option @click="moreActionSheet(alert)" color="light" expandable>
				<ion-icon
					slot="top"
					:md="ellipsisHorizontalSharp"
					:ios="ellipsisVerticalOutline"
					@click="moreActionSheet"
				></ion-icon>
				More
			</ion-item-option>
		</ion-item-options>
	</ion-item-sliding>
</template>

<script>
import {
	IonItemSliding,
	IonItem,
	IonLabel,
	IonNote,
	IonItemOptions,
	IonItemOption,
	IonIcon,
	actionSheetController,
	alertController,
} from '@ionic/vue';
import {
	trashBinSharp,
	trashBinOutline,
	cubeSharp,
	cubeOutline,
	ellipsisHorizontalSharp,
	ellipsisVerticalOutline,
	shareSocialSharp,
	downloadSharp,
	peopleCircleSharp,
} from 'ionicons/icons';

export default {
	name: 'DeviceSlidingItem',
	props: ['alert'],
	components: {
		IonItemSliding,
		IonItem,
		IonLabel,
		IonNote,
		IonItemOptions,
		IonItemOption,
		IonIcon,
	},
	methods: {
		async confirmDelete(alert) {
			if (alert == null) return;
			const confirm = await alertController.create({
				header: 'Confirm delete',
				subHeader: `Alert #${alert.title}`,
				message:
					'Are you sure you want to delete this alert?<br><strong>THIS CANNOT BE UNDONE</strong>',
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							console.log(`Canceled deletion of alert #${alert.id}`);
						},
					},
					{
						text: 'Delete',
						cssClass: 'button-delete',
						handler: () => {
							console.log(`Confirmed deletion of alert #${alert.id}`);
						},
					},
				],
			});
			return confirm.present();
		},
		async moreActionSheet(alert) {
			if (alert == null) return;
			const actionSheet = await actionSheetController.create({
				header: `Alert #${alert.id}`,
				buttons: [
					{
						text: 'Share',
						icon: shareSocialSharp,
						handler: () => {
							console.log('Clicked share alert');
						},
					},
					{
						text: 'Download',
						icon: downloadSharp,
						handler: () => {
							console.log('Clicked download alert');
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
	},
	setup() {
		return {
			trashBinSharp,
			trashBinOutline,
			cubeSharp,
			cubeOutline,
			ellipsisHorizontalSharp,
			ellipsisVerticalOutline,
		};
	},
};
</script>

<style scoped>
.title {
	position: relative;
	height: 25px;
}
.title > h6 {
	position: absolute;
	left: 0;
}
.title > ion-note {
	position: absolute;
	right: 0;
}
.text {
	text-overflow: ellipsis;
}

.button-delete {
	font-weight: bolder;
	color: red;
	background-color: blue;
}
</style>

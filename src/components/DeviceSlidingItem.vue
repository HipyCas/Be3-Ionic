<template>
	<ion-item-sliding :inset="true">
		<!-- Left side options: Delete (expandable) -->
		<ion-item-options side="start">
			<ion-item-option color="danger" expandable>
				<ion-icon
					slot="top"
					:md="trashBinSharp"
					:ios="trashBinOutline"
				></ion-icon>
				Delete
			</ion-item-option>
		</ion-item-options>
		<!-- Item content -->
		<ion-item :router-link="`/devices/device/${device.id}`">
			<ion-label>
				<h6>{{ device.name }}</h6>
				<p>{{ device.location }}</p>
			</ion-label>
		</ion-item>
		<!-- Right side options: edit + more -->
		<ion-item-options side="end">
			<ion-item-option color="primary">
				<ion-icon slot="top" :md="createSharp" :ios="createOutline"></ion-icon>
				Edit
			</ion-item-option>
			<ion-item-option
				@click="moreActionSheet(device)"
				color="light"
				expandable
			>
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
	IonItemOptions,
	IonItemOption,
    IonIcon,
    actionSheetController
} from '@ionic/vue';
import {
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

export default {
	name: 'DeviceSlidingItem',
	props: ['device'],
	components: {
		IonItemSliding,
		IonItem,
		IonLabel,
		IonItemOptions,
		IonItemOption,
		IonIcon,
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
    },
	setup() {
		return {
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

<style></style>

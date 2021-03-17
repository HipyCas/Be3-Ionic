<template>
	<ion-item-sliding :inset="true">
		<!-- Left side options: Delete (expandable) -->
		<ion-item-options side="start" @ionSwipe="deleteConfirmation(device)">
			<ion-item-option
				@click="deleteConfirmation(device)"
				color="danger"
				expandable
			>
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
		<ion-item-options side="end" @ionSwipe="moreActionSheet(device)">
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
	Plugins,
	FilesystemDirectory,
	FilesystemEncoding,
} from '@capacitor/core';
import {
	IonItemSliding,
	IonItem,
	IonLabel,
	IonItemOptions,
	IonItemOption,
	IonIcon,
	actionSheetController,
	alertController,
	modalController,
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
import PermissionsModal from '../components/PermissionsModal.vue';

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
	data() {
		return {};
	},
	methods: {
		async error(device, e) {
			const alert = await alertController.create({
				header: 'Error sharing',
				subheader: `Device ${device.name}`,
				message: `The following error was risen while sharing the device: ${e}`,
				buttons: ['OK'],
			});
			return alert.present();
		},
		async shareDevice(device) {
			if (device == null) return;
			console.log('Collect plugins');
			const { Filesystem, Share } = Plugins;
			console.log('Starting read...');
			// Read base CACHE directory to see if devices folder exists
			Filesystem.readdir({
				path: '',
				directory: Filesystem.Cache,
			})
				.then((dir) => {
					console.log(`> Checking for dir in dir: ${JSON.stringify(dir)}`);
					for (let i = 0; i < dir.files.length; i++) {
						console.log(`>> Found folder ${dir.files[i]}`);
						if (`devices/` === dir.files[i] || `devices` === dir.files[i])
							return true;
					}
					return false;
				})
				.then((existsDir) => {
					// If devices folder exists
					if (existsDir) {
						console.log('> Directory devices/ exists, so reading');
						Filesystem.readdir({
							path: 'devices/',
							directory: FilesystemDirectory.Cache,
						})
							.then((dir) => {
								for (let i = 0; i < dir.files.length; i++) {
									if (`device-${device.name}.json` === dir.files[i])
										return true;
								}
								return false;
							})
							.then((exists) => {
								if (exists) {
									Filesystem.getUri({
										path: `devices/device-${device.name}.json`,
										directory: FilesystemDirectory.Cache,
									})
										.then((uri) =>
											Share.share({
												title: `Device ${device.name}`,
												text: `Exported device ${device.name} as JSON file`,
												url: uri.uri,
												dialogTitle: `Share device ${device.name}`,
											})
										)
										.catch((e) => this.error(device, e));
								} else {
									Filesystem.writeFile({
										path: `devices/device-${device.name}.json`,
										directory: FilesystemDirectory.Cache,
										encoding: FilesystemEncoding.UTF8,
										data: JSON.stringify(device),
									})
										.then((file) => {
											Share.share({
												title: `Device ${device.name}`,
												//text: `Exported device ${device.name} as JSON file`,
												url: file.uri,
												dialogTitle: `Share device ${device.name}`,
											});
										})
										.catch((e) => this.error(device, e));
								}
							})
							.catch((e) => this.error(device, e));
					} else {
						// If it doesn't
						console.log(
							'> Directory devices does not exist, so creating file recursively'
						);
						Filesystem.writeFile({
							path: `devices/device-${device.name}.json`,
							directory: FilesystemDirectory.Cache,
							encoding: FilesystemEncoding.UTF8,
							data: JSON.stringify(device),
							recursive: true,
						})
							.then((file) => {
								console.log(`>> Sharing file ${JSON.stringify(file)}`);
								Share.share({
									title: `Device ${device.name}`,
									//text: `Exported device ${device.name} as JSON file`,
									url: file.uri,
									dialogTitle: `Share device ${device.name}`,
								});
							})
							.catch((e) => this.error(device, e));
					}
				})
				.catch((e) => this.error(device, e));
		},
		async openPermissions(device) {
			if (device == null) return;
			const modal = await modalController.create({
				component: PermissionsModal,
				swipeToClose: true, //? Revert, may be problematic for updating permissions in store and db
				componentProps: {
					title: `Device ${device.name} Permissions`,
					type: 'device',
					device,
				},
			});
			return modal.present();
		},
		async moreActionSheet(device) {
			if (device == null) return;
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
							this.shareDevice(device);
						},
					},
					{
						text: 'Permissions',
						icon: peopleCircleSharp,
						handler: () => {
							console.log('Clicked permissions');
							this.openPermissions(device);
						},
					},
				],
			});
			return actionSheet.present();
		},
		async deleteConfirmation(device) {
			if (device == null) return;
			const alert = await alertController.create({
				header: 'Confirm Delete',
				subHeader: `Device ${device.name}`,
				message: `Are you sure you want to delete this device?<br><strong>THIS CANNOT BE UNDONE</strong>`,
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							console.log(`Device #${device.id} NOT deleted`);
						},
					},
					{
						text: 'Delete',
						cssClass: 'delete',
						handler: () => {
							console.log(`Device #${device.id} deleted`);
						},
					},
				],
			});
			return alert.present();
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

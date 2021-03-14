<template>
	<ion-header translucent>
		<ion-toolbar>
			<ion-title>{{ title }}</ion-title>
			<ion-button
				@click="dismiss"
				fill="clear"
				slot="end"
				style="margin-right:0.5em"
			>
				Done
			</ion-button>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		<div id="public-link-header">
			<ion-note slot="start">PUBLIC LINK</ion-note>
			<ion-toggle slot="end" v-model="publicLinkEnabled"></ion-toggle>
		</div>
		<div v-if="publicLinkEnabled" style="margin-bottom: 0.5em">
			<ion-item>
				<ion-label position="floating"
					>be3dashboard.com/devices/share/</ion-label
				>
				<ion-input v-model="publicLinkCode"></ion-input>
			</ion-item>
			<ion-button fill="clear" style="margin-top: 0.5em" @click="shareLink()">
				Share
				<ion-icon
					slot="end"
					:md="shareSocialSharp"
					:ios="shareSocialOutline"
				></ion-icon>
			</ion-button>
		</div>
		<ion-note>PEOPLE</ion-note>
		<div style="margin-top: 0.5em">
			<ion-chip v-for="person in people" :key="person.userId">
				<ion-avatar>
					<img
						src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
					/>
				</ion-avatar>
				<ion-label>Person</ion-label>
				<ion-icon
					@click="editPermissions(person)"
					:md="pencilSharp"
					:ios="pencilOutline"
				></ion-icon>
			</ion-chip>
			<ion-chip>
				<ion-label>Add</ion-label>
				<ion-icon :md="addSharp" :ios="addOutline"></ion-icon>
			</ion-chip>
		</div>
	</ion-content>
</template>

<script>
// TODO Add another modal with user info when clicked on user chi

import { Plugins } from '@capacitor/core';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonNote,
	IonToggle,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
	IonIcon,
	IonChip,
	IonAvatar,
	modalController,
} from '@ionic/vue';
import {
	shareSocialSharp,
	shareSocialOutline,
	pencilSharp,
	pencilOutline,
	addSharp,
	addOutline,
} from 'ionicons/icons';

export default {
	name: 'PermissionsModal',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonNote,
		IonToggle,
		IonItem,
		IonLabel,
		IonInput,
		IonButton,
		IonIcon,
		IonChip,
		IonAvatar,
	},
	props: {
		title: {
			type: String,
			default: 'Permissions',
		},
		type: {
			type: String,
			validator(value) {
				return ['device', 'record', 'alert'].indexOf(value) !== -1;
			},
			required: true,
		},
		device: {
			required: false,
		},
		record: {
			required: false,
		},
		alert: {
			required: false,
		},
	},
	data() {
		return {
			people: [],
			publicLinkEnabled: this.device.permissions.url.enabled,
			publicLinkCode: this.device.permissions.url.code,
		};
	},
	methods: {
		async shareLink() {
			const { Share } = Plugins;
			if (this.type === 'device') {
				Share.share({
					title: `Device ${this.device.name} link`,
					text: `Access the Be3 device ${this.device.name} through this link!`,
					url: `https://www.be3dashboard.com/devices/shared/${this.publicLinkCode}`,
					dialogTitle: `Share device ${this.device.name} public link`,
				});
			}
			// TODO Implement other types
		},
		editPermissions(person) {
			console.log(person);
		},
		dismiss() {
			modalController.dismiss();
		},
	},
	setup() {
		return {
			shareSocialSharp,
			shareSocialOutline,
			pencilSharp,
			pencilOutline,
			addSharp,
			addOutline,
		};
	},
	mounted() {
		if (this.type === 'device') this.people = this.device.permissions.people;
	},
};
</script>

<style scoped>
#public-link-header {
	display: flex;
	justify-content: space-between;
	width: 100%;
	justify-items: center;
	align-content: center;
	align-items: center;
}
ion-note {
	font-weight: bolder;
	font-size: 1em;
}
</style>

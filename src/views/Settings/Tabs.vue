<template>
  <ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Settings</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-tabs>
				<ion-tab-bar slot="bottom">
					<ion-tab-button tab="tab1" href="/settings/general">
						<ion-icon
							:md="settingsSharp"
							:ios="settingsOutline"
						/>
						<ion-label>General</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tab2" href="/settings/account">
						<ion-icon :md="personCircleSharp" :ios="personCircleOutline" />
						<ion-label>Account</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tab3" href="/settings/devicesanddata">
						<ion-icon :md="fileTrayFullSharp" :ios="fileTrayFullOutline" />
						<ion-label>Devices and Data</ion-label>
					</ion-tab-button>
				</ion-tab-bar>
			</ion-tabs>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonContent,
	IonLabel,
	IonIcon,
	IonPage,
} from '@ionic/vue';
import {
	settingsSharp,
	settingsOutline,
	personCircleSharp,
	personCircleOutline,
	fileTrayFullSharp,
	fileTrayFullOutline,
} from 'ionicons/icons';

export default {
	name: 'Tabs',
	components: {
		IonHeader,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonTitle,
		IonContent,
		IonLabel,
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonIcon,
		IonPage,
	},
	setup() {
		return {
			settingsSharp,
			settingsOutline,
			personCircleSharp,
			personCircleOutline,
			fileTrayFullSharp,
			fileTrayFullOutline,
		};
	},
};
</script>

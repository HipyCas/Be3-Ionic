<template>
  <ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Data</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-tabs>
				<ion-tab-bar slot="bottom">
					<ion-tab-button tab="tab1" href="/messages/alerts">
						<ion-icon
							:md="pieChartSharp"
							:ios="pieChartOutline"
						/>
						<ion-label>Alerts</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tab2" href="/messages/broadcast">
						<ion-icon :md="hourglassSharp" :ios="hourglassOutline" />
						<ion-label>Broadcast</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tab3" href="/messages/developer">
						<ion-icon :md="shareSharp" :ios="shareOutline" />
						<ion-label>Developer</ion-label>
					</ion-tab-button>
				</ion-tab-bar>
			</ion-tabs>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonContent,
	IonLabel,
	IonIcon,
	IonPage,
} from '@ionic/vue';
import {
	pieChartSharp,
	pieChartOutline,
	hourglassSharp,
	hourglassOutline,
	shareSharp,
	shareOutline,
} from 'ionicons/icons';

export default {
	name: 'Tabs',
	components: {
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
			pieChartSharp,
			pieChartOutline,
			hourglassSharp,
			hourglassOutline,
			shareSharp,
			shareOutline,
		};
	},
};
</script>

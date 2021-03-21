<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-title>Add device</ion-title>
      <ion-note style="margin-left: 1rem"
        >DEVICE ID INCREMENTS BY ONE AUTOMATICALLY</ion-note
      >
      <form @submit.prevent="createDevice()">
        <ion-grid>
          <ion-row>
            <ion-col style="margin-top: 1rem">
              <ion-item>
                <ion-label position="floating">Device name</ion-label>
                <ion-input v-model="name" required></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-title style="margin-top: 2rem; margin-bottom:0.5rem"
            >Location</ion-title
          >
          <ion-row>
            <ion-col size="12" size-md="4">
              <ion-item>
                <ion-label position="floating">Name</ion-label>
                <ion-input v-model="locationName" :required="!coordinatesDefined"></ion-input>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label position="floating">North (Coordinates)</ion-label>
                <ion-input type="number" max="90" min="-90" v-model="locationNorth" :required="!locationNameDefined"></ion-input>
              </ion-item>
              <!--ion-note style="display:inline">N</!--ion-note-->
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label position="floating">West (Coordinates)</ion-label>
                <ion-input type="number" max="90" min="-90" v-model="locationWest" :required="!locationNameDefined"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-title
            style="margin-top: 2rem; margin-bottom:0.5rem"
            id="apiTitle"
            @click="reloadAPI"
            >API Keys & Identifier
            <ion-icon
              v-if="!fromScan"
              :md="reloadSharp"
              :ios="reloadOutline"
            ></ion-icon>
          </ion-title>
          <ion-row>
            <ion-col style="margin-top: 1rem">
              <ion-item>
                <ion-label position="floating">API key</ion-label>
                <ion-input readonly v-model="APIkey"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col style="margin-top: 1rem">
              <ion-item>
                <ion-label position="floating">Short Identifier</ion-label>
                <ion-input
                  maxlength="10"
                  minlength="3"
                  v-model="APIidentifier"
                  readonly
                ></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row style="margin-top: 2rem">
            <ion-col size="12" size-md="4" size-lg="4" size-xl="4">
              <ion-button color="danger" fill="outline" expand="block" router-link="/devices/list"
                >Cancel</ion-button
              >
            </ion-col>
            <ion-col size="12" size-md="8" size-lg="8" size-xl="8">
              <ion-button color="primary" expand="block" type="submit">Save</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
//? Image/Thumbnail field for device?

import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonTitle,
  IonNote,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonButton,
} from '@ionic/vue';
import {
  //? Change by reloadCircle?
  reloadSharp,
  reloadOutline,
} from 'ionicons/icons';

export default {
  name: 'DevicesAdd',
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle,
    IonNote,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      fromScan: false,
			name: '',
			locationName: '',
			locationNorth: '',
			locationWest: '',
      APIkey: 'skdi342343FJFFE45SJasde8234FDsf84hje',
      APIidentifier: 'ji32h',
    };
  },
	computed: {
		coordinatesDefined() {
			return this.locationNorth.length > 0 && this.locationWest.length > 0
		},
		locationNameDefined() {
			return this.locationName.length > 0
		}
	},
  methods: {
    reloadAPI() {
      console.log('reloaded!');
    },
		createDevice() {
			this.name = ''; this.locationName = ''; this.locationNorth = ''; this.locationWest = '';
			console.log('Hey! We cannot create a device yet, wait a bit please! Meanwhile, go back to the dashboard');
			this.$router.push('/devices/list')
		}
  },
  setup() {
    return {
      reloadSharp,
      reloadOutline,
    };
  },
};
</script>

<style scoped>
ion-icon {
  position: absolute;
  right: 1em;
}
</style>

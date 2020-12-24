<template>
    <ion-page>
        <ion-content>
            <ion-card>
                <!--* Card Title: "global" status -->
                <ion-card-header>
                    <!-- If at least one device is offline -->
                    <ion-item v-if="offlineDevices.length > 0" lines="none" :class="{ transparent: isPlatform('ios') }">
                        <ion-icon :md="closeCircleSharp" :ios="closeCircleOutline" slot="start" :class="{ transparent: isPlatform('ios') }"></ion-icon>
                        <ion-card-title :class="{ transparent: isPlatform('ios') }">Some devices are offline!</ion-card-title>
                    </ion-item>
                    <!-- If at least one device is warning, and none offline -->
                    <ion-item v-else-if="warningDevices.length > 0" lines="none" :class="{ transparent: isPlatform('ios') }">
                        <ion-icon :md="alertCircleSharp" :ios="alertCircleOutline" slot="start" :class="{ transparent: isPlatform('ios') }"></ion-icon>
                        <ion-card-title :class="{ transparent: isPlatform('ios') }">You've got some warnings</ion-card-title>
                    </ion-item>
                    <!-- If all devices are online, none device either warning or offline -->
                    <ion-item v-else-if="onlineDevices.length > 0" lines="none" :class="{ transparent: isPlatform('ios') }">
                        <ion-icon :md="checkmarkCircleSharp" :ios="checkmarkCircleOutline" slot="start" :class="{ transparent: isPlatform('ios') }"></ion-icon>
                        <ion-card-title :class="{ transparent: isPlatform('ios') }">Everything OK!</ion-card-title>
                    </ion-item>
                    <!-- If none of the above conditions is true, meaning that there are no registered devices -->
                    <ion-item v-else lines="none" :class="{ transparent: isPlatform('ios') }">
                        <ion-icon :md="addCircleSharp" :ios="addCircleOutline" slot="start" :class="{ transparent: isPlatform('ios') }"></ion-icon>
                        <ion-card-title :class="{ transparent: isPlatform('ios') }">Add a new device!</ion-card-title>
                    </ion-item>
                    <!-- IonNote indicating online devices, coloured by the same conditions as above -->
                    <ion-note v-if="devices.length > 0" :color="devicesStatusColor" style="margin: 5em">{{ onlineDevices.length }}/{{ devices.length }} DEVICES FULLY OPERATIONAL</ion-note>
                    <ion-note v-else style="margin: 5em">GO TO DEVICES/LIST TO ADD YOUR FIRST ONE</ion-note>
                </ion-card-header>
                <ion-card-content>
                    <ion-list :class="{ transparent: isPlatform('ios') }">
                        <ion-list-header>{{ devices.length }} devices configured</ion-list-header>
                        <ion-item :class="{ transparent: isPlatform('ios') }">
                            <ion-icon slot="start" :md="checkmarkCircleSharp" :ios="checkmarkCircleOutline"></ion-icon>
                            <h4 :class="{ transparent: isPlatform('ios') }"> Online: </h4>
                            <ion-badge slot="end" color="success">{{ onlineDevices.length }}</ion-badge>
                        </ion-item>
                        <ion-item :class="{ transparent: isPlatform('ios') }">
                            <ion-icon slot="start" :md="alertCircleSharp" :ios="alertCircleOutline"></ion-icon>
                            <h4> Warning: </h4>
                            <ion-badge slot="end" color="warning">{{ warningDevices.length }}</ion-badge>
                        </ion-item>
                        <ion-item :class="{ transparent: isPlatform('ios') }">
                            <ion-icon slot="start" :md="closeCircleSharp" :ios="closeCircleOutline"></ion-icon>
                            <h4> Offline/Critical Error: </h4>
                            <ion-badge slot="end" color="danger">{{ offlineDevices.length }}</ion-badge>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>            
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardHeader, IonItem, IonIcon, IonCardTitle, IonNote, IonCardContent, IonList, IonListHeader, IonBadge, isPlatform } from '@ionic/vue';
import { checkmarkCircleSharp, checkmarkCircleOutline, alertCircleSharp, alertCircleOutline, closeCircleSharp, closeCircleOutline, addCircleSharp, addCircleOutline, } from 'ionicons/icons';
export default {
    name: 'DevicesStatus',
    components: { IonPage, IonContent, IonCard, IonCardHeader, IonItem, IonIcon, IonCardTitle, IonNote, IonCardContent, IonList, IonListHeader, IonBadge },
    computed: {
        devices () {
            return this.$store.getters.devices;
        },
        onlineDevices () {
            return this.$store.getters.onlineDevices;
        },
        warningDevices () {
            return this.$store.getters.warningDevices;
        },
        offlineDevices () {
            return this.$store.getters.offlineDevices;
        },
        devicesStatusColor () {
            if (this.offlineDevices.length > 0) {
                return 'danger';
            } else if (this.warningDevices.length > 0) {
                return 'warning';
            } else {
                return 'success';
            }
        },
    },
    setup() {
        return {
            isPlatform,
            checkmarkCircleSharp,
            checkmarkCircleOutline,
            alertCircleSharp,
            alertCircleOutline,
            closeCircleSharp,
            closeCircleOutline,
            addCircleSharp,
            addCircleOutline,
        }
    }
}
</script>

<style scoped>
.transparent {
    background-color: rgba(255, 255, 255, 0);
}
</style>

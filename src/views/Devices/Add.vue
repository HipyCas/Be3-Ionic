<template>
    <ion-page>
        <ion-content class="ion-padding">
            <ion-title>Add device</ion-title>
            <ion-note style="margin-left: 1rem">DEVICE ID INCREMENTS BY ONE AUTOMATICALLY</ion-note>
            <ion-item style="margin-top: 1rem">
                <ion-label position="floating">Device name</ion-label>
                <ion-input></ion-input>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonTitle, IonNote, IonItem, IonLabel, IonInput, } from '@ionic/vue';

export default {
    name: 'DevicesAdd',
    components: { IonPage, IonContent, IonTitle, IonNote, IonItem, IonLabel, IonInput, },
    setup () {},
}
</script>

<style>

</style>

<template>
  <ion-page>
    <ion-content>
      <ion-button expand="full" color="primary" @click="startScan()"
        >Start scan</ion-button
      >
      <video width="1000px" height="1000px" ref="video"></video>
      <ion-button
        expand="full"
        color="danger"
        v-if="scanActive"
        @click="stopScan()"
        >Stop scan</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, toastController } from '@ionic/vue';

export default {
  components: { IonPage, IonContent, IonButton },
  data: () => ({
    scanActive: true,
    result: null,
  }),
  methods: {
    async startScan() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      this.$refs.video.srcObject = stream;
      this.$refs.video.setAttribute('playsinline', true);
      this.$refs.video.play();
    },
    stopScan() {
      this.scanActive = false;
    },
    async showQrToast() {
      const toast = await toastController.create({
        message: `Open ${this.result}`,
        position: 'top',
        buttons: [
          {
            text: 'Open',
            handler() {
              window.open(this.result, '_system', 'location=yes');
            },
          },
        ],
      });

      toast.present();
    },
  },
  mounted() {
    console.log(`Print refs: ${JSON.stringify(this.$refs)}`);
  },
};
</script>

<style></style>

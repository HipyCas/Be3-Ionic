<template>
  <ion-page>
    <ion-content>
      <div>
        <h2>{{ deviceFound }}</h2>
        cool
      </div>
      hi
      <!--ion-loading
        :is-open="!loadedDevice"
        :duration="1000"
        message="Loading device..."
        :translucent="true"
      >
      </!--ion-loading-->
      <ion-button @click="loadDevice">load</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, loadingController } from '@ionic/vue';

export default {
  name: 'DevicesDevice',
  components: { IonPage, IonContent },
  data() {
    return {
      deviceId: this.$route.params.id,
    };
  },
  computed: {
    loadedDevice() {
      console.log(`Id ${this.deviceId}`);
      return this.$store.getters.device(this.deviceId);
    },
    deviceName() {
      return this.loadedDevice?.name ?? '';
    },
    deviceFound() {
      return this.loadedDevice === undefined
        ? 'Device not found'
        : `Device ${this.loadedDevice.name}`;
    },
  },
  methods: {
    async loadDevice() {},
  },
  watch: {
    $route(currentRoute) {
      this.deviceId = currentRoute.params.id;
      console.log(this.deviceId);
    },
  },
  async mounted() {
    const loading = await loadingController.create({
      message: 'Loading device',
      duration: 10000,
    });

    await loading.present();

    this.$store.getters.device(this.deviceId).then(() => loading.dismiss());
  },
};
</script>

<style></style>

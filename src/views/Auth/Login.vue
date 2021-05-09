<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <ion-card>
          <ion-card-header>
            <ion-item class="ion-no-padding" lines="none">
              <ion-item slot="start" class="ion-no-padding" lines="none">
                <ion-thumbnail>
                  <ion-img :src="Icon" height="10px"></ion-img>
                </ion-thumbnail>
                <ion-card-title class="ion-margin"
                  >Be3 Dashboard</ion-card-title
                >
              </ion-item>
              <ion-icon
                slot="end"
                :md="helpCircleSharp"
                :ios="helpCircleOutline"
              ></ion-icon>
            </ion-item>
            <ion-card-subtitle style="margin-bottom: 1em"
              >Login with a subscribed account to continue</ion-card-subtitle
            >
            <ion-note
              style="margin-top: 1.5em"
              color="danger"
              v-if="errorMsg.length > 0"
              class="ion-text-uppercase"
              >{{ errorMsg }}</ion-note
            >
          </ion-card-header>
          <ion-card-content>
            <form>
              <ion-item>
                <ion-label position="floating">* Email (verified)</ion-label>
                <ion-input
                  @input="firstEmailInput = true"
                  type="email"
                  v-model="email"
                  autocomplete="email"
                  inputmode="email"
                  :pattern="emailPattern"
                  required
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">* Password</ion-label>
                <ion-input
                  @input="firstPasswordInput = true"
                  type="password"
                  v-model="password"
                  required
                ></ion-input>
              </ion-item>
              <ion-button
                @click="loginUser"
                action="submit"
                expand="block"
                style="margin-top: 1.2em"
                ><span v-if="!loading">Login</span>
                <ion-spinner v-if="loading"></ion-spinner
              ></ion-button>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
// TODO Open modal with help options (email, documentation, different links to different stuff in docs), or maybe popover, when help icon clicked

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonThumbnail,
  IonImg,
  IonCardTitle,
  IonIcon,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonButton,
  IonSpinner,
} from '@ionic/vue';
import { helpCircleSharp, helpCircleOutline } from 'ionicons/icons';
import { login } from '../../composables/auth';
import Icon from '../../../public/assets/icon/icon.png';
import { supabase } from '../../composables/supabase';

export default {
  name: 'AuthLogin',
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonThumbnail,
    IonImg,
    IonCardTitle,
    IonIcon,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonNote,
    IonButton,
    IonSpinner,
  },
  data() {
    return {
      Icon,

      helpCircleSharp,
      helpCircleOutline,

      email: '',
      password: '',
      loading: false,
      errorMsg: '',
      firstEmailInput: false,
      emailPattern:
        "^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
      firstPasswordInput: false,
    };
  },
  computed: {
    emailColor() {
      if (this.firstEmailInput)
        return this.email.length > 0 ? 'success' : 'danger';
      return 'primary';
    },
    passwordColor() {
      if (this.firstPasswordInput)
        return this.password.length > 0 ? 'success' : 'danger';
      return 'primary';
    },
  },
  methods: {
    async loginUser() {
      this.loading = true;
      this.errorMsg = '';
      if (this.email.length > 0) {
        // && this.password.length > 0) {
        if (!RegExp(this.emailPattern).test(this.email)) {
          this.errorMsg = 'INVALID EMAL';
          this.loading = false;
          return;
        }
        login(this.email, this.password)
          .then(() => {
            console.info("I'm gonna redirect you boy");
            this.$router.push('/overview');
          })
          .catch(e => {
            console.log('Catch this: ', e);
            this.errorMsg = e.message;
          });
      } else if (this.email.length > 0) {
        this.errorMsg = 'PASSWORD IS REQUIRED';
      } else if (this.password.length > 0) {
        this.errorMsg = 'EMAIL IS REQUIRED';
      } else {
        this.errorMsg = 'EMAIL AND PASSWORD ARE REQUIRED';
      }
      this.loading = false;
    },
  },
  mounted() {
    console.info('User: ', supabase.auth.user());
  },
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

ion-card-title {
  font-size: 24px;
}
</style>

<template>
    <div id="container">
        <strong>{{ title }}</strong><br>
        <ion-note>{{ text }}</ion-note>
    </div>
</template>

<script>
import { IonNote, } from '@ionic/vue';

export default {
    name: 'FullPageText',
    props: ['title', 'text'],
    components: { IonNote, },
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}
</style>

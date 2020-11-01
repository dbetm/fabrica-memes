import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'
import router from './routes/index'

Vue.config.productionTip = false

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config)
firebase.analytics()
// Enable firestore and the bucket
export const firestore = firebaseApp.firestore()
export const storage = firebase.storage().ref('/images')

Vue.use(firestorePlugin)

new Vue({
  render: h => h(App),
  vuetify,
  router,
  components: { App }
}).$mount('#app')

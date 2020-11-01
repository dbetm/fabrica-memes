<template>
    <v-container>
      <v-layout xs12 pl-2>
        <v-flex xs12 sm6 md6 lg6>
          <v-card>
            <v-img
              class = "white--text"
              :src="image.url"
              height="200px"
            ></v-img>
            <v-card-title>
              <div>
                <span class="grey--text">{{ image.name }}</span>
                <v-chip :color="selectClass">{{ image.scorePromedio }}</v-chip>
                <br>
                <span><strong>Análisis:</strong><br> {{ image.labels | separateLabels }}</span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-text-field
            label="¿Qué te parece esta foto?"
            v-model="comentario">
          </v-text-field>
          <v-layout>
            <v-layout>
              <v-flex xs12 pt-5>
                <v-btn primary @click="enviarComentario">Enviar</v-btn>
              </v-flex>
            </v-layout>
            <v-flex>
              <br>
              <h1>Otros comentarios</h1>
            </v-flex>
          </v-layout>
          <v-layout v-for="comentario in comentarios" v-bind:key="comentario.id">
            <v-flex xs12>
              <v-text-field :value="comentario.texto">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { firestore } from'@/main'
//import { storage } from '@/main'

export default {
  name: 'ImageDetail',
  data() {
    return {
      id: this.$route.params.id,
      image: '',
      comentario: '',
      comentarios: []
    }
  },
  methods: {
    enviarComentario: function() {
      let comentario = {
        imageId: this.id,
        texto: this.comentario,
        createdAt: (+new Date()),
        score: 0
      }
      firestore.collection('comentarios').add(comentario)
    }
  },
  firestore() {
    return {
      image: firestore.collection('images').doc(this.id),
      comentarios: firestore.collection('comentarios').where("imageId", "==", this.id)
    }
  },
  filters: {
    separateLabels: function(value) {
      return `${value[0]}, ${value[1]}, ${value[2]}`
    }
  }
}
</script>

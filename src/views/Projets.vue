<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.jpg" id="vue-logo">
      <h2>Belombre<span style="font-weight : 300">Hand</span>Made</h2>
      <div class="form">
        <label for="title">Titre du projet</label>
        <input placeholder="Ajouter ici..." type="text" v-model="titre" /> 
      </div>
      
      <div class="form">
        <label for="title"  >Description du projet</label>
        <textarea id="w3review" name="w3review" rows="4" cols="42" v-model="message"></textarea>
      </div>
      
      <div class="form">
        <label for="title">Lien du projet</label>
        <input placeholder="https://..." type="text" v-model="lien" />
      </div>

      <div class="button" @click.prevent.stop="addToDo">Add</div>

      <div v-if="errors !== ''" id="errors">{{ errors }}</div>

    <div class="liste" v-if="this.$store.getters.getProjets && this.$store.getters.getProjets.length > 0">
      <div class="title">Projets</div>

      <div class="itemProjet" v-for="item in this.$store.getters.getProjets" :key="item.id">
        <h4 class="item-text">{{ item.title }}</h4>
        <p>{{ item.message }}</p>
        <a class="link" :href="item.lien">lien projet</a>
        <p class="time">créé le : {{ item.created_at | heure(item.created_at) }}</p>
        <button class="deleteBtn" @click="deleteItemProjet(item.id)"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'projets',
  beforeCreate: function () {
    this.$store.dispatch('setProjets')
  },
  data: function () {
    return {
      titre: '',
      message: '',
      lien: '',
      errors: ''
    }
  },
  filters:{
      heure(value) {
        let time = new Date(value);
     // return time.getDay()+"/"+time.getMonth()+"/"+time.getYear()+" à "+time.getHours()+":"+time.getMinutes()
      return time.toLocaleString('fr-FR')
      }
  },
  methods: {
    addToDo: function () {
      this.errors = ''

      if (this.myTodo !== '') {
        db.collection('projets').add({
          title: this.titre,
          message: this.message,
          lien: this.lien,
          created_at: Date.now()
        }).then((response) => {
          if (response) {
            this.titre = ""
            this.message = ""
            this.lien = ""
          }
        }).catch((error) => {
          this.errors = error
        })
      } else {
        this.errors = 'Merci de bien définir le projet ci dessus'
      }
    },
    deleteItemProjet: function (id) {
      if (id) {
        db.collection("projets").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            this.errors = error
        })
      } else {
        this.error = 'Invalid ID'
      }
    }
  }
}
</script>

<style scoped>
:root {
  --color: ;
}


* {
  box-sizing:border-box;
}



.home {
  max-width:600px;
  padding: 0 .5rem;
  margin:auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#vue-logo {
  width:170px;
}

button {
  border:transparent;
  width:100%;
  margin:0 0 10px;
  padding:7px;
}
input[type=text], textarea {
  width: 100%;
  padding: 10px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: rgba(15, 150, 150, 0.2);
}
input {
  font-size:12px;
}
.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: .5rem;
}
p{
  text-align: start;
}

.button {
  width: 50%;
  height: 2rem;
  background:#0F9696;
  border:1px solid transparent;
  text-transform:uppercase;
  color:#fff;
  font-weight:700;
  cursor: pointer;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deleteBtn{
  position: relative;
  bottom: 10px;
  left: 93%;


  background:white;
  border: 1px solid rgba(173, 15, 15, .8) ;
  border-radius: 15px;
  text-transform:uppercase;
  color:#fff;
  font-weight:600;
  font-size: 1.rem;
  cursor:pointer;
  width: 9%;
  height: 1.5rem;
  padding: .2rem 0;
  margin: 0;
}
.deleteBtn::before{
  content:"x";
  position: relative;
  top: 50%;
  bottom: 50%;
  color:rgba(173, 15, 15, .8) ;

}
.deleteBtn:hover::before {
  color: white;
}
.deleteBtn:hover{
  background-color: rgba(173, 15, 15, .8);
  color:white;
}
.title {
  margin: 2rem 0;
  font-size:14px;
  font-weight:700;
  padding-bottom: .5rem;
 
  border-bottom:1px solid #0F9696;
}
.liste{
  width: 100%;
}
.itemProjet:nth-child(odd) {
  background: rgba(15, 150, 150, 0.2);
}
.itemProjet{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  border: 1px solid black;
  border-radius: 15px;
  padding: 0 1rem;
  margin: 1rem 0;

}
.item-text{
  
  text-align: center;
  width: 100%;
}
.time{
  font-size: .8rem;
}
.link{
  padding: .3rem .9rem;
  text-decoration: none;
  font-size: .85rem;
  text-transform: capitalize;
  border: 1px solid #0F9696;
  border-radius: 5px;
  color:#0F9696 ;
  background-color: white;
}
#errors {
  background:#a52222;
  color:#fff;
  padding:5px;
}
</style>
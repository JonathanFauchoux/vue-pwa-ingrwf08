<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.jpg" id="vue-logo">
      <h2>Belombre<span style="font-weight : 300">Hand</span>Made</h2>
      <input placeholder="Ajouter ici..." type="text" v-model="myTodo" /><div class="button" @click.prevent.stop="addToDo">Add</div>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>

    <div class="liste" v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
      <div class="title">Todo Projet & Achat</div>

      <div class="item" v-for="item in this.$store.getters.getItems" :key="item.id">
        <h5 class="item-text">{{ item.title }}</h5>
        <button class="deleteBtn" @click="deleteItem(item.id)"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'Home',
  beforeCreate: function () {
    this.$store.dispatch('setItems')
  },
  data: function () {
    return {
      myTodo: '',
      errors: ''
    }
  },
  methods: {
    addToDo: function () {
      this.errors = ''

      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now()
        }).then((response) => {
          if (response) {
            this.myTodo = ''
          }
        }).catch((error) => {
          this.errors = error
        })
      } else {
        this.errors = 'Merci de bien définir la tâche ci dessus'
      }
    },
    deleteItem: function (id) {
      if (id) {
        db.collection("items").doc(id).delete().then(function() {
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

<style>
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
input[type=text] {
  width: 100%;
  padding: 10px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: rgba(14, 140, 140, 0.2);
}
input {
  font-size:12px;
}

.button {
  width: 50%;
  height: 2rem;
  background:#0E8C8C;
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
 
  border-bottom:1px solid #666;
}
.liste{
  width: 100%;
}
.item{
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border: 1px solid black;
  border-radius: 15px;
  padding: 0 .5rem;
  margin: 1rem 0;

}
.item:nth-child(odd) {
  background: rgba(15, 150, 150, 0.2);
}
.item-text{
  padding: 0 1rem;
  text-align: start;
  width: 85%;
}
#errors {
  background:#a52222;
  color:#fff;
  padding:5px;
}
</style>
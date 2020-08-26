<template>
  <div class="installBtn">
   <a href="#" @click.prevent="install()">Install App</a>
  </div>
</template>

<script>
export default {
  name: 'InstallBtn',
  data(){
    return{
      show :true,
      defferedPromt:null,
      installBtn : document.querySelector('.install')
    }
  },
  methods:{
    install(){

      //installBtn.style.display ="none"
      this.show =false
      this.defferedPromt.prompt()

      this.defferedPromt.userChoice.then(choiceResult => {
      if(choiceResult.outcome === 'accepted'){
      console.log(('installation réussie'))
      }else{
      console.log(('installation refusée'))
      }
      this.defferedPromt
      })
    }
  },
  created(){
    
   
    window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    this.defferedPromt = e
    //installBtn.style.display = "block"
})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

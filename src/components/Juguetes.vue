<template>
<div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
          <div v-if="showSuccess" class="alert alert-success" role="alert">
            Juguete {{selected ? "editado" : "Guardado"}} correctamente
        </div>
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row" v-if="!selected">
                <label for="name" class="col-md-4 col-form-label text-md-right">Codigo</label>

                <div class="col-md-6" >
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    name="Codigo"
                    value
                    required
                    autofocus
                    v-model="form.codigo"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Nombre</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="text"
                    class="form-control"
                    name="Nombre"
                    value
                    required
                    autofocus
                    v-model="form.nombre"
                  />
                </div>
              </div>
              <div class="form-group row" >
                <label for="email" class="col-md-4 col-form-label text-md-right">Stock</label>

                <div class="col-md-6">
                  <input
                  
                    id="email"
                    type="number"
                    class="form-control"
                    name="Stock"
                    value
                    required
                    autofocus
                    v-model="form.stock"
                  />
                </div>
              </div>
              <div class="form-group row"  >
                <label for="email" class="col-md-4 col-form-label text-md-right">Precio</label>

                <div class="col-md-6">
                  <input
                   
                    id="email"
                    type="number"
                    class="form-control"
                    name="Precio"
                    value
                    required
                    autofocus
                    v-model="form.precio"
                  />
                </div>
              </div>

           

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="button" class="btn btn-secondary" v-if="selected"  v-on:click="canceleditar()">Cancelar</button>
                  <button type="submit" class="btn btn-primary">{{selected ? "Guardar" : "Crear"}}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div>
        <!-- <ul id="example-1">
        <li v-for="juguete in juguetes" v-bind:key="juguete.id">
            {{ juguete.name }}
        </li>
    </ul> -->
  <b-card title="Juguete" sub-title="Caracteristicas " v-for="juguete in juguetes" v-bind:key="juguete.id">
    <b-card-text>
 Codigo :{{juguete.juguete.codigo}} <em> Nombre :{{juguete.juguete.nombre}}</em> Stock: {{juguete.juguete.stock}}
    </b-card-text>

    <b-card-text> Precio ${{juguete.juguete.precio}}</b-card-text>

     <b-button variant="outline-primary" v-on:click="editar(juguete)">Editar</b-button>
    <b-button variant="danger" v-on:click="confirmborrar(juguete.id)">Borrar</b-button>
  </b-card>
</div>
  </div>
</template>


<script>
import firebase from "firebase";
import { mapGetters } from "vuex";


export default {
    computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  data() {
    return {
      form: {
        codigo: "",
        nombre: "",
        stock: "",
        precio:"",

      },
      selected:"",
      juguetes:[],
      showSuccess:false,
      error: null
    };
  },
  mounted(){
      if(this.$store.getters.user.loggedIn){
          this.loadData()
      }else{
           this.$router.replace({ name: "login" });
        
      }
      
  },
  methods: {
    submit() {
        console.log(firebase)
        console.log(this.form.codigo)
      const db = firebase.firestore();
      if (this.selected){
                     var retVal = confirm("¿seguro que quieres editar bb <3 :3 ?");
               if( retVal == true ) {
                    db
        .collection('juguetes')
        .doc(this.selected)
        .set(this.form)
        .then( ()   => {
           this.showSuccess = true;
           this.selected="";
           this.loadData();
           this.form = {
        codigo: "",
        nombre: "",
        stock: "",
        precio:"",
};
        });;
                  
                  return true;
               } else {
                  
                  return false;
               }
          
      }else{
            db
        .collection('juguetes')
        .doc()
        .set(this.form)
        .then( ()   => {
           this.showSuccess = true;
           this.selected="";
           this.loadData();
           this.form = {
        codigo: "",
        nombre: "",
        stock: "",
        precio:"",
};
        });
      }
       
    },

    canceleditar: function (){
this.selected = ""
  this.form = {
        codigo: "",
        nombre: "",
        stock: "",
        precio:"",
};
    },
    editar: function(juguete){
        this.selected = juguete.id
        this.form = juguete.juguete
        this.showSuccess=false;
        
    },
    loadData(){
        const db = firebase.firestore();
        db.collection('juguetes')
            .get()
            .then(snap => {
                const testCollection = [];
                snap.forEach(doc => {
                    testCollection.push({juguete: doc.data(),id:doc.id});
                });
                this.juguetes = testCollection;
    })
    },
    confirmborrar:function (id) {
               var retVal = confirm("¿seguro que quieres borrar?");
               if( retVal == true ) {
                  this.borrar(id);
                  return true;
               } else {
                  
                  return false;
               }
            },
    
      borrar: function(id){
      const db = firebase.firestore();
      db.collection('juguetes').doc(id).delete()
      .then( ()   => {
          console.log('borrar')
          this.loadData();
          this.selected="";
          this.form="";
          this.form = {
        codigo: "",
        nombre: "",
        stock: "",
        precio:"",
};
           
  })},
  

  },

}
</script>
<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <vue-snotify></vue-snotify>

            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card-group mb-0">
                        <div class="card p-4">
                            <div class="card-body">
                                <h1>SSPE</h1>
                                <p class="text-muted">Login | Ingrese usuario y contraseña</p>
                                <div class="input-group mb-3">
                                    <span class="input-group-addon"><i class="icon-user"></i></span>
                                    <input type="text" class="form-control" v-model="username"  placeholder="Usuario">
                                </div>
                                <div class="input-group mb-4">
                                    <span class="input-group-addon"><i class="icon-lock"></i></span>
                                    <input type="password" class="form-control" v-on:keyup.enter="login" v-model="password"
                                           placeholder="Contraseña">
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <button type="button" v-on:click="login" class="btn btn-primary px-4">Ingresar
                                        </button>

                                    </div>
                                    <div class="col-6 text-right">
                                        <button type="button" class="btn btn-link px-0">¿Olvido su contraseña?</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="card text-white  py-5 d-md-down-none" style="width:44%; background-color: #f2f2f2">
                            <div class="card-body text-center">
                                <div>

                                    <img src="/static/img/logo.png" width="250"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal title="Error" v-model="myModal" @ok="myModal = false">
                {{mensajeError}}
            </b-modal>
        </div>

    </div>

</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Snotify, { SnotifyPosition } from 'vue-snotify'

  const options = {
    toast: {
      position: SnotifyPosition.rightCenter
    }
  }
  Vue.use(Snotify, options)

  export default {
    name: 'Login',
    data () {
      return {
        usuario: '',
        token: null,
        username: '',
        password: '',
        localstorage: '',
        id: null,
        myModal: false,
        mensajeError: ''
      }
    },
    methods: {
      login () {
        this.$Progress.start()
        var vm = this
        if (this.username !== '' && this.password !== '') {
          axios.post('http://sspe.planificacion.gob.bo/backend/auth/login',
            JSON.stringify({username: this.username, password: this.password})
          ).then((response) => {
            const data = response.data
            if (data.res === 'success') {
              localStorage.setItem('token', data.token)
              localStorage.setItem('usuario', data.usuario.username)
              localStorage.setItem('foto', data.usuario.foto)
              this.$Progress.finish()
              vm.$router.push('/dashboard')
            } else {
              this.mensajeError = data.res
              vm.$snotify.warning(this.mensajeError, 'Error')
              this.$Progress.fail()
            }
          })
        } else {
          vm.$snotify.error('Ingreso usuario y contraseña', 'Error')
          this.$Progress.fail()
        }
      },
      getToken () {
        if (this.localstorage != null) {
          axios.get('http://sspe.planificacion.gob.bo/backend/auth/consumir?token=' + localStorage.getItem('token'),
            {
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }).then((response) => {
            this.token = response.data
            alert(this.token)
            localStorage.setItem('token', this.token)
          })
          alert(this.localstorage)
        }
      }
    }
  }
</script>
<style >
    @import "~vue-snotify/styles/material.css";
</style>
<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-lg-6">
                <button v-on:click="usuarios">Cargar </button>
                <button v-on:click="getProyectos">Cargar Proyectos</button>
                <v-select label="nombres" multiple :options="options"></v-select>
                <input v-model="selected">
                <b-card header="<i class='fa fa-align-justify'></i> USUARIOS">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Date registered</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="u in usuario">
                            <td>{{u.id}}</td>
                            <td>{{u.nombres}}</td>
                            <td>{{u.apellidos}}</td>
                            <td>
                                <button v-on:click="editar(u.id)">Editar</button>
                            </td>

                        </tr>
                        </tbody>
                    </table>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </b-card>
            </div><!--/.col-->
        </div>
        <div class="row">
            <div class="col-lg-6">
                <b-card header="<i class='fa fa-align-justify'></i> Simple Table">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Date registered</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Samppa Nori</td>
                            <td>2012/01/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Estavan Lykos</td>
                            <td>2012/02/01</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-danger">Banned</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Chetan Mohamed</td>
                            <td>2012/02/01</td>
                            <td>Admin</td>
                            <td>
                                <span class="badge badge-secondary">Inactive</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Derick Maximinus</td>
                            <td>2012/03/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-warning">Pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Friderik Dávid</td>
                            <td>2012/01/21</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </b-card>
            </div><!--/.col-->

            <div class="col-lg-6">
                <b-card header="<i class='fa fa-align-justify'></i> Striped Table">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Date registered</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Yiorgos Avraamu</td>
                            <td>2012/01/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Avram Tarasios</td>
                            <td>2012/02/01</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-danger">Banned</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Quintin Ed</td>
                            <td>2012/02/01</td>
                            <td>Admin</td>
                            <td>
                                <span class="badge badge-secondary">Inactive</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Enéas Kwadwo</td>
                            <td>2012/03/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-warning">Pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Agapetus Tadeáš</td>
                            <td>2012/01/21</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->

        <div class="row">

            <div class="col-lg-6">
                <b-card header="<i class='fa fa-align-justify'></i> Condensed Table">
                    <table class="table table-sm">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Date registered</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Carwyn Fachtna</td>
                            <td>2012/01/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Nehemiah Tatius</td>
                            <td>2012/02/01</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-danger">Banned</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Ebbe Gemariah</td>
                            <td>2012/02/01</td>
                            <td>Admin</td>
                            <td>
                                <span class="badge badge-secondary">Inactive</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Eustorgios Amulius</td>
                            <td>2012/03/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-warning">Pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Leopold Gáspár</td>
                            <td>2012/01/21</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </b-card>
            </div><!--/.col-->

            <div class="col-lg-6">
                <b-card header="<i class='fa fa-align-justify'></i> Bordered Table">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Date registered</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Pompeius René</td>
                            <td>2012/01/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Paĉjo Jadon</td>
                            <td>2012/02/01</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-danger">Banned</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Micheal Mercurius</td>
                            <td>2012/02/01</td>
                            <td>Admin</td>
                            <td>
                                <span class="badge badge-secondary">Inactive</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Ganesha Dubhghall</td>
                            <td>2012/03/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-warning">Pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Hiroto Šimun</td>
                            <td>2012/01/21</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </b-card>

            </div><!--/.col-->
        </div><!--/.row-->

        <div class="row">
            <div class="col-12">
                <b-card header="<i class='fa fa-align-justify'></i> Combined All Table">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Date registered</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Vishnu Serghei</td>
                            <td>2012/01/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Zbyněk Phoibos</td>
                            <td>2012/02/01</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-danger">Banned</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Einar Randall</td>
                            <td>2012/02/01</td>
                            <td>Admin</td>
                            <td>
                                <span class="badge badge-secondary">Inactive</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Félix Troels</td>
                            <td>2012/03/01</td>
                            <td>Member</td>
                            <td>
                                <span class="badge badge-warning">Pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Aulus Agmundr</td>
                            <td>2012/01/21</td>
                            <td>Staff</td>
                            <td>
                                <span class="badge badge-success">Active</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <nav>
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                            <li class="page-item active">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->
    </div>

</template>

<script>
  import axios from 'axios'
  import vSelect from 'vue-select'

  export default {
    name: 'tables',
    components: {
      vSelect
    },
    data () {
      return {
        usuario: null,
        selected: null,
        options: [],
        token: null,
        res: null,
        logged: false,
        listaProyectos: null
      }
    },
    mounted () {
      this.validarToken()
    },
    methods: {
      usuarios () {
        axios.get('http://oficina.localhost/auth/usuarios').then(
          (response) => {
            this.usuario = response.data.usuarios
            this.options = response.data.usuarios
          }
        )
      },
      proyectos () {
        if (this.validarToken()) {
          alert('token valido')
        } else {
          alert('token No valido')
        }
      },
      editar (id) {
        alert(id)
      },
      getProyectos () {
        var vm = this
        axios.get('http://oficina.localhost/auth/proyectos?token=' + localStorage.getItem('token')).then(
          (response) => {
            this.res = response.data.res
            if (this.res !== null && this.res === 'success') {
              this.token = response.data.token
              this.listaProyectos = response.data.proyectos
              localStorage.setItem('token', this.token)
              this.logged = true
            } else {
              vm.$router.push('/pages/login')
            }
          }
        ).catch(function (error) {
          console.log(error)
          vm.$router.push('/pages/login')
        })
      },
      validarToken () {
        this.token = localStorage.getItem('token')
        if (this.token !== null) {
          axios.get('http://oficina.localhost/auth/verifica?token=' + this.token).then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                this.token = response.data.token
                localStorage.setItem('token', this.token)
                this.logged = true
              } else {
                this.logged = false
              }
            }
          ).catch(function (error) {
            console.log(error)
            this.logged = false
          })
        } else {
          this.logged = false
        }
      }
    }
  }
</script>

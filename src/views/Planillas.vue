<template>
    <div class="animated fadeIn">
        <div class="row">
                <b-form-fieldsets
                        label="Beneficiario"
                        class="col-md-3"
                        :label-cols="1">
                    <b-form-input type="text" v-model="ci"
                                  placeholder="C.I."></b-form-input>
                </b-form-fieldsets>
                <b-form-fieldset
                        label=""
                        class="col-md-3"
                        :label-cols="2">
                    <b-button type="submit" @click="buscarBeneficiario" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i>
                        Buscar
                    </b-button>
                    <b-button type="reset" size="sm"><i class="fa fa-ban"></i> Reset
                </b-button>
                </b-form-fieldset>
            <b-form-fieldset
                        label=""
                        class="col-md-3"
                        :label-cols="1">

                </b-form-fieldset>
        </div>
        <div class="row">
            <div class="col-md-6">
                <b-card>
                    <div slot="header">
                        <strong>Registro de  Planilla</strong> Empleados
                    </div>
                    <b-form-fieldset
                            label="Beneficiario"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="nombre" disabled ></b-form-input>
                    </b-form-fieldset>

                    <b-form-fieldset
                            label="Programa"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="email" v-model="programa" disabled></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Salario Mensual Bs"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="sueldo"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Nro Pago"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="nro_planilla"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Rango de fecha para el calculo"
                            :horizontal="true"
                            :label-cols="3">
                        <date-picker v-model="fechas" :first-day-of-week="1" lang="es" format="dd-MM-yyyy" v-on:blur="calcular" range :shortcuts="shortcuts"></date-picker>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Dias Trabajados"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="dias_trabajados"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Monto pagado a AFP"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="monto_afp"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Monto pagado a la Caja"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="monto_caja"></b-form-input>
                    </b-form-fieldset>

                    <div slot="footer">
                        <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                        <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                    </div>
                </b-card>

            </div>
            <div class="col-md-6">
                <b-card>
                    <div slot="header">
                        <strong>Empresa</strong> Empleadora
                    </div>
                    <b-form-fieldset
                            label="EMPRESA"

                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="empresa" placeholder="Enter Email.."></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="NIT"

                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="nit" placeholder=""></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="BANCO"

                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="banco" placeholder=""></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="NRO CUENTA"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="nro_cuenta" placeholder=""></b-form-input>
                    </b-form-fieldset>
                   </b-card>
                <b-card>
                    <div slot="header">
                        <strong>Adjuntos</strong> Respaldos
                    </div>
                    <input id="my_file" type="file" @change="update($event)" ref="fileInput">


                    <template>
                        <vue-clip :options="options" class="uploader">
                            <template slot="clip-uploader-action">
                                <div class="uploader-action">
                                    <div class="dz-message">Click or Drag and Drop files here upload </div>
                                </div>
                            </template>

                            <template slot="clip-uploader-body" scope="props">
                                <div v-for="file in props.files">
                                    <img v-bind:src="file.dataUrl" />
                                    {{ file.name }} {{ file.status }}
                                </div>
                            </template>

                        </vue-clip>
                    </template>
                    <b-form-fieldset
                            label="AFP"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-file :plain="true"></b-form-file>
                    </b-form-fieldset>

                    <b-form-fieldset
                            label="PLANILLA DE ATRASOS"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-file :plain="true"></b-form-file>
                    </b-form-fieldset>
                    <div slot="footer">
                        <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                        <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                    </div>
                </b-card>
                <b-card :no-block="true">
                    <div slot="header">
                        Input <strong>Grid</strong>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <div class="col-sm-3">
                                <b-form-input type="text" placeholder=".col-sm-3"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-4">
                                <b-form-input type="text" placeholder=".col-sm-4"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-5">
                                <b-form-input type="text" placeholder=".col-sm-5"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <b-form-input type="text" placeholder=".col-sm-6"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-7">
                                <b-form-input type="text" placeholder=".col-sm-7"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-8">
                                <b-form-input type="text" placeholder=".col-sm-8"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-9">
                                <b-form-input type="text" placeholder=".col-sm-9"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <b-form-input type="text" placeholder=".col-sm-10"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-11">
                                <b-form-input type="text" placeholder=".col-sm-11"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <b-form-input type="text" placeholder=".col-sm-12"></b-form-input>
                            </div>
                        </div>
                    </div>
                    <div slot="footer">
                        <b-button type="submit" size="sm" variant="primary"><i class="fa fa-user"></i> Login</b-button>
                        <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                    </div>
                </b-card>
                <b-card>
                    <div slot="header">
                        Input <strong>Sizes</strong>
                    </div>
                    <b-form-fieldset
                            label="Small input"
                            :label-cols="5"
                            :horizontal="true">
                        <b-form-input type="text" size="sm" placeholder="size='sm'"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Normal  input"
                            :label-cols="5"
                            :horizontal="true">
                        <b-form-input type="text" placeholder="normal"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Large input"
                            :label-cols="5"
                            :horizontal="true">
                        <b-form-input type="text" size="lg" placeholder="size='lg'"></b-form-input>
                    </b-form-fieldset>
                    <div slot="footer">
                        <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                        <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                    </div>
                </b-card>
                <b-card :no-block="true">
                    <div slot="header">
                        <strong>Validation states</strong> Form
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-form-control-label" for="inputSuccess1">Input with success</label>
                            <input type="text" class="form-control is-valid" id="inputSuccess1">
                        </div>
                        <div class="form-group">
                            <label class="form-form-control-label" for="inputError1">Input with error</label>
                            <input type="text" class="form-control is-invalid" id="inputError1">
                            <div class="invalid-feedback">
                                Please provide a valid informations.
                            </div>
                        </div>
                    </div>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->
        <div class="row">
            <div class="col-md-12">
                <div class="card card-accent-primary card-header-inverse">
                    <div class="card-header">
                        <h3>Lista de Beneficiarios ( {{total}} )</h3>

                    </div>
                    <div class="card-body">

                        {{fechas}}
                        <table class="table-sm mb-0 table b-table table-hover table-responsive">
                            <thead>
                            <tr>
                                <th>Beneficiario</th>
                                <th>C.I.</th>
                                <th>Cuidad</th>
                                <th>Empresa</th>
                                <th>Sueldo</th>
                                <th>Fecha Nacimiento.</th>
                                <th>Edad</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="documento in documentos">
                                <td>
                                    <div>
                                        {{documento.nombres}} {{documento.paterno}} {{documento.materno}}
                                        <div class="small text-muted"><strong>{{documento.ci}}</strong></div>
                                    </div>
                                </td>
                                <td>
                                    <div>{{documento.ci}}</div>
                                    <div class="small text-muted"><strong>{{documento.cite_original}}</strong></div>
                                </td>
                                <td>
                                    <div>{{documento.cuidad}}</div>
                                    <div class="small text-muted"><strong>{{documento.direccion}}</strong></div>
                                </td>

                                <td>
                                    <div class="small text-muted">
                                        {{documento.empresa}}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{documento.sueldo}}
                                    </div>
                                </td>
                                <td>
                                    <div>{{documento.fecha_nacimiento}}</div>
                                    <div class="small text-muted">
                                        {{documento.edad}} años
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary">Edit</button>
                                    <button class="btn btn-sm btn-success">Plan</button>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        <div>
                            <paginate class="float-right"
                                      :page-count="page_count"
                                      :click-handler="getDocumentos"
                                      :prev-text="'Prev'"
                                      :next-text="'Next'"
                                      :container-class="'pagination'">
                            </paginate>
                            Página {{num }} / {{page_count}}
                        </div>
                    </div>
                    <div class="card-footer">

                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
  import Vue from 'vue'
  import Config from '../Config'
  import BarExample from './charts/BarExample'
  import Paginate from 'vuejs-paginate'
  import axios from 'axios'
  import DatePicker from 'vue2-datepicker'
  import VueClip from 'vue-clip'
  import Notify from 'vue-notifyjs'

  Vue.component('paginate', Paginate)
  Vue.use(Config)
  Vue.use(VueClip)
  Vue.use(Notify)

  export default {
    name: 'charts',
    data () {
      return {
        url: Config.url,
        myModal: true,
        id: 0,
        ci: '12345678',
        nombre: '',
        empresa: '',
        sueldo: '',
        programa: '',
        dias_trabajados: '',
        atrasos: 0,
        nro_planilla: 1,
        monto_afp: 0,
        nit: '',
        nro_cuenta: '',
        banco: '',
        hojaruta: '',
        cite: '',
        referencia: '',
        filter: '',
        order: '',
        orderBy: '',
        page_count: 1,
        documentos: null,
        num: 1,
        pagenum: 5,
        total: 1,
        beneficiario: null,
        callouts: ['callout-primary', 'callout-danger', 'callout-warning', 'callout-success', 'callout-info'],
        fechas: '',
        shortcuts: [
          {
            text: 'Hoy',
            start: new Date(),
            end: new Date()
          }
        ],
        options: {
          url: Config.url + 'beneficiarios/upload/?token=' + localStorage.getItem('token'),
          paramName: 'file',
          acceptedFiles: ['image/*', 'application/pdf']
        }
      }
    },
    components: {
      BarExample,
      DatePicker,
      Notify
    },
    mounted () {
      this.getDocumentos(1)
    },
    methods: {
      buscarBeneficiario () {
        this.$Progress.start()
        var vm = this
        axios.get(this.url + 'beneficiarios/buscar/?token=' + localStorage.getItem('token'),
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              ci: this.ci
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.beneficiario = response.data.data
                if (this.beneficiario) {
                  this.id = this.beneficiario.id
                  this.nombre = this.beneficiario.nombres + ' ' + this.beneficiario.primer_apellido + ' ' + this.beneficiario.segundo_apellido
                  this.sueldo = this.beneficiario.sueldo
                  this.ci = this.beneficiario.ci
                  this.empresa = this.beneficiario.empresa
                  this.banco = this.beneficiario.banco
                  this.nit = this.beneficiario.nit
                  this.nro_cuenta = this.beneficiario.nro_cuenta
                  this.programa = this.beneficiario.programa
                  this.$Progress.finish()
                } else {
                  this.addNotification('top', 'center', 'warning', 'Empleado no encontrado')
                  this.$Progress.fail()
                }
              } else {
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      update () {
        var data = new FormData()
        var file = this.$refs.fileInput.files[0]
        data.append('my_file', file)
        axios.post(this.url + 'beneficiario/upload/', data)
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      },
      calcular () {
        console.log(this.fechas)
      },
      getDocumentos (num = 1) {
        this.$Progress.start()
        var vm = this
        this.num = num
        axios.get(this.url + 'beneficiarios/lista/?token=' + localStorage.getItem('token'),
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              pagenum: this.pagenum,
              page: this.num,
              hojaruta: this.hojaruta,
              cite: this.cite,
              referencia: this.referencia
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.documentos = response.data.data.documentos
                this.page_count = response.data.data.page_count
                this.total = response.data.data.total
                this.$Progress.finish()
              } else {
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      addNotification (verticalAlign = 'top', horizontalAlign = 'bottom', type = 'info', mensaje = '') {
        this.$notify({
          message: mensaje,
          horizontalAlign: horizontalAlign,
          verticalAlign: verticalAlign,
          // change types accordingly
          type: type
        })
      },
      clickCallback (pageNum) {
        console.log(pageNum)
      }
    }
  }
</script>

<style src="vue-notifyjs/themes/material.css"></style>
<style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600');
    .uploader {
        width: 400px;
        height: 550px;
        display: flex;
        border-radius: 6px;
        box-shadow: 1px 2px 19px rgba(195, 195, 195, 0.43);
        flex-direction: column-reverse;
        background: #fff;
    }

     .uploader * {
        box-sizing: border-box;
    }

   .uploader-action {
        padding: 20px;
        background: #f1f5ff;
        cursor: pointer;
    }

     .dz-message {
        color: #94a7c2;
        text-align: center;
        padding: 20px 40px;
        border: 3px dashed #dfe8fe;
        border-radius: 4px;
        font-size: 16px;
    }

    .uploader-files {
        flex: 1;
        padding: 40px;
    }

    .uploader-file.upload .file-name {
        color: inherit;
    }

    .file-progress {
        background: #e3ebfa;
        border-radius: 8px;
        height: 4px;
        width: 80%;
    }

    .progress-indicator {
        display: block;
        background: #00d28a;
        border-radius: 8px;
        height: 5px;
    }

    .file-size {
        font-weight: 600;
        color: #bebfc1;
    }

    .file-status {
        font-size: 12px;
        text-transform: uppercase;
        margin-left: 5px;
    }

    .uploader-action.dragging {
        background: #fff;
        transition: background 300ms ease;
    }

    @keyframes slideUpIn {
        0% {
            opacity: 0;
            transform: translateY(10%);
        }

        100% {
            opacity: 0;
            transform: none;
        }
    }
</style>
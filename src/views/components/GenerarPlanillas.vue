<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-accent-primary card-header-inverse">
                    <div class="card-header">
                        <h3>Lista de Planillas ( {{total}} )</h3>
                    </div>
                    <div class="card-body">
                        <strong>Busqueda:</strong>
                        <div class="row">
                            <b-form-fieldset
                                    label="Cedula Identidad"
                                    class="col-md-3"
                                    :label-cols="2">
                                <b-form-input type="text" v-model="ci"
                                              placeholder="C.I."></b-form-input>
                            </b-form-fieldset>
                            <b-form-fieldset
                                    label="Empresa"
                                    class="col-md-3"

                                    :label-cols="2">
                                <b-form-input type="text" v-model="empresa"
                                              placeholder="Empresa"></b-form-input>
                            </b-form-fieldset>
                            <div class="form-group col-md-3 row">
                                <label class="col-form-label col-12  "><span>Cuidad</span></label>
                                <div class="col-12">

                                    <select v-model="cuidad" class="form-control" @change="getBeneficiarios(1)">
                                        <option value="">TODOS</option>
                                        <option value="LA PAZ">LA PAZ</option>
                                        <option value="COCHABAMBA">COCHABAMBA</option>
                                        <option value="ORURO">ORURO</option>
                                        <option value="TARIJA">TARIJA</option>
                                        <option value="POTOSI">POTOSI</option>
                                        <option value="SANTA CRUZ">SANTA CRUZ</option>
                                        <option value="BENI">BENI</option>
                                        <option value="PANDO">PANDO</option>
                                        <option value="CHUQUISACA">CHUQUISACA</option>

                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-3 row">
                                <label class="col-form-label col-12 "><span>Programa</span></label>
                                <div class="col-12">

                                    <select v-model="programa" class="form-control" @change="getBeneficiarios(1)">
                                        <option value="">TODOS</option>
                                        <option value="PAE">PAE</option>
                                        <option value="PMAEIL">PMEIL</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div slot="footer">
                            <b-button type="submit" size="sm" @click="getBeneficiarios(1)" variant="success"><i class="fa fa-dot-circle-o"></i>
                                Buscar
                            </b-button>
                            <b-button type="button" size="sm" @click="resetForm" variant="danger"><i class="fa fa-ban"></i> Reset
                            </b-button>
                            <a v-bind:href="url2" v-if="selected.length > 0" class="btn btn-sm btn-primary">Generar Plantilla ({{selected.length}})</a>
                            <div class="form-group  col-md-1  float-right">
                                <select v-model="pagenum" class="form-control" @change="getBeneficiarios(1)">
                                    <option v-for="p in [5, 10, 15]" :value="p">{{p}}</option>
                                </select>
                            </div>
                        </div>
                        <table class="table-sm mb-0 table b-table table-hover table-responsive">
                            <thead class="thead-default">
                            <tr>
                                <th><input type="checkbox" v-model="selectAll"></th>
                                <th>Nombre Empresa</th>
                                <th>NIT</th>
                                <th>BANCO</th>
                                <th>Nro CUENTA</th>
                                <th>BENEFICIARIO</th>
                                <th>VIGENCIA CONTRATO</th>
                                <th>FECHA INICIO CALCULO</th>
                                <th>FECHA FINAL CALCULO</th>
                                <th>MONTO A TRANFERIR</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="planilla in planillas">
                                <td>
                                    <input type="checkbox" v-model="selected" :value="planilla.id"/>
                                </td><td>
                                    <div>
                                        {{planilla.empresa}}
                                    </div>
                                </td>
                                <td>
                                    <div>{{planilla.nit}}</div>
                                </td>
                                <td>
                                    <div>{{planilla.banco}}</div>
                                </td><td>
                                    <div>{{planilla.nro_cuenta}}</div>
                                </td>

                                <td>
                                    {{planilla.nombres}} {{planilla.paterno}} {{planilla.materno}}
                                </td>
                                <td>
                                    <div>
                                        {{planilla.fecha_contrato}}
                                    </div>
                                </td>
                                <td>
                                    <div>{{planilla.fecha_inicio}}</div>
                                </td>
                                <td>
                                    <div>{{planilla.fecha_fin}}</div>
                                </td>
                                <td>
                                    <div>{{planilla.monto_transferir}}</div>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        <div>
                            <paginate class="float-right"
                                      :page-count="page_count"
                                      :click-handler="getBeneficiarios"
                                      :prev-text="'Prev'"
                                      :next-text="'Next'"
                                      :container-class="'pagination'">
                            </paginate>
                            Página {{num }} / {{page_count}}
                        </div>
                    </div>
                    <div class="card-footer">
                        <span>Seleccionados: {{ selected | json }}</span>
                    </div>
                </div>
            </div>
        </div>
        

    </div>
</template>
<script>
  import Vue from 'vue'
  import Config from '../../Config'
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
    name: 'generar-planillas',
    data () {
      return {
        meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        mes: 12,
        anio: 2017,
        anios: [2017, 2018, 2019],
        url: Config.url,
        url2: Config.url + 'excel/test/' + this.mes,
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
        planillas: null,
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
        },
        selected: [],
        allSelected: false,
        userIds: []
      }
    },
    components: {
      DatePicker,
      Notify
    },
    mounted () {
      this.getBeneficiarios(1)
    },
    computed: {
      selectAll: {
        get: function () {
          return this.planillas ? this.selected.length === this.planillas.length : false
        },
        set: function (value) {
          var selected = []

          if (value) {
            this.planillas.forEach(function (user) {
              selected.push(user.id)
            })
          }
          this.selected = selected
        }
      }
    },
    methods: {
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
        if (this.mes != null) {
          this.url2 = this.url + 'excel/test/?m=' + this.mes + '&g=' + this.anio
        } else {
          this.url2 = ''
        }
      },
      getBeneficiarios (num = 1) {
        this.$Progress.start()
        var vm = this
        this.num = num
        axios.get(this.url + 'planillas/lista/?token=' + localStorage.getItem('token'),
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              pagenum: this.pagenum,
              page: this.num
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.planillas = response.data.data.documentos
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
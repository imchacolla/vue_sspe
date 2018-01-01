<template>
    <div class="animated fadeIn">

        <vue-snotify></vue-snotify>
        <div class="row" v-if="listado">
            <div class="col-md-12">
                <div class="card card-accent-primary card-header-inverse">
                    <div class="card-header">
                        <h5>Beneficiarios ({{total}})
                            <b-button  class="float-right" type="submit" size="md" @click="nuevoBeneficiario" variant="success"><i class="fa fa-plus"></i>
                             Registrar Nuevo
                        </b-button></h5>

                    </div>
                    <div class="card-body">

                        <div class="row">
                            <b-form-fieldset
                                    label="Cedula Identidad"
                                    class="col-md-2"
                                    :label-cols="2">
                                <b-form-input type="text" v-on:keyup.enter="getBeneficiarios(1)" v-model="ci"
                                              placeholder="C.I."></b-form-input>
                            </b-form-fieldset>
                            <div class="form-group col-md-3 row">
                                <label class="col-form-label col-12  "><span>Empresa</span></label>
                                <div class="col-12">
                                    <basic-select :options="empresas"
                                                  :selected-option="item" class="form-control"
                                                  placeholder="select item"
                                                  @select="onSelect">
                                    </basic-select>
                                </div>
                            </div>
                            <div class="form-group col-md-2 row">
                                <label class="col-form-label col-12  "><span>Ciudad</span></label>
                                <div class="col-12">
                                    <select v-model="ciudad" class="form-control" @change="getBeneficiarios(1)">
                                        <option value="">TODOS</option>
                                        <option v-for="p in ciudades" :value="p.id">{{p.ciudad}}</option>

                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-3 row">
                                <label class="col-form-label col-12 "><span>Programa</span></label>
                                <div class="col-12">

                                    <select v-model="programa" class="form-control" @change="getBeneficiarios(1)">
                                        <option value="">TODOS</option>
                                        <option value="PAE">PAE</option>
                                        <option value="PMEIL">PMEIL</option>

                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-3 row">
                                <label class="col-form-label col-12 "><span>_</span></label>
                                <div class="col-12">
                                    <b-button type="submit" size="sm" @click="getBeneficiarios(1)" variant="primary"><i class="fa fa-dot-circle-o"></i>
                                        Buscar
                                    </b-button>
                                    <b-button type="button" size="sm" @click="resetForm" variant="default"><i class="fa fa-ban"></i> Reset
                                    </b-button>
                                </div>
                            </div>
                        </div>
                        <div slot="footer">
                            <div class="form-group  col-md-1  float-right">
                            <select v-model="pagenum" class="form-control" @change="getBeneficiarios(1)">
                                <option v-for="p in [5, 10, 15]" :value="p">{{p}}</option>
                            </select>
                            </div>
                        </div>
                        <table class="table-sm mb-0 table b-table table-hover table-responsive ">
                            <thead class="thead-default">
                            <tr>
                                <th>BENEFICIARIO</th>
                                <th>PROGRAMA</th>
                                <th>CIUDAD</th>
                                <th>EMPRESA</th>
                                <th>SUELDO</th>
                                <th>FECHA NACIMIENTO</th>
                                <th>FECHA CONCLUSIÓN</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="documento in documentos">
                                <td>
                                    <div>
                                        {{documento.nombres | capitalize }} {{documento.paterno | capitalize }} {{documento.materno | capitalize }}
                                        <div class="small text-muted"><strong>{{documento.ci}}</strong></div>
                                    </div>
                                </td>
                                <td>
                                    <div>{{documento.programa}}</div>
                                    <div class="small text-muted"><strong>{{documento.cite_original}}</strong></div>
                                </td>
                                <td>
                                    <div>{{documento.ciudad}}</div>
                                    <div class="small text-muted"><strong>{{documento.direccion}}</strong></div>
                                </td>

                                <td>
                                    <div>{{documento.empresa}}</div>
                                    <div class="small text-muted">
                                        {{documento.cargo}}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{documento.sueldo | currency('Bs',0)}}
                                    </div>
                                </td>
                                <td>
                                    <div>{{documento.fecha_nacimiento}}</div>
                                    <div class="small text-muted">
                                        {{documento.edad}} años
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{documento.fecha_conclusion}}

                                    </div>
                                    <div class="small text-muted">
                                        {{documento.dias}} días
                                    </div>
                                </td>
                                <td>
                                    <b-dropdown class="" variant="default p-0" >
                                        <template slot="button-content">
                                             Opción
                                        </template>
                                        <b-dropdown-item @click="editarBeneficiario(documento.id)"><i class="fa fa-pencil"></i> Editar</b-dropdown-item>
                                        <b-dropdown-item @click="editarHijos(documento.id, documento.nombres + ' ' + documento.paterno)"><i class="fa fa-child"></i> Hijos</b-dropdown-item>
                                        <b-dropdown-item @click=""><i class="fa fa-users"></i> Capacitación</b-dropdown-item>
                                        <b-dropdown-item disabled>Eliminar</b-dropdown-item>
                                    </b-dropdown>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        <div>
                            <hr/>
                            <paginate class="float-right"
                                      :page-count="page_count"
                                      :click-handler="getBeneficiarios"
                                      :prev-text="'Anterior'"
                                      :next-text="'Siguiente'"
                                      :container-class="'pagination'">
                            </paginate>
                            Página {{num }} / {{page_count}}
                        </div>
                    </div>
                    <div class="card-footer">

                    </div>
                </div>
            </div>
            <b-modal title="Modal title" v-model="myModal" @ok="myModal = false">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </b-modal>
        </div>
        <div class="row" v-if="edicion">
                <div class="col-md-6">
                    <b-card>
                        <div slot="header">
                            <strong>Datos Personales</strong> Beneficiario
                        </div>
                        <b-form-fieldset
                                label="Nombres"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="text" v-model="e_nombres" ></b-form-input>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Primer apellido"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="text" v-model="e_primer_apellido"  ></b-form-input>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Segundo apellido"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="text" v-model="e_segundo_apellido" ></b-form-input>
                        </b-form-fieldset>

                        <b-form-fieldset
                                label="Cedula Identidad"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="text" v-model="e_ci"></b-form-input>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Expedido"
                                :label-cols="4"
                                :horizontal="true">
                            <select v-model="e_expedido" class="form-control" >
                                <option v-for="e in expedidos" :value="e">{{e}}</option>
                            </select>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Fecha Nacimiento"
                                :horizontal="true"
                                :label-cols="4">
                            <date-picker v-model="e_fecha_nacimiento" :first-day-of-week="1"  type="date" :value="e_fecha_nacimiento"  lang="es" format="dd-MM-yyyy" ></date-picker>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Genero"
                                :label-cols="4"
                                :horizontal="true">
                            <select v-model="e_genero" class="form-control" >
                                <option v-for="g in generos" :value="g.abre">{{g.genero}}</option>
                            </select>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Dirección"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="text" v-model="e_direccion" ></b-form-input>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="E-mail"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="text" v-model="e_email" ></b-form-input>
                        </b-form-fieldset>

                    </b-card>
                </div>
                <div class="col-md-6">
                    <b-card>
                        <div slot="header">
                            <strong>Datos Laborales</strong>
                        </div>
                        <b-form-fieldset
                                label="Cuidad"
                                :label-cols="4"
                                :horizontal="true">
                            <select v-model="e_ciudad" class="form-control" >
                                <option v-for="p in ciudades" :value="p.id">{{p.ciudad}}</option>
                            </select>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Empresa"
                                :label-cols="4"
                                :horizontal="true">
                            <basic-select :options="empresasedicion"
                                          v-model="e_empresa"
                                          :selected-option="item2" class="form-control"
                                          placeholder="select item"
                                          @select="onSelect2">
                            </basic-select>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Cargo"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="text" v-model="e_cargo"  ></b-form-input>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Programa"
                                :label-cols="4"
                                :horizontal="true">
                            <select v-model="e_programa" class="form-control" @change="getPaquetes(e_programa)" >
                                <option v-for="p in programas" :value="p">{{p}}</option>
                            </select>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Paquete"
                                :label-cols="4"
                                :horizontal="true">
                            <select v-model="e_paquete" class="form-control" >
                                <option v-for="p in paquetes" :value="p.id">{{p.paquete}}</option>
                            </select>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Fecha Inicio"
                                :horizontal="true"
                                :label-cols="4">
                            <date-picker v-model="e_fecha_inicio" :first-day-of-week="1" lang="es" format="dd-MM-yyyy"  ></date-picker>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Fecha conclusión"
                                :horizontal="true"
                                :label-cols="4">
                            <date-picker v-model="e_fecha_fin" :first-day-of-week="1" lang="es" format="dd-MM-yyyy" ></date-picker>
                        </b-form-fieldset>

                        <b-form-fieldset
                                label="Contrato No"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="text"  v-model="e_nro_contrato"></b-form-input>
                        </b-form-fieldset>
                        <b-form-fieldset
                                label="Salario Mensual"
                                :label-cols="4"
                                :horizontal="true">
                            <b-form-input type="number" v-model="e_salario"></b-form-input>
                        </b-form-fieldset>
                    </b-card>
                </div>
            <div class="col-md-12">
                <div slot="footer" >
                    <b-button type="button" size="sm" @click="guardarBeneficiario" variant="primary"><i class="fa fa-dot-circle-o"></i> Guardar Cambios</b-button>
                    <b-button type="reset" size="sm" @click="cancelar"  variant="default"><i class="fa fa-ban"></i> Cancelar</b-button>
                </div>
            </div>

        </div>
        <div class="row" v-if="edicionHijos">
            <div class="col-md-12">
                <h3><i class="fa fa-user"></i> {{tituloBeneficiario}}</h3>
            </div>
            <div class="col-md-6">

                <b-card>
                    <div slot="header">
                        <strong>Registro de Hijos</strong>
                    </div>
                    <b-form-fieldset
                            label="Nombres"
                            :label-cols="4"
                            :horizontal="true">
                        <b-form-input type="text" v-model="hijo_nombres" ></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Primer apellido"
                            :label-cols="4"
                            :horizontal="true">
                        <b-form-input type="text" v-model="hijo_primer_apellido"  ></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Segundo apellido"
                            :label-cols="4"
                            :horizontal="true">
                        <b-form-input type="text" v-model="hijo_segundo_apellido" ></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Fecha Nacimiento"
                            :horizontal="true"
                            :label-cols="4">
                        <date-picker v-model="hijo_fecha_nacimiento" :first-day-of-week="1"  lang="es" format="dd-MM-yyyy" ></date-picker>

                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Certificado de Nacimiento"
                            :horizontal="true"
                            :label-cols="4">
                        <input id="fCertificado" ref="fCertificado" type="file">
                    </b-form-fieldset>

                        <div slot="footer" >
                            <b-button type="button" :disabled="submitted" size="sm" ref="guardar-hijo" @click="guardarHijo" variant="primary"><i class="fa fa-dot-circle-o"></i> Registrar hijo</b-button>
                            <b-button type="reset" size="sm" @click="cancelar"  variant="default"><i class="fa fa-ban"></i> Cancelar</b-button>
                        </div>

                </b-card>
            </div>
            <div class="col-md-6">
                <b-card>
                    <div slot="header">
                        <strong>Lista de hijos</strong>
                    </div>
                <table class="table-sm mb-0 table b-table table-hover table-responsive ">
                    <thead class="thead-default">
                    <tr>
                        <th>#</th>
                        <th>NOMBRE HIJO</th>
                        <th>FECHA NACIMIENTO</th>
                        <th>EDAD</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(h, i) in hijos">
                        <td>
                            <div>
                                {{i+1}}
                            </div>
                        </td>
                        <td>
                            <div>
                                {{h.nombres}} {{h.primer_apellido}} {{h.segundo_apellido}}
                                <div class="small text-muted"><strong>{{h.ci}}</strong></div>
                            </div>
                        </td>

                        <td>
                            <div>{{h.fecha_nacimiento}}</div>
                        </td>
                        <td>
                            <div>{{h.edad}}</div>
                        </td>
                        <td>
                            <b-button variant="danger" @click="eliminarHijo(h.id)"><i class="fa fa-trash"></i> </b-button>
                        </td>
                    </tr>
                    </tbody>

                </table>
                </b-card>
            </div>
        </div>
        <vue-snotify></vue-snotify>

        </div>
</template>
<script>
  import Vue from 'vue'
  import Config from '../Config'
  import BarExample from './charts/BarExample'
  import Paginate from 'vuejs-paginate'
  import axios from 'axios'
  import DatePicker from 'vue2-datepicker'
  import Snotify, { SnotifyPosition } from 'vue-snotify'
  import { BasicSelect } from 'vue-search-select'
  import Vue2Filters from 'vue2-filters'

  Vue.use(Vue2Filters)
  const options = {
    toast: {
      position: SnotifyPosition.rightBottom
    }
  }
  Vue.use(Snotify, options)
  Vue.component('paginate', Paginate)
  Vue.use(Config)
  export default {
    name: 'charts',
    data () {
      return {
        url: Config.url,
        id: 0,
        e_nombres: '',
        e_primer_apellido: '',
        e_segundo_apellido: '',
        e_ci: '',
        e_expedido: '',
        e_empresa: '',
        e_fecha_nacimiento: '',
        e_genero: '',
        e_direccion: '',
        e_email: '',
        e_ciudad: '',
        e_cargo: '',
        e_programa: '',
        e_paquete: '',
        e_fecha_inicio: '',
        e_fecha_fin: '',
        e_nro_contrato: '',
        e_salario: '',
        myModal: false,
        edicion: false,
        listado: true,
        edicionHijos: false,
        tituloBeneficiario: '',
        beneficiario: {
          nombres: ''
        },
        empresas: null,
        empresasedicion: null,
        submitted: false,
        programas: ['PAE', 'PMEIL'],
        expedidos: ['LPZ', 'OR', 'CBA', 'SCZ', 'TAR', 'CHU', 'POT'],
        paquetes: null,
        ci: '',
        programa: '',
        ciudad: '',
        empresa: '',
        filter: '',
        order: '',
        orderBy: '',
        page_count: 1,
        documentos: null,
        num: 1,
        pagenum: 10,
        total: 1,
        resumen: [],
        hijos: [],
        hijo_nombres: '',
        hijo_primer_apellido: '',
        hijo_segundo_apellido: '',
        hijo_fecha_nacimiento: new Date(),
        callouts: ['callout-primary', 'callout-danger', 'callout-warning', 'callout-success', 'callout-info'],
        fechas: '',
        mensajeError: '',
        item: {
          value: '',
          text: ''
        },
        item2: {
          value: '',
          text: ''
        },
        ciudades: null,
        shortcuts: [
          {
            text: 'Hoy',
            start: new Date(),
            end: new Date()
          }
        ],
        generos: [
          {
            abre: 'M',
            genero: 'Hombre'
          },
          {
            abre: 'F',
            genero: 'Mujer'
          }
        ]
      }
    },
    components: {
      BarExample,
      DatePicker,
      BasicSelect
    },
    mounted () {
      this.getBeneficiarios(1)
      this.getDatosBusqueda()
    },
    methods: {
      onSelect (item) {
        this.item = item
        this.getBeneficiarios(1)
      },
      onSelect2 (item) {
        this.item2 = item
      },
      reset () {
        this.item = {}
      },
      selectOption () {
        // select option from parent component
        this.item = this.options[0]
      },
      editarBeneficiario (id) {
        var vm = this
        this.$Progress.start()
        this.edicion = true
        this.listado = false
        this.id = id
        axios.get(this.url + 'beneficiarios/datos/?token=' + localStorage.getItem('token') + '&id=' + id,
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              referencia: this.referencia
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.getPaquetes(response.data.data.programa)
                this.beneficiario = response.data.data
                this.e_nombres = response.data.data.nombres
                this.e_primer_apellido = response.data.data.primer_apellido
                this.e_segundo_apellido = response.data.data.segundo_apellido
                this.e_ci = response.data.data.ci
                this.e_expedido = response.data.data.expedido
                this.e_empresa = response.data.data.empresa_id
                this.item2.value = response.data.data.empresa_id
                this.item2.text = response.data.data.empresa
                // this.item2.text = this.empresasedicion[this.item2.value].text
                this.e_fecha_nacimiento = new Date(response.data.data.fecha_nacimiento + ' 04:00:00')
                this.e_genero = response.data.data.genero
                this.e_direccion = response.data.data.direccion
                this.e_email = response.data.data.email
                this.e_ciudad = response.data.data.ciudad
                this.e_cargo = response.data.data.cargo
                this.e_programa = response.data.data.programa
                this.e_paquete = response.data.data.paquete
                this.e_fecha_inicio = new Date(response.data.data.fecha_ingreso + ' 04:00:00')
                this.e_fecha_fin = new Date(response.data.data.fecha_conclusion + ' 04:00:00')
                this.e_nro_contrato = response.data.data.contrato
                this.e_salario = response.data.data.sueldo
                this.$Progress.finish()
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      nuevoBeneficiario () {
        this.edicion = true
        this.listado = false
        this.id = 0
        this.e_nombres = ''
        this.e_primer_apellido = ''
        this.e_segundo_apellido = ''
        this.e_ci = ''
        this.e_expedido = ''
        this.e_empresa = ''
        this.item2.value = ''
        this.item2.text = ''
        this.e_fecha_nacimiento = new Date()
        this.e_genero = ''
        this.e_direccion = ''
        this.e_email = ''
        this.e_ciudad = ''
        this.e_cargo = ''
        this.e_programa = ''
        this.e_paquete = ''
        this.e_fecha_inicio = new Date()
        this.e_fecha_fin = new Date()
        this.e_nro_contrato = ''
        this.e_salario = ''
      },
      editarHijos (id, titulo) {
        var vm = this
        this.edicion = false
        this.listado = false
        this.edicionHijos = true
        this.id = id
        this.tituloBeneficiario = titulo
        axios.get(this.url + 'beneficiarios/hijos/?token=' + localStorage.getItem('token') + '&id=' + id,
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              referencia: this.referencia
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.hijos = response.data.data
                if (this.hijos.length > 3) {
                  this.submitted = true
                }
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      guardarHijo () {
        this.$Progress.start()
        this.submitted = true
        var vm = this
        var data = new FormData()
        data.append('id', this.id)
        data.append('nombres', this.hijo_nombres)
        data.append('primer_apellido', this.hijo_primer_apellido)
        data.append('segundo_apellido', this.hijo_segundo_apellido)
        data.append('fecha_nacimiento', this.hijo_fecha_nacimiento.getFullYear() + '-' + this.hijo_fecha_nacimiento.getMonth() + '-' + this.hijo_fecha_nacimiento.getDate())
        axios.post(this.url + 'beneficiarios/guardarhijo/?token=' + localStorage.getItem('token'), data)
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                vm.$snotify.success('Se guardo los datos del beneficiario exitosamente.', 'Exito')
                this.editarHijos(this.id)
                this.submitted = false
                this.$Progress.finish()
              } else {
                vm.$snotify.error('Ocurrio un error al guardar los datos', 'Error')
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      eliminarHijo (idHijo) {
        this.$Progress.start()
        var vm = this
        var data = new FormData()
        data.append('id', idHijo)
        axios.post(this.url + 'beneficiarios/eliminarhijo/?token=' + localStorage.getItem('token'), data)
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                vm.$snotify.success('Se elimino exitosamente', 'Exito')
                this.editarHijos(this.id)
                this.submitted = false
                this.$Progress.finish()
              } else {
                vm.$snotify.error('Ocurrio un error al guardar los datos', 'Error')
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      date2String (date) {
        var mm = date.getMonth() + 1 // getMonth() is zero-based
        var dd = date.getDate()
        return [date.getFullYear(),
          (mm > 9 ? '' : '0') + mm,
          (dd > 9 ? '' : '0') + dd
        ].join('')
      },
      guardarBeneficiario () {
        this.$Progress.start()
        var vm = this
        this.edicion = true
        var data = new FormData()
        data.append('id', this.id)
        data.append('nombres', this.e_nombres)
        data.append('primer_apellido', this.e_primer_apellido)
        data.append('segundo_apellido', this.e_segundo_apellido)
        data.append('ci', this.e_ci)
        data.append('expedido', this.e_expedido)
        // data.append('fecha_nacimiento', this.e_fecha_nacimiento.getFullYear() + '-' + this.e_fecha_nacimiento.getMonth() + '-' + this.e_fecha_nacimiento.getDate())
        // data.append('fecha_inicio', this.e_fecha_inicio.getFullYear() + '-' + this.e_fecha_inicio.getMonth() + '-' + this.e_fecha_inicio.getDate())
        // data.append('fecha_fin', this.e_fecha_fin.getFullYear() + '-' + this.e_fecha_fin.getMonth() + '-' + this.e_fecha_fin.getDate())
        data.append('fecha_nacimiento', this.date2String(this.e_fecha_nacimiento))
        data.append('fecha_inicio', this.date2String(this.e_fecha_inicio))
        data.append('fecha_fin', this.date2String(this.e_fecha_fin))
        data.append('genero', this.e_genero)
        data.append('direccion', this.e_direccion)
        data.append('email', this.e_email)
        data.append('ciudad', this.e_ciudad)
        data.append('cargo', this.e_cargo)
        data.append('programa', this.e_programa)
        data.append('paquete', this.e_paquete)
        data.append('nro_contrato', this.e_nro_contrato)
        data.append('salario', this.e_salario)
        // data.append('fecha_inicio', this.e_fecha_inicio.getFullYear() + '-' + this.e_fecha_inicio.getMonth() + '-' + this.e_fecha_inicio.getDate())
        // data.append('fecha_fin', this.e_fecha_fin.getFullYear() + '-' + this.e_fecha_fin.getMonth() + '-' + this.e_fecha_fin.getDate())
        data.append('empresa', this.item2.value)
        axios.post(this.url + 'beneficiarios/guardar/?token=' + localStorage.getItem('token'), data)
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                vm.$snotify.success('Se guardo los datos del beneficiario exitosamente.', 'Exito')
                this.getBeneficiarios(1)
                this.edicion = false
                this.$Progress.finish()
              } else {
                vm.$snotify.error('Ocurrio un error al guardar los datos', 'Error')
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      getPaquetes (programa) {
        var vm = this
        axios.get(this.url + '/beneficiarios/paquetes/?token=' + localStorage.getItem('token') + '&programa=' + programa,
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              referencia: this.referencia
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.paquetes = response.data.data
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      getDatosBusqueda () {
        // var vm = this
        axios.get(this.url + '/beneficiarios/datosbusqueda/?token=' + localStorage.getItem('token'),
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              referencia: this.referencia
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.empresas = response.data.empresas
                this.ciudades = response.data.ciudades
                this.empresasedicion = response.data.empresas
                // this.programas = response.data.programas
              } else {
                // vm.$router.push('/pages/login')
              }
            }
          )
      },
      cancelar () {
        this.listado = true
        this.edicion = false
        this.edicionHijos = false
      },
      getBeneficiarios (num = 1) {
        var vm = this
        this.num = num
        this.cancelar()
        this.$Progress.start()
        axios.get(this.url + 'beneficiarios/lista/?token=' + localStorage.getItem('token'),
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              pagenum: this.pagenum,
              page: this.num,
              ci: this.ci,
              empresa: this.item.value,
              programa: this.programa,
              ciudad: this.ciudad
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
                vm.$router.push('/pages/login')
                this.$Progress.fail()
              }
            }
          )
      },
      resetForm () {
        this.ci = ''
        this.item = {}
        this.programa = ''
        this.fecha = ''
        this.ciudad = ''
        this.getBeneficiarios(1)
      },
      clickCallback (pageNum) {
        console.log(pageNum)
      }
    }
  }
</script>
<style >
    @import "~vue-snotify/styles/material.css";
</style>
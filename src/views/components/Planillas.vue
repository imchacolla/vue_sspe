<template>
    <div class="animated fadeIn">
        <vue-snotify></vue-snotify>
        <div class="row">

                <b-form-fieldsets
                        label="Beneficiario"
                        class="col-md-3"
                        :label-cols="1">
                    <b-form-input type="text" v-model="ci" ref="ci"
                                  placeholder="Cedula Identidad"></b-form-input>
                </b-form-fieldsets>
                <b-form-fieldset
                        label=""
                        class="col-md-3"
                        :label-cols="2">
                    <b-button type="submit" @click="buscarBeneficiario" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i>
                        Buscar
                    </b-button>
                    <b-button type="reset" @click="resetForm" size="sm"><i class="fa fa-ban"></i> Reset
                </b-button>
                </b-form-fieldset>
            <b-form-fieldset
                        label=""
                        class="col-md-3"
                        :label-cols="1">

                </b-form-fieldset>
        </div>
        <div class="row" v-if="id>0">
            <div class="col-md-6">
                <b-card>
                    <div slot="header">
                        <strong>Registro de  Planilla</strong> Beneficiario
                    </div>
                    <b-form-fieldset
                            label="Beneficiario"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="nombre" :disabled="true" ></b-form-input>
                    </b-form-fieldset>

                    <b-form-fieldset
                            label="Programa"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="programa" :disabled="true"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Paquete"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="paquete_texto"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Fecha Inicio Contrato"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="fecha_inicio"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Fecha Conclusión Contrato"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="fecha_fin"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Salario Mensual Bs"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="sueldo"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                        label="Rango de fecha para el calculo"
                        :horizontal="true"
                        :label-cols="3">
                    <date-picker v-model="fechas" @change="calculoDias" :first-day-of-week="1" lang="en" format="dd-MM-yyyy"  range :shortcuts="shortcuts" confirm></date-picker>
                </b-form-fieldset>
                    <b-form-fieldset
                            label="Pago mes"
                            :label-cols="3"
                            :horizontal="true">
                        <select v-model="mes" class="form-control"" >
                            <option v-for="p in meses" :value="p.id">{{p.mes}}</option>
                        </select>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Nro Pago"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="number" v-model="nro_pago"></b-form-input>

                    </b-form-fieldset><b-form-fieldset
                        label="Días habiles"
                        :label-cols="3"
                        :horizontal="true">
                    <b-form-input type="number"  v-model="diasHabiles"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Hoja de Ruta (Carta) + adjunto"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="hoja_ruta"></b-form-input>
                        <input id="hojaRuta" ref="hojaRuta" type="file">
                    </b-form-fieldset>

                    <b-form-fieldset
                            label="Días faltados + Adj. Planilla"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="dias_faltados"></b-form-input>
                        <input id="fPlanilla" ref="fPlanilla" type="file">
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Monto pagado a AFP"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="monto_afp"></b-form-input>
                        <input id="montoAfp" ref="fAFP" type="file">
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Monto pagado a la Caja"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="monto_caja"></b-form-input>
                        <input id="montoCaja" ref="fCaja" type="file">
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="Monto a Transferir"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" v-model="montoTransferencia"></b-form-input>
                    </b-form-fieldset>
                    <div slot="footer">
                        <b-button type="submit" size="sm" @click="guardarDatos" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                        <b-button type="reset" size="sm"  variant="default"><i class="fa fa-ban"></i> Cancelar</b-button>
                    </div>
                </b-card>

            </div>
            <div class="col-md-6">
                <b-card>
                    <div slot="header">
                        <strong>Empresa</strong> Empleador
                    </div>
                    <b-form-fieldset
                            label="EMPRESA"

                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="empresa" placeholder=""></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="NIT"

                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="nit" placeholder=""></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="BANCO"

                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="banco" placeholder=""></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                            label="NRO CUENTA"
                            :label-cols="3"
                            :horizontal="true">
                        <b-form-input type="text" :disabled="true" v-model="nro_cuenta" placeholder=""></b-form-input>
                    </b-form-fieldset>
                   </b-card>
                <b-card>
                    <div slot="header">
                        <strong>Paquete</strong> Descripción
                    </div>
                    <div class="form-group row" v-for="beneficio in beneficios">
                        <label class="col-form-label col-sm-3"><span>{{beneficio.beneficio}}</span></label>
                        <div class="col-sm-9">

                            <input v-if="beneficio.calculo == 0" type="text" :value="(beneficio.porcentaje*beneficio.monto)/100" />
                            <input v-else type="text" value="0" />
                        </div>
                    </div>
                </b-card>

            </div><!--/.col-->
        </div><!--/.row-->
        <div v-else class="row">
            <div class="col-md-12">
                <hr/>
                <h5> Escriba una cedula de identidad y presione buscar.</h5>

            </div>
        </div>


    </div>
</template>
<script>
  import Vue from 'vue'
  import Config from '../../Config'
  import BarExample from './../charts/BarExample'
  import Paginate from 'vuejs-paginate'
  import axios from 'axios'
  import DatePicker from 'vue2-datepicker'
  import VueClip from 'vue-clip'
  import Snotify, { SnotifyPosition } from 'vue-snotify'

  const options = {
    toast: {
      position: SnotifyPosition.rightBottom
    }
  }
  Vue.use(Snotify, options)
  Vue.component('paginate', Paginate)
  Vue.use(Config)
  Vue.use(VueClip)

  export default {
    name: 'charts',
    data () {
      return {
        my_file: null,
        url: Config.url,
        myModal: true,
        id: 0,
        hoja_ruta: '',
        paquete: 0,
        paquetes: null,
        paquete_texto: '',
        beneficios: null,
        monto_a_tranferir: 0,
        ci: '12345678',
        nombre: '',
        empresa: '',
        sueldo: 0,
        programa: '',
        dias_trabajados: '',
        atrasos: 0,
        nro_planilla: 1,
        monto_afp: 0,
        nit: '',
        nro_cuenta: '',
        nro_pago: 1,
        banco: '',
        hojaruta: '',
        cite: '',
        referencia: '',
        filter: '',
        order: '',
        page_count: 1,
        diasHabiles: 0,
        dias_faltados: 0,
        monto_caja: 0,
        montoTransferencia: 0,
        fecha_inicio: '',
        fecha_fin: '',
        meses: null,
        mes: new Date().getMonth(),
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
      DatePicker
    },
    mounted () {
      this.getDatos()
    },
    watch: {
      diasHabiles: function (value) {
        var vm = this
        vm.montoTransferencia = (vm.sueldo / 30) * value
      },
      fechas: function (value) {
        this.calculoDias()
      }
    },
    methods: {
      calculoTransferencia (value) {
        this.montoTransferencia = (this.sueldo / 30) * value
      },
      date2String (date) {
        var mm = date.getMonth() + 1 // getMonth() is zero-based
        var dd = date.getDate()
        return [date.getFullYear(),
          (mm > 9 ? '' : '0') + mm,
          (dd > 9 ? '' : '0') + dd
        ].join('-')
      },
      calculoDias () {
        if (this.fechas !== '') {
          this.$Progress.start()
          axios.get(this.url + 'planillas/diashabiles',
            {
              params: {
                f1: this.date2String(this.fechas[0]),
                f2: this.date2String(this.fechas[1])
              }
            })
            .then(
              (response) => {
                this.res = response.data.res
                if (this.res !== null && this.res === 'success') {
                  this.diasHabiles = response.data.dias
                  this.$Progress.finish()
                }
              })
        }
      },
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
                  this.nombre = this.beneficiario.nombre
                  this.sueldo = this.beneficiario.sueldo
                  this.ci = this.beneficiario.ci
                  this.empresa = this.beneficiario.empresa
                  this.banco = this.beneficiario.banco
                  this.nit = this.beneficiario.nit
                  this.nro_cuenta = this.beneficiario.nro_cuenta
                  this.programa = this.beneficiario.programa
                  this.fecha_inicio = this.beneficiario.fecha_inicio
                  this.fecha_fin = this.beneficiario.fecha_fin
                  this.paquete = this.beneficiario.paquete
                  this.paquete_texto = response.data.paquete_texto
                  this.beneficios = response.data.beneficios
                  this.$Progress.finish()
                } else {
                  vm.$snotify.warning('Beneficiario no regsitrado.', 'Error')
                  this.id = 0
                  this.$Progress.fail()
                }
              } else {
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      guardarDatos () {
        var vm = this
        this.$Progress.start()
        var data = new FormData()
        var file = this.$refs.hojaRuta.files[0]
        var file2 = this.$refs.fPlanilla.files[0]
        var file3 = this.$refs.fAFP.files[0]
        var file4 = this.$refs.fCaja.files[0]
        data.append('fHR', file)
        data.append('fPlanilla', file2)
        data.append('fAFP', file3)
        data.append('fCaja', file4)
        data.append('ci', this.ci)
        data.append('id', this.id)
        data.append('programa', this.programa)
        data.append('paquete', this.paquete)
        data.append('sueldo', this.sueldo)
        data.append('empresa', this.empresa)
        data.append('nit', this.nit)
        data.append('banco', this.banco)
        data.append('nro_cuenta', this.nro_cuenta)
        data.append('nro_pago', this.nro_pago)
        data.append('fechas', this.fechas)
        data.append('monto_transferir', this.monto_a_tranferir)
        axios.post(this.url + 'beneficiarios/upload/?token=' + localStorage.getItem('token'), data)
          .then(response => {
            vm.$snotify.success('Se guardo los datos del beneficiario exitosamente.', 'Exito')
            console.log(response.data)
            this.$Progress.finish()
          })
          .catch(error => {
            console.log(error)
            this.$Progress.fail()
          })
      },
      getPaquetes () {
        this.$Progress.start()
        var vm = this
        axios.get(this.url + 'beneficiarios/paquetes/?token=' + localStorage.getItem('token') + '&programa=' + this.programa,
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              programa: this.programa
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.paquetes = response.data.data
              } else {
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      getPaquete () {
        this.$Progress.start()
        var vm = this
        axios.get(this.url + 'beneficiarios/paquete/?token=' + localStorage.getItem('token') + '&id=' + this.paquete,
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              paquete: this.paquete
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.paquete_texto = response.data.paquete_texto
                this.paquetes = response.data.data
                this.beneficios = response.data.beneficios
              } else {
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      getBeneficios () {
        this.$Progress.start()
        var vm = this
        axios.get(this.url + 'beneficiarios/beneficios/?token=' + localStorage.getItem('token') + '&programa=' + this.paquete,
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              paquete: this.paquete
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.beneficios = response.data.data
              } else {
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      calcular () {
        console.log(this.fechas)
      },
      resetForm () {
        this.ci = ''
        this.id = 0
        this.$refs.ci.focus()
      },
      getDatos () {
        this.$Progress.start()
        var vm = this

        axios.get(this.url + 'planillas/datos/?token=' + localStorage.getItem('token'),
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.meses = response.data.meses
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
<style >
    @import "~vue-snotify/styles/material.css";
</style>
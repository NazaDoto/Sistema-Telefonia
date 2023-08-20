<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div class="container mt-4 mb-2">
            <h1 class="text-center">Carga de BAF</h1>

            <form @submit.prevent="cargarBaf" action="" method="post">
                <div class="row g-3 div-forms border">
                    <h4 class="titulo-div-forms mb-2">Datos Personales</h4>
                    <div class="col-md-6">
                        <input class="form-control " type="text" v-model="apellido" id="" placeholder="Apellido" required />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="text" v-model="nombre" id="" placeholder="Nombre" required />
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" name="tipoDoc" v-model="tipoDoc" id="" required>
                            <option selected disabled>Tipo de Documento</option>
                            <option value="dni">DNI</option>
                            <option value="pas">PAS</option>
                            <option value="le">LE</option>
                            <option value="lc">LC</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="documento" id="" placeholder="Documento"
                            required />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="telefono" id="" placeholder="Teléfono"
                            required />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="telefonoAlt" id=""
                            placeholder="Tel. Alternativo" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fnac" for="fecha">Fecha de Nacimiento</label>
                        <input class="form-control date" type="date" v-model="fecha" id="">
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="email" v-model="email" id="" placeholder="Correo electrónico">
                    </div>
                    <div class="col-md-4">
                        <input class="form-control" type="text" v-model="barrio" id="" placeholder="Barrio">
                    </div>
                    <div class="col-md-4">
                        <input class="form-control" type="text" v-model="calleMza" id="" placeholder="Calle / Mza">
                    </div>
                    <div class="col-md-4">
                        <input class="form-control" type="text" v-model="numLote" id="" placeholder="Lote">
                    </div>
                    <div class="col-md-4">
                        <input class="form-control" type="number" v-model="piso" id="" placeholder="Piso">
                    </div>
                    <div class="col-md-4">
                        <input class="form-control" type="text" v-model="dpto" id="" placeholder="Departamento">
                    </div>
                    <div class="col-md-4">
                        <input class="form-control" type="text" v-model="entreCalles" id="" placeholder="Entre calles">
                    </div>
                </div>
                <div class="mt-3 row g-3 div-forms border">
                    <h4 class="titulo-div-forms mb-2">Datos de Facturación</h4>
                    <div class="col-md-12">
                        <input class="form-control" type="text" v-model="razon" id="" placeholder="Razón Social" />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="cuit" id="" placeholder="CUIT" />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="ingresosBrutos" id=""
                            placeholder="Ingresos Brutos" />
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" v-model="servicio" id="">
                            <option selected>Servicio</option>
                            <option value="2play-masivo">2Play Masivo</option>
                            <option value="3play-masivo">3Play Masivo</option>
                            <option value="2play-empresas">2Play Empresas</option>
                            <option value="3play-empresas">3Play Empresas</option>
                            <option value="2play-corpo">2Play Corpo</option>
                            <option value="3play-corpo">3Play Corpo</option>
                            <option value="adicional-tv">Adicional TV</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" v-model="velocidad" id="">
                            <option selected>Velocidad</option>
                            <option value="50mb">50 Mb</option>
                            <option value="100mb">100 Mb</option>
                            <option value="300mb">300 Mb</option>
                            <option value="600mb">600 Mb</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="text" v-model="sellout" id="" placeholder="Sellout" />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="numTvs" id="" placeholder="N° TVs">
                    </div>
                    <div class="col-md-6 text-center">
                        <label for="converge">Converge</label>
                        <input class="form-check-input largerCheckbox" type="checkbox" v-model="converge" id="" />
                        <label class="fnac" for="converge">Portabilidad Fija</label>
                        <input class="form-check-input largerCheckbox" type="checkbox" v-model="portaFija" id="">
                    </div>
                </div>
                <textarea class="form-control mt-3 text-area div-forms border" type="text" v-model="observaciones" id=""
                    placeholder="Observaciones"></textarea>
                <div class="mt-3 row g-3 div-forms border">
                    <button class="btn botones" type="reset">Limpiar</button>

                    <button type="submit" class="btn btn-success botones">Guardar</button>

                </div>
            </form>
        </div>
    </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            // Inicializa aquí tus variables de datos según los campos del formulario
            apellido: "",
            nombre: "",
            tipoDoc: "Tipo de Documento",
            documento: null,
            telefono: null,
            telefonoAlt: null,
            fecha: null,
            email: "",
            converge: false,
            barrio: "",
            calleMza: "",
            numLote: "",
            piso: null,
            dpto: "",
            entreCalles: "",
            razon: "",
            cuit: null,
            ingresosBrutos: null,
            servicio: "Servicio",
            velocidad: "Velocidad",
            sellout: "",
            numTvs: null,
            portaFija: false,
            observaciones: "",
        };
    },
    methods: {
        async cargarBaf() {
            try {
                await axios.post("/baf", {
                    apellido: this.apellido,
                    nombre: this.nombre,
                    tipoDoc: this.tipoDoc,
                    documento: this.documento,
                    telefono: this.telefono,
                    telefonoAlt: this.telefonoAlt,
                    fecha: this.fecha,
                    email: this.email,
                    converge: this.converge,
                    barrio: this.barrio,
                    calleMza: this.calleMza,
                    numLote: this.numLote,
                    piso: this.piso,
                    dpto: this.dpto,
                    entreCalles: this.entreCalles,
                    razon: this.razon,
                    cuit: this.cuit,
                    ingresosBrutos: this.ingresosBrutos,
                    servicio: this.servicio,
                    velocidad: this.velocidad,
                    sellout: this.sellout,
                    numTvs: this.numTvs,
                    portaFija: this.portaFija,
                    observaciones: this.observaciones,
                });

                // Maneja la respuesta del servidor aquí, por ejemplo, muestra un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    text: 'Cliente agregado correctamente!'
                });

                // Restablece los campos del formulario después de enviarlos
                this.resetForm();
            } catch (error) {
                console.error("Error al cargar cliente:", error);
                Swal.fire({
                    icon: 'error',
                    text: 'Ocurrió un error!'
                });
            }
        },
        resetForm() {
            // Restablece todos los campos del formulario a sus valores iniciales
            this.apellido = "";
            this.nombre = "";
            this.tipoDoc = "Tipo de Documento";
            this.documento = null;
            this.telefono = null;
            this.telefonoAlt = null;
            this.fecha = null;
            this.email = "";
            this.converge = false;
            this.barrio = "";
            this.calleMza = "";
            this.numLote = "";
            this.piso = null;
            this.dpto = "";
            this.entreCalles = "";
            this.razon = "";
            this.cuit = null;
            this.ingresosBrutos = null;
            this.servicio = "Servicio";
            this.velocidad = "Velocidad";
            this.sellout = "";
            this.numTvs = null;
            this.portaFija = false;
            this.observaciones = "";
        },
    },
};
</script>

<style scoped>
input.date {
    height: 45px;
}

.fnac {
    margin-left: 15px;
    margin-top: 5px;
}

input.largerCheckbox {
    width: 40px !important;
    height: 40px !important;
}

textarea {
    resize: none;
}

.btn-limpiar {
    display: inline-flex !important;
    justify-content: flex-start !important;
}

.botones {
    width: 40%;
}

.inline {
    display: inline-block !important;
}

.text-area {
    height: 100px;
}

.titulo-div-forms {
    margin: auto;
}

.div-forms {
    margin: auto;
    padding: 20px;
    border-color: black !important;
    border-radius: 5px !important;
    justify-content: center !important;
}


.col-md-6 {
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline-flex !important;
    justify-content: center !important;
    align-items: center !important;
}

.form-check-input {
    margin-left: 20px;
}</style>
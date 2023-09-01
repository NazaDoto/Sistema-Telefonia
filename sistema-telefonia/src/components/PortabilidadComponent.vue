<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div class="container mt-4 mb-2">
            <h1 class="text-center">Carga de Portabilidad</h1>

            <form @submit.prevent="cargarPortabilidad" action="" method="post">
                <div class="row g-3 div-forms border">
                    <h4 class="titulo-div-forms mb-2">Datos Personales</h4>
                    <div class="col-md-6">
                        <input class="form-control " type="text" v-model="apellido" id="" placeholder="Apellido" required />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="text" v-model="nombre" id="" placeholder="Nombre" required />
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" v-model="tipo_documento" id="" required>
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
                </div>
                <div class="mt-3 row g-3 div-forms border">
                    <h4 class="titulo-div-forms mb-2">Datos de Contacto</h4>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="telefono" id="" placeholder="Tel. a Migrar"
                            required />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="telefono_alt" id=""
                            placeholder="Tel. Alternativo" />
                    </div>
                </div>
                <div class="mt-3 row g-3 div-forms border">
                    <h4 class="titulo-div-forms mb-2">Datos de Facturación</h4>
                    <div class="col-md-6">
                        <input class="form-control" type="text" v-model="razon_social" id="" placeholder="Razón Social" />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="cuit" id="" placeholder="CUIT" />
                    </div>
                    <div class="col-md-6">
                        <input class="form-control" type="number" v-model="ingresos_brutos" id=""
                            placeholder="Ingresos Brutos" />
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" v-model="modalidad" id="">
                            <option selected>Modalidad</option>
                            <option value="abono-abono">Abono a Abono</option>
                            <option value="prepago-abono">Prepago a Abono</option>
                            <option value="prepago-prepago">Prepago a Prepago</option>
                            <option value="linea-nueva">Línea Nueva</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" v-model="abono" id="">
                            <option selected>Abono</option>
                            <option value="1-gb">1GB</option>
                            <option value="3-gb">3GB</option>
                            <option value="5-gb">5GB</option>
                            <option value="8-gb">8GB</option>
                            <option value="15-gb">15GB</option>
                            <option value="25-gb">25GB</option>
                            <option value="prepago">Prepago</option>
                        </select>
                    </div>
                    <div class="col-md-6 text-center">
                        <label for="converge">Converge</label>
                        <input class="form-check-input largerCheckbox" type="checkbox" v-model="converge" id="" />
                    </div>
                    <div class="col-md-12">
                        <input class="form-control" type="text" v-model="sellout" id="" placeholder="Sellout" />
                    </div>
                </div>
                <textarea class="form-control mt-3 text-area div-forms border" type="text" v-model="observaciones" id=""
                    placeholder="Observaciones"></textarea>
                <div class="mt-3 row g-3 div-forms border">
                    <button class="btn botones" type="reset">Limpiar</button>
                    <button class="btn btn-success botones" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import NavbarComponent from "./NavbarComponent.vue";
import Swal from 'sweetalert2'
export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            apellido: '',
            nombre: '',
            tipo_documento: 'Tipo de Documento',
            documento: '',
            telefono: '',
            telefono_alt: '',
            razon_social: '',
            cuit: '',
            ingresos_brutos: '',
            modalidad: 'Modalidad',
            abono: 'Abono',
            converge: false,
            sellout: '',
            observaciones: '',
            usuarioId: localStorage.getItem('id'),
        };
    },
    methods: {
        cargarPortabilidad() {
            const formData = {
                apellido: this.apellido,
                nombre: this.nombre,
                tipo_documento: this.tipo_documento,
                documento: this.documento,
                telefono: this.telefono,
                telefono_alt: this.telefono_alt,
                razon_social: this.razon_social,
                cuit: this.cuit,
                ingresos_brutos: this.ingresos_brutos,
                modalidad: this.modalidad,
                abono: this.abono,
                converge: this.converge,
                sellout: this.sellout,
                observaciones: this.observaciones,
                usuarioId: this.usuarioId,

            };

            axios
                .post('/portabilidad', formData)
                .then((response) => {
                    console.log(response.data.message);
                    Swal.fire({
                    icon: 'success',
                    text: 'Cliente agregado correctamente!'
                });
                    this.resetForm();
                    // Aquí puedes hacer lo que necesites después de la inserción exitosa.
                })
                .catch((error) => {
                    console.error('Error al enviar datos al servidor: ' + error.message);
                    Swal.fire({
                    icon: 'error',
                    text: 'Ocurrió un error!'
                });
                    // Aquí puedes manejar errores de manera adecuada.
                });
        },
        resetForm() {
            this.apellido = "";
            this.nombre = "";
            this.tipo_documento = "Tipo de Documento";
            this.documento = '';
            this.telefono = '';
            this.telefono_alt = '';
            this.razon_social = '';
            this.cuit = '';
            this.ingresos_brutos = '';
            this.modalidad = 'Modalidad';
            this.abono = 'Abono';
            this.converge = false;
            this.sellout = '';
            this.observaciones = '';
        },
    },
};
</script>

<style scoped>
input.largerCheckbox {
    width: 40px;
    height: 40px;
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
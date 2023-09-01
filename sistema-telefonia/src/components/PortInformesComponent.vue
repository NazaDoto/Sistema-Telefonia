<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div class="container mt-4 mb-2">
            <h1 class="text-center">Informes Portabilidad</h1>
            <div class="flex">

                <div class="izquierda ancho-busqueda">
                    <input class="form-control" v-model="busqueda" type="text" name="busqueda" id="" placeholder="Buscar"
                        title="Ingresa nombre o apellido o fecha o teléfono">
                </div>
                <div class="derecha mt-4 g-3">
                    <button class="btn btn-xls" @click="exportToXLS()" title="Descargar todo en formato Excel"></button>
                    <button class="btn btn-pdf" @click="exportToPDF()" title="Descargar todo en formato PDF"></button>
                </div>
            </div>
            <div class="ancho border border-2 mt-2">
                <table class="table table-dark table-striped text-center" id="informe-table">
                    <thead>
                        <tr>
                            <th>Alta</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Tipo de Documento</th>
                            <th>Documento</th>
                            <th>Tel. a Migrar</th>
                            <th>Tel. Alternativo</th>
                            <th>Converge</th>
                            <th>Razón Social</th>
                            <th>CUIT</th>
                            <th>Ingresos Brutos</th>
                            <th>Modalidad</th>
                            <th>Abono</th>
                            <th>Sellout</th>
                            <th class="obs-head">Observaciones</th>
                            <th> </th>
                            <th> </th>

                        </tr>
                    </thead>
                    <tbody>
                        <!-- Itera sobre los datos de la lista de informes y muestra cada fila en la tabla -->
                        <tr v-for="(informe, index) in informesFiltrados" :key="index">
                            <td>{{ formatDate(informe.fecha_alta) }}</td>
                            <td>{{ informe.apellido }}</td>
                            <td>{{ informe.nombre }}</td>
                            <td>{{ informe.tipo_documento }}</td>
                            <td>{{ informe.documento }}</td>
                            <td>{{ informe.telefono }}</td>
                            <td>{{ informe.telefono_alt }}</td>
                            <td>{{ informe.converge ? 'Sí' : 'No' }}</td>
                            <td>{{ informe.razon_social }}</td>
                            <td>{{ informe.cuit }}</td>
                            <td>{{ informe.ingresos_brutos }}</td>
                            <td>{{ informe.modalidad }}</td>
                            <td>{{ informe.abono }}</td>
                            <td>{{ informe.sellout }}</td>
                            <td class="obs-head">{{ informe.observaciones }}</td>
                            <td>
                                <button class="btn btn-xls" @click="simpleExportToXLS(index)"
                                    title="Descargar esta línea en formato Excel"></button>
                            </td>
                            <td>
                                <button class="btn btn-pdf" @click="simpleExportToPDF(index)"
                                    title="Descargar esta línea en formato PDF"></button>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="informesFiltrados.length === 0" class="text-center mt-3">
                    No se encontraron resultados para esa búsqueda.
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import NavbarComponent from './NavbarComponent.vue';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default {
    components: {
        NavbarComponent,
    },
    data() {
        return {
            informes: [], // Almacena los informes cargados desde el servidor
            busqueda: '',
            usuario_id: localStorage.getItem('id'),

        };
    },
    created() {
        // Realiza una solicitud HTTP para obtener los informes desde el servidor
        this.fetchInformes();
    },
    computed: {
        informesFiltrados() {
            // Filtra los informes basándose en el valor de busqueda
            return this.informes.filter(informe => {
                const apellido = informe.apellido || '';
                const nombre = informe.nombre || '';
                const telefono = informe.telefono.toString() || '';
                const fechaAlta = new Date(informe.fecha_alta).toLocaleDateString('es-ES') || new Date().toLocaleDateString('es-ES');

                return (
                    apellido.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    telefono.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                    fechaAlta.toLowerCase().includes(this.busqueda.toLowerCase())
                    // Agrega más condiciones de búsqueda según tus necesidades
                );
            });
        },
    },
    methods: {
        async fetchInformes() {
            try {
                // Realiza una solicitud HTTP GET para obtener los informes desde el servidor
                const response = await axios.get(`/portinformes?usuario_id=${this.usuario_id}`);

                // Actualiza la lista de informes con los datos recibidos
                this.informes = response.data;
            } catch (error) {
                console.error("Error al cargar los informes:", error);
            }
        },
        formatDate(date) {
            if (!date) return '';
            const formattedDate = new Date(date).toLocaleDateString('es-ES');
            return formattedDate;
        },
        exportToXLS() {
            // Crea un nuevo libro de Excel
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Informe');
            // Agrega encabezados de columna
            worksheet.addRow(['Alta', 'Apellido', 'Nombre', 'Tipo Doc', 'Documento', 'Teléfono', 'Tel. Alt.', 'Converge', 'Razón Social', 'CUIT', 'Ingresos Brutos', 'Modalidad', 'Abono', 'Sellout', 'Observaciones'/* ...otras columnas... */]);

            // Agrega datos de informe a la hoja de trabajo
            this.informes.forEach(informe => {

                worksheet.addRow([
                    this.formatDate(informe.fecha_alta),
                    informe.apellido,
                    informe.nombre,
                    informe.tipo_documento,
                    informe.documento,
                    informe.telefono,
                    informe.telefono_alt,
                    informe.converge ? 'Sí' : 'No',
                    informe.razon_social,
                    informe.cuit,
                    informe.ingresos_brutos,
                    informe.modalidad,
                    informe.abono,
                    informe.sellout,
                    informe.observaciones
                ]);
            });

            // Crea un Blob a partir del libro de Excel
            workbook.xlsx.writeBuffer().then((buffer) => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // Crea un enlace para descargar el archivo Excel
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Informe.xlsx';
                link.click();
            });
        },



        simpleExportToXLS(index) {
            // Crea un nuevo libro de Excel
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Informe');

            // Agrega encabezados de columna
            worksheet.addRow(['Alta', 'Apellido', 'Nombre', 'Tipo Doc', 'Documento', 'Teléfono', 'Tel. Alt.', 'Fecha Nacimiento', 'Mail', 'Converge', 'Barrio', 'Calle / Mza', 'Lote', 'Piso', 'Depto', 'Entre Calles', 'Razón Social', 'CUIT', 'Ingresos Brutos', 'Servicio', 'Velocidad', 'Sellout', 'N° TVs', 'Port. Fija', 'Observaciones'/* ...otras columnas... */]);

            // Agrega datos de informe a la hoja de trabajo
            worksheet.addRow([
                this.formatDate(this.informes[index].fecha_alta),
                this.informes[index].apellido,
                this.informes[index].nombre,
                this.informes[index].tipo_documento,
                this.informes[index].documento,
                this.informes[index].telefono,
                this.informes[index].telefono_alt,
                this.informes[index].converge ? 'Sí' : 'No',
                this.informes[index].razon_social,
                this.informes[index].cuit,
                this.informes[index].ingresos_brutos,
                this.informes[index].modalidad,
                this.informes[index].abono,
                this.informes[index].sellout,
                this.informes[index].observaciones
                /* ...otros datos... */
            ]);

            // Crea un Blob a partir del libro de Excel
            workbook.xlsx.writeBuffer().then((buffer) => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // Crea un enlace para descargar el archivo Excel
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Informe.xlsx';
                link.click();
            });
        },


        exportToPDF() {
            // Crea un nuevo documento PDF
            const doc = new jsPDF({
                orientation: 'landscape',
            });
            // Define los datos que deseas agregar a la tabla
            const data = [];

            this.informes.forEach(informe => {
                data.push([
                    this.formatDate(informe.fecha_alta),
                    informe.apellido,
                    informe.nombre,
                    informe.tipo_documento,
                    informe.documento,
                    informe.telefono,
                    informe.telefono_alt,
                    informe.converge ? 'Sí' : 'No',
                    informe.razon_social,
                    informe.cuit,
                    informe.ingresos_brutos,
                    informe.modalidad,
                    informe.abono,
                    informe.sellout,
                    informe.observaciones
                ]);
            });



            doc.autoTable({
                head: [['ALTA', 'APELLIDO', 'NOMBRE', 'TIPO_DOC', 'DOCUMENTO', 'TELEFONO', 'TEL_ALT', '¿CONV?', 'RAZÓN SOC.', 'CUIT', 'I. BRUTOS', 'MODALIDAD', 'ABONO', 'SELLOUT', 'OBSERVACIONES'/* ...otras columnas... */]],
                body: data,
                tableWidth: 'auto',
                margin: { top: 20, right: 2, left: 2 },
                styles: { fontSize: 6 },
            });

            // Guarda o abre el archivo PDF
            doc.save('Informe.pdf');
        },



        simpleExportToPDF(index) {
            // Crea un nuevo documento PDF
            const doc = new jsPDF();
            // Define los datos que deseas agregar a la tabla
            const data1 = [
                [
                    this.formatDate(this.informes[index].fecha_alta),
                    this.informes[index].apellido,
                    this.informes[index].nombre,
                    this.informes[index].tipo_documento,
                    this.informes[index].documento,
                    this.informes[index].telefono,
                    this.informes[index].telefono_alt]];

            const data2 = [[
                this.informes[index].converge ? 'Sí' : 'No',
                this.informes[index].razon_social,
                this.informes[index].cuit,
                this.informes[index].ingresos_brutos,
                this.informes[index].modalidad,
                this.informes[index].abono,
                this.informes[index].sellout,
                this.informes[index].observaciones]];

            const fontSize = 10; // Tamaño de fuente personalizable
            doc.setFontSize(fontSize);
            doc.autoTable({
                head: [['ALTA', 'APELLIDO', 'NOMBRE', 'TIPO_DOC', 'DOC', 'TEL', 'TEL_ALT' /* ...otras columnas... */]],
                body: data1,
                startY: 10, // Establece la posición vertical de la tabla
            });
            const startY2 = doc.autoTable.previous.finalY + 10;
            doc.autoTable({
                //  head: [['ALTA', 'APE', 'NOM', 'TIPO_DOC', 'DOC', 'TEL', 'TEL_ALT', 'F_NAC', 'EMAIL', 'CONV', 'BARRIO', 'C/MZA', 'LOTE', 'PISO', 'DEPTO', 'E/CALLES', 'RAZÓN SOC.', 'CUIT', 'I. BRUTOS', 'SERV', 'VEL', 'SELLOUT', 'N°TVS', 'P.FIJA', 'OBS'/* ...otras columnas... */]],
                head: [['F_NAC', 'EMAIL', 'CONV', 'BARRIO', 'C/MZA', 'LOTE', 'PISO', 'DEPTO', 'E/CALLES'/* ...otras columnas... */]],
                body: data2,
                startY: startY2, // Establece la misma posición vertical para la segunda tabla
                marginLeft: 105,
            });

            // Guarda o abre el archivo PDF
            doc.save('Informe.pdf');
        },
    },


};
</script>

<style>
.flex {
    display: flex;
    justify-content: space-between;
}

.ancho {
    min-height: 60vh;
    overflow: auto;
}

.derecha {
    display: inline-flex;
    justify-content: center;
    gap: 15px;
    margin-right: 10px;
}

.btn-xls {
    background-image: url('../assets/iconos/xls.png');
    background-repeat: no-repeat;
    background-size: contain;
    width: 50px;
    height: 50px;
}

.btn-pdf {
    background-image: url('../assets/iconos/pdf.png');
    background-repeat: no-repeat;
    background-size: contain;
    width: 50px;
    height: 50px;
}

th {
    white-space: nowrap;
}

.obs-head {
    text-overflow: ellipsis;
    white-space: nowrap !important;
    width: 200px !important;
    overflow: hidden;
    max-width: 60ch;
}

.ancho-busqueda {
    width: 400px;
    height: 50px;
    display: inline-flex;
    margin-top: auto;
}

@media screen and (max-width: 992px) {
    .ancho-busqueda {
        width: 180px;
    }
}

/* Agrega estilos CSS según tus preferencias */</style>
  
<template>
    <div>
        <NavbarComponent></NavbarComponent>
        <div class="container mt-4 mb-2">
            <h1 class="text-center">Informes BAF</h1>
            <div class="izquierda mt-4">
                <button class="btn btn-success" @click="exportToXLS()">Descargar Todo Excel</button>
                <button class="btn btn-success" @click="exportToPDF()">Descargar Todo PDF</button>
            </div>
            <div class="ancho border border-2">
                <table class="table table-dark table-striped" id="informe-table">
                    <thead>
                        <tr>
                            <th>Alta</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Tipo de Documento</th>
                            <th>Documento</th>
                            <th>Teléfono</th>
                            <th>Tel. Alternativo</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Correo Electrónico</th>
                            <th>Converge</th>
                            <th>Barrio</th>
                            <th>Calle / Mza</th>
                            <th>Lote</th>
                            <th>Piso</th>
                            <th>Departamento</th>
                            <th>Entre Calles</th>
                            <th>Razón Social</th>
                            <th>CUIT</th>
                            <th>Ingresos Brutos</th>
                            <th>Servicio</th>
                            <th>Velocidad</th>
                            <th>Sellout</th>
                            <th>N° TVs</th>
                            <th>Portabilidad Fija</th>
                            <th>Observaciones</th>
                            <th> </th>
                            <th> </th>

                        </tr>
                    </thead>
                    <tbody>
                        <!-- Itera sobre los datos de la lista de informes y muestra cada fila en la tabla -->
                        <tr v-for="(informe, index) in informes" :key="index">
                            <td>{{ formatDate(informe.fecha_alta) }}</td>
                            <td>{{ informe.apellido }}</td>
                            <td>{{ informe.nombre }}</td>
                            <td>{{ informe.tipo_documento }}</td>
                            <td>{{ informe.documento }}</td>
                            <td>{{ informe.telefono }}</td>
                            <td>{{ informe.telefono_alt }}</td>
                            <td>{{ formatDate(informe.fecha_nacimiento) }}</td>
                            <td>{{ informe.email }}</td>
                            <td>{{ informe.converge ? 'Sí' : 'No' }}</td>
                            <td>{{ informe.barrio }}</td>
                            <td>{{ informe.calle_mza }}</td>
                            <td>{{ informe.num_lote }}</td>
                            <td>{{ informe.piso }}</td>
                            <td>{{ informe.dpto }}</td>
                            <td>{{ informe.entre_calles }}</td>
                            <td>{{ informe.razon_social }}</td>
                            <td>{{ informe.cuit }}</td>
                            <td>{{ informe.ingresos_brutos }}</td>
                            <td>{{ informe.servicio }}</td>
                            <td>{{ informe.velocidad }}</td>
                            <td>{{ informe.sellout }}</td>
                            <td>{{ informe.num_tvs }}</td>
                            <td>{{ informe.portabilidad_fija ? 'Sí' : 'No' }}</td>
                            <td>{{ informe.observaciones }}</td>
                            <td>
                                <button class="btn btn-success" @click="simpleExportToXLS(index)">Descargar Excel</button>
                            </td>
                            <td>
                                <button class="btn btn-success" @click="simpleExportToPDF(index)">Descargar PDF</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
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
        };
    },
    created() {
        // Realiza una solicitud HTTP para obtener los informes desde el servidor
        this.fetchInformes();
    },
    methods: {
        async fetchInformes() {
            try {
                // Realiza una solicitud HTTP GET para obtener los informes desde el servidor
                const response = await axios.get("/bafinformes");

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
            worksheet.addRow(['Alta', 'Apellido', 'Nombre', 'Tipo Doc', 'Documento', 'Teléfono', 'Tel. Alt.', 'Fecha Nacimiento', 'Mail', 'Converge', 'Barrio', 'Calle / Mza', 'Lote', 'Piso', 'Depto', 'Entre Calles', 'Razón Social', 'CUIT', 'Ingresos Brutos', 'Servicio', 'Velocidad', 'Sellout', 'N° TVs', 'Port. Fija', 'Observaciones'/* ...otras columnas... */]);

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
                    this.formatDate(informe.fecha_nacimiento),
                    informe.email,
                    informe.converge ? 'Sí' : 'No',
                    informe.barrio,
                    informe.calle_mza,
                    informe.num_lote,
                    informe.piso,
                    informe.dpto,
                    informe.entre_calles,
                    informe.razon_social,
                    informe.cuit,
                    informe.ingresos_brutos,
                    informe.servicio,
                    informe.velocidad,
                    informe.sellout,
                    informe.num_tvs,
                    informe.portabilidad_fija ? 'Sí' : 'No',
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
                this.formatDate(this.informes[index].fecha_nacimiento),
                this.informes[index].email,
                this.informes[index].converge ? 'Sí' : 'No',
                this.informes[index].barrio,
                this.informes[index].calle_mza,
                this.informes[index].num_lote,
                this.informes[index].piso,
                this.informes[index].dpto,
                this.informes[index].entre_calles,
                this.informes[index].razon_social,
                this.informes[index].cuit,
                this.informes[index].ingresos_brutos,
                this.informes[index].servicio,
                this.informes[index].velocidad,
                this.informes[index].sellout,
                this.informes[index].num_tvs,
                this.informes[index].portabilidad_fija ? 'Sí' : 'No',
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
                    this.formatDate(informe.fecha_nacimiento),
                    informe.email,
                    informe.converge ? 'Sí' : 'No',
                    informe.barrio,
                    informe.calle_mza,
                    informe.num_lote,
                    informe.piso,
                    informe.dpto,
                    informe.entre_calles,
                    informe.razon_social,
                    informe.cuit,
                    informe.ingresos_brutos,
                    informe.servicio,
                    informe.velocidad,
                    informe.sellout,
                    informe.num_tvs,
                    informe.portabilidad_fija ? 'Sí' : 'No',
                    informe.observaciones
                ]);
            });
        

            
            doc.autoTable({
                head: [['ALTA', 'APELLIDO', 'NOMBRE', 'TIPO_DOC', 'DOCUMENTO', 'TELEFONO', 'TEL_ALT', 'F_NAC', 'EMAIL', '¿CONV?', 'BARRIO', 'C/MZA', 'LOTE', 'PISO', 'DEPTO', 'E/CALLES', 'RAZÓN SOC.', 'CUIT', 'I. BRUTOS', 'SERV', 'VEL', 'SELLOUT', 'N°TVS', '¿P.F.?', 'OBSERVACIONES'/* ...otras columnas... */]],
                body: data,
                tableWidth: 'auto',
    margin: { top: 20, right:2, left:2 },
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
                this.formatDate(this.informes[index].fecha_nacimiento),
                this.informes[index].email,
                this.informes[index].converge ? 'Sí' : 'No',
                this.informes[index].barrio,
                this.informes[index].calle_mza,
                this.informes[index].num_lote,
                this.informes[index].piso,
                this.informes[index].dpto,
                this.informes[index].entre_calles]];

            const data3 = [[
                this.informes[index].razon_social,
                this.informes[index].cuit,
                this.informes[index].ingresos_brutos,
                this.informes[index].servicio,
                this.informes[index].velocidad,
                this.informes[index].sellout,
                this.informes[index].num_tvs,
                this.informes[index].portabilidad_fija ? 'Sí' : 'No',
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
            const startY3 = doc.autoTable.previous.finalY + 10;
            doc.autoTable({
                //  head: [['ALTA', 'APE', 'NOM', 'TIPO_DOC', 'DOC', 'TEL', 'TEL_ALT', 'F_NAC', 'EMAIL', 'CONV', 'BARRIO', 'C/MZA', 'LOTE', 'PISO', 'DEPTO', 'E/CALLES', 'RAZÓN SOC.', 'CUIT', 'I. BRUTOS', 'SERV', 'VEL', 'SELLOUT', 'N°TVS', 'P.FIJA', 'OBS'/* ...otras columnas... */]],
                head: [['RAZÓN SOC.', 'CUIT', 'ING. BRUTOS', 'SERV', 'VEL', 'SELLOUT', 'N°TVS', 'P.FIJA', 'OBSERVACIONES'/* ...otras columnas... */]],
                body: data3,
                startY: startY3, // Establece la misma posición vertical para la segunda tabla
                marginLeft: 105,
            });

            // Guarda o abre el archivo PDF
            doc.save('Informe.pdf');
        },
    },


};
</script>
  
<style>
.ancho {
    min-height: 60vh;
    overflow: auto;
}

.izquierda {
    display: flex;
    justify-content: end;
    gap: 10px;
}

/* Agrega estilos CSS según tus preferencias */
</style>
  
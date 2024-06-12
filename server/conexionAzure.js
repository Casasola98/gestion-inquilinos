const sql = require('mssql'); // Se debe ejecutar en terminal: npm install mssql

const config = {
    user: 'adminsql',
    password: 'Password86',
    server: 'serverproyecto.database.windows.net',
    database: 'bdproyecto1',
    options: {
        encrypt: true // Usa el cifrado para Azure SQL Database
    }
};


// Consulta para obtener todas las tablas
async function getAllTables() {
    try {
        let pool = await sql.connect(config);
        let tablesResult = await pool.request().query(`
            SELECT TABLE_NAME
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE = 'BASE TABLE';
        `);

        let tables = tablesResult.recordset.map(row => row.TABLE_NAME);

        for (let table of tables) {
            console.log(`\nTabla: ${table}`);
            await getTableData(table);
        }
    } catch (err) {
        console.error('Error obteniendo las tablas:', err);
    }
}

// Consulta para obtener las columnas y datos de una tabla específica
async function getTableData(tableName) {
    try {
        let pool = await sql.connect(config);

        // Obtener las columnas de la tabla
        let columnsResult = await pool.request().query(`
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = '${tableName}';
        `);
        let columns = columnsResult.recordset.map(row => row.COLUMN_NAME);
        console.log(`Columnas: ${columns.join(', ')}`);

        // Obtener los datos de la tabla
        let dataResult = await pool.request().query(`SELECT TOP 10 * FROM ${tableName};`);
        console.log('Datos:');
        console.table(dataResult.recordset);
    } catch (err) {
        console.error(`Error obteniendo datos de la tabla ${tableName}:`, err);
    }
}

// Llamar a la función para obtener todas las tablas y sus datos
getAllTables();


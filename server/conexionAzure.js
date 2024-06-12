const sql = require('mssql'); // Se debe ejecutar en terminal: install mssql

const config = {
    user: 'adminsql',
    password: 'Password86',
    server: 'serverproyecto.database.windows.net',
    database: 'bdproyecto1',
    options: {
        encrypt: true // Usa el cifrado para Azure SQL Database
    }
};

// Conectarse y hacer una consulta
async function connectAndQuery() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM Proveedores;');
        console.log(result);
    } catch (err) {
        console.error('Error conectando a la base de datos:', err);
    }
}

connectAndQuery();


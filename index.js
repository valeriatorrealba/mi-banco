const { Pool } = require("pg");

const config = {
    host: "localhost",
    port: 5432,
    database: "banco",
    user: "postgres",
    password: "0000",
};

const pool = new Pool(config);

const argumentos = process.argv.slice(2);
const tipo_transaction = argumentos[0];
const cuenta = argumentos[1];
const fecha = argumentos[2];
const descripcion = argumentos[3];
const monto = argumentos[4];
const cuentaDestino = argumentos[5];

const nueva = async({ descripcion, fecha, monto, cuenta, cuentaDestino }) => {
    const nueva = {
        text: "insert into transferencias values ($1,$2,$3,$4,$5) returning * ",
        values:[descripcion, fecha, monto, cuenta, cuentaDestino],
    };

    const actualizarCuentaOrigen = {
        text: "update cuentas set saldo = saldo - $1 where id = $2 returning *",
        values: [monto, cuenta]
    };
    const actualizarCuentaDestino = {
        text: "update cuentas set saldo = saldo + $1 where id = $2 returning *",
        values: [monto, cuentaDestino]
    }
    
    try{
        await pool.query("BEGIN");
        const result = await pool.query(nueva);
        await pool.query(actualizarCuentaOrigen);
        await pool.query(actualizarCuentaDestino);
        await pool.query("COMMIT");
        console.log("Transacción realizada con exito");
        console.log("Última transacción: ", result.rows[0]);
    } catch (error){
        await pool.query("ROLLBACK");
        throw error
    };
};

const consulta = async({ cuenta }) =>{
    const { rows } = await pool.query(`select * from transferencias where ceunta_origen = ${cuenta} order by fecha desc limit 10`);
    console.log(`Las últimas 10 transferencias de la cuenta ${cuenta} son: `);
    console.log(rows);
};

const consultarSaldo = async({ cuenta }) => {
    const { rows: [{ saldo }]} = await pool.query(`select saldo from cuentas where id = ${cuenta};`);
    console.log(`El saldo actual de la cuenta ${cuenta} es: ${saldo}`);
}

const funciones ={
    nueva,
    consulta,
    "consulta-saldo": consultarSaldo
};

(async ()=>{
    try {
        await funciones[tipo_transaction]({cuenta, fecha, descripcion, monto, cuentaDestino});
    } catch (error) {
        console.log("Error", error);
    }finally{
        pool.end();
    }
})(); 

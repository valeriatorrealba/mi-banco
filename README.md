# Desafío Guiado - Mi Banco

## Descripción

La empresa **Mi Banco SPA** está buscando desarrollar un sistema robusto para gestionar transacciones bancarias. Se requiere construir una aplicación en Node.js que interactúe con PostgreSQL para realizar operaciones bancarias con control de transacciones. La aplicación debe manejar correctamente los movimientos bancarios para evitar balances negativos y asegurar la integridad de las transacciones.

En este desafío, debes construir una aplicación que:
- Se conecte a una base de datos PostgreSQL.
- Utilice transacciones para simular el comportamiento de una transacción bancaria.

## Requerimientos

1. **Registrar una nueva transferencia**:
   - **Descripción**: Crear una función asíncrona que registre una nueva transferencia en la base de datos utilizando una transacción SQL. Después de registrar, debe mostrar por consola la última transferencia registrada.

2. **Consultar las últimas transferencias de una cuenta**:
   - **Descripción**: Crear una función asíncrona que consulte la tabla de transferencias y retorne los últimos 10 registros de una cuenta específica.

3. **Consultar el saldo de una cuenta**:
   - **Descripción**: Crear una función asíncrona que consulte y retorne el saldo de una cuenta específica.

4. **Captura de errores en transacciones**:
   - **Descripción**: En caso de que haya un error en una transacción SQL, la aplicación debe capturar y retornar el error por consola.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **pg**: Paquete para interactuar con bases de datos PostgreSQL desde Node.js.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar los datos bancarios.

## Instrucciones para Ejecutar el Proyecto

1. **Crear la base de datos**:
   ```sql
   CREATE DATABASE Banco;

2. **Crear la tabla**:

    ```sql
    CREATE TABLE transferencias (
    descripcion VARCHAR(50),
    fecha VARCHAR(10),
    monto DECIMAL,
    cuenta_origen INT,
    cuenta_destino INT
    );

    CREATE TABLE cuentas (
    id INT PRIMARY KEY,
    saldo DECIMAL CHECK (saldo >= 0)
    );

3. **Insertar datos iniciales:**

    ```sql
    INSERT INTO cuentas VALUES (1, 20000);
    INSERT INTO cuentas VALUES (2, 10000); 
    ```

1. **Instalación de Dependencias:**

    - Clona el repositorio y navega al directorio del proyecto.
    - Ejecuta `npm install` para instalar las dependencias necesarias.

2. **Configurar la Base de Datos:**

    -Asegúrate de haber creado la base de datos y las tablas siguiendo las instrucciones anteriores.
    
3. **Ejecutar el Servidor:**

    -Ejecuta node index.js para iniciar el script y realizar las operaciones desde la línea de comandos.

## Uso de las Funciones:

## Ejemplos de Uso

**Registrar una transferencia:**:

    ```bash
    node index.js addTransferencia '{"descripcion": "Pago de factura", "fecha": "2024-07-30", "monto": 5000, "cuenta_origen": 1, "cuenta_destino": 2}'
    
**Consultar últimas transferencias de una cuenta**:

    ```bash
    node index.js getLastTransfers '{"cuenta_id": 1}'
    
**Consultar saldo de una cuenta**:

    ```bash
    node index.js getSaldo '{"cuenta_id": 1}'
    
**Eliminar transferencia**:

    ```bash
    node index.js deleteTransferencia '{"id": 1}'
    

## Autor

Este proyecto fue desarrollado por **Valeria Torrealba**.
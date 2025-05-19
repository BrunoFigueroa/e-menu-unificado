Esta carpeta contiene el backend del sistema **eMenu**, construido con Node.js, Express y PostgreSQL.
# Estructura del proyecto

```
eMenu/  
├── config/             # Configuración de la base de datos PostgreSQL  
├── controllers/        # Lógica de negocio (funcionalidades)
├── models/             # Peticiones SQL hacia la base de datos
├── routes/             # Endpoints de la API REST (GET, POST, PUT, DELETE)
├── app.js              # Configuración de middlewares para Express
├── index.js            # Punto de entrada. Usa rutas y levanta el servidor
├── package.json        # Dependencias y scripts de npm
├── package-lock.json   # Bloqueo de versiones para npm
├── node_modules/       # Módulos instalados
├── .gitignore          # Archivos/carpetas ignoradas por git
```
# Requisitos

- Node.js
- PostgreSQL con la base de datos `emenu4`
# Instalación y Ejecución

```shell
   npm install
   node index
```

	El backend estará disponible en: http://localhost:8080
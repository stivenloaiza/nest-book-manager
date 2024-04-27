
# Book Management API - v1

Book Management API es una aplicación backend desarrollada en Node.js con el framework Nest.js, diseñada para gestionar una colección de libros digital. Esta API permite a los usuarios registrarse, iniciar sesión y administrar libros mediante roles específicos, así como subir archivos relacionados con los libros.

## Demostración

Puedes interactuar con la API utilizando la siguiente URL:

[Ir a probar la API](http://190.147.64.47:5155/api-doc) -> Para ingresar como admin puedes usar estas credenciales:
```json
{
  "email": "prueba@prueba.pru",
  "password": "C0ntr4S3gu++r4"
}
```

Este despliegue refleja el estado más reciente del código en la rama `main`.

## Características

- **Autenticación de Usuarios**: Gestiona el acceso a través de un sistema robusto de autenticación JWT.
- **Validación de Datos**: Asegura la integridad de los datos con validaciones completas en todas las entradas.
- **Gestión de Roles**: Controla el acceso a diferentes partes de la API basándose en roles de usuario (admin, user).
- **Subida de Archivos**: Permite a los usuarios subir archivos, como imágenes de portadas y documentos PDF.
- **Optimización de Consultas**: Mejora el rendimiento mediante consultas optimizadas a la base de datos.

## Tecnologías Utilizadas

- Nest.js: Un framework progresivo de Node.js para construir aplicaciones de servidor eficientes y escalables.
- TypeORM para PostgreSQL: Sistema de gestión de bases de datos relacional para almacenar todos los datos de libros y usuarios.
- JWT: Para la autenticación y gestión de sesiones.
- Swagger: Para la documentación de la API.
- Gitflow: Estrategia de manejo de ramas que mantiene el desarrollo organizado y eficiente.

## Dependencias

Este proyecto utiliza las siguientes librerías y frameworks:

- Nest.js: `@nestjs/common`, `@nestjs/core`, `@nestjs/config`, `@nestjs/platform-express` (versión 10.0.0)
- Autenticación: `@nestjs/jwt` (versión 10.2.0), `@nestjs/passport` (versión 10.0.3), `passport` (versión 0.7.0), `passport-jwt` (versión 4.0.1)
- Documentación de la API: `@nestjs/swagger` (versión 7.3.1)
- ORM y Bases de Datos: `@nestjs/typeorm` (versión 10.0.2), `typeorm` (versión 0.3.20), `pg` (versión 8.11.5)
- Herramientas de Seguridad: `bcrypt` (versión 5.1.1)
- Manejo de Metadatos: `reflect-metadata` (versión 0.2.0)
- Validación de Datos: `class-validator` (versión 0.14.1), `class-transformer` (versión 0.5.1)
- Programación Reactiva: `rxjs` (versión 7.8.1)
- AWS SDK: `aws-sdk` (versión 2.1286.0)


## Configuración Local

Para ejecutar el proyecto localmente, clona el repositorio y configura las variables de entorno necesarias para la base de datos y JWT.

1. Clona el repositorio:
   ```shell
   git clone https://github.com/tu-usuario/book-management-api.git
   cd book-management-api
    ```
2. Instala las dependencias necesarias:
   ```shell
   npm install
    ```
3. Copia el archivo .env.example a un nuevo archivo .env y configura las variables de entorno necesarias:
   ```shell
   cp .env.example .env
    ```
   Edita el archivo .env y configura los siguientes valores:
    ```shell
   PORT=3000
    DB_NAME=tu_nombre_de_base_de_datos
    DB_USER=tu_usuario_de_base_de_datos
    DB_PASS=tu_contraseña_de_base_de_datos
    DB_HOST=tu_host_de_base_de_datos
    DB_PORT=tu_puerto_de_base_de_datos

    JWT_DURATION=12h
    JWT_SECRET=m54543bxmgx4xSecr37Key

    USER_ROLE=user
    ADMIN_ROLE=admin

    LIMIT=20

    BUCKET_S3=tu_bucket_de_s3
    AWS_ACCESS_KEY_ID=tu_id_de_acceso_aws
    AWS_SECRET_ACCESS_KEY=tu_clave_secreta_aws
    ```
   Estos pasos garantizan que tengas toda la configuración necesaria para ejecutar el proyecto localmente, ajustando las variables de entorno según las necesidades de tu entorno de desarrollo.

## Comandos para Desarrollo

Para iniciar el servidor en modo de desarrollo, usa:

```shell
npm run start:dev
```
## Despliegue en Producción

Para iniciar el servidor en modo de desarrollo, usa:

```shell
npm run build
npm start
```

## Estructura de Carpetas del Proyecto

La organización del código fuente dentro de la carpeta `src` incluye:

- `/auth`: Contiene los componentes relacionados con la autenticación, como los controladores, servicios, estrategias y guards.
    - `/decorators`: Funciones personalizadas que añaden funcionalidades adicionales a las rutas o métodos de los controladores.
    - `/dto`: Data Transfer Objects que definen la estructura de los datos para las operaciones de autenticación.
    - `/guards`: Clases que implementan la lógica de autorización.
    - `/interfaces`: Define las interfaces para tipar los objetos dentro del módulo de autenticación.
    - `/strategies`: Estrategias de Passport para la autenticación JWT.
    - `auth.controller.ts`: Controlador que maneja las solicitudes HTTP relacionadas con la autenticación.
    - `auth.module.ts`: Módulo que agrupa todos los elementos relacionados con la autenticación.
    - `auth.service.ts`: Servicio que contiene la lógica de negocio relacionada con la autenticación.

- `/books`: Módulos para la gestión de libros.
    - `/dto`: Objetos de Transferencia de Datos para la manipulación de libros.
    - `/entities`: Entidades que representan la tabla de libros en la base de datos.
    - `books.controller.ts`: Controlador para las operaciones de libros.
    - `books.module.ts`: Módulo que encapsula todos los componentes del dominio de libros.
    - `books.service.ts`: Servicio que contiene la lógica de negocio para libros.

- `/common`: Contiene elementos comunes que pueden ser utilizados en toda la aplicación.
    - `/dto`: Data Transfer Objects comunes para la aplicación.
    - `common.module.ts`: Módulo que proporciona elementos comunes a otros módulos.

- `/users`: Módulos relacionados con la gestión de usuarios.
    - `/dto`: Data Transfer Objects para el manejo de la información de los usuarios.
    - `/entities`: Entidades que representan la tabla de usuarios en la base de datos.
    - `users.controller.ts`: Controlador para las operaciones relacionadas con los usuarios.
    - `users.module.ts`: Módulo que agrupa todos los elementos relacionados con los usuarios.
    - `users.service.ts`: Servicio que contiene la lógica de negocio para usuarios.

- `app.controller.ts`: Controlador principal de la aplicación.
- `app.module.ts`: Módulo principal que importa y organiza todos los módulos de la aplicación.
- `main.ts`: Punto de entrada de la aplicación que inicia el servidor NestJS.

Esta estructura de carpetas está diseñada para mantener el proyecto ordenado y modular, haciendo que el código sea más fácil de mantener y escalar.

## Estrategia de Ramificación con Gitflow

Este proyecto implementa la estrategia de ramificación Gitflow, que es un modelo escalable y robusto para manejar el desarrollo de software. Aquí hay una descripción breve de cómo se organizan las ramas y su propósito dentro del flujo de trabajo del proyecto:

- `main`: La rama principal que contiene el código de producción, donde el código alcanza el estado más estable después de ser probado en otras ramas.
- `dev`: La rama de desarrollo donde todas las características, arreglos y mejoras se fusionan antes de ser desplegadas a producción. Esta rama contiene el estado más reciente del próximo lanzamiento.
- `feat/x`: Ramas de características donde se desarrollan nuevas funcionalidades. Cada característica tiene su propia rama (por ejemplo, `feat/new-login` para una nueva funcionalidad de inicio de sesión).
- `fix/x`: Ramas de correcciones donde se arreglan bugs. Al igual que con las características, cada corrección tiene su propia rama (por ejemplo, `fix/login-error`).

El trabajo se combina en `dev` para pruebas de integración. Una vez que `dev` es estable y está listo para un lanzamiento, se fusiona en `main`.

Para contribuir al proyecto, crea una rama a partir de `dev` siguiendo el prefijo correspondiente (feat/ o fix/) dependiendo del tipo de trabajo. Después de completar el trabajo y las pruebas, crea un Pull Request hacia `dev`.

La adopción de Gitflow permite una gestión organizada de las versiones, proporcionando claridad y un proceso establecido para la colaboración y el despliegue de software.


---
¡Espero que disfrutes utilizando Book Manager tanto como yo disfrute desarrollándolo!

Cordialmente,  
**Milton Loaiza**

[loaizadeveloper@gmail.com](mailto:loaizadeveloper@gmail.com)


## Licencia

Este proyecto está licenciado bajo Creative Commons [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)

Puedes usar y redistribuir este trabajo para cualquier propósito, siempre y cuando se otorgue el crédito apropiado.



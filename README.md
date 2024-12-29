# Proyecto Lolasux

Este proyecto fue desarrollado utilizando las siguientes tecnologías:
- Next.js
- React Hook Form
- Zod
- Tailwind CSS
- TypeScript

![Captura de pantalla 2024-12-28 181117](https://github.com/user-attachments/assets/0426dd8a-ca02-4d89-bb97-71ad67f822ab)


## Detalles del Proyecto

### Características Requeridas

1. **Implementación de Formulario Multi-paso**
   - El formulario está dividido en 3 secciones: Información Personal, Experiencia y Revisión.
   - Permite la navegación entre los diferentes pasos.
   - Incluye validación para cada campo del formulario.

2. **Campos del Formulario**
   - **Paso de Información Personal:**
     - **Nombre Completo:** Campo requerido, mínimo 1 carácter, máximo 100 caracteres.
     - **Email:** Campo requerido, debe ser un email válido, máximo 100 caracteres.
     - **Teléfono:** Campo requerido, debe tener un formato válido, mínimo 12 caracteres, máximo 16 caracteres y debe iniciar con "+".
     - **Ubicación:** Campo requerido, mínimo 1 carácter.
     - **URL del Portafolio:** Campo opcional, debe ser una URL válida.

   - **Paso de Experiencia:**
     - **Rol Actual:** Campo requerido, mínimo 10 caracteres, máximo 50 caracteres.
     - **Años de Experiencia:** Campo requerido, debe ser un número, mínimo 1 y solo números positivos.
     - **Habilidades:** Campo requerido, mínimo 3 habilidades, deben estar separadas por comas.
     - **Empresa:** Campo requerido, mínimo 1 carácter.

3. **Validación del Formulario**
   - Se utilizaron schemas de Zod para la validación de los campos.
   - Se emplearon Zod resolvers para la validación de los inputs.
   - En caso de que los campos no cumplan con los requisitos, se indicará si el problema es de formato o de longitud.
   - No se permite avanzar al siguiente paso si los campos no han sido completados correctamente.

4. **Paso de Revisión**
   - Muestra toda la información ingresada en los pasos anteriores.
   - Solicita confirmación antes de enviar el formulario.

5. **Estilizado**
   - Se utilizó Tailwind CSS para el diseño y estilizado de todo el proyecto.
  
6. **Persistencia**
   - Se agregó persistencia usando local Storage en el proyecto

🌐 BlueBlock – eCommerce de Calzado Deportivo

Plataforma de comercio electrónico enfocada en la venta de calzado deportivo, diseñada para permitir a los usuarios explorar productos, filtrarlos según sus necesidades, agregarlos al carrito y realizar compras de forma rápida y segura desde una aplicación web.

👥 Integrantes

Juan José Cortázar Acosta – 1202740

Juan David López Herrera – 1202726

🎯 1. Objetivo General

Desarrollar una plataforma de eCommerce de calzado deportivo que permita a los usuarios buscar, seleccionar y comprar productos de manera rápida, segura y accesible desde dispositivos web y móviles.

El sistema integrará funcionalidades como catálogo filtrable, carrito de compras y pagos en línea. Con esto se busca solucionar las limitaciones de las tiendas físicas tradicionales, que restringen el acceso a variedad de productos, tallas y marcas, ofreciendo una solución digital que amplía el alcance, mejora la experiencia de compra y facilita el acceso al calzado deportivo.

🌍 2. Contexto de Uso

El sistema está diseñado para dos tipos principales de usuarios:

👤 Clientes

Personas interesadas en comprar calzado deportivo en línea. Podrán:

Registrarse en la plataforma
Explorar el catálogo de productos
Filtrar calzado por deporte o categoría
Agregar productos al carrito
Realizar compras en línea
Consultar el estado de sus pedidos


🛠️ Administradores

Usuarios encargados de la gestión del sistema. Sus funciones incluyen:

Administrar productos del catálogo
Gestionar pedidos realizados por los clientes
Supervisar el funcionamiento general de la tienda

📋 3. Requerimientos del Sistema

3.1 Requerimientos Funcionales

RF01: El sistema debe permitir el registro de usuarios.

RF02: El sistema debe permitir el inicio y cierre de sesión.

RF03: El sistema debe mostrar el catálogo de calzado deportivo.

RF04: El usuario debe poder filtrar productos por deporte.

RF05: El usuario debe poder filtrar productos por precio.

RF06: El sistema debe permitir visualizar el detalle de cada producto.

RF07: El usuario debe poder agregar productos al carrito.

RF08: El usuario debe poder modificar cantidades o eliminar productos del carrito.

RF09: El sistema debe calcular automáticamente el total de la compra.

RF10: El usuario debe poder realizar el proceso de checkout.

RF11: El sistema debe permitir pagos electrónicos mediante una pasarela de pago.

RF12: El sistema debe generar una confirmación del pedido.

RF13: El usuario debe poder consultar el estado de sus pedidos.

3.2 Requerimientos No Funcionales

RNF01: El sistema debe ser responsive, adaptándose a dispositivos móviles, tablets y computadoras.

RNF02: El sistema debe garantizar tiempos de carga rápidos para mejorar la experiencia del usuario.

RNF03: La interfaz debe ser clara, intuitiva y fácil de usar.

RNF04: El sistema debe asegurar la protección de datos personales y credenciales de los usuarios.

RNF05: El sistema debe integrarse de manera confiable con pasarelas de pago externas.

RNF06: El sistema debe manejar correctamente errores y mostrar mensajes claros al usuario.

RNF07: El sistema debe mantener la consistencia e integridad de la información en la base de datos.

RNF08: El sistema debe ofrecer una experiencia de compra fluida y continua.

🧠 4. Diagramas UML


Diagrama de Casos de Uso

Este diagrama representa las interacciones entre los usuarios (Cliente y Administrador) y el sistema, mostrando las funcionalidades principales como registro, exploración del catálogo, gestión del carrito y realización de compras.

Diagrama de Secuencia

Este diagrama muestra el flujo de interacción entre el usuario, el sistema y la base de datos durante el proceso de compra, desde la selección de productos hasta la confirmación del pedido.

🎨 5. URL del Prototipo

Prototipo en Figma:

https://www.figma.com/design/lbG5BPprxakxFlhZ7QTuT4/Blue-Block--Mockup-?node-id=18-43&t=1oxd2BU2yL9EEEgh-1

🗄️ 6. Diseño de Base de Datos
Tablas principales
<img width="1920" height="1080" alt="Diagrama Entidad-Relación (Base de Datos) BlueBlock - eCommerce Calzado Deportivo (1)" src="https://github.com/user-attachments/assets/f850b0f9-1053-49c0-8a16-7b2fbd04294b" />


USUARIO
Contiene la información de los usuarios registrados en la plataforma.
Campos: id, nombre, email, contraseña.

PRODUCTO
Almacena la información de los productos disponibles en el catálogo.
Campos: id, nombre, marca, precio, talla, deporte, imagen.

CARRITO
Registra los productos que un usuario agrega temporalmente para realizar una compra.
Campos: id_usuario, id_producto, cantidad.

PEDIDO
Representa la compra realizada por un usuario.
Campos: id, id_usuario, fecha, total, estado.

DETALLE_PEDIDO
Relaciona cada pedido con los productos incluidos en la compra.
Campos: id_pedido, id_producto, cantidad, precio_unitario.

🧩 7. Documentación del Sistema

Archivos principales:

index.html →
Página principal (landing page) donde se muestra la bienvenida y acceso a categorías.

catalogo.html →
Página que muestra todos los productos disponibles con filtros por categoría y precio.

producto.html →
Vista detallada de cada producto (imagen, precio, talla, etc).

carrito.html →
Página del carrito de compras donde se visualizan los productos seleccionados.

checkout.html →
Página de pago donde el usuario ingresa sus datos y confirma la compra.

login.html →
Página para iniciar sesión.

register.html →
Página para crear una cuenta.

Archivos JavaScript:

catalogo.js →
Maneja la lógica de visualización de productos y filtros.

producto.js →
Controla la información dinámica de cada producto.

carrito.js →
Gestiona los productos agregados al carrito.

checkout.js →
Maneja el resumen del pedido y lógica de compra.

search.js →
Controla el funcionamiento del buscador y sugerencias.

Estilos:

style.css →
Archivo principal de estilos del proyecto (diseño general, layout, responsive, etc).

🚀 8. Instalación y Ejecución

Este proyecto se encuentra desplegado en GitHub Pages, por lo que no requiere instalación local.

Puedes acceder directamente a la aplicación en el siguiente enlace:

https://tecnologias2026-1.github.io/Blue-Block/

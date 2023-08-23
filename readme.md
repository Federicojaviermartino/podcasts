RESUMEN   
Esta prueba consiste en la creación de una mini-aplicación para escuchar podcasts 
musicales.   
La aplicación tendrá únicamente tres vistas:   
1. Vista principal  
2. Detalles de un podcast   
3. Detalles de un capítulo de un podcast   
El diseño de las vistas se debe ceñir al mostrado junto a la descripción del detalle de las mismas 
(más abajo).   
La aplicación será una Single Page Application de manera que la navegación se realizará siempre 
en cliente, sin refrescar completamente el documento principal en ningún momento.   
La aplicación deberá tener un modo development en el que se sirvan los assets sin minimizar 
(pueden estar concatenados si se quiere) y otro modo production donde se deben servir los 
assets concatenados y minimizados.   
El objetivo final de la prueba es presentar un repositorio de código público (Github o Bitbucket) 
con la solución desarrollada. Es deseable que se vaya subiendo código a medida que se va 
avanzando en las diferentes secciones del proyecto (utilizando tags para dejar marcas de cada 
paso relevante) para poder evaluar la evolución de la implementación. En el repositorio deberá 
existir un archivo nombrado README donde se explicará cómo ejecutar la aplicación en ambos 
modos solicitados.   

Restricciones   
• Las URLs deberán ser limpias de modo que no se permite el uso del hash (#) para 
gestionar el enrutado.   
• Está permitido el uso de cualquier librería JS/CSS salvo los frameworks específicos 
AngularJS y Ember. 

RESUMEN   

Aspectos permitidos   
• Se permite el uso de sintaxis ES2020 de Javascript.   
• Se permite el uso de herramientas tipo Webpack o Parcel.   
• La aplicación solo será revisada en la última versión de Google Chrome de escritorio, por 
lo que no es necesario tener en cuenta las particularidades de otros navegadores ni de 
tamaños de pantalla pequeños.   
• No será necesario realizar una gestión de errores de cara al usuario. Si se produce un 
error, solo se deberá mostrar en la consola del navegador su mensaje y su traza.  
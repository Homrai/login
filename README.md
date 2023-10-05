Para que funcione se le deben agregar las tres claves de emailjs,
para eso hay que crear una cuenta en emailjs, estas son, YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' y 'YOUR_PUBLIC_KEY', y ya deberia funcionar con el correo
estas se deben cambiar en index, 
en la funcion send 
y dentro del servicio de emailjs en la parte 
donde aparece esto process.env.SERVICE_ID, process.env.TEMPLATE_KEY, datos, process.env.PUBLIC_KEY
![image](https://github.com/Homrai/login/assets/90481686/223b60cd-e81b-4389-9a20-93671eed6305)

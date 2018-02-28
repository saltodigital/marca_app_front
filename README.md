# marca-app

> Admin Control Marca App

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Subir a Heroku

Para actualizar o subir el proyecto a Heroku, debes eliminar todo
lo que está en la carpeta **dist** a excepción de la carpeta **.git**,
ejecuta el comando **npm run build**

 Esto creará una serie de ficheros en la carpeta **dist**, dentro de la
 misma carpeta copia **index.html** como **index.php**

 ``` bash
 #Ingresa a la carpeta **dist**:
 cd dist

 #Agrega los cambios:
 git add .

 #Haz commit:
 git commit -m"Production"

 #Y envía a Heroku:
 git commit heroku master
 ```
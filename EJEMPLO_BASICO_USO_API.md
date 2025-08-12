# 📱 Ejemplo Básico de Consumo de API en Xamarin.Forms

Este proyecto demuestra cómo realizar una consulta **sencilla** a una API pública gratuita desde una app Xamarin.Forms, sin necesidad de autenticación ni cuenta. Ideal para pruebas rápidas de conectividad y deserialización JSON.

## 🔗 API utilizada

- **JSONPlaceholder**: Servicio gratuito para simular endpoints REST.
- **Endpoint**: `https://jsonplaceholder.typicode.com/posts/1`
- Retorna un post ficticio en formato JSON.

## 📚 Conceptos Fundamentales

### ¿Qué es una API?

Una **API (Application Programming Interface)** es un conjunto de reglas y protocolos que permite que diferentes aplicaciones se comuniquen entre sí. Es como un "mesero" que toma tu pedido (petición) y te trae la comida (respuesta) desde la cocina (servidor).

### Métodos HTTP más comunes

- **GET**: Obtener/leer datos (como este ejemplo)
- **POST**: Crear nuevos datos
- **PUT**: Actualizar datos existentes
- **DELETE**: Eliminar datos

### ¿Por qué aprender consumo de APIs?

1. **Conectividad**: Las apps modernas necesitan datos externos (clima, noticias, redes sociales)
2. **Eficiencia**: No reinventar la rueda, usar servicios existentes
3. **Escalabilidad**: Separar datos de la interfaz
4. **Colaboración**: Integrar con servicios de terceros
5. **Versatilidad**: Una API puede alimentar web, móvil, desktop

## 🛠️ Requisitos

- Xamarin.Forms
- Paquete NuGet: `Newtonsoft.Json`

## 📄 Código

### MainPage.xaml.cs

```csharp
// Librerías necesarias
using Newtonsoft.Json;      // Para deserializar JSON
using System.Net.Http;      // Para hacer peticiones HTTP
using Xamarin.Forms;        // Base de Xamarin.Forms

namespace ApiDemo
{
    public partial class MainPage : ContentPage
    {
        // Constructor de la página principal
        public MainPage()
        {
            InitializeComponent();  // Inicializa los componentes del XAML
            GetPost();              // Ejecuta la consulta a la API al cargar
        }

        // Método asíncrono para obtener datos de la API
        private async void GetPost()
        {
            // URL del endpoint que vamos a consultar
            var url = "https://jsonplaceholder.typicode.com/posts/1";
            
            // Creamos el cliente HTTP dentro de using para liberarlo automáticamente
            using (var client = new HttpClient())
            {
                // Hacemos la petición GET y obtenemos la respuesta como string
                var response = await client.GetStringAsync(url);
                
                // Convertimos el JSON string en un objeto Post
                var post = JsonConvert.DeserializeObject<Post>(response);
                
                // Mostramos el resultado en el Label de la interfaz
                resultLabel.Text = $"Título: {post.title}\nContenido: {post.body}";
            }
        }
    }

    // Modelo/clase que representa la estructura del JSON que recibimos
    public class Post
    {
        public int userId { get; set; }     // ID del usuario que creó el post
        public int id { get; set; }         // ID único del post
        public string title { get; set; }   // Título del post
        public string body { get; set; }    // Contenido/cuerpo del post
    }
}
```

### MainPage.xaml

```xml
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="ApiDemo.MainPage">
    <StackLayout Padding="20">
        <Label x:Name="resultLabel" Text="Cargando..." />
    </StackLayout>
</ContentPage>
```

## ✅ Resultado Esperado

Al ejecutar la app, se mostrará el título y contenido del post simulado:

```
Título: sunt aut facere repellat provident occaecati
Contenido: quia et suscipit...
```

## 📦 Extras

Puedes extender este ejemplo para mostrar múltiples posts en un `ListView`, integrar visualizaciones técnicas o conectar con tus flujos educativos.

## 🔍 Explicación Detallada del Código

### **Puntos clave explicados:**

1. **`using` statements**: Importan las librerías necesarias para HTTP y JSON
2. **Constructor**: Se ejecuta al crear la página y llama automáticamente a `GetPost()`
3. **`async/await`**: Permite hacer la petición sin bloquear la interfaz
4. **`HttpClient` con `using`**: Maneja la conexión HTTP y se libera automáticamente
5. **`JsonConvert.DeserializeObject<Post>`**: Convierte el JSON en un objeto C# tipado
6. **Clase `Post`**: Define la estructura que esperamos del JSON de la API

### **Flujo de ejecución:**

1. App inicia → Constructor → `GetPost()`
2. Petición HTTP a JSONPlaceholder
3. Respuesta JSON se convierte en objeto `Post`
4. Se muestra en el `Label` de la interfaz

### **¿Qué sucede paso a paso?**

1. **Inicialización**: Al abrir la app, se crea `MainPage` y ejecuta su constructor
2. **Petición HTTP**: `HttpClient` envía una solicitud GET al servidor
3. **Respuesta JSON**: El servidor devuelve datos en formato JSON como texto
4. **Deserialización**: `Newtonsoft.Json` convierte el texto JSON en un objeto C# tipado
5. **Visualización**: Los datos se muestran en la interfaz de usuario

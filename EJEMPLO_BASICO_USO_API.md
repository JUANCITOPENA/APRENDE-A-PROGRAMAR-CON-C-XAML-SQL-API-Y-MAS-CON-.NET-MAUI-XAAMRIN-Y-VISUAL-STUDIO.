# 📱 Ejemplo Básico de Consumo de API en Xamarin.Forms

Este proyecto demuestra cómo realizar una consulta **sencilla** a una API pública gratuita desde una app Xamarin.Forms, sin necesidad de autenticación ni cuenta. Ideal para pruebas rápidas de conectividad y deserialización JSON.

## 🔗 API utilizada

- **JSONPlaceholder**: Servicio gratuito para simular endpoints REST.
- **Endpoint**: `https://jsonplaceholder.typicode.com/posts/1`
- Retorna un post ficticio en formato JSON.

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

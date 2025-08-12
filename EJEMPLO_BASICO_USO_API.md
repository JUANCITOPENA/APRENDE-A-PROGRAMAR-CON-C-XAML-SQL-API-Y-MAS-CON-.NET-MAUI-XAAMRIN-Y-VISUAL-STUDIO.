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
using Newtonsoft.Json;
using System.Net.Http;
using Xamarin.Forms;

namespace ApiDemo
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
            GetPost();
        }

        private async void GetPost()
        {
            var url = "https://jsonplaceholder.typicode.com/posts/1";
            using (var client = new HttpClient())
            {
                var response = await client.GetStringAsync(url);
                var post = JsonConvert.DeserializeObject<Post>(response);
                resultLabel.Text = $"Título: {post.title}\nContenido: {post.body}";
            }
        }
    }

    public class Post
    {
        public int userId { get; set; }
        public int id { get; set; }
        public string title { get; set; }
        public string body { get; set; }
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

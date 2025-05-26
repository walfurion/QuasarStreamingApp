# Quasar Streaming App

## Descripción

Prototipo de aplicación móvil de streaming desarrollada en React Native + TypeScript, siguiendo un diseño de Figma y buenas prácticas de arquitectura y componentes reutilizables.

---

## 🚀 Instrucciones de instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPO>
   cd QuasarStreamingApp
   ```

2. **Instala dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Instala pods para iOS:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Corre la app:**
   - iOS:
     ```bash
     npx react-native run-ios
     ```
   - Android:
     ```bash
     npx react-native run-android
     ```

---

## 🏗️ Decisiones de arquitectura

- **Estructura modular:**
  - `src/components/`: Componentes reutilizables (tarjetas, listas, títulos de sección).
  - `src/screens/`: Pantallas principales de la app.
  - `src/navigation/`: Configuración de navegación (React Navigation).
  - `src/types/`: Tipos TypeScript para datos y props.
  - `src/data/`: Datos mockeados en JSON.
- **Tipado estricto:** Uso de TypeScript en todo el proyecto para seguridad y autocompletado.
- **Navegación:** React Navigation con BottomTabNavigator.
- **Estilos:** StyleSheet de React Native, siguiendo el diseño de Figma (colores, márgenes, tipografía, aspect ratio).
- **Assets remotos:** Imágenes y datos de películas se cargan desde un JSON local, pero con URLs reales.
- **Componentes desacoplados:** Cada sección y tarjeta es un componente reutilizable y fácil de testear.

---

## ✅ Features implementados (Home Screen)

- **Trending destacado:**
  - Imagen principal con título, metadata, clasificación y advertencias.
  - Modal para ver la descripción completa al hacer click.
- **Sección "You Might Like":**
  - Scroll horizontal con tarjetas de películas (aspect ratio 4:5).
- **Sección "My List":**
  - Scroll horizontal con tarjetas de películas (aspect ratio 16:9).
- **Navegación inferior:**
  - Barra de navegación con ícono de Home.
- **Responsive y animaciones suaves.**
- **Tipado y validación de datos.**

---

## 📄 Notas
- Este prototipo solo implementa la Home Screen.
- El diseño y los assets siguen el Figma proporcionado.
- Puedes extender la arquitectura para más pantallas fácilmente.
- Se agregó manejo de estado de carga (loading) y error en la Home Screen. (Simulados)
- Se muestra un spinner visual (ActivityIndicator) y mensaje "Cargando..." mientras se cargan los datos.
- Si ocurre un error al cargar el JSON, se muestra un mensaje de error en pantalla.

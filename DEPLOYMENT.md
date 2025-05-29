# Deployment Guide - Azure App Service

Este documento explica cómo desplegar el Mentoring Service en Azure App Service usando el workflow de GitHub Actions proporcionado.

## Resumen

El workflow de despliegue (`/.github/workflows/deploy.yml`) proporciona un pipeline CI/CD completo con las siguientes etapas:

1. **Test**: Ejecuta pruebas con un servicio MongoDB
2. **Build**: Compila TypeScript y crea artefactos de despliegue
3. **Deploy**: Despliegue específico para Azure App Service

## Configuración de Azure App Service

### Prerrequisitos

1. **Suscripción de Azure activa**
2. **Azure App Service creado** (Plan de servicio Linux recomendado)
3. **Azure Database for MongoDB** o **MongoDB Atlas** configurado
4. **Service Principal de Azure** para autenticación desde GitHub

### Crear Service Principal de Azure

Ejecuta estos comandos en Azure CLI:

```bash
# Crear Service Principal
az ad sp create-for-rbac --name "mentoring-service-github" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
  --sdk-auth

# El output será algo como:
{
  "clientId": "xxxx",
  "clientSecret": "xxxx",
  "subscriptionId": "xxxx",
  "tenantId": "xxxx",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

### Variables de Entorno Requeridas

La aplicación requiere las siguientes variables de entorno en Azure App Service:

- `PORT`: Puerto del servidor (Azure lo asigna automáticamente)
- `URI`: Cadena de conexión de MongoDB
- `MIGRATE_MONGO_URI`: URI de MongoDB para migraciones
- `MIGRATE_MONGO_DB`: Nombre de la base de datos para migraciones
- `SECRETPRIVATEKEY`: Clave secreta JWT
- `DEFAULT_PAGE_COUNT`: Conteo de paginación por defecto
- `MIGRATE_USER_DEFAULT_NAME`: Nombre del usuario admin por defecto
- `MIGRATE_USER_DEFAULT_EMAIL`: Email del usuario admin por defecto
- `MIGRATE_USER_DEFAULT_PASSWORD`: Contraseña del usuario admin por defecto

### GitHub Secrets

Configura los siguientes secrets en la configuración de tu repositorio de GitHub:

#### Para Despliegue en Azure App Service

- `AZURE_CREDENTIALS_STAGING`: JSON del Service Principal para staging
- `AZURE_CREDENTIALS_PRODUCTION`: JSON del Service Principal para producción

#### Para Despliegue con Container Registry (Opcional)

- `AZURE_CONTAINER_REGISTRY`: Nombre del registry de contenedores
- `AZURE_CONTAINER_REGISTRY_PASSWORD`: Contraseña del registry

## Configuración del App Service

### 1. Crear App Service

```bash
# Crear Resource Group
az group create --name mentoring-service-rg --location "East US"

# Crear App Service Plan
az appservice plan create --name mentoring-service-plan \
  --resource-group mentoring-service-rg \
  --sku B1 --is-linux

# Crear App Service para Staging
az webapp create --resource-group mentoring-service-rg \
  --plan mentoring-service-plan \
  --name mentoring-service-staging \
  --runtime "NODE:22-lts"

# Crear App Service para Production
az webapp create --resource-group mentoring-service-rg \
  --plan mentoring-service-plan \
  --name mentoring-service \
  --runtime "NODE:22-lts"
```

### 2. Configurar Variables de Entorno

```bash
# Configurar variables para Production
az webapp config appsettings set --resource-group mentoring-service-rg \
  --name mentoring-service \
  --settings \
    URI="mongodb+srv://user:password@cluster.mongodb.net/mentoring" \
    MIGRATE_MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/mentoring" \
    MIGRATE_MONGO_DB="mentoring" \
    SECRETPRIVATEKEY="your-super-secret-key" \
    DEFAULT_PAGE_COUNT="10" \
    MIGRATE_USER_DEFAULT_NAME="Admin" \
    MIGRATE_USER_DEFAULT_EMAIL="admin@mentoring.com" \
    MIGRATE_USER_DEFAULT_PASSWORD="secure-password"

# Configurar variables para Staging
az webapp config appsettings set --resource-group mentoring-service-rg \
  --name mentoring-service-staging \
  --settings \
    URI="mongodb+srv://user:password@cluster.mongodb.net/mentoring_staging" \
    MIGRATE_MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/mentoring_staging" \
    MIGRATE_MONGO_DB="mentoring_staging" \
    SECRETPRIVATEKEY="staging-secret-key" \
    DEFAULT_PAGE_COUNT="10" \
    MIGRATE_USER_DEFAULT_NAME="Admin" \
    MIGRATE_USER_DEFAULT_EMAIL="admin@staging.mentoring.com" \
    MIGRATE_USER_DEFAULT_PASSWORD="staging-password"
```

### 3. Configurar Startup Command

```bash
# Para Production
az webapp config set --resource-group mentoring-service-rg \
  --name mentoring-service \
  --startup-file "npm run migrate:up && node build/index.js"

# Para Staging
az webapp config set --resource-group mentoring-service-rg \
  --name mentoring-service-staging \
  --startup-file "npm run migrate:up && node build/index.js"
```

## Opciones de Despliegue

### 1. Despliegue Directo (Recomendado)

El workflow incluye dos jobs principales para Azure:

- `deploy-azure-staging`: Despliega a staging automáticamente
- `deploy-azure-production`: Despliega a producción con aprobación manual

### 2. Despliegue con Contenedores

Para usar despliegue con contenedores:

1. Habilita el job `deploy-azure-container` (cambia `if: false` a `if: true`)
2. Crea un Azure Container Registry
3. Configura los secrets correspondientes

```bash
# Crear Container Registry
az acr create --resource-group mentoring-service-rg \
  --name mentoringserviceacr --sku Basic

# Obtener credenciales
az acr credential show --name mentoringserviceacr
```

## Triggers del Workflow

El workflow se ejecuta en:

- Push a la rama `main` o `master`
- Pull requests a `main` o `master`

Solo los pushes a main/master activarán los despliegues.

## Configuración de Entornos

### GitHub Environments

El workflow usa entornos de GitHub para protección de despliegue:

- `staging`: Para despliegues de staging (automático)
- `production`: Para despliegues de producción (requiere aprobación)

Configura reglas de protección de entorno en la configuración de tu repositorio.

### Migraciones de Base de Datos

El workflow ejecuta automáticamente las migraciones de base de datos durante el despliegue:

```bash
npm run migrate:up
```

Asegúrate de que tus scripts de migración estén configurados correctamente.

## Monitoreo y Health Checks

### Implementar Endpoint de Health Check

Agrega este endpoint a tu aplicación:

```typescript
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
  });
});
```

### Configurar Application Insights

```bash
# Crear Application Insights
az monitor app-insights component create \
  --app mentoring-service-insights \
  --location "East US" \
  --resource-group mentoring-service-rg

# Obtener Instrumentation Key
az monitor app-insights component show \
  --app mentoring-service-insights \
  --resource-group mentoring-service-rg \
  --query instrumentationKey
```

## Troubleshooting

### Problemas Comunes

1. **Fallos de Build**: Verifica errores de compilación de TypeScript
2. **Fallos de Test**: Asegúrate de que el servicio MongoDB esté configurado correctamente
3. **Fallos de Despliegue**: Verifica secrets y variables de entorno
4. **Fallos de Migración**: Verifica conectividad y permisos de base de datos
5. **Problemas de Startup**: Revisa los logs del App Service

### Logs

#### GitHub Actions

- Ve a tu repositorio → pestaña Actions
- Haz clic en la ejecución del workflow fallida
- Expande el paso fallido para ver logs detallados

#### Azure App Service

```bash
# Ver logs en tiempo real
az webapp log tail --name mentoring-service --resource-group mentoring-service-rg

# Descargar logs
az webapp log download --name mentoring-service --resource-group mentoring-service-rg
```

### Comandos Útiles de Azure CLI

```bash
# Reiniciar App Service
az webapp restart --name mentoring-service --resource-group mentoring-service-rg

# Ver configuración actual
az webapp config show --name mentoring-service --resource-group mentoring-service-rg

# Ver variables de entorno
az webapp config appsettings list --name mentoring-service --resource-group mentoring-service-rg

# Escalar App Service
az appservice plan update --name mentoring-service-plan \
  --resource-group mentoring-service-rg --sku S1
```

## Consideraciones de Seguridad

1. Nunca hagas commit de información sensible al repositorio
2. Usa GitHub Secrets para todos los datos sensibles
3. Rota regularmente las claves API y contraseñas
4. Usa configuraciones específicas por entorno
5. Habilita reglas de protección de rama
6. Revisa permisos de despliegue regularmente
7. Configura Azure Key Vault para secretos críticos

## Personalización

Para personalizar el despliegue según tus necesidades específicas:

1. Modifica el archivo de workflow (`.github/workflows/deploy.yml`)
2. Actualiza variables de entorno y secrets
3. Ajusta scripts de despliegue para tu infraestructura
4. Configura monitoreo y alertas
5. Establece procedimientos de backup y recuperación

## Costos y Optimización

### Recomendaciones de Plan de Servicio

- **Desarrollo/Testing**: B1 (Basic)
- **Staging**: S1 (Standard)
- **Producción**: P1V2 (Premium) o superior

### Optimización de Costos

```bash
# Auto-scaling para manejar carga variable
az monitor autoscale create \
  --resource-group mentoring-service-rg \
  --resource mentoring-service-plan \
  --resource-type Microsoft.Web/serverfarms \
  --name mentoring-autoscale \
  --min-count 1 \
  --max-count 3 \
  --count 1
```

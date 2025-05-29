#!/bin/bash

# Script de configuración para Azure App Service
# Uso: ./scripts/setup-azure.sh

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables configurables
RESOURCE_GROUP="mentoring-service-rg"
LOCATION="East US"
APP_SERVICE_PLAN="mentoring-service-plan"
APP_NAME_PROD="mentoring-service"
APP_NAME_STAGING="mentoring-service-staging"
SKU="B1"
RUNTIME="NODE:22-lts"
ACR_NAME="mentoringserviceacr"

echo -e "${GREEN}🚀 Configurando Azure App Service para Mentoring Service${NC}"
echo "=================================================="

# Verificar si Azure CLI está instalado
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI no está instalado. Por favor instálalo primero.${NC}"
    echo "Visita: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Verificar si está logueado en Azure
if ! az account show &> /dev/null; then
    echo -e "${YELLOW}⚠️  No estás logueado en Azure. Iniciando sesión...${NC}"
    az login
fi

echo -e "${GREEN}✅ Azure CLI configurado correctamente${NC}"

# Mostrar suscripción actual
SUBSCRIPTION=$(az account show --query name -o tsv)
echo -e "${GREEN}📋 Suscripción actual: ${SUBSCRIPTION}${NC}"

read -p "¿Continuar con esta suscripción? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operación cancelada."
    exit 1
fi

# Crear Resource Group
echo -e "${YELLOW}📁 Creando Resource Group...${NC}"
az group create --name $RESOURCE_GROUP --location "$LOCATION"
echo -e "${GREEN}✅ Resource Group creado: $RESOURCE_GROUP${NC}"

# Crear App Service Plan
echo -e "${YELLOW}📋 Creando App Service Plan...${NC}"
az appservice plan create \
    --name $APP_SERVICE_PLAN \
    --resource-group $RESOURCE_GROUP \
    --sku $SKU \
    --is-linux
echo -e "${GREEN}✅ App Service Plan creado: $APP_SERVICE_PLAN${NC}"

# Crear App Service para Staging
echo -e "${YELLOW}🔧 Creando App Service para Staging...${NC}"
az webapp create \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --name $APP_NAME_STAGING \
    --runtime "$RUNTIME"
echo -e "${GREEN}✅ App Service Staging creado: $APP_NAME_STAGING${NC}"

# Crear App Service para Production
echo -e "${YELLOW}🔧 Creando App Service para Production...${NC}"
az webapp create \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --name $APP_NAME_PROD \
    --runtime "$RUNTIME"
echo -e "${GREEN}✅ App Service Production creado: $APP_NAME_PROD${NC}"

# Configurar startup command para ambos servicios
echo -e "${YELLOW}⚙️  Configurando startup commands...${NC}"
az webapp config set \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME_PROD \
    --startup-file "npm run migrate:up && node build/index.js"

az webapp config set \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME_STAGING \
    --startup-file "npm run migrate:up && node build/index.js"
echo -e "${GREEN}✅ Startup commands configurados${NC}"

# Crear Container Registry (opcional)
read -p "¿Crear Azure Container Registry? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🐳 Creando Azure Container Registry...${NC}"
    az acr create \
        --resource-group $RESOURCE_GROUP \
        --name $ACR_NAME \
        --sku Basic
    echo -e "${GREEN}✅ Container Registry creado: $ACR_NAME${NC}"
    
    # Obtener credenciales del registry
    echo -e "${YELLOW}🔑 Obteniendo credenciales del Container Registry...${NC}"
    ACR_CREDENTIALS=$(az acr credential show --name $ACR_NAME)
    echo -e "${GREEN}📋 Credenciales del Container Registry:${NC}"
    echo "$ACR_CREDENTIALS"
fi

# Crear Application Insights
read -p "¿Crear Application Insights para monitoreo? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}📊 Creando Application Insights...${NC}"
    az monitor app-insights component create \
        --app mentoring-service-insights \
        --location "$LOCATION" \
        --resource-group $RESOURCE_GROUP
    
    INSTRUMENTATION_KEY=$(az monitor app-insights component show \
        --app mentoring-service-insights \
        --resource-group $RESOURCE_GROUP \
        --query instrumentationKey -o tsv)
    
    echo -e "${GREEN}✅ Application Insights creado${NC}"
    echo -e "${GREEN}🔑 Instrumentation Key: $INSTRUMENTATION_KEY${NC}"
fi

# Crear Service Principal para GitHub Actions
echo -e "${YELLOW}🔐 Creando Service Principal para GitHub Actions...${NC}"
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
SP_OUTPUT=$(az ad sp create-for-rbac \
    --name "mentoring-service-github" \
    --role contributor \
    --scopes "/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP" \
    --sdk-auth)

echo -e "${GREEN}✅ Service Principal creado${NC}"
echo -e "${GREEN}📋 Configuración para GitHub Secrets:${NC}"
echo "=================================================="
echo "AZURE_CREDENTIALS_STAGING:"
echo "$SP_OUTPUT"
echo ""
echo "AZURE_CREDENTIALS_PRODUCTION:"
echo "$SP_OUTPUT"
echo "=================================================="

# Mostrar URLs de los servicios
STAGING_URL="https://$APP_NAME_STAGING.azurewebsites.net"
PROD_URL="https://$APP_NAME_PROD.azurewebsites.net"

echo -e "${GREEN}🌐 URLs de los servicios:${NC}"
echo "Staging: $STAGING_URL"
echo "Production: $PROD_URL"

# Mostrar siguiente pasos
echo ""
echo -e "${GREEN}🎉 ¡Configuración completada!${NC}"
echo ""
echo -e "${YELLOW}📝 Próximos pasos:${NC}"
echo "1. Copia las credenciales del Service Principal a GitHub Secrets"
echo "2. Configura las variables de entorno en Azure App Service:"
echo "   - URI (MongoDB connection string)"
echo "   - SECRETPRIVATEKEY"
echo "   - Otras variables según tu configuración"
echo "3. Actualiza el nombre de la aplicación en .github/workflows/deploy.yml"
echo "4. Haz push a la rama main para activar el despliegue"
echo ""
echo -e "${GREEN}📚 Para más información, consulta DEPLOYMENT.md${NC}"

# Comando para configurar variables de entorno (ejemplo)
echo ""
echo -e "${YELLOW}💡 Ejemplo de configuración de variables de entorno:${NC}"
echo "az webapp config appsettings set \\"
echo "  --resource-group $RESOURCE_GROUP \\"
echo "  --name $APP_NAME_PROD \\"
echo "  --settings \\"
echo "    URI=\"mongodb+srv://user:password@cluster.mongodb.net/mentoring\" \\"
echo "    SECRETPRIVATEKEY=\"your-super-secret-key\" \\"
echo "    DEFAULT_PAGE_COUNT=\"10\"" 
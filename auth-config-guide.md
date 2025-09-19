# Configuración de Autenticación para Azure

## Problema identificado
Los errores de autenticación que estás experimentando son:

1. **Microsoft Error**: `AADSTS700016: Application with identifier '081135d1-eb02-464c-bd0d-740bf4f29287' was not found in the directory`
2. **Google Error**: `Error 400: redirect_uri_mismatch`

## Pasos para solucionar

### Para Microsoft Azure AD:

1. Inicia sesión en el [Portal de Azure](https://portal.azure.com)
2. Ve a "Azure Active Directory" > "Registros de aplicaciones"
3. Busca tu aplicación o crea una nueva si no existe
4. Configura los siguientes valores:
   - **URI de redirección**: `https://danalyst-bdfebxhubde0hge2.mexicocentral-01.azurewebsites.net/api/auth/callback/azure-ad`
   - **ID de cliente**: Usa el valor existente o crea uno nuevo
   - **Secreto de cliente**: Genera un nuevo secreto si es necesario

### Para Google Cloud:

1. Ve a la [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto > "APIs y servicios" > "Credenciales"
3. Edita tu "ID de cliente OAuth"
4. Añade estas URLs de redirección:
   - `https://danalyst-bdfebxhubde0hge2.mexicocentral-01.azurewebsites.net/api/auth/callback/google`
   - `https://danalyst-bdfebxhubde0hge2.mexicocentral-01.azurewebsites.net`

### Actualiza las variables de entorno en Azure:

1. Ve al portal de Azure > App Service > tu aplicación
2. Ve a "Configuración" > "Configuración de la aplicación"
3. Actualiza o añade estas variables:
   ```
   NEXTAUTH_URL=https://danalyst-bdfebxhubde0hge2.mexicocentral-01.azurewebsites.net
   AZURE_AD_CLIENT_ID=[tu-id-de-cliente]
   AZURE_AD_CLIENT_SECRET=[tu-secreto-de-cliente]
   AZURE_AD_TENANT_ID=[tu-id-de-tenant]
   GOOGLE_CLIENT_ID=[tu-id-de-cliente-google]
   GOOGLE_CLIENT_SECRET=[tu-secreto-de-cliente-google]
   ```

## Notas importantes:
- Asegúrate de que los IDs y secretos coincidan exactamente con los configurados en Microsoft y Google
- La URL de redirección debe coincidir exactamente con la URL de tu aplicación desplegada
- Después de actualizar la configuración, reinicia la aplicación en Azure App Service
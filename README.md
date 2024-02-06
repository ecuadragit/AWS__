# Comandos requeridos para desplegar (omitiendo npm install por razones de evitar errores,
# asumimos que la carpeta está configurada correctamente)

serverless deploy

# Extras para después del despliegue:

# Invocar la función localmente para listar mensajes
serverless invoke local --function listarMensajes

# Invocar la función localmente para programar una campaña
serverless invoke local --function programarCampania

# Ver los logs en tiempo real de la función listarMensajes
serverless logs -f listarMensajes -t

# Ver los logs en tiempo real de la función programarCampania
serverless logs -f programarCampania -t

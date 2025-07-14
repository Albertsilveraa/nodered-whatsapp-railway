/**
 * settings.js para Node-RED en Railway con Palette Manager y Puppeteer workaround
 */
var when = require("when");

// Evita descarga de Chromium y desactiva sandbox (para Railway)
process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = "true";
process.env.NODE_OPTIONS = "--no-sandbox";

module.exports = {

    /** Archivo de flujos */
    flowFile: 'flows.json',

    /** Encripta las credenciales con tu secret */
    credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET || false,

    /** Puerto y host */
    uiPort: process.env.PORT || 1880,
    httpAdminRoot: process.env.NODE_RED_EDITOR_URI || "/",
    uiHost: "0.0.0.0",

    /** Autenticación en el editor */
    adminAuth: {
        type: "credentials",
        users: function(username) {
            if (process.env.NODE_RED_USERNAME === username) {
                return when.resolve({ username: username, permissions: "*" });
            }
            return when.resolve(null);
        },
        authenticate: function(username, password) {
            if (
                process.env.NODE_RED_USERNAME === username &&
                process.env.NODE_RED_PASSWORD === password
            ) {
                return when.resolve({ username: username, permissions: "*" });
            }
            return when.resolve(null);
        }
    },

    /** Configuración para instalar módulos desde la GUI */
    externalModules: {
        autoInstall: true,
        palette: {
            allowInstall: true,
            allowUpdate: true,
            allowUpload: true,
            allowList: ['*'],
            denyList: [],
            allowUpdateList: ['*'],
            denyUpdateList: []
        },
        modules: {
            allowInstall: true,
            allowList: ['*'],
            denyList: []
        }
    },

    /** Tema del editor, habilita Manage Palette y Projects */
    editorTheme: {
        palette: {
            editable: true,
            modules: true
        },
        projects: {
            enabled: true,
            workflow: { mode: "manual" }
        },
        codeEditor: {
            lib: "monaco"
        }
    },

    /** Carpeta para el dashboard */
    ui: {
        path: process.env.NODE_RED_DASHBOARD_URI || "ui"
    }

};

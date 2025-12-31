import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

const backupDir = path.resolve(__dirname, '../../backups');

// Asegurar que el directorio existe
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const filename = path.join(backupDir, `backup-${timestamp}.sql`);

// Importante: pg_dump debe estar instalado y en el PATH del sistema
// DATABASE_URL format: postgres://user:pass@host:port/db
const dbUrl = config.databaseUrl;

// Comando para backup
// En Windows con PowerShell a veces > no funciona bien desde exec directo si hay caracteres especiales, 
// pero en general sí.
const cmd = `pg_dump "${dbUrl}" -f "${filename}"`;

console.log('📦 Iniciando backup de base de datos...');
logger.info('Iniciando proceso de backup automático');

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error al crear backup:', error.message);
    logger.error('Error al crear backup', { error: error.message });
    return;
  }
  
  if (stderr) {
    // pg_dump a veces escribe info en stderr
    console.warn('⚠️ stderr:', stderr);
  }

  console.log(`✅ Backup creado exitosamente: ${filename}`);
  logger.info('Backup creado exitosamente', { filename });
  
  // Limpieza de backups antiguos (mantener últimos 30 días)
  // TODO: Implementar rotación
});

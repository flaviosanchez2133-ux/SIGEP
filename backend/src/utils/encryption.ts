import crypto from 'crypto';
import { config } from '../config/index.js';

// Algoritmo de encriptación
const ALGORITHM = 'aes-256-gcm';

// Obtener clave secreta (debe tener 32 bytes)
// Si JWT_SECRET no es suficientemente larga, usamos hash sha256 para derivar una clave de 32 bytes
const getSecretKey = (): Buffer => {
  return crypto.createHash('sha256').update(config.jwt.secret).digest();
};

export const encryption = {
  // Encriptar texto
  encrypt: (text: string): string => {
    const iv = crypto.randomBytes(16);
    const key = getSecretKey();
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    // Retornar formato: IV:AuthTag:EncryptedData
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  },

  // Desencriptar texto
  decrypt: (encryptedText: string): string => {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
      throw new Error('Formato de texto encriptado inválido');
    }
    
    const [ivHex, authTagHex, encryptedHex] = parts;
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const key = getSecretKey();
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  },
};

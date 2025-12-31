import { z } from 'zod';

// Lista de contraseñas comunes prohibidas
const COMMON_PASSWORDS = [
  'password', 'password1', 'password123', '123456', '12345678', '123456789',
  'qwerty', 'abc123', 'monkey', 'master', 'dragon', 'letmein', 'login',
  'welcome', 'admin', 'admin123', 'root', 'toor', 'pass', 'test',
  'guest', 'passw0rd', 'password!', '1234567890', 'contraseña', 'usuario',
  'policia', 'sigep', 'sigep123', 'sistema', 'acceso',
];

// Configuración de política de contraseñas
export const PASSWORD_POLICY = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommonPasswords: true,
  preventUsernameInPassword: true,
};

// Expresiones regulares para validación
const REGEX = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/,
};

// Interfaz para resultados de validación
interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong' | 'very_strong';
  score: number;
}

// Validar contraseña con política
export function validatePassword(
  password: string,
  username?: string
): PasswordValidationResult {
  const errors: string[] = [];
  let score = 0;

  // Longitud mínima
  if (password.length < PASSWORD_POLICY.minLength) {
    errors.push(`La contraseña debe tener al menos ${PASSWORD_POLICY.minLength} caracteres`);
  } else {
    score += 20;
  }

  // Longitud máxima
  if (password.length > PASSWORD_POLICY.maxLength) {
    errors.push(`La contraseña no puede tener más de ${PASSWORD_POLICY.maxLength} caracteres`);
  }

  // Mayúsculas
  if (PASSWORD_POLICY.requireUppercase && !REGEX.uppercase.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula');
  } else {
    score += 20;
  }

  // Minúsculas
  if (PASSWORD_POLICY.requireLowercase && !REGEX.lowercase.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula');
  } else {
    score += 20;
  }

  // Números
  if (PASSWORD_POLICY.requireNumbers && !REGEX.number.test(password)) {
    errors.push('La contraseña debe contener al menos un número');
  } else {
    score += 20;
  }

  // Caracteres especiales
  if (PASSWORD_POLICY.requireSpecialChars && !REGEX.special.test(password)) {
    errors.push('La contraseña debe contener al menos un carácter especial (!@#$%^&*...)');
  } else {
    score += 20;
  }

  // Contraseñas comunes
  if (PASSWORD_POLICY.preventCommonPasswords) {
    const lowerPassword = password.toLowerCase();
    if (COMMON_PASSWORDS.includes(lowerPassword)) {
      errors.push('Esta contraseña es demasiado común. Por favor, elija una más segura');
      score = Math.max(0, score - 40);
    }
  }

  // Username en contraseña
  if (PASSWORD_POLICY.preventUsernameInPassword && username) {
    const lowerPassword = password.toLowerCase();
    const lowerUsername = username.toLowerCase();
    if (lowerPassword.includes(lowerUsername)) {
      errors.push('La contraseña no puede contener el nombre de usuario');
      score = Math.max(0, score - 20);
    }
  }

  // Bonificaciones por longitud adicional
  if (password.length >= 16) score += 10;
  if (password.length >= 20) score += 10;

  // Determinar fortaleza
  let strength: PasswordValidationResult['strength'];
  if (score < 40) {
    strength = 'weak';
  } else if (score < 60) {
    strength = 'medium';
  } else if (score < 80) {
    strength = 'strong';
  } else {
    strength = 'very_strong';
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    score: Math.min(100, score),
  };
}

// Schema de Zod para contraseña con mensajes personalizados
export const passwordSchema = z.string()
  .min(PASSWORD_POLICY.minLength, {
    message: `La contraseña debe tener al menos ${PASSWORD_POLICY.minLength} caracteres`,
  })
  .max(PASSWORD_POLICY.maxLength, {
    message: `La contraseña no puede tener más de ${PASSWORD_POLICY.maxLength} caracteres`,
  })
  .refine(
    (password) => REGEX.uppercase.test(password),
    { message: 'La contraseña debe contener al menos una letra mayúscula' }
  )
  .refine(
    (password) => REGEX.lowercase.test(password),
    { message: 'La contraseña debe contener al menos una letra minúscula' }
  )
  .refine(
    (password) => REGEX.number.test(password),
    { message: 'La contraseña debe contener al menos un número' }
  )
  .refine(
    (password) => REGEX.special.test(password),
    { message: 'La contraseña debe contener al menos un carácter especial (!@#$%^&*...)' }
  )
  .refine(
    (password) => !COMMON_PASSWORDS.includes(password.toLowerCase()),
    { message: 'Esta contraseña es demasiado común. Por favor, elija una más segura' }
  );

// Función para generar contraseña segura
export function generateSecurePassword(length: number = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercase + lowercase + numbers + special;
  
  let password = '';
  
  // Garantizar al menos un carácter de cada tipo
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Rellenar el resto
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Mezclar caracteres
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Función para verificar si la contraseña cumple requisitos mínimos (para UI)
export function getPasswordRequirements(): string[] {
  return [
    `Mínimo ${PASSWORD_POLICY.minLength} caracteres`,
    'Al menos una letra mayúscula (A-Z)',
    'Al menos una letra minúscula (a-z)',
    'Al menos un número (0-9)',
    'Al menos un carácter especial (!@#$%^&*...)',
    'No usar contraseñas comunes',
  ];
}

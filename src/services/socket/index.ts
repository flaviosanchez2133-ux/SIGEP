import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '../api/config';
import { getAccessToken } from '../api/client';

// Tipos de eventos
export interface DatoActualizadoEvent {
  departamentoId: string;
  tablaId: string;
  datoId: string;
  campo: 'periodoAnterior' | 'periodoActual';
  valorAnterior: number;
  valorNuevo: number;
  usuario: {
    id: string;
    nombre: string;
    color: string;
  };
  timestamp: string;
}

export interface EdicionToggleEvent {
  habilitada: boolean;
  usuario: {
    id: string;
    nombre: string;
  };
  timestamp: string;
}

export interface UsuarioConectadoEvent {
  usuarioId: string;
  nombre: string;
  color: string;
  departamento?: string;
}

export interface PeriodoActualizadoEvent {
  anteriorLabel: string;
  actualLabel: string;
  timestamp: string;
}

// Tipos de callbacks
type EventCallback<T> = (data: T) => void;

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  // Callbacks registrados
  private onDatoActualizado: EventCallback<DatoActualizadoEvent>[] = [];
  private onEdicionToggle: EventCallback<EdicionToggleEvent>[] = [];
  private onUsuarioConectado: EventCallback<UsuarioConectadoEvent>[] = [];
  private onUsuarioDesconectado: EventCallback<{ usuarioId: string }>[] = [];
  private onPeriodoActualizado: EventCallback<PeriodoActualizadoEvent>[] = [];
  private onConnectionChange: EventCallback<boolean>[] = [];

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    const token = getAccessToken();
    if (!token) {
      console.warn('No hay token, no se puede conectar al socket');
      return;
    }

    this.socket = io(API_CONFIG.socketURL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.setupListeners();
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🔌 Socket conectado');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.onConnectionChange.forEach((cb) => cb(true));
    });

    this.socket.on('disconnect', (reason) => {
      console.log('🔌 Socket desconectado:', reason);
      this.isConnected = false;
      this.onConnectionChange.forEach((cb) => cb(false));
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 Error de conexión:', error.message);
      this.reconnectAttempts++;
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('🔌 Máximo de reconexiones alcanzado');
      }
    });

    // Eventos de negocio
    this.socket.on('datos:actualizado', (data: DatoActualizadoEvent) => {
      this.onDatoActualizado.forEach((cb) => cb(data));
    });

    this.socket.on('edicion:toggle', (data: EdicionToggleEvent) => {
      this.onEdicionToggle.forEach((cb) => cb(data));
    });

    this.socket.on('usuario:conectado', (data: UsuarioConectadoEvent) => {
      this.onUsuarioConectado.forEach((cb) => cb(data));
    });

    this.socket.on('usuario:desconectado', (data: { usuarioId: string }) => {
      this.onUsuarioDesconectado.forEach((cb) => cb(data));
    });

    this.socket.on('config:periodo', (data: PeriodoActualizadoEvent) => {
      this.onPeriodoActualizado.forEach((cb) => cb(data));
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Unirse a una sala de departamento
  joinDepartamento(departamentoId: string): void {
    if (this.socket?.connected) {
      this.socket.emit('join:departamento', departamentoId);
    }
  }

  // Salir de una sala de departamento
  leaveDepartamento(departamentoId: string): void {
    if (this.socket?.connected) {
      this.socket.emit('leave:departamento', departamentoId);
    }
  }

  // Getters
  getIsConnected(): boolean {
    return this.isConnected;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  // Suscripciones
  subscribeDatoActualizado(callback: EventCallback<DatoActualizadoEvent>): () => void {
    this.onDatoActualizado.push(callback);
    return () => {
      this.onDatoActualizado = this.onDatoActualizado.filter((cb) => cb !== callback);
    };
  }

  subscribeEdicionToggle(callback: EventCallback<EdicionToggleEvent>): () => void {
    this.onEdicionToggle.push(callback);
    return () => {
      this.onEdicionToggle = this.onEdicionToggle.filter((cb) => cb !== callback);
    };
  }

  subscribeUsuarioConectado(callback: EventCallback<UsuarioConectadoEvent>): () => void {
    this.onUsuarioConectado.push(callback);
    return () => {
      this.onUsuarioConectado = this.onUsuarioConectado.filter((cb) => cb !== callback);
    };
  }

  subscribeUsuarioDesconectado(callback: EventCallback<{ usuarioId: string }>): () => void {
    this.onUsuarioDesconectado.push(callback);
    return () => {
      this.onUsuarioDesconectado = this.onUsuarioDesconectado.filter((cb) => cb !== callback);
    };
  }

  subscribePeriodoActualizado(callback: EventCallback<PeriodoActualizadoEvent>): () => void {
    this.onPeriodoActualizado.push(callback);
    return () => {
      this.onPeriodoActualizado = this.onPeriodoActualizado.filter((cb) => cb !== callback);
    };
  }

  subscribeConnectionChange(callback: EventCallback<boolean>): () => void {
    this.onConnectionChange.push(callback);
    return () => {
      this.onConnectionChange = this.onConnectionChange.filter((cb) => cb !== callback);
    };
  }
}

// Singleton
export const socketService = new SocketService();
export default socketService;

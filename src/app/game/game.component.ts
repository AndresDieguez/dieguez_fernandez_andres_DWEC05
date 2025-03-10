import { Component } from '@angular/core';
import { Configuracion } from '../models/Configuracion';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  configuracion: Configuracion = new Configuracion();  // instanciamios la clase Configuracion
  numeroAleatorio: number | null = null;
  numeroIngresado: number | null = null;
  intentosRestantes: number = 0;
  saludo: string = '';
  mensaje: string = '';
  juegoIniciado: boolean = false;
  juegoFinalizado: boolean = true;
  colorPista: string = '';

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.iniciarJuego();
    } else {
      console.log('Formulario inválido');
    }
  }

  iniciarJuego(): void {
    this.numeroAleatorio = Math.floor(Math.random() * (this.configuracion.rangoMaximo + 1));
    this.intentosRestantes = this.configuracion.intentos;
    this.saludo = `Ongi Etorri ${this.configuracion.nombre} ${this.configuracion.apellido}.`;
    this.juegoIniciado = true;
    this.juegoFinalizado = false;
    this.mensaje = '';    
    this.numeroIngresado = 0;
    console.log('Número Aleatorio:', this.numeroAleatorio);
  }

  verificarNumero(): void {
    if (this.numeroIngresado === null || this.numeroAleatorio === null) {
      return;
    }
    
    if (this.numeroIngresado === this.numeroAleatorio - 1) {
      this.mensaje = 'Caliente';
      this.colorPista = 'red';
    } else if (this.numeroIngresado === this.numeroAleatorio - 2) {
      this.mensaje = 'Templado';
      this.colorPista = 'orange';
    } else if (this.numeroIngresado <= this.numeroAleatorio - 3) {
      this.mensaje = 'Frío';
      this.colorPista = 'blue';
    } else  if (this.numeroIngresado > this.numeroAleatorio) {
        this.mensaje = 'Te pasaste';
        this.colorPista = 'black'; 
    } else if (this.numeroIngresado === this.numeroAleatorio) {
      this.juegoFinalizado = true;
      this.mensaje = '¡Has Ganado!';
      this.colorPista = 'green';
    }

    this.intentosRestantes--;

    if (this.intentosRestantes <= 0 && this.numeroIngresado !== this.numeroAleatorio) {
      this.juegoFinalizado = true;
      this.mensaje = `Lo siento, no te quedan más intentos. El número era ${this.numeroAleatorio}.`;
      this.colorPista = 'black';            
    }
  }
  reiniciarJuego(): void {
    this.juegoIniciado = false;
    this.juegoFinalizado = true;
    this.mensaje = '';
    this.colorPista = '';
    this.numeroAleatorio = null;
    this.numeroIngresado = null;
    this.configuracion.nombre = '';
    this.configuracion.apellido = ''; 
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Navbar } from './navbar/navbar'; 
import { Usuario } from './formularios/usuario/usuario'; 

@Component({
  imports: [RouterOutlet, Navbar, Usuario],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
 title = "web-app"

  ngOnInit(): void {
    initFlowbite();
  }
}
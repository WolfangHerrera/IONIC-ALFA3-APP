import { Component, OnInit } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent  {
  selectedSegment: string = 'first';
  multitomas = [
    {
      id: 1,
      nombre: 'MULTITOMA REGLETA',
      descripcion: '4 SALIDAS | FUSIBLE | 1 METRO CABLE',
      precio: 300000,
      imagen: 'https://http2.mlstatic.com/D_Q_NP_841778-MCO81135000013_122024-AC.webp'

    },
    {
      id: 2,
      nombre: 'MULTITOMA REGLETA',
      descripcion: '6 SALIDAS | FUSIBLE | 1 METRO CABLE',
      precio: 360000,
      imagen: 'https://http2.mlstatic.com/D_Q_NP_739834-MCO81135001993_122024-AC.webp'

    },
    {
      id: 3,
      nombre: 'MULTITOMA CUADRADA',
      descripcion: '6 SALIDAS | FUSIBLE | 1 METRO CABLE',
      precio: 300000,
      imagen: 'https://http2.mlstatic.com/D_Q_NP_749521-MCO80869248220_122024-AC.webp'

    },
    {
      id: 4,
      nombre: 'MULTITOMA RACK',
      descripcion: '8 SALIDAS | FUSIBLE | 1 METRO CABLE',
      precio: 360000,
      imagen: 'https://http2.mlstatic.com/D_Q_NP_773002-MCO81037777142_122024-AC.webp'
    },
  ];

  reguladores = [
    {
      id: 1,
      nombre: 'REGULADOR VOLTAJE 1000W',
      descripcion: '4 SALIDAS | FUSIBLE | 1 METRO CABLE',
      precio: 560000,
      imagen: 'https://http2.mlstatic.com/D_Q_NP_895639-MCO80335572174_112024-AC.webp'

    },
    {
      id: 2,
      nombre: 'REGULADOR VOLTAJE 2000W',
      descripcion: '4 SALIDAS | FUSIBLE | 1 METRO CABLE',
      precio: 1260000,
      imagen: 'https://http2.mlstatic.com/D_Q_NP_986068-MCO80432640610_112024-AC.webp'

    },
  ];
  

}

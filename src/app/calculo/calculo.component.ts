
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule }    from '@angular/forms';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculo',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './calculo.component.html',
  styleUrl: './calculo.component.css'
})
export class CalculoComponent {

// celdas de entrada
c1: number | null = null; d1: number | null = null;  e1 : number | null = null; 
c2 : number | null = null;  c3 : number | null = null;  e2 : number | null = null; 
  d2 : number | null = null;  d3 : number | null = null;  e3 : number | null = null; 

 d6 : number | null = null;  d7: number | null = null;  c7: number | null = null;  c8 : number | null = null; 

// helpers
private sum(...a: number[]): number {
  return a.reduce((x, y) => x + y, 0);
}

private avg(...a: number[]): number {
  return this.sum(...a) / a.length;
}

private mx(...a: number[]): number {
  return Math.max(...a);
}

private mn(...a: number[]): number {
  return Math.min(...a);
}

// redondea al entero más cercano: si decimal ≥ 0.5 sube, si < 0.5 baja
private roundInt(n: number): number {
  return Math.round(n);
}

// fórmulas con redondeo a entero
get c4(): number {
  return this.roundInt(this.sum(this.c2!, this.c3!));
}

get d4(): number {
  return this.roundInt(this.sum(this.d2!, this.d3!));
}

get e4(): number {
  return this.roundInt(this.sum(this.e2!, this.e3!));
}

get d8(): number {
  const raw = this.c4 + this.d4 + this.e4 + this.avg(this.c4, this.d4, this.e4);
  return this.roundInt(raw);
}

get d9(): number {
  const raw = this.c4 + this.d4 + this.e4 + this.d6! + (this.c11 * 2);
  return this.roundInt(raw);
}

get c10(): number {
  return this.roundInt(this.mx(this.c4, this.d4, this.e4) / 4);
}

get d10(): number {
  return this.roundInt(this.d11 / 2);
}

get c11(): number {
  return this.roundInt(this.avg(this.c4, this.d4, this.e4) / 4);
}

get d11(): number {
  const raw = (this.d7! - (this.c4 + this.d4 + this.e4) - this.d6!) / 2;
  return this.roundInt(raw);
}

get c12(): number {
  return this.roundInt(this.mn(this.c4, this.d4, this.e4) / 4);
}

get d12(): number {
  const raw = (this.d7! - (this.c4 + this.d4 + this.e4) - this.c8!);
  return this.roundInt(raw);
}



resetear() {
this.c1 = null; this.d1  = null;  this.e1  = null; 
this.c2  = null;  this.c3  = null;  this.e2  = null; 
  this.d2= null;  this.d3  = null;  this.e3  = null; 

 this.d6  = null;  this.d7 = null;  this.c7 = null;  this.c8  = null; 


}








private get _sorted4(): number[] {
  return [this.c4, this.d4, this.e4].sort((a,b)=>a-b);
}

/** Clase para la celda c4 */
get c4Class(): 'min'|'mid'|'max' {
  if (this.c4 === this._sorted4[0]) return 'min';
  if (this.c4 === this._sorted4[2]) return 'max';
  return 'mid';
}

/** Clase para la celda d4 */
get d4Class(): 'min'|'mid'|'max' {
  if (this.d4 === this._sorted4[0]) return 'min';
  if (this.d4 === this._sorted4[2]) return 'max';
  return 'mid';
}

/** Clase para la celda e4 */
get e4Class(): 'min'|'mid'|'max' {
  if (this.e4 === this._sorted4[0]) return 'min';
  if (this.e4 === this._sorted4[2]) return 'max';
  return 'mid';
}






private get _sorted5(): number[] {
  return [this.c10, this.c11, this.c12].sort((a, b) => a - b);
}

// 2. Tres getters distintos que usan _sorted5
get c10Class(): 'min'|'mid'|'max' {
  const [min, , max] = this._sorted5;
  if (this.c10 === min) return 'min';
  if (this.c10 === max) return 'max';
  return 'mid';
}

get c11Class(): 'min'|'mid'|'max' {
  const [min, , max] = this._sorted5;
  if (this.c11 === min) return 'min';
  if (this.c11 === max) return 'max';
  return 'mid';
}

get c12Class(): 'min'|'mid'|'max' {
  const [min, , max] = this._sorted5;
  if (this.c12 === min) return 'min';
  if (this.c12 === max) return 'max';
  return 'mid';
}



get d11Class(): 'min'|'mid'|'max' {
  if (this.d11 > this.c10)      return 'max';
  if (this.d11 <= this.c12)     return 'min';
  return 'mid';
}

/** Para d12 */
get d12Class(): 'min'|'mid'|'max' {
  if (this.d12 > this.c10)      return 'max';
  if (this.d12 <= this.c12)     return 'min';
  return 'mid';
}











private get _sortedx(): number[] {
  return [this.c4, this.d4, this.e4].sort((a, b) => a - b);
}

/**  
 * Devuelve un código que representa la posición de c4, d4, e4  
 * en el array ordenado.  
 * Por ejemplo, si c4=3,d4=1,e4=2 y sorted=[1,2,3],  
 * entonces ranks = [2,0,1]  
 */
private get _ranks4(): number[] {
  const values = [this.c4, this.d4, this.e4];
  return values.map(v => values.filter(x => x < v).length);
}


/** “MAS” o “MENOS” según la permutación */
get masMenosLabel(): 'MAS'|'MENOS' {
  const [r0, r1, r2] = this._ranks4;
  // max=2, mid=1, min=0

  // MENOS: [2,1,0], [2,0,1], [1,2,0]
  if ((r0===2&&r1===1&&r2===0) ||
      (r0===2&&r1===0&&r2===1) ||
      (r0===1&&r1===2&&r2===0)) {
    return 'MENOS';
  }
  // MAS: [1,0,2], [0,2,1], [0,1,2]
  return 'MAS';
}

/** clase CSS según el caso (6 posibilidades) */
get masMenosClass(): string {
  const [r0, r1, r2] = this._ranks4;
  // MENOS + color
  if (r0===2&&r1===1&&r2===0) return 'menos-yellow';
  if (r0===2&&r1===0&&r2===1) return 'menos-red';
  if (r0===1&&r1===2&&r2===0) return 'menos-green';
  // MAS + color
  if (r0===1&&r1===0&&r2===2) return 'mas-red';
  if (r0===0&&r1===2&&r2===1) return 'mas-green';
  if (r0===0&&r1===1&&r2===2) return 'mas-yellow';
  // fallback
  return 'mas-yellow';
}




}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reserva } from '../model/reserva.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public getReserve(): Observable<Reserva>{
    return this.httpclient.get<Reserva>('http://localhost:8080/client/listAllClient');
  }

  public reserveDate(reservaModel: Reserva): Observable<Reserva>{
    return this.httpclient.post<Reserva>('http://localhost:8080/client' , JSON.stringify(reservaModel), this.httpOptions);
  }

  public putClient(reservaModel: Reserva): Observable<Reserva>{
    return this.httpclient.put<Reserva>('http://localhost:8080/client' , JSON.stringify(reservaModel), this.httpOptions);
  }
}
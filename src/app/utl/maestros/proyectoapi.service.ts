import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IMaestro } from "./maestros-utl";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProyectoapiService {
    // URL base de tu API de Flask
    private apiURL = 'http://127.0.0.1:5000/api';

    constructor(private http: HttpClient) { }
    
    getMaestros(): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/maestros/`);
    }

    getMaestro(id: string | number): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/maestros/${id}`);
    }

    agregarNuevoMaestro(maestro: any): Observable<any> {
        return this.http.post<any>(`${this.apiURL}/maestros/`, maestro);
    }

    modificarMaestro(id: string | number, maestro: any): Observable<any> {
        return this.http.put<any>(`${this.apiURL}/maestros/${id}`, maestro);
    }

    eliminarMaestro(id: string | number): Observable<any> {
        return this.http.delete<any>(`${this.apiURL}/maestros/${id}`);
    }
}
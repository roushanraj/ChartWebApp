
import { HttpClient } from '@angular/common/http';
import { Result } from './Model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
export class ResultService{

    constructor(private httpClient: HttpClient){}
    public endpoint = "http://localhost:9876/";


    getResult(uri: string): Observable<Result[]>{
    return this.httpClient.get<Result[]>(this.endpoint+uri);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, take } from 'rxjs';
//import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(private http: HttpClient) {}

  async getData(uri: string) {
    return this.http.get(uri);
  }

  async fetch(uri: string) {
    const response:any = await lastValueFrom(await this.getData(uri)).then((name) => {
      return name;
    })

    return response.denom_trace.base_denom;
  }

  async getRequest(uri: string) {
    var result = await this.fetch(uri);
    
    return result
  }

}


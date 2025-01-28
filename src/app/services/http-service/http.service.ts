import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerializerService } from './serializer.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private httpService: HttpClient, private serializer: SerializerService) { }

  public get(route: string) {
    return this.httpService.get(route).pipe(map(payload => {
      return this.serializer.deserialize(payload);
    }));
  }

  public post (route: string, payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':  'application/json'        
      })
    }
    return this.httpService.post(route, this.serializer.serialize(payload), httpOptions);
  }
  
  public delete (route: string, id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':  'application/json'
      }),
      body: id
    }
    return this.httpService.delete(route, httpOptions);
  }

  public put(routeString: string, payload : any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':  'application/json'        
      })
    }
    return this.httpService.put(routeString, payload, httpOptions);
  }

  public putWithoutBody(routeString: string) {
    return this.httpService.put(routeString, null);
  }

}


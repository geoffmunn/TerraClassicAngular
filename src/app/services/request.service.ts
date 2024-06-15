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
    
    console.log('result:', result)
    return result
  }

  // async getRequest2(uri: string): Promise<any> {
  //   const request$ = this.http.get(uri).pipe(take(1));

  //   return await lastValueFrom<any>(request$);
  // }
  
  // async getRequest(uri: string): Promise<any> {
  //   var blah = await this.getRequest2(uri).then((name) => {
  //     console.log('hi:', name)
  //   })

  //   return 'geoff';
  // }


  // getRequest(uri: string):string {

  //   var result: string = '';
  //   var test: any 

  //   test = this.http.get<any>(uri, {responseType: 'json'}).subscribe(async http_result => {
  //     console.log ('http result:', http_result.denom_trace.base_denom)
  //     result = http_result.denom_trace.base_denom;
  //   })

  //   console.log ('test:', result)
  //   return result;
  // }

  // async getRequest(uri: string) {

    
  //   const request$ = this.http.get(uri).pipe(take(1));

  //   var result: any
  //   var blah = await lastValueFrom<any>(request$).then((name) => { console.log(name)})

  //   return blah
  // }
    //}

    
    // var result: string = '';
    // var test: any 

    // const fetch = (uri: string) => {        
    //   var test = new Promise<any>(resolve => {
    //     this.http.get<any>(uri, {responseType: 'json'})
    //   }).then (() => { console.log('hi')})

    //   //test.then(function(name) { console.log('blah:', name) });

    //   return test
    // }

    // test = fetch(uri)


    // //test = await firstValueFrom(this.http.get<any>(uri, {responseType: 'json'}))

    // console.log ('async result:', test)
    // //   console.log ('http result:', http_result.denom_trace.base_denom)
    // //   result = http_result.denom_trace.base_denom;
    // // })

    // // console.log ('test:', result)
    // // return result;

    //return test
 // }

}


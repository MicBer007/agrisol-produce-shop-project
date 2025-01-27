import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerializerService {

  private objectMap = new Map<object, number>();
  private idCounter = 0;

  private jsonObjectIdFieldName = "objId";

  serialize(obj: any): any {
    console.log("Serializing!");
    this.objectMap.clear();
    this.idCounter = 0;
    let object: any = this.serializeObject(obj);
    console.log(obj);
    console.log(object);
    return object;
  }

  private serializeObject(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.serializeObject(item));
    }
    if (this.objectMap.has(obj)) {
      return { [this.jsonObjectIdFieldName]: this.objectMap.get(obj) };
    }

    const id = this.idCounter++;
    this.objectMap.set(obj, id);

    const serializedObj: any = { [this.jsonObjectIdFieldName]: "obj_" + id };
    for (const key of Object.keys(obj)) {
      serializedObj[key] = this.serializeObject(obj[key]);
    }
    return serializedObj;
  }

  private objMap = new Map<string, any>();

  deserialize(json: any): any {
    return this.deserializeObject(json);
  }

  private deserializeObject(json: any) : any {
    if (json === null || typeof json !== 'object') {
      return json;
    }

    if (Object.keys(json).length == 1 && this.jsonObjectIdFieldName in json) {
      return this.objMap.get(json[this.jsonObjectIdFieldName]);
    }
    let obj: any;
    if (Array.isArray(json)) {
      obj = [];
      for (const item of json) {
        obj.push(this.deserializeObject(item));
      }
    } else {
      obj = {};
      if (this.jsonObjectIdFieldName in json) {
        this.objMap.set(json[this.jsonObjectIdFieldName], obj);
      }
      for (const key of Object.keys(json)) {
        if (key !== this.jsonObjectIdFieldName) {
          obj[key] = this.deserializeObject(json[key]);
        }
      }
    }
    return obj;
  }

}

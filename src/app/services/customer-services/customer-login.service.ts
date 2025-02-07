import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerLoginService {

  defaultMessage: string = "Log in";

  loginPromptingResponsability$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor() { }

  getLoginPromptingResponsability$(){
    return this.loginPromptingResponsability$;
  }

  promptUserToLogInWithDefaultMessage(){
    this.promptUserToLogInWithMessage(this.defaultMessage);
  }

  promptUserToLogInWithMessage(message: string){
    this.loginPromptingResponsability$.next(message);
  }

}

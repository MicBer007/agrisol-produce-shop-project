import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { TransactionDto } from '../../dto/transaction-dto';
import { TransactionEvolver } from '../../evolvers/transaction-evolver';
import { BehaviorSubject, map } from 'rxjs';
import { TransactionModel } from '../../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpService: HttpService) { }

  transactions$: BehaviorSubject<TransactionModel[]> = new BehaviorSubject<TransactionModel[]>([]);

  getAll$() {
    return this.httpService.get("https://localhost:7114/api/Transaction")
      .pipe(map(dto => {
        return (dto as TransactionDto[]).map(transactionDto  => TransactionEvolver.toModel(transactionDto));
      }));
  }

  add$(transactionModel: TransactionModel) {
    let dto = TransactionEvolver.toDto(transactionModel);
    dto.transactionId = undefined;
    return this.httpService.post("https://localhost:7114/api/Transaction", dto);
  }

  delete$(id: string) {
    return this.httpService.delete("https://localhost:7114/api/Transaction/" + id, id);
  }

  put$(transactionModel: TransactionModel) {
    let dto = TransactionEvolver.toDto(transactionModel);
    return this.httpService.put("https://localhost:7114/api/Transaction", dto);
  }

}

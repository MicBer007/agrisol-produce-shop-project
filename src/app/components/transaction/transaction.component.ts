import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction-service/transaction.service';
import { TransactionModel } from '../../models/transaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {

  constructor(private transactionService: TransactionService) {}

  transactions: TransactionModel[] = [];

  ngOnInit(): void {
    this.transactionService.getAll$().subscribe(payload => {
      console.log(payload);
      this.transactions = payload;
    })
  }

  transactionName: string = "";
  transactionValueAsString: string = "";
  transactionCustomerId: string = "";
  onAddTransactionClicked(){
    if(this.transactionName == "" || this.transactionValueAsString == "" || this.transactionCustomerId == "") return
    var transactionValue: number = Number(this.transactionValueAsString);
    var transaction: TransactionModel = new TransactionModel("", this.transactionName, transactionValue, this.transactionCustomerId);
    this.transactionService.add$(transaction).subscribe(payload => {
      console.log(payload);
    });
  }

  onTransactionSaveChangesClicked(transaction: TransactionModel){
    this.transactionService.put$(transaction).subscribe(payload => {
      console.log(payload);
    })
  }

  onTransactionRemoveClicked(transaction: TransactionModel){
    this.transactionService.delete$(transaction.id).subscribe(payload => {
      console.log(payload);
    })
  }

  deleteTransactionsForUser(customerId: string){
    for(var i = 0; i < this.transactions.length; i++){
      var transaction = this.transactions[i];
      if(transaction.customerId != customerId) continue;
      this.transactionService.delete$(transaction.id).subscribe(payload => {
        console.log(payload);
      })
    }
  }

}

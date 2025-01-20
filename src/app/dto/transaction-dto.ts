export class TransactionDto {
   transactionId?: string; //id needs to be able to be set by the backend
   transactionName!: string;
   transactionValue!: number;
   customerId!: string;
}
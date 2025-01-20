import { TransactionDto } from "./transaction-dto";

export class CustomerDto {
   customerId?: string;
   firstName!: string;
   lastName!: string;
   age!: number;
   bankDetails!: string;
   transactions!: TransactionDto[];
}
import { TransactionDto } from "../dto/transaction-dto";
import { TransactionModel } from "../models/transaction";

export class TransactionEvolver {

   static toModel(dto: TransactionDto): TransactionModel {
      var model: TransactionModel = {
         id: dto.transactionId ? dto.transactionId : "",
         name: dto.transactionName,
         value: dto.transactionValue,
         customerId: dto.customerId
      };
      return model;
   }

   static toDto(model: TransactionModel): TransactionDto {
      var dto: TransactionDto = {
         transactionName: model.name,
         transactionValue: model.value,
         customerId: model.customerId
      };
      dto.transactionId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}
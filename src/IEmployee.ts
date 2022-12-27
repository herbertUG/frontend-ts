export interface IEmployee {
  uniqueId: number;
  name: string;
  supervisor?: IEmployee;
  subordinates: IEmployee[];
}

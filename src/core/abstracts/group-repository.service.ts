export abstract class IGroupServices {
    abstract getGroupsByPersonPaginate(idPerson: number, typeGroup: number, options: any): Promise<any>;
}
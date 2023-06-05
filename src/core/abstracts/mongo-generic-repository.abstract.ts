export abstract class IMongoGenericRepository<T> {
    abstract getAll(relation?: any, select?: any, option?: any, limit?: any, order?: any): Promise<T[]>;

    abstract getOne(option: any, relation?: any, select?: any): Promise<T>;

    abstract create(item: T): Promise<T>;

    abstract update(id: string, item: any): Promise<any>;
    
    abstract delete(item: any): Promise<any>;

    abstract updateActive(id: number, active: any): Promise<any>;

    abstract paginate(options: any, principal?: any, secondary?: any, select?: any): Promise<any>;

    abstract uniqueField(field: any): Promise<boolean>;
}
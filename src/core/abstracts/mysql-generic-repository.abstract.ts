export abstract class IGenericRepository<T> {
    
    abstract getAll(relation?: any, select?: any, option?: any, limit?: number, order?: any): Promise<T[]>;

    abstract getOne(option: any, relation?: any, select?: any, order?: any): Promise<T>;

    abstract create(item: T): Promise<T>;

    abstract update(id: number, item: any): Promise<any>;

    abstract updateActive(id: number, active: any): Promise<any>;

    abstract paginate(options: any, principal?: any, secondary?: any, select?: any, where?: any): Promise<any>;

    abstract paginateCondition(options: any, principal?: any, secondary?: any, select?: any, whereEqualsObj?: any, whereLikeObj?: any, orderBy?: any): Promise<any>;

    abstract getAllByDate(table: any, month: number, year: number, startField?: any): Promise<T[]>;

    abstract uniqueField(field: any): Promise<boolean>;

    abstract count(condition?: any): Promise<number>;

    abstract countByDate(table: string, date: Date): Promise<any>;

    abstract delete(id: number): Promise<any>;

    abstract findAll(option: any): Promise<T[]>;
}
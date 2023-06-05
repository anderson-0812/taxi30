import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";

import { isLeapYear } from "../../../helpers/utilities";
import { IGenericRepository } from "../../../core/abstracts";

export class MySqlGenericRepository<T> implements IGenericRepository<T> {
    private _repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this._repository = repository;
    }

    getAll(relation?: any, select?: any, option?: any, limit?: number, order?: any): Promise<T[]> {
        if (relation) {
            relation = relation.split(',');
            return this._repository.find({ relations: [...relation], select: select, where: option, take: limit, order: order });
        }
        if (select || option || limit || order) {
            return this._repository.find({ select: select, where: option, take: limit, order: order })
        } else {
            return this._repository.find();
        }
    }

    getAllByDate(table: any, month: number, year: number, startField?: any): Promise<T[]> {
        const objs = this._repository.createQueryBuilder(table);
        const startDate = new Date(`${year},${month},1`);
        const dates = [
            [startDate, new Date(`${year},${month},31`)],
            [startDate, new Date(`${year},${month},${isLeapYear(year) ? 29 : 28}`)],
            [startDate, new Date(`${year},${month},31`)],
            [startDate, new Date(`${year},${month},30`)],
            [startDate, new Date(`${year},${month},31`)],
            [startDate, new Date(`${year},${month},30`)],
            [startDate, new Date(`${year},${month},31`)],
            [startDate, new Date(`${year},${month},31`)],
            [startDate, new Date(`${year},${month},30`)],
            [startDate, new Date(`${year},${month},31`)],
            [startDate, new Date(`${year},${month},30`)],
            [startDate, new Date(`${year},${month},31`)]
        ];

        if (startField) {
            objs.where(`${table}.${startField} >= :startDate`, { startDate: dates[month - 1][0] })
                .andWhere(`${table}.${startField} <= :finishDate`, { finishDate: dates[month - 1][1] });
        } else {
            objs.where(`${table}.createdAt > :startDate`, { startDate: dates[month - 1][0] })
                .andWhere(`${table}.createdAt < :finishDate`, { finishDate: dates[month - 1][1] });
        }
        return objs.getMany();
    }

    getOne(option: any, relation?: any, select?: any, order?: any): Promise<T> {
        if (relation) {
            relation = relation.split(',');
            return this._repository.findOne({
                where: option,
                relations: [...relation],
                select: select,
                order: order
            });
        } else {
            return this._repository.findOne({
                where: option,
                select: select
            });
        }
    }

    async create(item: any): Promise<any> {
        return this._repository.save(item);
    }

    async update(id: number, item: any): Promise<any> {
        return this._repository.update(id, item);
    }

    updateActive(id: number, active: any): Promise<any> {
        return this._repository.update(id, active);
    }

    async paginate(options: IPaginationOptions, principal?: any, secondary?: any, select?: any, where?: any): Promise<Pagination<T>> {
        if (principal && secondary) {
            const objs = this._repository.createQueryBuilder(principal);
            objs.leftJoinAndSelect(`${principal}.${secondary}`, secondary);
            const attr = [...select];
            if (where == null) {
                objs.select(attr)
                    .getMany();
            } else {
                objs.select(attr)
                    .where(where)
                    .getMany();
            }
            return paginate<T>(objs, options);
        } else {
            return paginate<T>(this._repository, options);
        }
    }

    async paginateCondition(options: IPaginationOptions, principal?: any, relations?: any, select?: any, whereEqualsObj?: any, whereLikeObj?: any, orderBy?: any): Promise<Pagination<T>> {
        let objs = this._repository.createQueryBuilder(principal);

        let attr = [...select];
        if (principal && (relations?.length > 0 && relations != null)) {

            // recorro y armo mis joins
            relations.map(function (relation) {
                objs.leftJoinAndSelect(`${relation.principal}.${relation.secondary}`, relation.secondary);
            });
        }

        let whereEqualsArr = Object.entries(whereEqualsObj);
        let whereLikeArr = Object.entries(whereLikeObj);

        let whereTotal = ' TRUE ';
        let whereEquals = '';
        let whereLike = '';

        let where = false;
        let operatorOR = false;

        // recorro datos para sacar campos con operador AND
        if (whereEqualsArr.length > 0) {
            whereEqualsArr.map(([key, val]: any) => {
                if (Array.isArray(val)) {
                    whereEquals += " AND ( ";
                    for (let i = 0; i < val.length - 1; i++) {
                        whereEquals += key + ' = ' + val[i + 1];
                        whereEquals += (i < val.length - 2) ? " OR " : " )";
                    }
                } else {
                    whereEquals += ' AND ' + key + '=' + val;
                }
            });
            where = true;
        }

        // recorro datos para sacar campos con el operador LIKE para el where
        if (whereLikeArr.length > 0) {
            whereLikeArr.map(([key, val]) => {
                if (!operatorOR) {
                    whereLike += ' AND (' + key + ' LIKE ' + '"%' + val + '%"';
                } else {
                    whereLike += ' OR ' + key + ' LIKE ' + '"%' + val + '%"';
                }
                // Cambio el valor de where para controlar que el seg operador sea OR
                operatorOR = true;
                //q la consulta final tenga el .where()
                where = true;
            });
            whereLike += ' )';
        }
        whereTotal += whereEquals + ' ' + whereLike + '';
        objs.select(attr);

        if (where) {
            objs.where(whereTotal);
        }
        objs.orderBy('')
        if (orderBy) {
            orderBy.forEach((order) => {
                objs.addOrderBy(order.attribute, order.order)
            })
        }
        objs.getMany();
        return paginate<T>(objs, options);
    }

    async uniqueField(field: any): Promise<boolean> {
        const number = await this._repository.count({ where: field });
        return number <= 0 ? true : false;
    }

    count(condition?: any): Promise<number> {
        if (condition) {
            return this._repository.count({ where: condition });
        } else {
            return this._repository.count();
        }
    }

    countByDate(table: string, date: Date): Promise<any> {
        const startDate = new Date([date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') + ' ' + [0, 0, 0].join(':'));
        const finishDate = new Date([date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') + ' ' + [23, 59, 59].join(':'));

        const objs = this._repository.createQueryBuilder(table)
            .where(`${table}.createdAt > :startDate`, { startDate: startDate.toISOString() })
            .andWhere(`${table}.createdAt < :finishDate`, { finishDate: finishDate.toISOString() })
            .getCount()

        return objs;
    }


    async findAll(option: any) {
        return this._repository.find(option);
    }

    delete(id: number): Promise<any> {
        return this._repository.delete(id);
    }
}
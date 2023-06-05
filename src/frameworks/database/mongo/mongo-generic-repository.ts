import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IMongoGenericRepository } from "src/core/abstracts";

@Injectable()
export class MongoGenericRepository<T> implements IMongoGenericRepository<T> {
    private _repository: Model<T>;

    constructor(repository: Model<T>) {
        this._repository = repository;
    }

    async getAll(relation?: any, select?: any, option?: any, limit?: any, order?: any): Promise<T[]> {
        if (!order)
            order = {};
        if (relation) {
            if (limit) {
                return this._repository.find({ option }).populate(relation, select).limit(limit).exec();
            } else {
                return this._repository.find({ option }).populate(relation, select).exec();
            }
        } else {
            if (!option) {
                option = {};
            }
            if (limit) {
                if (select)
                    return this._repository.find(option, select).limit(limit).sort(order);
                else
                    return this._repository.find(option).limit(limit).sort(order);
            } else {
                if (select)
                    return this._repository.find(option, select).sort(order);
                else
                    return this._repository.find(option).sort(order);
            }
        }
    }

    async getOne(option: any, relation?: any, select?: any): Promise<any> {
        if (relation) {
            return this._repository.findOne(option).populate(relation, select).exec();
        } else if (select) {
            return this._repository.findOne(option, select);
        } else {
            return this._repository.findOne(option);
        }
    }

    create(item: T): Promise<T> {
        return this._repository.create(item);
    }

    async delete(item: any): Promise<any> {
        return this._repository.deleteMany(item);
    }

    async update(id: string, item: any): Promise<any> {
        return this._repository.findByIdAndUpdate(id, item);
    }

    async updateActive(id: number, active: any): Promise<any> {
        return this._repository.findByIdAndUpdate(id, active);
    }

    paginate(options: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async uniqueField(field: any): Promise<boolean> {
        const number = await this._repository.count({ field });
        return number <= 0 ? true : false;
    }
}
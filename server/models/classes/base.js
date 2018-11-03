'use strict';
import { omitBy, isNil } from 'lodash';

export default class BaseModelClass {

    static async getAll (params) {

        params = Object.assign(
            {
                where: null,
                limit: 100,
                page: 1,
                sort: { _id: -1 },
                select: null,
                isLean: true
            },
            omitBy(params, isNil)
        );
        params.skip = params.limit * (params.page - 1);
        let query = `
            this
            .find(params.where)
            .limit(params.limit)
            .skip(params.skip)
            .sort(params.sort)
            .select(params.select)`;

        if (params.populate) {
            query += `.populate(params.populate)`;
        }
        query += `.lean(params.isLean)`;
        return eval(query);
    }

    static async getOne (params) {
        params = Object.assign(
            {
                where: null,
                select: null,
                isLean: true
            },
            omitBy(params, isNil)
        );
        let query = `
            this
            .findOne(params.where)
            .sort(params.sort)
            .select(params.select)`;

        if (params.populate) {
            query += `.populate(params.populate)`;
        }
        query += `.lean(params.isLean)`;
        return eval(query);
    }

    static async softDelete (option) {
        return this.update(
            option.where,
            {
                deletedAt: new Date()
            }
        );
    }

    static async destroy (option) {
        return this.remove(
            option.where,
        );
    }

}

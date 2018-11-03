'use strict';
import { Todo } from '../models';
import { success } from '../helpers/api-success';

export default class TodoController {

    static async getAll(req, res, next) {
        try {
            const { page, limit, status } = req.query;
            const whereClause = {};
            if (status) {
                whereClause.status = status;
            }
            const todos = await Todo.getAll({
                page,
                limit,
                where: whereClause
            });
            return success(res, todos);
        } catch (e) {
            return next(e);
        }
    }

    static async getOne(req, res, next) {
        try {
            const _id = req.params.id;
            const todo = await Todo.getOne({
                where: {
                    _id
                }
            });
            return success(res, todo);
        } catch (e) {
            return next(e);
        }
    }

    static async create(req, res, next) {
        try {
            const body = req.body;
            const todo = await Todo.createTodo(body);
            delete todo.histories;
            return success(res, todo);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const body = req.body;
            const _id = req.params.id;
            const todo = await Todo.updateTodo(
                {
                    _id
                },
                body
            );
            return success(res, todo);
        } catch (e) {
            return next(e);
        }
    }

};

'use strict';
import { omit } from 'lodash';
import BaseModelClass from './base';

export default class TodoModelClass extends BaseModelClass {

    static async updateTodo(where = {}, data) {
        const todo = await this.getOne({
            where,
            isLean: false
        });
        if (!todo) {
            throw new Error('Todo is not found');
        }
        const updateData = omit(data, '_id', 'histories', 'createdAt', 'updatedAt');
        todo.set(updateData);
        todo.histories[todo.histories.length] = {
            event: this.EVENTS.UPDATE,
            ...todo._doc
        };
        return todo.save();
    }

    static async createTodo(data) {
        const createData = omit(data, '_id', 'createdAt', 'histories', 'updatedAt');
        const newTodo = new this(createData);
        newTodo.histories = [
            {
                event: this.EVENTS.CREATE,
                ...newTodo._doc
            }
        ];
        return newTodo.save();
    }

}

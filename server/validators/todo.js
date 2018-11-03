'use strict';
import BaseValidator from './base';
import Joi from 'joi';
import Todo from '../models/todo';

export default class TodoValidator extends BaseValidator {
    static pagination = TodoValidator.validatePagination();
    static commonInput = TodoValidator.validateCommonInput();

    static getAll() {
        return {
            query: {
                ...TodoValidator.pagination.query,
                name: Joi.string(),
                status: Joi.string().valid(Object.values(Todo.STATUS)),
            },
        }
    };

    static getOne() {
        return {
            params: {
                ...TodoValidator.commonInput.params,
            },
            query: {
                name: Joi.string(),
                status: Joi.string().valid(Object.values(Todo.STATUS)),
            },
        }
    };

    static create() {
        return {
            body: {
                ...TodoValidator.commonInput.body,
                name: Joi.string().required().min(2).max(255),
                status: Joi.string().valid(Object.values(Todo.STATUS)),
            },
        }

    };

    static update() {
        return {
            params: {
                ...TodoValidator.commonInput.params,
            },
            body: {
                ...TodoValidator.commonInput.body,
                name: Joi.string().min(3).max(255),
                status: Joi.string().valid(Object.values(Todo.STATUS)),
            },
        }
    };

}

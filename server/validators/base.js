'use strict';
import Joi from 'joi';
export default class BaseValidator {

    static validatePagination() {
        return {
            query: {
                page: Joi.number().min(1),
                limit: Joi.number().min(1).max(100),
            }
        }
    };

    static validateCommonInput() {
        return {
            params: {
                id: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
            },
            query: {
                id: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
            },
            body: {
                id: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
            },
        }
    }

}
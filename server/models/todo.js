'use strict';
import Mongoose from './init-mongoose';
import TodoClass from './classes/todo';
import TodoPlugin from './plugins/todo';

const STATUS = {
    DONE: 'done',
    UN_DONE: 'un_done',
    REMOVE: 'remove'
};

const EVENTS = {
    CREATE: 'create',
    UPDATE: 'update',
};

const schema = new Mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            minlength: [3, 'MIN_VALUE_VALIDATION'],
            maxlength: [255, 'MAX_VALUE_VALIDATION']
        },
        status: {
            type: String,
            enum: Object.values(STATUS),
            default: STATUS.UN_DONE
        },
        histories: [
            {
                name: {
                    type: String,
                    unique: true,
                    required: true,
                    minlength: [3, 'MIN_VALUE_VALIDATION'],
                    maxlength: [255, 'MAX_VALUE_VALIDATION']
                },
                status: {
                    type: String,
                    enum: Object.values(STATUS)
                },
                event: {
                    type: String,
                    enum: Object.values(EVENTS)
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        deletedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

schema.statics = {
    STATUS,
    EVENTS
};

schema.loadClass(TodoClass);
schema.plugin(TodoPlugin);

module.exports = Mongoose.model('Todo', schema);

'use strict';

const handleMongoError = function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        return next(new Error('Unique error!'));
    }
    return next();
};
export default function (schema, options) {

    schema.post('save', handleMongoError);

};

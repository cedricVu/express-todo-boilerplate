'use strict';

function checkDeletedMiddleware (next) {
    const filter = this.getQuery();
    if (filter.deletedAt === undefined) {
        filter.deletedAt = null;
    }
    return next();
}

export default function (schema, options) {

    schema.pre('find', checkDeletedMiddleware);
    schema.pre('findOne', checkDeletedMiddleware);
    schema.pre('update', checkDeletedMiddleware);

};

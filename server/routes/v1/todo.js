'use strict';
import { TodoController } from '../../controllers';
import Validate from 'express-validation';
import TodoValidator from '../../validators/todo';

module.exports = (app, router) => {

    router.route('/todos')
        .get(Validate(TodoValidator.getAll()), TodoController.getAll)
        .post(Validate(TodoValidator.create()), TodoController.create);

    router.route('/todos/:id')
        .get(Validate(TodoValidator.getOne()), TodoController.getOne)
        .put(Validate(TodoValidator.update()), TodoController.update)
        .delete(Validate(TodoValidator.delete()), TodoController.delete);

};

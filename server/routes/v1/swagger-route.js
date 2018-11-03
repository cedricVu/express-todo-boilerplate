'use strict';

import { SwaggerController } from '../../controllers';

module.exports = (app) => {

    app.route('/swagger.json')
        .get(SwaggerController.index);

    app.route('/swagger/view')
        .get(SwaggerController.view);

};

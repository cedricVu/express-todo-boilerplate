'use strict';
module.exports = {
    success: (res, data, code = 200) => {
        return res.status(code).json({
            code,
            data
        });
    }
};
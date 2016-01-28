function bindMethods(self, methods) {
    methods.forEach(function (method) {
        self[method] = self[method].bind(self);
    });

    return self;
}

module.exports = bindMethods;
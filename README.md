# hapi-nested-route

> add nested function to hapijs route

[![npm version][npm-badge]][npm-url]


You can use this plugin to add nested function to your hapi routes.

# Usage

Example:
```javascript
const server = new Hapi.server()

const plugins = [
  ...
  {
    register: require('hapi-nested-route'),
  },
  ...
];

server.register(plugins, (err) => {
  ...
})

// you can also use default route function.
server.route({
  path: '/api/ok1',
  method: 'get',
  handler: (request, reply) => {
    reply('ok1');
  }
});

// do nest!
const nestedRoute = server.route.nested('/api')
nestedRoute({
  path: '/ok2', // generated path is /api/ok2
  method: 'get',
  handler: (request, reply) => {
    reply('ok2');
  }
});

// you can route with arguments.
// nestedRoute[method](path: String, config: Object, handler: () => {})
// methods: get, post, put, del, any
nestedRoute.get('/ok3/{id}', { // generated path is /api/ok3/{id}
  validate: {
    params: {
      id: Joi.number().integer().required(),
    },
  }
}, (request, reply) => {
	reply(request.params.id)
})

// you can also nest from already nested router
const doubleNestedRoute = nestedRoute.nested('/user')
doubleNestedRoute({
  path: '/show', // generated path is /api/user/show
  method: 'get',
  handler: (request, reply) => {
    reply('howdy!')
  }
})
```

[npm-url]: https://www.npmjs.com/package/hapi-nested-route
[npm-badge]: https://img.shields.io/npm/v/hapi-nested-route.svg

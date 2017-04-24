const register = (server, options, next) => {
	const makeRoutes = (prefix = '') => {
		const methods = ['get', 'post', 'put', 'del', 'any']
		const innerRoute = (routeOptions) => server.route(routeOptions)
		methods.forEach((hm) => {
			let method = hm.toUpperCase()
			if (hm === 'any') method = '*'
			if (hm === 'del') method = 'delete'
			innerRoute[hm] = (path, config, handler) => {
        return server.route({
  				path: `${prefix}${path}`,
  				method,
  				handler,
  				config,
  			})
  		}
    })
		innerRoute.nested = (prefixNested) => makeRoutes(prefix + prefixNested)
		return innerRoute
	}
	server.root.route = makeRoutes()
	next()
}

register.attributes = {
	name: 'hapi-nested-route',
}

module.exports = {
	register,
}

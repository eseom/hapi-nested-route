const register = (server, options, next) => {
  const origRoute = server.root.route
  const makeRoutes = (prefix = '') => {
    const methods = ['get', 'post', 'put', 'del', 'any']
    const innerRoute = (routeOptions) => origRoute(routeOptions)

    Object.keys(origRoute).forEach((k) => {
      innerRoute[k] = origRoute[k];
    });

    methods.forEach((hm) => {
      let method = hm.toUpperCase()
      if (hm === 'any') method = '*'
      if (hm === 'del') method = 'delete' 
      innerRoute[hm] = (path, config, handler) => {
        return origRoute({      
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


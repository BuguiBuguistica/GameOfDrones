GameOfDronesApp.factory('Player', ['Global', '$resource', function (Global, $resource) {
    return $resource(Global.webApi + '/Player/:id', {}, {
        store: { method: 'POST', isArray:false },
        update: { method: 'PUT', isArray: false,params:{id:1}}
    });
}])
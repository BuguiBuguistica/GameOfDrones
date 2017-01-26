GameOfDronesApp.controller('homeCtrl', ['$scope', 'PlayerStore','$location','Player', function ($scope, PlayerStore,$location,Player) {    
    $scope.player1 = "";
    $scope.player2 = "";
    $scope.startPlay = function () {
        //PlayerStore.Player1.Name = $scope.player1;
        //PlayerStore.Player2.Name = $scope.player2;
        //Store name of the player and then get the ID from DB
        savePlayers($scope.player1).$promise.then(function (response) {
            PlayerStore.Player1.store(response);
            savePlayers($scope.player2).$promise.then(function (response) {
                PlayerStore.Player2.store(response);
                $location.path('/Game/standard');
            });
        });
    }

    function savePlayers(playerName) {
        return Player.store({
            Name: playerName,
            GamesWon: 0
        }, function () { }, function () { });
    }
}])
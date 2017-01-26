GameOfDronesApp.controller('GameCtrl', ['$scope', 'PlayerStore', '$location','Rules','$modal','Player','$routeParams',
function ($scope, PlayerStore, $location, Rules, $modal, Player,$routeParams) {
    console.log($routeParams.param)
    $scope.typeOfGame = $routeParams.param;
    //Initialize players
    $scope.player1 = PlayerStore.Player1;
    $scope.player2 = PlayerStore.Player2;    
   
    $scope.rules = $scope.typeOfGame === 'custom' ? Rules.Custom : Rules.Standard;
    console.log($scope.rules)
    function reset() {
        $scope.showOptions = false;
        $scope.currentPlayer = $scope.player1;
        $scope.roundIndex = 0;
        $scope.weaponSelected = 0;
        //Final Score
        $scope.Score = {
            player1: 0,
            player2: 0
        }
        //Setting up rounds
        $scope.rounds = [
            {
                number: 1,
                playerWinner: 0,
            },
            {
                number: 2,
                playerWinner: 0,
            },
            {
                number: 3,
                playerWinner: 0,
            }
        ]
    }
    reset();

    //Total rounds 3
    $scope.currentRound = $scope.rounds[$scope.roundIndex];

    $scope.selectWeapon = function (weaponSelected) {
        $scope.weaponSelected = weaponSelected;
        if ($scope.currentPlayer.Id === PlayerStore.Player1.Id)
            $scope.player1.weapon = weaponSelected;
        else
            $scope.player2.weapon = weaponSelected;
    }

    $scope.play = function () {
        $scope.weaponSelected = 0;
        if ($scope.currentPlayer.Id === PlayerStore.Player2.Id) {
            $scope.definitionRound();
        } else {
            $scope.nextPlayer();
        }
    }    
    
    $scope.nextPlayer = function () {
        $scope.currentPlayer = $scope.player2;
    }
    $scope.definitionRound = function () {
        //Initialize instance model for Modal windows
        $scope.model = {};
        if ($scope.roundIndex <= 2) {
            $scope.model.type = 'round';
            $scope.model.roundNumber = $scope.roundIndex;
            $scope.size = 'md';
            $scope.model.players = [];
            $scope.model.players.push($scope.player1, $scope.player2);
            //If the player selected the same weapon is a tie
            if ($scope.player1.weapon.Id === $scope.player2.weapon.Id) {
                $scope.rounds[$scope.roundIndex].playerWinner = 0;
                $scope.model.winner = null;
            } else {
                angular.forEach($scope.player1.weapon.WhoKills, function (id) {
                    if (id === $scope.player2.weapon.Id) {
                        $scope.rounds[$scope.roundIndex].playerWinner = 1;
                        $scope.Score.player1++;
                        if ($scope.roundIndex === 2) {                            
                            defineFinalRound(); return
                        } else {
                            $scope.model.winner = $scope.player1;
                        }
                        return;
                    }
                    else {
                        angular.forEach($scope.player2.weapon.WhoKills, function (id) {
                            if (id === $scope.player1.weapon.Id) {
                                $scope.rounds[$scope.roundIndex].playerWinner = 2;
                                $scope.Score.player2++;
                                if ($scope.roundIndex === 2) {
                                    defineFinalRound(); return
                                } else {
                                    $scope.model.winner = $scope.player2;
                                }
                                return;
                            }
                        })
                    }
                })
            }
            openModal();
        }      
        function defineFinalRound() {           
            $scope.size = 'md';
            $scope.model.type = 'final';
            if ($scope.Score.player1 === $scope.Score.player2) {
                $scope.model.winner = null;                
            } else {
                $scope.model.winner = $scope.Score.player1 > $scope.Score.player2 ? $scope.player1 : $scope.player2;
                $scope.model.winner.GamesWon++;
                var totalWon = $scope.model.winner.GamesWon;
                Player.update({
                    Id: $scope.model.winner.Id,
                    Name: $scope.model.winner.Name,
                    GamesWon: totalWon
                }, function () {

                })
            }           
            $scope.model.score = $scope.Score;
            $scope.showOptions = true;
        }
        //Initilize rounds
        $scope.roundIndex++;
        $scope.currentPlayer = $scope.player1;
    }
    function openModal() {            
        $modal.open({
            templateUrl: 'app/views/templates/RoundWinModal.html',
            controller: 'ModalInstanceCtrl',
            size: $scope.size,
            resolve: {
                model: function () {
                    return $scope.model;
                }
            }
        })
    }
        //Options at the end of the game
    $scope.setNewPlayers = function () {
        $location.path('/');
    }
    $scope.setCustomGame = function () {
        $location.path('/customGame');
    }
    $scope.playAgain = function () {
        reset();
    }
}])

GameOfDronesApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, model) {
    $scope.model = model;
    $scope.model.roundNumber++;
    $scope.ok = function () {
        $modalInstance.close($scope.model);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
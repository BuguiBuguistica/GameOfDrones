GameOfDronesApp.controller('SetCustomGameCtrl', ['$scope', 'PlayerStore', '$location','Rules','$modal','Player',
    function ($scope, PlayerStore, $location, Rules, $modal, Player) {
        $scope.icons = Rules.Icons;
        $scope.position = 0;
        $scope.selectedPosition1 = null;
        $scope.selectedPosition2 = null;

        function resetSelections() {
            $scope.selectedPosition1 = null;
            $scope.selectedPosition2 = null;
        }
        $scope.selectWeapon = function (weapon) {
            //weapon.isDisabled = true;
            if ($scope.position === 0) {
                $scope.selectedPosition1 = weapon;
                $scope.position++
            }
            else {
                $scope.selectedPosition2 = weapon;
                $scope.position = 0;
            }
        }

        //List of New Rules
        var Rule, rule1, rule2;
        Rule = function (id, className) {                
                this.Id= id,
                this.WhoKills= [],
                this.className = className
        }
        $scope.newRules = [];
        $scope.groupOfRules = [];
        $scope.createRule = function () {
            var pair = [];
            rule1 = null;
            rule2 = null;            
            var existRule1 = false;
            var existRule2 = false;
            rule2 = new Rule($scope.selectedPosition2.Id, $scope.selectedPosition2.className);
            rule1 = new Rule($scope.selectedPosition1.Id, $scope.selectedPosition1.className);
            if ($scope.newRules.length > 0) {
                angular.forEach($scope.newRules, function (value) {                
                    if (value.Id === $scope.selectedPosition1.Id) {
                        existRule1 = true;
                        Rules.Icons[value.Id - 1].isDisabled = true;
                        return;
                    }                   
                })
                angular.forEach($scope.newRules, function (value) {
                    if (value.Id === $scope.selectedPosition2.Id) {
                        existRule2 = true;
                        Rules.Icons[value.Id - 1].isDisabled = true;
                        return;
                    }
                })
            } else {                
                rule1.WhoKills.push($scope.selectedPosition2.Id);
                //$scope.newRules.push(rule1,rule2);
            }
            if ($scope.newRules.length > 0) {
                angular.forEach($scope.newRules, function (value,index) {
                    if (value.Id === $scope.selectedPosition1.Id) {
                        angular.forEach(value.WhoKills, function (value2) {
                            if (value2 !== $scope.selectedPosition2.Id) {
                                value.WhoKills.push($scope.selectedPosition2.Id);
                            }
                        })
                        Rules.Icons[value.Id - 1].isDisabled = true;
                    } else {
                        if (1 === index)
                            rule1.WhoKills.push($scope.selectedPosition2.Id);
                    }
                })
            }
            if (!existRule1) {
                $scope.newRules.push(rule1);
            }
            if (!existRule2) {
                $scope.newRules.push(rule2);
            }
            if (rule1 && rule2) {
                pair.push(rule1, rule2);
                $scope.groupOfRules.push(pair);
            }
            

            
            resetSelections();
        }
        $scope.cleanRules = function () {
            
            $scope.newRules = [];
            $scope.groupOfRules = [];
            resetSelections();
            Rules.EnableIcons();
        }
        $scope.playStandard = function () {
            $location.path('/');
            Rules.EnableIcons();
        }
        $scope.playCustom = function () {
            Rules.SetCustomRule($scope.newRules);
            console.log($scope.newRules);
            Rules.EnableIcons();
            $location.path('/Game/custom');
        }
        $scope.resetIcons = function () {
            
            $scope.newRules = [];
            $scope.groupOfRules = [];
            resetSelections();
            Rules.EnableIcons();
        }
    }])
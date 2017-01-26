GameOfDronesApp.factory('Rules', function () {
    return {
        Standard: [
            {
                Id: 1,
                Name: 'Rock',
                WhoKills: [3],
                className:'rock'
            },
            {
                Id: 2,
                Name: 'Paper',
                WhoKills: [1],
                className: 'paper'
            },
            {
                Id: 3,
                Name: 'Scissor',
                WhoKills: [2],
                className: 'scissor'
            }
        ],
        Custom: [],
        SetCustomRule: function (newRules) {
            this.Custom = newRules;
            console.log(this.Custom)
        },
        ResetCustomRule: function () {
            this.Custom= [];
        },
        EnableIcons: function () {
            angular.forEach(this.Icons, function (val) {
                val.isDisabled = false;
            })
        },
        Icons: [
            {
                Id:1,
                className:'rock',
                isDisabled:false
            },
            {
                Id:2,
                className:'paper',
                isDisabled:false
            },
            {
                Id:3,
                className:'scissor',
                isDisabled:false
            },
            {
                Id:4,
                className:'cloud',
                isDisabled:false
            },
            {
                Id:5,
                className: 'heart',
                isDisabled:false
            },
            {
                Id:6,
                className: 'star',
                isDisabled:false
            }
        ]
    }
})
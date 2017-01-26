GameOfDronesApp.factory('PlayerStore', function () {
    return {
        Player1: {
            FakeId:1,
            Id: 0,
            Name:'',
            Score: 0,
            GamesWon:0,
            store: function (data) {
                this.Id = data.Id;
                this.Name = data.Name;
                this.GamesWon = data.GamesWon;
            }
        },
        Player2: {
            FakeId: 2,
            Id: 0,
            Name:'',
            Score: 0,
            GamesWon: 0,
            store: function (data) {
                this.Id = data.Id;
                this.Name = data.Name;
                this.GamesWon = data.GamesWon;
            }
        },
        Reset:function(){
            this.Player1 = {
                Name:'',
                Score:0
            }
            this.Player2 = {
                Name: '',
                Score: 0
            }
        }
    }
})
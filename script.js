
window.onload  = function () {


    var body = document.body;
    var	h1 = document.createElement('h1');
    var	h2 = document.createElement('h2');
    var div = document.createElement('div');

    var wrapper = document.getElementsByClassName('wrapper');
    var cover = document.getElementsByClassName('cover')[0];
    var gameRows = document.getElementsByClassName('gameRows');
    var gameRow = document.getElementsByClassName('gameRow');
    var gameCell = document.getElementsByClassName('gameCell');
    var height = 10;
    var width = 10;
    var data = [];
    var x=0;
    var y=0;


    var yy=0;
    console.log(gameCell);

    //style settings
    htmlA = "<style>";
    htmlB = ".wrapper {display: inline-block;}";
    htmlC = "</style>";




    // element constructor
    h1.innerHTML = '#06 task';
    h2.innerHTML = 'Морской бой';

    var divWrapper = div.cloneNode(false)
    divWrapper.className = 'wrapper';

    var divCover = div.cloneNode(false);
    divCover.className = 'cover';

    var divGameRows = div.cloneNode(false);
    divGameRows.className = 'gameRows';

    var divGameRow = div.cloneNode(false);
    divGameRow.className = 'gameRow';

    var divGameCell = div.cloneNode(false);
    divGameCell.className = 'gameCell';
    divGameCell.classList.add("free");



    var divControl = div.cloneNode(false);
    divControl.className = 'control';

    var divHarbor = div.cloneNode(false);
    divHarbor.className = 'harbor';

    var divShips = div.cloneNode(false);
    divShips.className = 'ships';

    var divShip = div.cloneNode(false);
    divShip.className = 'ship';


// page loading
    body.insertAdjacentHTML("afterBegin", htmlA+htmlB+htmlC); //add my js-<styles> to index.html
    body.appendChild(h1);
    body.appendChild(h2);
    body.appendChild(divWrapper);
    divWrapper.appendChild(divCover);
    makeGameData(height,width);
    makeGameField(height,width);
    body.appendChild(divWrapper.cloneNode(false));
    document.getElementsByClassName('wrapper')[1].appendChild(divControl);
    makeGameControl();


    // making Data-array with mines
    function makeGameData(height,width) {
        // create empty array
        data = [];
        for(var i=0; i<height; i++){
            data[i] = [];
            for(var j=0; j<width; j++){
                data[i][j] = 0;// -
            }
        }
        console.table( data );
    }


    // actions - makes game field
    function makeGameField(height, width) {
        for (var i=1; i<=height; i++) {
            divGameRow = divGameRow.cloneNode(false);
            divGameRows.appendChild(divGameRow);
            for (var j=1; j<=width; j++) {
                divGameCell = divGameCell.cloneNode(false);
                divGameRow.appendChild(divGameCell);
            }
        }
        divCover.appendChild(divGameRows);
    }


    // actions - makes ships to pose
    function makeGameControl() {
        for (var i=1; i<=4; i++) {
            divShips = divShips.cloneNode(false);
            divHarbor.appendChild(divShips);
            for (var j=1; j<=i; j++) {
                divShip = divShip.cloneNode(false);
                    for (var cell=5-i; cell>=1; cell--) {
                        divGameCell = divGameCell.cloneNode(false);
                        divGameCell.classList.remove('free');
                        divShip.appendChild(divGameCell);
                    }
                divShips.appendChild(divShip);
            }
            divHarbor.appendChild(divShips);
        }
        divControl.appendChild(divHarbor);
    }


    // gets the position of clicked cell
    function getPosition() {
        event.target.parentNode.childNodes.forEach(function(item, i) {
            if (item === event.target) {
                x = Math.floor(i/2);
            }
        });
        event.target.parentNode.parentNode.childNodes.forEach(function(item, index) {
            if (item === event.target.parentNode) {
                y = Math.floor(index/2);
            }
        });
        console.log('hovered: строка='+y+', ячейка='+x);
    }


    divCover.onmouseover = function(event) {
        getPosition();
        var cell = event.target;
        event.target.classList.add("hover");
        //gameCell[5].classList.add("hover");
        //console.log('hovered: строка='+y+', ячейка='+x);
    }
    divCover.onmouseout = function(event) {
        var cell = event.target;
        cell.classList.remove("hover");
        gameCell[5].classList.remove("hover");
    }

}
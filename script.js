
window.onload  = function () {


    var body = document.body;
    var	h1 = document.createElement('h1');
    var	h2 = document.createElement('h2');
    var	h41 = document.createElement('h4');
    var	h42 = document.createElement('h4');
    var div = document.createElement('div');
    var buttonRun = document.createElement('button');

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
    var shipLength = 0;
    var horiz;
    var opened = 0;
    var maxCells = 20;

    //style settings
    htmlA = "<style>";
    htmlB = ".wrapper {display: inline-block;}";
    htmlC = "</style>";




    // element constructor
    h1.innerHTML = '#06 task';
    h2.innerHTML = 'Морской бой';

    var divWrapper = div.cloneNode(false)
    divWrapper.className = 'wrapper';

    var divGame = div.cloneNode(false);
    divGame.className = 'cover';

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

    var divShipCell = div.cloneNode(false);
    divShipCell.classList.add("shipCell");

    h41.innerHTML = 'Для начала расстановки кораблей кликните на любой корабль в правой части страницы'
    buttonRun.innerText = 'Начать игру';
    buttonRun.classList.add('disabled');



// page loading
    body.insertAdjacentHTML("afterBegin", htmlA+htmlB+htmlC); //add my js-<styles> to index.html
    body.appendChild(h1);
    body.appendChild(h2);
    body.appendChild(divWrapper);
    divWrapper.appendChild(divGame);
    makeGameData(height,width);
    makeGameField(height,width);
    body.appendChild(divWrapper.cloneNode(false));
    document.getElementsByClassName('wrapper')[1].appendChild(divControl);
    makeGameControl();
    divControl.appendChild(buttonRun);
    body.appendChild(h41);
    body.appendChild(h42);

    // making Data-array
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


    // makes game field
    function makeGameField(height, width) {
        for (var i=1; i<=height; i++) {
            divGameRow = divGameRow.cloneNode(false);
            divGameRows.appendChild(divGameRow);
            for (var j=1; j<=width; j++) {
                divGameCell = divGameCell.cloneNode(false);
                divGameRow.appendChild(divGameCell);
            }
        }
        divGame.appendChild(divGameRows);
    }


    // makes ships for posing at the game'field
    function makeGameControl() {
        for (var i=1; i<=4; i++) {
            divShips = divShips.cloneNode(false);
            divHarbor.appendChild(divShips);
            for (var j=1; j<=i; j++) {
                divShip = divShip.cloneNode(false);
                    for (var cell=5-i; cell>=1; cell--) {
                        divShipCell = divShipCell.cloneNode(false);
                        divShip.appendChild(divShipCell);
                    }
                divShips.appendChild(divShip);
            }
            divHarbor.appendChild(divShips);
        }
        divControl.appendChild(divHarbor);
    }


    // gets the position of the clicked cell
    function getPosition() {
        event.target.parentNode.childNodes.forEach(function(item, i) {
            if (item === event.target) {
                x = i;
            }
        });
        event.target.parentNode.parentNode.childNodes.forEach(function(item, index) {
            if (item === event.target.parentNode) {
                y = index;
            }
        });
        //console.log('hovered: строка='+y+', ячейка='+x);
    }


    divGame.onmouseover = function(event) {
        getPosition();
        var cell = event.target;
        if (horiz===true  && checkCellForValue(0) && checkNeighborShips()) {
            for (var i=0; i<shipLength; i++) {
                    divGameRows.childNodes[y].childNodes[x+i].classList.add("hover");
            }
        }
        if (horiz===false  && checkCellForValue(0) && checkNeighborShips()) {
            for (var i = 0; i < shipLength; i++) {
                    divGameRows.childNodes[y + i].childNodes[x].classList.add("hover");
            }
        }
        if (shipLength>0) {
            h41.innerHTML = 'Корабль можно разместить только на свободной ячейке, касание кораблей не катит.';
        }
    }


    function checkCellForValue(value) {
        if (data[y][x] === value) {
            if (shipLength===4) {
                if (horiz===true
                    && data[y][x+3]===value
                    && data[y][x+2]===value
                    && data[y][x+1]===value) {
                    return true;
                }
                if (horiz===false
                    && data[y + 3]
                    && data[y + 3][x]===value
                    && data[y + 2][x]===value
                    && data[y + 1][x]===value) {
                    return true;
                }
            }
            if (shipLength===3) {
                if (horiz===true
                    && data[y][x+2]===value
                    && data[y][x+1]===value) {
                    return true;
                }
                if (horiz===false
                    && data[y + 2]
                    && data[y + 2][x]===value
                    && data[y + 1][x]===value) {
                    return true;
                }
            }
            if (shipLength===2) {
                if (horiz===true
                    && data[y][x+1]===value) {
                    return true;
                }
                if (horiz===false
                    && data[y + 1]
                    && data[y + 1][x]===value) {
                    return true;
                }
            }
            if (shipLength===1)     return true;
            return false;
        }
        return false;
    }


    divGame.onmouseout = function(event) {
        var cell = event.target;
        cell.classList.remove("hover");
        if (horiz==true) {
            for (var i=1; i<shipLength; i++) {
                if (divGameRows.childNodes[y].childNodes[x+i]) {
                    divGameRows.childNodes[y].childNodes[x+i].classList.remove("hover");
                }
            }
        }
        if (horiz==false) {
            for (var i=1; i<shipLength; i++) {
                if (divGameRows.childNodes[y+i]) {
                    divGameRows.childNodes[y+i].childNodes[x].classList.remove("hover");
                }
            }
        }
    }

    // choose ship to set on the game's field
    divControl.addEventListener("click", arrangeShips);
    function arrangeShips(event) {
        h41.innerHTML = 'Повторный клик на выбранном корабле изменяет его направление. Чтобы разместить корабль просто кликните на свободную ячейку игрового поля.'
        h42.innerHTML = '';
        removeClassFromAllCells(divHarbor, 'checked');
        var shipActive = event.target.parentNode;
        if (shipActive.classList.contains('ship')) {    // ship checking
            shipLength = shipActive.childNodes.length;
            shipActive.classList.add('checked');
            if (shipActive.classList.contains('horizontal')) {
                shipActive.classList.remove('horizontal');
                shipActive.classList.add('vertical');
                horiz=false;
            } else {
                shipActive.classList.add('horizontal');
                shipActive.classList.remove('vertical');
                horiz=true;
            }
        }
    }

    function removeClassFromAllCells(parentDiv, name) {
        for (var i = 0; i<parentDiv.childNodes.length; i++) {
            for (var j = 0; j<parentDiv.childNodes[i].childNodes.length; j++) {
                if (parentDiv.childNodes[i].childNodes[j].classList.contains(name)) {
                    parentDiv.childNodes[i].childNodes[j].classList.remove(name);
                }
            }
        }
    }


    // set ship on the game's field
    divGame.addEventListener("click", putShip);
    function putShip(event) {
        var cell = event.target;
        if ( horiz==true
            && checkCellForValue(0)
            && checkNeighborShips()
            && checkAvailableShip(shipLength)) {
                for (var i=0; i<shipLength; i++) {
                    data[y][x+i] = shipLength;
                    showShipsOnTheField();
                }
        }
        if ( horiz==false
            && checkCellForValue(0)
            && checkNeighborShips()
            && checkAvailableShip(shipLength)) {
                for (var i = 0; i < shipLength; i++) {
                    data[y + i][x] = shipLength;
                    showShipsOnTheField();
                }
        }
        console.table(data);
        if (!checkAvailableShip(shipLength) && shipLength) {  // no free ships of selected type
            divHarbor.childNodes[4-shipLength].classList.add('disabled');
            divGame.classList.remove('hover');
            showShipsOnTheField();
            h42.innerHTML = 'Вы разместили все свободные '+shipLength+'-палубные корабли. Выбирайте следующие :)';
        }
        if (!checkAvailableShip(1)              // no free ships
            && !checkAvailableShip(2)
            && !checkAvailableShip(3)
            && !checkAvailableShip(4)) {
                divHarbor.classList.add("disabled");
                buttonRun.classList.remove('disabled');
                divGame.removeEventListener("click", putShip);
                divControl.removeEventListener("click", arrangeShips);
                divGame.onmouseover = function() {};
                divGame.onmouseout = function() {};
                h41.innerHTML ="Игровое поле сформировано. Let's start shooting!";
                h42.innerHTML ="";
        }
    }

    
    function showShipsOnTheField() {
        for(var i=0; i<height; i++){
            for(var j=0; j<width; j++){
                if (data[i][j] != 0) {
                    divGameRows.childNodes[i].childNodes[j].classList.add("ship-ready");
                    divGameRows.childNodes[i].childNodes[j].classList.remove("free");
                }
            }
        }
    }


    function checkNeighborShips() {
        if (checkCell(y, x)) {
            if (shipLength === 4) {
                if (horiz === true
                    && checkCell(y, x + 1)
                    && checkCell(y, x + 2)
                    && checkCell(y, x + 3))  {
                    return true;
                }
                if (horiz === false
                    && data[y + 3]
                    && checkCell(y + 1, x)
                    && checkCell(y + 2, x)
                    && checkCell(y + 3, x)) {
                    return true;
                }
            }
            if (shipLength === 3) {
                if (horiz === true
                    && checkCell(y, x + 1)
                    && checkCell(y, x + 2)) {
                    return true;
                }
                if (horiz === false
                    && data[y + 2]
                    && checkCell(y + 1, x)
                    && checkCell(y + 2, x)) {
                    return true;
                }
            }
            if (shipLength === 2) {
                if (horiz === true
                    && checkCell(y, x + 1)) {
                    return true;
                }
                if (horiz === false
                    && data[y + 1]
                    && checkCell(y + 1, x)) {
                    return true;
                }
            }
            if (shipLength === 1)    return true;

            return false;
        }
        return false;

        function checkCell(row, column) {
            if(data[row-1] && data[row-1][column-1]>0) {
                return false;
            }
            if(data[row-1] && data[row-1][column]>0) {
                return false;
            }
            if(data[row-1] && data[row-1][column+1]>0) {
                return false;
            }
            if(data[row] && data[row][column-1]>0) {
                return false;
            }
            if(data[row] && data[row][column+1]>0) {
                return false;
            }
            if(data[row+1] && data[row+1][column-1]>0) {
                return false;
            }
            if(data[row+1] && data[row+1][column]>0) {
                return false;
            }
            if(data[row+1] && data[row+1][column+1]>0) {
                return false;
            }
            return true;
        }

    }


    function checkAvailableShip(cells) {
        if (cells==1) {  // 1-палубный
            if (shipQuantity(cells)<4)  return true;
        }
        if (cells==2) {  // 2-палубный
            if (shipQuantity(cells)<5)  return true;
        }
        if (cells==3) {  // 3-палубный
            if (shipQuantity(cells)<4)  return true;
        }
        if (cells==4) {  // 4-палубный
            if (shipQuantity(cells)<1)  return true;
        }
        return false;
    }

    function shipQuantity(length) {
        var count = 0;
        for(var i=0; i<height; i++){
            for(var j=0; j<width; j++){
                if (data[i][j] === length) {
                    count++;
                    // divGameRows.childNodes[i].childNodes[j].classList.add("ship-ready");
                    // divGameRows.childNodes[i].childNodes[j].classList.remove("free");
                }
            }
        }
        return count;
    }


    buttonRun.addEventListener("click", startShootings);
    function startShootings(event) {
        while (divGameRows.hasChildNodes()) {		// empty game field
            divGameRows.removeChild(divGameRows.lastChild);
        }
        makeGameField(height,width);
        buttonRun.classList.add('disabled');
        console.table(data);
        h41.innerHTML ="";
        h42.innerHTML ="";
        divGame.addEventListener("click", shootings);

    }


    function shootings(event) {
        getPosition();
        var dataClone = [];
        dataClone = data;
        var cell = event.target;
        var shipLength = data[y][x];
        var vertShip = 0;
        var horizShip = 0;
        var count = 0;

        console.log(shipLength);
        if (shipLength > 0) {
            cell.innerText = 'X';
            opened++;
            h42.innerHTML = "Остаток палуб для открытия: " +(maxCells-opened);

            if (shipLength === 1) {
                openAllNeighborCells(y,x);
            }
            else {
                data[y][x]=10;
                if (shipLength==2 && (findInjuredTR(y,x)||findInjuredBL(y,x))) {
                    openAllNeighborCells(y, x);
                    if (vertShip) {
                        openAllNeighborCells(y + vertShip, x);
                    }
                    if (horizShip) {
                        openAllNeighborCells(y, x + horizShip);
                    }
                }
                if (shipLength==4) {
                    console.log(11);
                    console.log(checkValue(10));
                    checkFullOpened();
                    console.log(22);
                }

            }
///////=================
//             else {
//                 data[y][x]=10;
//                 if (value===2 && findInjured(y,x)) {
//                     openNeighborCells(y,x);
//                     if (vertical) {
//                         console.log('vert');
//                         openNeighborCells(y+vertical, x);
//                     }
//                     if (horizontal) {
//                         console.log('horiz');
//                         openNeighborCells(y, x+horizontal);
//                     }
//
//                 }
//             }
///////=================

            //if 2 neighboring cells are opened
            if ( countNeighborOpened()==2
                &&(findInjuredTR(y,x)||findInjuredBL(y,x)) ) {
                if (vertShip) {
                    openLeftRightCells(y,x);
                    openLeftRightCells(y+1, x);
                    openLeftRightCells(y-1, x);
                }
                if (horizShip) {
                    openTopBotCells(y,x);
                    openTopBotCells(y, x+1);
                    openTopBotCells(y, x-1);
                }
            }

            //if 1 neighboring cell is opened
            if (shipLength >2) {
                data[y][x]=10;
                if ( (findInjuredTR(y,x)||findInjuredBL(y,x)) ) {
                    if (vertShip) {
                        openLeftRightCells(y,x);
                        if (data[y+vertShip][x]=10)  {
                            openLeftRightCells(y+vertShip, x);
                        }
                    }
                    if (horizShip) {
                        openTopBotCells(y,x);
                        if (data[y][x+horizShip]=10)  {
                            openTopBotCells(y, x+horizShip);
                        }
                    }
                }
            }

        }
        else {
            cell.innerHTML ='&#8226;'  ;
        }


        //     for (var j=0; j<width; j++) {
        //         for (var i = 0; i < height; i++) {
        //             horizShip = 1;
        //             vertShip = 0;
        //             if (checkValue(10)) {
        //                 openAllNeighborCells(y+j, x+i);
        //             }
        //         }
        //     }
        //
        //
        //                if (vertShip) {
        //                 for (var i = 0; i < height; i++) {
        //                     if (checkValue(10)) {
        //                         openAllNeighborCells(y+i,x);
        //                     }
        //                 }
        //             }
        // }


        // if ((shipLength >2) && findInjuredTR(y,x)) {
            //     if (vertShip) {
            //         openAllNeighborCells(y+vertShip, x);
            //     }
            //     if (horizShip) {
            //         openAllNeighborCells(y, x+horizShip);
            //     }
            // }

   /////////////////////////////////////////////////
   //              if (findInjuredTR(y,x)) {
   //                  if (vertShip) {
   //                      if(data[y+vertShip] && data[y+vertShip][x] === 10) {
   //                          openLeftRightCells(y+vertShip,x);
   //                          openLeftRightCells(y,x);
   //                      }
   //                  }
   //                  if (horizShip) {
   //                      if(data[y] && data[y][x+horizShip] === 10) {
   //                          openTopBotCells(y,x);
   //                          openTopBotCells(y,x+horizShip);
   //                      }
   //                  }
   //              }

                //              ///////////////////////////
   //              // var count1 = 0;
   //              // var count2 = 0;
   //              // // horizontal check
   //              // if (horizShip) {
   //              //     for (var i=0; i<width; i++) {
   //              //         if (data[y][i] === 10) {
   //              //             count1++;
   //              //         }
   //              //     }
   //              // }
   //              //
   //              // // vertical check
   //              // if (vertShip) {
   //              //     for (var j=0; j<height; j++) {
   //              //         if (arr[j][x] === 1) {
   //              //             count2++;
   //              //         }
   //              //     }
   //              // }
               ////////////////////////////////

/////////////////////////////////////////////////////////
//                 if (shipLength===3) {
//                     if (shipLength===3 && findInjuredTR(y,x)) {
//                         if (vertShip) {
//                             if(data[y+vertShip]
//                                 && data[y+(vertShip*2)]
//                                 && data[y+vertShip][x] === 10
//                                 && data[y+(vertShip*2)][x] === 10) {
//                                     openLeftRightCells(y,x);
//                                     openLeftRightCells(y+vertShip,x);
//                                     openLeftRightCells(y+(vertShip*2),x);
//                             }
//                         }
//                         if (horizShip) {
//                             if(data[y]
//                                 && data[y][x+horizShip] === 10
//                                 && data[y][x+(horizShip*2)] === 10) {
//                                     openTopBotCells(y,x);
//                                     openTopBotCells(y,x+horizShip);
//                                     openTopBotCells(y,x+(horizShip*2));
//                             }
//                         }
//                     }
//                 }
/////////////////////////////////////////////////////////////////
        // check for full-opened ship
        function checkFullOpened() {
            console.log('in');
            for (var i = 0; i < height; i++) {
                horizShip = 0;
                vertShip = 1;
                if (data[i][x]
                    && countNeighborOpened(i, x) === 1
                    && countNeighborOpened(i + 1, x) === 2
                    && countNeighborOpened(i + 2, x) === 2) {
                    openAllNeighborCells(i + 1, x);
                    openAllNeighborCells(i + 4, x);
                }
            }
            for (var i = 0; i < width; i++) {
                horizShip = 1;
                vertShip = 0;
                if (data[y][i]
                    && countNeighborOpened(y, i) === 1
                    && countNeighborOpened(y, i + 1) === 2
                    && countNeighborOpened(y, i + 2) === 2) {
                    openAllNeighborCells(y, i + 1);
                    openAllNeighborCells(y, i + 4);
                }
            }

        }

        function countNeighborOpened() {
            count = 0;
            if(data[y-1] && data[y-1][x] === 10) {
                count++;
            }
            if(data[y] && data[y][x-1] === 10) {
                count++;
            }
            if(data[y] && data[y][x+1] === 10) {
                count++;
            }
            if(data[y+1] && data[y+1][x] === 10) {
                count++;
            }
            return count;
        }

    function checkValue(value) {
        if (data[y][x] === value) {
            if (shipLength===4) {
                if (horizShip
                    && data[y][x+3]===value
                    && data[y][x+2]===value
                    && data[y][x+1]===value) {
                    return true;
                }
                if (vertShip
                    && data[y + 3]
                    && data[y + 3][x]===value
                    && data[y + 2][x]===value
                    && data[y + 1][x]===value) {
                    return true;
                }
            }
            if (shipLength===3) {
                if (horizShip
                    && data[y][x+2]===value
                    && data[y][x+1]===value) {
                    return true;
                }
                if (vertShip
                    && data[y + 2]
                    && data[y + 2][x]===value
                    && data[y + 1][x]===value) {
                    return true;
                }
            }
            if (shipLength===2) {
                if (horizShip
                    && data[y][x+1]===value) {
                    return true;
                }
                if (vertShip
                    && data[y + 1]
                    && data[y + 1][x]===value) {
                    return true;
                }
            }
            if (shipLength===1)     return true;
            return false;
        }
        return false;
    }

        function openLeftRightCells(yy,xx) {
            divGameRows.childNodes[yy].childNodes[xx+1].innerHTML ='&#8226;';
            divGameRows.childNodes[yy].childNodes[xx-1].innerHTML ='&#8226;';
        }
        function openTopBotCells(yy,xx) {
            divGameRows.childNodes[yy+1].childNodes[xx].innerHTML ='&#8226;';
            divGameRows.childNodes[yy-1].childNodes[xx].innerHTML ='&#8226;';
        }

        //top-right
        function findInjuredTR(yy, xx) {
            //vertShip = 0;
            //horizShip = 0;
            if(data[yy-1] && data[yy-1][xx] === 10) {
                vertShip = -1;
                return true;
            }
            if(data[yy] && data[yy][xx+1] === 10) {
                horizShip = 1;
                return true;
            }
            if(data[yy+1] && data[yy+1][xx] === 10) {
                vertShip = 1;
                return true;
            }
            if(data[yy] && data[yy][xx-1] === 10) {
                horizShip = -1;
                return true;
            }
            return false;
        }
        //bottom-left
        function findInjuredBL(yy, xx) {
            vertShip = 0;
            horizShip = 0;
            if(data[yy+1] && data[yy+1][xx] === 10) {
                vertShip = 1;
                return true;
            }
            if(data[yy] && data[yy][xx-1] === 10) {
                horizShip = -1;
                return true;
            }
            if(data[yy] && data[yy][xx+1] === 10) {
                horizShip = 1;
                return true;
            }
            if(data[yy-1] && data[yy-1][xx] === 10) {
                vertShip = -1;
                return true;
            }
            return false;
        }


        function openAllNeighborCells(yy,xx) {
            if(data[yy-1] && data[yy-1][xx-1] === 0) {
                divGameRows.childNodes[yy-1].childNodes[xx-1].innerHTML ='&#8226;';
            }
            if(data[yy-1] && data[yy-1][xx] === 0) {
                divGameRows.childNodes[yy-1].childNodes[xx].innerHTML ='&#8226;';
            }
            if(data[yy-1] && data[yy-1][xx+1] === 0) {
                divGameRows.childNodes[yy-1].childNodes[xx+1].innerHTML ='&#8226;';
            }
            if(data[yy] && data[yy][xx-1] === 0) {
                divGameRows.childNodes[yy].childNodes[xx-1].innerHTML ='&#8226;';
            }
            if(data[yy] && data[yy][xx+1] === 0) {
                divGameRows.childNodes[yy].childNodes[xx+1].innerHTML ='&#8226;';
            }
            if(data[yy+1] && data[yy+1][xx-1] === 0) {
                divGameRows.childNodes[yy+1].childNodes[xx-1].innerHTML ='&#8226;';
            }
            if(data[yy+1] && data[yy+1][xx] === 0) {
                divGameRows.childNodes[yy+1].childNodes[xx].innerHTML ='&#8226;';
            }
            if(data[yy+1] && data[yy+1][xx+1] === 0) {
                divGameRows.childNodes[yy+1].childNodes[xx+1].innerHTML ='&#8226;';
            }
        }

        if (opened===maxCells) {
            h42.innerHTML ="Все корабли открыты! Конец игры.";
            divGame.removeEventListener("click", shootings);
        }

        console.table(data);

    }

}
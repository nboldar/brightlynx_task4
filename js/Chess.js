class Chess {
    /*создаем объект*/

    constructor() {
        this.columnsNames = ["A", "B", "C", "D", "E", "F", "G", "H"];
        this.currentCellCoordinates = {column: null, row: null};
    }

    /**
     * метод возвращает строку со списком шахматных полей кудаможет пойти конь из текущей позиции
     * @param userData {String} введенные пользователем имя шахматного поля типа А2 или В8
     * @returns {string}
     */
    showPossibleMoves(userData) {
        if (this.validateCoordinatesInChessFormat(userData)) {
            Object.assign(this.currentCellCoordinates, this.parseCellAddress(userData));
            let possibleMoves = this.getPossibleSteedMovesCoordinates();
            return this.getPossibleMovesInChessFormat(possibleMoves).join(', ');
        } else {
            return 'Ошибка!!! Введите текущее положение коня в формате "D5"';
        }
    }

    /**
     * метод проверки пользовательских данных
     * @param coordinates {String}
     * @returns {boolean}
     */
    validateCoordinatesInChessFormat(coordinates) {
        return coordinates.match("^[a-hA-H]{1}[1-8]{1}$");
    }

    /**
     * метод создает координаты поля в шахматном формате из числового, например '11'=>'A1'
     * @returns {string}
     * @param coordinates
     */
    getCoordinatesInChessFormat(coordinates) {
        return this.createElement(this.columnsNames[coordinates.column - 1], coordinates.row);
    }

    /**
     * метод создает массив координат в шахматном формате из числового, например ['11','22','33','44']=>['A1','B2','C3','D4']
     * @param arrayPossibleMoves {Array}
     * @returns {Array}
     */
    getPossibleMovesInChessFormat(arrayPossibleMoves) {
        let result = [];
        arrayPossibleMoves.forEach((element) => {
            result.push(this.getCoordinatesInChessFormat(element));
        });
        return result;
    }

    /**
     * метод возвращает координаты шахматной ячейки в виде строки, например '24' или 'B4'
     * @param column
     * @param row
     * @returns {string}
     */
    createElement(column, row) {
        return "".concat(column, row);
    }

    /**
     * основной метод который возвращает массив координат шахматных полей куда может пойти конь из текущей позиции в форме объектов
     * @returns {Array}
     */
    getPossibleSteedMovesCoordinates() {
        let possibleMoves = [];
        let currentColIdx = this.currentCellCoordinates.column;

        let colMinus2 = currentColIdx - 2;
        let colMinus1 = currentColIdx - 1;
        let colPlus1 = currentColIdx + 1;
        let colPlus2 = currentColIdx + 2;

        let currentRowNumber = this.currentCellCoordinates.row;

        let rowMinus2 = currentRowNumber - 2;
        let rowMinus1 = currentRowNumber - 1;
        let rowPlus1 = currentRowNumber + 1;
        let rowPlus2 = currentRowNumber + 2;

        if ((currentColIdx - 2) > 0) {
            if ((currentRowNumber - 1) > 0) {
                possibleMoves.push({column: colMinus2, row: rowMinus1});
            }
            if ((currentRowNumber + 1) < 9) {
                possibleMoves.push({column: colMinus2, row: rowPlus1});
            }
        }
        if ((currentColIdx - 1) > 0) {
            if ((currentRowNumber - 2) > 0) {
                possibleMoves.push({column: colMinus1, row: rowMinus2});
            }
            if ((currentRowNumber + 2) < 9) {
                possibleMoves.push({column: colMinus1, row: rowPlus2});
            }
        }
        if ((currentColIdx + 1) < 8) {
            if ((currentRowNumber - 2) > 0) {
                possibleMoves.push({column: colPlus1, row: rowMinus2});
            }
            if ((currentRowNumber + 2) < 9) {
                possibleMoves.push({column: colPlus1, row: rowPlus2});
            }
        }
        if ((currentColIdx + 2) < 8) {
            if ((currentRowNumber - 1) > 0) {
                possibleMoves.push({column: colPlus2, row: rowMinus1});
            }
            if ((currentRowNumber + 1) < 9) {
                possibleMoves.push({column: colPlus2, row: rowPlus1});
            }
        }
        return possibleMoves;
    }

    /**
     *создает объект координат из строки формата 'A6'
     * @param address
     * @returns {{column: number, row: number}}
     */
    parseCellAddress(address) {
        let result = {};
        result.column = this.columnsNames.indexOf(address[0].toUpperCase()) + 1;
        result.row = +address[1];
        console.log(result);
        return result;
    }

    /**
     *создает объект координат из строки формата '34'
     * @param coordinatesAsString
     * @returns {{column: number, row: number}}
     */
    parseCellCoordinates(coordinatesAsString) {
        return {
            column: +coordinatesAsString[0],
            row: +coordinatesAsString[1]
        };
    }

}
class Chess2 extends Chess {
    /**
     *
     * @param mapMaker {ChessMap} объект который отрисовывает шахматную доску
     */
    constructor(mapMaker = new ChessMap()) {
        super();
        this.mapMaker = mapMaker;
        this.rootElement = $("#root");// корневой элемент куда отрисовывается доска
        this.possibleMoveCellClassName = 'steedMoveCell';// имя класса для полей куда конь может пойти , модифицирет цвет на зеленый
        this.currentPositionClassName = 'currentPosition';// имя класса для элемента - текущего положения коня модифицирет цвет на синий
    }

    /**
     * метод запуска отображения доски с реализацией логики отображения клеток возможного хода коня по клику
     */
    init() {
        /*Отрисовка доски*/
        this.mapMaker.renderMap(this.rootElement);
        this.mapMaker.renderChessFeatures();
        let targetElements = $(`.${this.mapMaker.cellChessClassName}`);//основной элемент шахматной доски
        /*навешиваем собитие клика на доску*/
        targetElements.on('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            /*очистка поля от предыдущих отображений  полей хода коня*/
            $.each(targetElements, (index, value) => {
                $(value).removeClass(this.possibleMoveCellClassName);
                $(value).removeClass(this.currentPositionClassName);
            });
            /*находим расположение коня и его координаты*/
            let element = $(event.target);
            element.addClass(this.currentPositionClassName);
            this.currentCellCoordinates.column = (+element.data('idx'));
            this.currentCellCoordinates.row = (+element.parent().data('idx'));
            /*находим координаты возможных ходов коня*/
            let possibleMoves = this.getPossibleSteedMovesCoordinates();
            /*отрисовываем поля возможных ходов зеленым*/
            possibleMoves.forEach(el => {
                let element = this.getElementByCoordinates(el);
                element.addClass(this.possibleMoveCellClassName);
            });

        });
    }

    /**
     * возвращает jquery element по координатам шахматного поля
     * @param coordinatesObj {Object} объект с координатами поля
     * @returns {*} jQuery element
     */
    getElementByCoordinates(coordinatesObj) {
        let elements = $(`.${this.mapMaker.cellChessClassName}`);
        let result = null;
        $.each(elements, (index, value) => {
            let elem = $(value);
            if (elem.data('idx') === coordinatesObj.column && elem.parent().data('idx') === coordinatesObj.row) {
                result = elem;
            }
        });
        return result;
    }

}
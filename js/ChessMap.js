class ChessMap extends Map {
    constructor(size = 10) {
        super(size);//размер карты с учетом названий столбцов и строк
        this.cellChessClassName = 'chessCell';//имя класса для стилей основных ячеей шахматного поля
        this.blackCellChessClassName = 'chessBlackCell';//имя класса для стилей черных ячеей шахматного поля
    }

    /**
     * отрисовка элементов и стилей соответствующих шахматной доске
     */
    renderChessFeatures() {
        /*устанавливаем в начальное положение индексы полей*/
        let rowCellChessIdx = 1;
        let rowNumber = 1;
        let colSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',];
        $.each($('.tab-row'), (index, value) => {
            /*отрисовываем названия столбцов*/
            let element = $(value);
            let children = element.children();
            if (index === 0 || index === 9) {
                $.each(children, (idx, val) => {
                    if (idx !== 0 && idx !== 9) {
                        let symbol = colSymbols.shift();
                        $(val).text(symbol);
                        colSymbols.push(symbol);
                    }
                });
            } else {
                /*добавляем через дата атрибут координаты строк*/
                element.attr('data-idx', rowCellChessIdx++);
                let colCellChessIdx = 1;
                /*отрисовка имен строк*/
                $.each(children, (index, value) => {
                    let elem = $(value);
                    if (index === 0) {
                        elem.text(rowNumber);
                    }
                    if (index === 9) {
                        elem.text(rowNumber++);
                    }

                    if (index !== 0 && index !== 9) {
                        elem.addClass(this.cellChessClassName);
                        /*добавляем через дата атрибут координаты столбцов */
                        elem.attr('data-idx', colCellChessIdx++);
                        /*отрисовка черных полей доски*/
                        if (rowNumber % 2 === 0 && index % 2 === 0) {
                            elem.addClass(this.blackCellChessClassName);
                        }
                        if (rowNumber % 2 !== 0 && index % 2 !== 0) {
                            elem.addClass(this.blackCellChessClassName);
                        }
                    }

                });
            }
        });
    }
}
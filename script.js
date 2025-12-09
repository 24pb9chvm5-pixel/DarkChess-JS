// 1. Khai báo trạng thái và hằng số
const RANKS = { 'T': 7, 'S': 6, 'H': 5, 'X': 4, 'M': 3, 'P': 2, 'Z': 1 }; 
let board = []; 
let redTurn = true; 
let selectedSquare = null; 

// 2. Hàm vẽ bàn cờ (Tạo ra 64 ô cờ HTML)
function renderBoard() {
    const chessboardDiv = document.getElementById('chessboard');
    chessboardDiv.innerHTML = ''; 

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square'); 
            squareDiv.dataset.row = r;
            squareDiv.dataset.col = c;
            
            const piece = board[r][c];
            if (piece) {
                const symbol = piece.flipped ? piece.rank : '?'; 
                const colorClass = piece.isRed ? 'red' : 'black';
                squareDiv.innerHTML = `<span class="piece ${colorClass}">${symbol}</span>`;
            }

            // Gắn hàm xử lý click vào từng ô
            squareDiv.addEventListener('click', handleSquareClick); 
            chessboardDiv.appendChild(squareDiv);
        }
    }
    
    document.getElementById('message').innerText = 
        `Lượt chơi: ${redTurn ? 'ĐỎ' : 'ĐEN'}`;
}
// 3. Hàm Khởi tạo bàn cờ (Chỉ để kiểm tra giao diện)
function initializeBoard() {
    // Tạo bàn cờ 8x8 toàn ô trống
    board = Array(8).fill(null).map(() => Array(8).fill(null));

    // Đặt 4 quân mẫu tại 4 góc
    board[0][0] = { rank: 'T', isRed: true, flipped: true };   // Tướng Đỏ (lật)
    board[0][7] = { rank: 'Z', isRed: true, flipped: false };  // Tốt Đỏ (Úp)
    board[7][0] = { rank: 'X', isRed: false, flipped: true };  // Xe Đen (lật)
    board[7][7] = { rank: 'P', isRed: false, flipped: false }; // Pháo Đen (Úp)

    renderBoard(); 
}
// 4. Hàm kiểm tra luật (Tạm thời là TRUE để kiểm tra)
function isMoveValid(originR, originC, targetR, targetC) {
    return true; 
}

// 5. Hàm Xử lý Click chuột (Handle click)
function handleSquareClick(event) {
    const r = parseInt(event.currentTarget.dataset.row);
    const c = parseInt(event.currentTarget.dataset.col);
    const piece = board[r][c]; 
    
    // TRƯỜNG HỢP 1: Lật quân
    if (piece && !piece.flipped) {
        if (piece.isRed === redTurn) {
            piece.flipped = true;
            redTurn = !redTurn;
            selectedSquare = null; 
            renderBoard(); 
        }
        return;
    }
    
    // TRƯỜNG HỢP 2: Chọn quân
    if (piece && piece.flipped && piece.isRed === redTurn) {
        selectedSquare = { r: r, c: c };
        return;
    }

    // TRƯỜNG HỢP 3: Di chuyển
    if (selectedSquare) {
        const originR = selectedSquare.r;
        const originC = selectedSquare.c;
        const targetR = r;
        const targetC = c;
        
        if (isMoveValid(originR, originC, targetR, targetC)) {
            board[targetR][targetC] = board[originR][originC]; 
            board[originR][originC] = null; 
            
            selectedSquare = null;
            redTurn = !redTurn; 
            renderBoard(); 
        }
    }
}
// 6. Lệnh Khởi chạy Game
document.addEventListener('DOMContentLoaded', initializeBoard);

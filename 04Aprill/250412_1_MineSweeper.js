// 객체 선언
class Tile {
    constructor(mine, near, check) {
        // 기본 속성
        this.mine = mine;
        this.near = near;
        this.check = check;
        // 요소 생성
        this.div = document.createElement("span");
        this.div.classList.add("tile");
        this.div.addEventListener("click", () => {
            tileClicked(this);
        });
        this.div.addEventListener("contextmenu", (e) => {
            e.preventDefault(); // 우클릭 메뉴 막기

            if (flag != 0) return;
            if (this.check === 1) return;

            if (this.div.textContent === "🚩") {
                this.div.textContent = "";
            } else {
                this.div.textContent = "🚩";
            }
        });
        // this.div.style.opacity = "0";
        // this.div.style.transition = "opacity 0.5s";
    }
}

// HTML 요소 변수 선언
var title = document.querySelector("h1");
var fieldSizeInput = document.querySelector("#fieldSizeInput");
var mineCountInput = document.querySelector("#mineCountInput");
var fieldContainer = document.querySelector("#fieldContainer");
var makeBtn = document.querySelector("#makeBtn");
// near 컬러 배열
var colors = ["blue", "green", "red", "purple", "hotpink", "orange", "white", "black"];
// 필드 관련 변수 선언
let field;
var fieldSize;  // 필드 크기
var mineCount;  // 지뢰 개수
var flag;   // 클리어 여부 판단     -1 : dead   1 : clear

// 지뢰 설정 가능 개수 표시
function placeholder_mineCount(self) {
    mineCountInput.placeholder = "필드 크기를 입력해주세요";
    if (!isNaN(parseInt(self.value)) && parseInt(self.value) > 1 && fieldSizeInput.value > 1) {
        mineCountInput.placeholder = `1~${(parseInt(self.value) * parseInt(self.value)) - 1}`;
    }
}

// 시작 버튼 클릭 이벤트
makeBtn.addEventListener("click", function () {
    fieldSizeInput.classList.remove("error");
    mineCountInput.classList.remove("error");
    fieldSizeInput.placeholder = "2~100";
    if (checkInput(parseInt(fieldSizeInput.value), parseInt(mineCountInput.value)) == 1) {
        return;
    }
    fieldSize = parseInt(fieldSizeInput.value);
    mineCount = parseInt(mineCountInput.value);
    title.textContent = "🙂Mine Sweeper🙂";
    fieldContainer.textContent = "";    // 필드 초기화
    flag = 0;
    makeField();
});

// 필드 생성
function makeField() {
    // 배열 생성
    field = new Array(fieldSize);
    for (let i = 0; i < fieldSize; i++) {
        field[i] = new Array(fieldSize);
    }
    setTiles();
    setMine();
    setNear();
    tileAnimation();
}

// 입력 검사
function checkInput(fieldSize, mineCount) {
    let err = false;
    if (isNaN(mineCount) || mineCount < 1) {
        mineCountInput.classList.add("error");
        mineCountInput.value = "";
        mineCountInput.placeholder = "1 이상의 숫자를 입력해주세요";
        err = true;
    }
    if (isNaN(fieldSize) || fieldSize < 2 || fieldSize > 100) {
        fieldSizeInput.classList.add("error");
        fieldSizeInput.value = "";
        fieldSizeInput.placeholder = "2~100의 숫자를 입력해주세요";
        err = true;
    }
    else if (mineCount >= (fieldSize * fieldSize)) {
        alert(`지뢰 개수는 1~${(fieldSize * fieldSize) - 1}개까지 설정 가능합니다.`);
        mineCountInput.value = "";
        mineCountInput.placeholder = `1~${(fieldSize * fieldSize) - 1}`;
        err = true;
    }
    return err ? 1 : 0;
}

// 타일 생성
function setTiles() {
    for (let i = 0; i < fieldSize; i++) {
        let row = document.createElement("div");
        row.style.display = "flex";
        fieldContainer.appendChild(row);
        for (let j = 0; j < fieldSize; j++) {
            let tile = new Tile(0, 0, 0);
            field[i][j] = tile;
            if (fieldSize >=15) {
                field[i][j].div.style.width = "30px";
                field[i][j].div.style.height = "30px";
            }
            row.appendChild(field[i][j].div);
        }
    }
}

// 지뢰 설치
function setMine() {
    for (var i = 0; i < mineCount; i++) {
        var x = Math.floor(Math.random() * fieldSize);
        var y = Math.floor(Math.random() * fieldSize);
        if (field[x][y].mine == 1) {
            i--;
            continue;
        }
        field[x][y].mine = 1;
    }
}

// near값 설정
function setNear() {
    for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            for (var k = -1; k <= 1; k++) {
                for (var l = -1; l <= 1; l++) {
                    if ((i + k < 0 || i + k >= fieldSize) || (j + l < 0 || j + l >= fieldSize)) continue;
                    else if (field[i + k][j + l].mine == 1) {
                        field[i][j].near++;
                        field[i][j].div.style.color = `${colors[field[i][j].near - 1]}`
                    }
                }
            }
        }
    }
}

// 타일 등장 애니메이션
function tileAnimation() {
    let delay = 0;
    for (let i=0; i<fieldSize; i++) {
        for (let j=0; j<fieldSize; j++) {
            setTimeout(() => {
                field[i][j].div.style.opacity = "1";
            }, delay)
            delay += 30 - (fieldSize);
        }
    }
}

// 타일 클릭 이벤트
function tileClicked(self) {
    if (self.div.textContent == "🚩") return;
    if (flag == -1 || flag == 1) return;
    if (self.mine == 1) {
        flag = -1;
        title.textContent = "💀Mine Sweeper💀";
        showTiles();
        alert("펑! 지뢰를 밟았습니다!");
        return;
    }
    self.check = 1;
    self.div.classList.add("checked");
    if (self.near == 0) {
        checkTiles();
    }
    else self.div.textContent = self.near;
    flag = checkClear();
    if (flag == 1) {
        alert("축하합니다! 모든 지뢰를 찾았습니다!");
        title.textContent = "😎Mine Sweeper😎";
        showTiles();
    }
}


// 주변 타일 체크
function checkTiles() {
    let checked = 0;
    while (checked == 0) {
        checked = 1;
        for (let i = 0; i < fieldSize; i++) {
            for (let j = 0; j < fieldSize; j++) {
                if (field[i][j].check == 1 && field[i][j].near == 0) {
                    for (let k = -1; k <= 1; k++) {
                        for (let l = -1; l <= 1; l++) {
                            if ((i + k < 0 || i + k >= fieldSize) || (j + l < 0 || j + l >= fieldSize)) continue;
                            else if (k != 0 && l != 0) {    // 대각선 타일의 near값이 0일 경우 무시
                                if (field[i + k][j + l].near == 0) continue;
                            }
                            if (field[i + k][j + l].check == 1) continue;
                            else if (field[i + k][j + l].near != 0) field[i + k][j + l].div.textContent = field[i + k][j + l].near;
                            field[i + k][j + l].check = 1;
                            field[i + k][j + l].div.classList.add("checked");
                            checked = 0;
                        }
                    }
                }
            }
        }
    }
}

// 클리어 조건 체크
function checkClear() {
    let checkedTiles = 0;
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            if (field[i][j].check == 1) checkedTiles++;
        }
    }
    if (checkedTiles >= (fieldSize * fieldSize) - mineCount) return 1;  // clear
    else return 0;  // yet
}

// 최종 타일 보여주기
function showTiles() {
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            if (flag == -1) {
                if (field[i][j].mine == 1) field[i][j].div.textContent = '💣';
            }
            if (flag == 1) {
                if (field[i][j].mine == 1) field[i][j].div.textContent = '🎉';
            }
        }
    }
}

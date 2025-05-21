// 타이틀 화면 변수 선언
let titleScreen = document.querySelector("#titleScreen");
let gameContainer = document.querySelector("#gameContainer");
// 선택창 변수 선언
let behavior_container = document.querySelector("#behavior_container");
let behavior_pAtk = document.querySelector("#behavior_pAtk");
let behavior_mAtk = document.querySelector("#behavior_mAtk");
let behavior_item = document.querySelector("#behavior_item");
let behavior_flee = document.querySelector("#behavior_flee");
// 메시지 박스 변수 선언
let message_container = document.querySelector("#message_container");
// 상태창 변수 선언
let player_status_name = document.querySelector("#playerStatus .status_name");
let player_status_level = document.querySelector("#playerStatus .status_level");
let player_status_hp = document.querySelector("#playerStatus .status_hp");
let player_status_mp = document.querySelector("#playerStatus .status_mp");
let monster_status_name = document.querySelector("#monsterStatus .status_name");
let monster_status_hp = document.querySelector("#monsterStatus .status_hp");
let monster_status_level = document.querySelector("#monsterStatus .status_level");
let monster_status_bar_hp = document.querySelector("#monsterStatus .status_bar_hp");
let player_status_bar_hp = document.querySelector("#playerStatus .status_bar_hp");
let player_status_bar_mp = document.querySelector("#playerStatus .status_bar_mp");
// 이미지 변수 선언
let player_img = document.querySelector("#player_img")
let monster_img = document.querySelector("#monster_img")

// 객체 생성
let player = new Wizard("폴리", 80, 100);
player.setStat(5, 5, 5, 5);
let monster = new Slime("슬라임", 1, 50, 50, 3, 3, 3, 3);
// 상태창 초기화
player_status_name.textContent = player.name;
player_status_level.textContent = "Lv " + player.level;
player_status_hp.textContent = "HP " + player.hp + "/" + player.maxHp;
player_status_mp.textContent = "MP " + player.mp + "/" + player.maxMp;
monster_status_name.textContent = monster.name;
monster_status_hp.textContent = "HP " + monster.hp + "/" + monster.maxHp;
monster_status_level.textContent = "Lv " + monster.level;

let damage;
let dodge;
let flee = false;
let playerTurn = true;
let clear = false;

// 타이틀 화면 클릭 이벤트 메서드
titleScreen.addEventListener("click", function () {
	titleScreen.style.display = "none";
	gameContainer.style.display = "grid";
})

// 선택창 클릭 이벤트 메서드
// 물리 공격
behavior_pAtk.addEventListener("click", function () {
	damage = player.pAtk();
	addMessage(`${player.name}의 공격!`);
	dodge = monster.dodge();
	if (dodge == false) {
		monster_img.classList.add("onHit");
		addMessage(`${monster.name}은 ${damage}의 데미지를 입었다!`);
		monster.takeDamage(damage);
		monster_status_bar_hp.style.transform = `scaleX(${((monster.hp / monster.maxHp) * 100)}%)`
		monster_status_hp.textContent = "HP " + monster.hp + "/" + monster.maxHp;
	} else {
		addMessage(`${player.name}의 공격은 빗나갔다!`);
		damage = 0;
	}
	if (monster.hp <= 0) {
		monster.life = false;
		addMessage(monster.name + "은 쓰러졌다!");
	}
	playerTurn = false;
	behavior_container.style.display = "none";
	message_container.style.display = "block";
});
// 마법 공격
behavior_mAtk.addEventListener("click", function () {
	if (player.mp < 10) {
		addMessage("MP가 부족하다!");
		behavior_container.style.display = "none";
		message_container.style.display = "block";
		return;
	}
	damage = player.mAtk();
	addMessage(`${player.name}의 마법공격!`);
	dodge = monster.dodge();
	if (dodge == false) {
		monster_img.classList.add("onHit");
		addMessage(`${monster.name}은 ${damage}의 데미지를 입었다!`);
		monster.takeDamage(damage);
		monster_status_bar_hp.style.transform = `scaleX(${((monster.hp / monster.maxHp) * 100)}%)`
		monster_status_hp.textContent = "HP " + monster.hp + "/" + monster.maxHp;
	} else {
		addMessage(`${player.name}의 공격은 빗나갔다!`);
		damage = 0;
	}
	if (monster.hp <= 0) {
		monster.life = false;
		addMessage(monster.name + "은 쓰러졌다!");
	}
	player_status_mp.textContent = "MP " + player.mp + "/" + player.maxMp;
	player_status_bar_mp.style.transform = `scaleX(${((player.mp / player.maxMp) * 100)}%)`
	playerTurn = false;
	behavior_container.style.display = "none";
	message_container.style.display = "block";
});
// Flee
behavior_flee.addEventListener("click", function () {
	if (player.flee(monster.level)) {
		player_img.classList.add("flee");
		flee = true;
		addMessage(`${player.name}은 도망쳤다!`);
	}
	else {
		addMessage("도망칠 수 없었다!");
	}
	playerTurn = false;
	behavior_container.style.display = "none";
	message_container.style.display = "block";
})
// 몬스터 공격
function monsterTurn() {
	damage = monster.pAtk();
	addMessage(`${monster.name}의 공격!`);
	dodge = player.dodge();
	if (dodge == false) {
		player_img.classList.add("onHit");
		addMessage(`${player.name}은 ${damage}의 데미지를 입었다!`);
		player.takeDamage(damage);
		player_status_bar_hp.style.transform = `scaleX(${((player.hp / player.maxHp) * 100)}%)`
		player_status_hp.textContent = "HP " + player.hp + "/" + player.maxHp;
	} else {
		addMessage(`${monster.name}의 공격은 빗나갔다!`);
		damage = 0;
	}
	if (player.hp <= 0) {
		player.life = false;
		addMessage(player.name + "은 쓰러졌다!");
	}
	behavior_container.style.display = "none";
	message_container.style.display = "block";
	playerTurn = true;
}
// 메시지 생성
function addMessage(str) {
	let newP = document.createElement('p');
	newP.textContent = str;
	message_container.appendChild(newP);
}
// 메시지 박스 클릭 이벤트 메서드
message_container.addEventListener("click", handleMessage);
// 메시지 핸들링 메서드
function handleMessage() {
	monster_img.classList.remove("onHit");
	player_img.classList.remove("onHit");
	if (clear) location.reload();
	if (flee) {
		message_container.innerHTML = "<p>The End<p>";
		clear = true;
		return;
	}
	message_container.innerHTML = "";
	if (!monster.life) {
		monster_img.classList.add("dead");
		message_container.innerHTML = "<p>Game Clear!</p>";
		clear = true;
		return;
	}
	if (!player.life) {
		player_img.classList.add("dead");
		message_container.innerHTML = "<p>You Died</p>";
		clear = true;
		return;
	}
	if (!playerTurn) {
		monsterTurn();
		return;
	}
	message_container.style.display = "none";
	behavior_container.style.display = "grid";
}
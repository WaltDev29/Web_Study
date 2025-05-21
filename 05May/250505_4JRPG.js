
class Player {
    // 변수
    name;   // 이름
    level;  // 레벨
    exp;    // 경험치
    maxHp;  // 최대 HP
    maxMp;  // 최대 MP
    hp;     // 현재 HP
    mp;     // 현재 MP
    str;    // STR 능력치
    mag;    // MAG 능력치
    dex;    // DEX 능력치
    luk;    // LUK 능력치
    img;    // GUI 이미지
    inventory = []; // 인벤토리
    life = true;   // 생존여부

    // 생성자
    constructor(name, hp, mp) {
        this.name = name;
        this.maxHp = hp;
        this.maxMp = mp;
        this.hp = hp;
        this.mp = mp;
        this.level = 1;
        this.exp = 0;
    }
    // stat 설정
    setStat(str, mag, dex, luk) {
        this.str = str;
        this.mag = mag;
        this.dex = dex;
        this.luk = luk;
    }

    // 전투 관련 메서드
    // 물리 공격
    pAtk() {
        let damage = Math.floor(this.str * 1.5) + parseInt(Math.random() * this.str);
        return damage;
    }
    // 마법 공격
    mAtk() {
        if (this.mp - 10 < 0) {
            return;
        }
        this.mp -= 10;
        let damage = (this.mag * 2) + parseInt(Math.random() * this.mag);
        return damage;
    }
    // 피격
    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) this.hp = 0;
    }
    // 공격 회피
    dodge() {
        return (Math.random() * 200) + 1 <= this.dex;
    }
    // 크리티컬 발동 여부
    critChance() {
        return (Math.random() * 200) + 1 <= this.luk;
    }
    // 도망
    flee(level) {
        let fleeChance = this.level / (this.level + level);
        return Math.random() < fleeChance;
    }

    // 상호작용
    // 아이템 획득
    earnItem(item) {
        this.inventory.push(item);
    }
    // 경험치 획득, 레벨 업
    earnExp(exp) {
        this.exp += exp;
        if (this.exp >= this.level * 10) {
            alert(`레벨 업! 현재 레벨 : ${this.level}`);
            this.level++;
            this.exp -= this.level * 10;
        }
    }
}

class Wizard extends Player {
    // 변수
    job = "Wizard";
    // 생성자
    constructor(name, hp, mp) {
        super(name, hp, mp);
    }
}

class Monster {
    // 변수
    name;   // 이름
    level;  // 레벨
    maxHp;  // 최대 HP
    maxMp;  // 최대 MP
    hp;     // 현재 HP
    mp;     // 현재 MP
    str;    // STR 능력치
    mag;    // MAG 능력치
    dex;    // DEX 능력치
    luk;    // LUK 능력치
    img;    // GUI 이미지
    life = true;   // 생존여부
    // 생성자
    constructor(name, level, hp, mp, str, mag, dex, luk) {
        this.name = name;
        this.level = level;
        this.maxHp = hp;
        this.maxMp = mp;
        this.hp = hp;
        this.mp = mp;
        this.str = str;
        this.mag = mag;
        this.dex = dex;
        this.luk = luk;
    }

    // 전투 관련 메서드
    // 물리 공격
    pAtk() {
        let damage = Math.floor(this.str * 1.5) + parseInt(Math.random() * this.str);
        return damage;
    }
    // 마법 공격
    mAtk() {
        if (this.mp - 10 < 0) {
            return;
        }
        this.mp -= 10;
        let damage = (this.mag * 2) + parseInt(Math.random() * this.mag);
        return damage;
    }
    // 피격
    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) this.hp = 0;
    }
    // 공격 회피
    dodge() {
        let dodge = (Math.random() * 200) + 1;
        let result;
        result = dodge <= this.dex ? true : false;
        return result;
    }
    // 크리티컬 발동 여부
    critChance() {
        let crit = (Math.random() * 200) + 1;
        let result;
        result = crit <= this.luk ? true : false;
        return result;
    }
    // 도망
    flee(level) {
        let fleeChance = this.level / (this.level + level);
        return Math.random() < fleeChance;
    }
}

class Slime extends Monster {
    sort = "Slime";
    items = ["슬라임 조각", "나무열매"];
    constructor(name, level, hp, mp, str, mag, dex, luk) {
        super(name, level, hp, mp, str, mag, dex, luk);
    }
    // 상호작용
    // 아이템 드랍
    dropItem() {
        let drop = (Math.random() * 100) + 1;
        if (drop <= 40) return this.items[0];
        else if (drop <= 80) return;
        else return this.items[1];
    }
}

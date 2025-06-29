$(document).ready(function () {
const params = new URLSearchParams(window.location.search);
const fishkey = params.get("fish");

fetch("data/data_fish.json")
.then(response => response.json())
.then(data => {
const fishData = data[fishkey];

if (!fishData) {
alert("해당 물고기 정보를 찾을 수 없습니다.");
return;
}
if (fishData.img) $("#info_main img").attr("src", fishData.img);
if (fishData.name) $("#info_main").find("h1").text(fishData.name);
if (fishData.basic) $("#info_basic").html(fishData.basic);
if (fishData.env) $("#info_env").html(fishData.env);
if (fishData.type) $("#info_type").text(fishData.type);
if (fishData.taming) $("#info_taming").text(fishData.taming);

})
.catch(error => {
console.error("JSON 불러오기 실패 : ", error);
alert("물고기 정보를 불러오는 데 실패했습니다.");
})

})
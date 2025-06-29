$(document).ready(function () {
    // 물고기 데이터 불러오기.
    const params = new URLSearchParams(window.location.search);

    fetch("data/data_fish.json")
        .then(response => response.json())
        .then(data => {
            const fishKeys = Object.keys(data);

            for (let i = 0; i < 5; i++) {
                fishKeys.forEach(fishKey => {
                    let art = $("<article>", { class: "aside_card" });
                    let img = $("<img>", { src: data[fishKey].img });
                    let desc = $("<div>", { class: "aside_describe" });
                    let name = $("<h4>").text(data[fishKey].name);
                    let p = $("<p>").html("바다 &nbsp;&nbsp;20~25C");

                    let star_con = $("<div>", { class: "star_container" });
                    let star = $("<button>", { class: "starBox" });

                    let a = $("<a>", { href: `fish_info.html?fish=${fishKey}` })

                    $("#item_container").append(art);
                    art.append(img);
                    art.append(desc);
                    desc.append(a);
                    a.append(name);
                    desc.append(p);
                    art.append(star_con);
                    star_con.append(star);

                });
            }
        })
        .catch(error => {
            console.error("JSON 불러오기 실패 : ", error);
            alert("물고기 정보를 불러오는 데 실패했습니다.");
        })

    // 매치 카드 전환
    $(document).on("click", ".aside_card", function () {
        let name = $(this).find("h4").text();
        let img = $(this).find("img").attr("src");
        if ($(".match_card").eq(0).attr("data-changed") == "false") {
            $(".match_card").eq(0).find("h3").text(name);
            if (name.length >= 5) $(".match_card").eq(0).find("h3").css("font-size", "16px");
            $(".match_card").eq(0).find("img").attr("src", img);
            $(".match_card").eq(0).attr("data-changed", "true");
            
        }
        else {
            $(".match_card").eq(1).find("h3").text(name);
            if (name.length >= 5) $(".match_card").eq(0).find("h3").css("font-size", "16px");
            $(".match_card").eq(1).find("img").attr("src", img);
            $(".match_card").eq(1).attr("data-changed", "true");
            $(".match_card").eq(0).attr("data-changed", "false");
        }
    });

    // 이름 검색 이벤트
    $(document).on("click", "#btn_search", searchName)
    $("#tb_search").keydown(function (e) {
        if (e.key == "Enter") searchName();
    })
    // 이름 검색 함수
    function searchName() {
        let value = $("#tb_search").val().trim();
        $(".aside_card h4").each(function () {
            $(this).closest("article").css("display", "flex");
            if (!$(this).text().includes(value)) $(this).closest("article").css("display", "none");
        })
    }

    // 즐겨찾기 버튼 클릭 이벤트
    $(document).on("click", ".starBox", function (e) {
        e.stopPropagation();
        e.preventDefault();
        if ($(this).css("background-image").includes("Star.png"))
            $(this).css("background-image", "url(images/star_yellow.png)");
        else $(this).css("background-image", "url(images/Star.png)");
    });
})
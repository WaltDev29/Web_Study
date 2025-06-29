$(document).ready(function () {
    // 물고기 데이터 불러오기.
    const params = new URLSearchParams(window.location.search);

    fetch("data/data_fish.json")
        .then(response => response.json())
        .then(data => {
            const fishKeys = Object.keys(data);

            for (let i = 0; i < 5; i++) {
                fishKeys.forEach(fishKey => {
                    let a = $("<a>", { href: `fish_info.html?fish=${fishKey}` })
                    let art = $("<article>");
                    let head = $("<div>", { id: "art_head" });
                    let name = $("<h3>").text(data[fishKey].name);
                    let star = $("<div>", { class: "starBox" });
                    let img = $("<img>", { src: data[fishKey].img });

                    $("#item_container").append(a);
                    a.append(art);
                    art.append(head);
                    head.append(name);
                    head.append(star);
                    art.append(img);

                    if (data[fishKey].name.length >= 5) name.css("font-size", "16px");
                });
            }
        })
        .catch(error => {
            console.error("JSON 불러오기 실패 : ", error);
            alert("물고기 정보를 불러오는 데 실패했습니다.");
        })

    // 즐겨찾기 버튼 클릭 이벤트
    $(document).on("click", ".starBox", function (e) {
        e.stopPropagation();
        e.preventDefault();
        if ($(this).css("background-image").includes("Star.png"))
            $(this).css("background-image", "url(images/star_yellow.png)");
        else $(this).css("background-image", "url(images/Star.png)");
    });

    // 이름 검색 이벤트
    $("#btn_search").click(searchName)
    $("#tb_search").keydown(function (e) {
        if (e.key == "Enter") searchName();
    })
    // 이름 검색 함수
    function searchName() {
        let value = $("#tb_search").val().trim();
        $("article h3").each(function () {
            $(this).closest("article").css("display", "flex");
            if (!$(this).text().includes(value)) $(this).closest("article").css("display", "none");
        })
    }
})
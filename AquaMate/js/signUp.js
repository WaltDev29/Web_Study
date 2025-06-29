$(document).ready(function () {
	// submit 유효성 검사
	$("#div_signUp").submit(function (e) {
		let isValid = true;
		// border, placeholder 초기화
		$(".tb input").css("border", "2px solid rgb(116, 114, 114)")
		$(".tb input").removeAttr("placeholder");

		// tb 공백 확인
		$(".tb input").each(function () {
			if ($(this).val().trim() === "") {
				isValid = false;
				$(this).css("border", "2px solid red")
				$(this).attr("placeholder", "정보를 입력해주세요");
			}
		})

		// 비밀번호 확인
		let pwInput = $("#tb_pw").val().trim();
		let pwRegex = /[^a-zA-Z0-9가-힣\s]/;
		if (!pwRegex.test(pwInput) || (pwInput.length > 15 || pwInput.length < 8)) {
			isValid = false;
			$("#tb_pw").css("border", "2px solid red");
			$("#tb_pw").val("");
			$("#tb_pw").attr("placeholder", "특수문자 포함 8~15자리 입력");
		}

		// 비밀번호 일치 확인
		if ($("#tb_pw").val() !== $("#tb_pwCheck").val()) {
			isValid = false;
			$("#tb_pwCheck").css("border", "2px solid red");
			$("#tb_pwCheck").val("");
			$("#tb_pwCheck").attr("placeholder", "비밀번호가 일치하지 않습니다.");
		}

		// 전화번호 확인
		let phoneRegex = /^(010-\d{4}-\d{4})$/;
		if (!phoneRegex.test($("#tb_phoneNum").val())) {
			isValid = false;
			$("#tb_phoneNum").val("");
			$("#tb_phoneNum").attr("placeholder", "맞지 않는 형식입니다.");
		}


		// 이벤트 막기
		if (!isValid) e.preventDefault();
	})

	// 텍스트를 입력하면 border 초기화
	$(".tb input").on("input", function () {
		if (!isValid) {
			if ($(this).val().trim() !== "") $(this).css("border", "2px solid rgb(116, 114, 114)");
			else $(this).css("border", "2px solid red");
		}
	})

	// 전화번호 문자 입력 제한 & 하이픈 자동 입력
	$("#tb_phoneNum").keydown(function (e) {
		let value = $(this).val();

		// 숫자 이외의 문자 입력 막기
		if ((e.key > '9' || e.key < '0') && e.key !== "Backspace") e.preventDefault();

		// 숫자, 하이픈 이외의 문자 지우기
		value = value.replace(/[^0-9\-]/g, "");

		// 하이픈 자동 입력
		if (e.key !== "Backspace") {
			if (value.length === 3 || value.length === 8) value += '-';
		}
		// 하이픈 자동 제거
		else if (value.length === 5 || value.length === 10) value = value.slice(0, -1);

		$(this).val(value);
	});

	// 한글 입력 제한
	$(".tb input:not(#tb_phoneNum, #tb_name)").on("input", function () {
		let value = $(this).val();
		let korean = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;
		value = value.replace(korean, "");
		$(this).val(value);
	});
})
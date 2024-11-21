function analyzeCSV() {
    const fileInputs = {
        'a': document.getElementById('csvFileInput_a').files[0],
        'i': document.getElementById('csvFileInput_i').files[0],
        'u': document.getElementById('csvFileInput_u').files[0]
    };

    for (const [vowel, file] of Object.entries(fileInputs)) {
        if (!file) {
            alert(`${vowel} 모음에 해당하는 CSV 파일을 선택해주세요.`);
            return;
        }
    }

    // 모든 파일이 선택되었을 경우 처리 로직
    Object.entries(fileInputs).forEach(([vowel, file]) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            console.log(`/${vowel}/ 모음 CSV 파일 내용:`, text);
            // 여기에 CSV 데이터를 처리하고 분석하는 로직을 추가할 예정
        };
        reader.readAsText(file);
    });
}

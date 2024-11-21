<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>모음 삼각도 비교</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>

<body>
    <h1>모음 삼각도 비교</h1>
    <form id="vowelForm">
        <table border="1">
            <thead>
                <tr>
                    <th>모음</th>
                    <th>F1 (Person A - 정상 기준)</th>
                    <th>F2 (Person A - 정상 기준)</th>
                    <th>F1 (Person B - 환자)</th>
                    <th>F2 (Person B - 환자)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>'a'</td>
                    <td>730</td>
                    <td>1090</td>
                    <td><input type="number" id="f1_a_b" required></td>
                    <td><input type="number" id="f2_a_b" required></td>
                </tr>
                <tr>
                    <td>'i'</td>
                    <td>270</td>
                    <td>2290</td>
                    <td><input type="number" id="f1_i_b" required></td>
                    <td><input type="number" id="f2_i_b" required></td>
                </tr>
                <tr>
                    <td>'u'</td>
                    <td>300</td>
                    <td>870</td>
                    <td><input type="number" id="f1_u_b" required></td>
                    <td><input type="number" id="f2_u_b" required></td>
                </tr>
            </tbody>
        </table>
        <br>
        <button type="button" onclick="plotVowelTriangle()">모음 삼각도 비교 그리기</button>
    </form>

    <div id="plot"></div>

    <h2>비교 결과</h2>
    <div id="comparisonResults">
        <p>모음 삼각도 면적 (VSA): <span id="vsaResult"></span></p>
        <p>모음 발음 지수 (VAI): <span id="vaiResult"></span></p>
        <p>포먼트 중앙화 비율 (FCR): <span id="fcrResult"></span></p>
        <p>F2 비율: <span id="f2RatioResult"></span></p>
        <p>해석:</p>
        <p id="interpretationResult"></p>
    </div>

    <script>
        function plotVowelTriangle() {
            // Person A (정상 기준 값)
            const f1_a_a = 730, f2_a_a = 1090;
            const f1_i_a = 270, f2_i_a = 2290;
            const f1_u_a = 300, f2_u_a = 870;

            // Person B (환자 값 입력)
            const f1_a_b = parseFloat(document.getElementById("f1_a_b").value);
            const f2_a_b = parseFloat(document.getElementById("f2_a_b").value);
            const f1_i_b = parseFloat(document.getElementById("f1_i_b").value);
            const f2_i_b = parseFloat(document.getElementById("f2_i_b").value);
            const f1_u_b = parseFloat(document.getElementById("f1_u_b").value);
            const f2_u_b = parseFloat(document.getElementById("f2_u_b").value);

            // 모음 레이블
            const vowelLabels = ['a', 'i', 'u'];

            // 정상 기준 데이터 (Person A)
            const f1_A = [f1_a_a, f1_i_a, f1_u_a, f1_a_a];
            const f2_A = [f2_a_a, f2_i_a, f2_u_a, f2_a_a];

            // 환자 데이터 (Person B)
            const f1_B = [f1_a_b, f1_i_b, f1_u_b, f1_a_b];
            const f2_B = [f2_a_b, f2_i_b, f2_u_b, f2_a_b];

            // 그래프 데이터 설정
            const normalTrace = {
                x: f2_A,
                y: f1_A,
                mode: 'lines+markers+text',
                name: '정상 모음 삼각도',
                line: { dash: 'dot', color: 'red' },
                text: vowelLabels,
                textposition: 'top right'
            };

            const patientTrace = {
                x: f2_B,
                y: f1_B,
                mode: 'lines+markers+text',
                name: '환자 모음 삼각도',
                line: { color: 'blue' },
                text: vowelLabels,
                textposition: 'top right'
            };

            const data = [normalTrace, patientTrace];
            const layout = {
                title: '모음 삼각도 (정상 vs 환자)',
                xaxis: { title: 'F2 (Hz)', autorange: 'reversed' },
                yaxis: { title: 'F1 (Hz)', autorange: 'reversed' },
                width: 600,
                height: 600
            };

            Plotly.newPlot('plot', data, layout);

            // VSA, VAI, FCR, F2 비율 계산 및 해석 생성
            const vsa = calculateVSA(f1_B, f2_B);
            document.getElementById("vsaResult").innerText = vsa.toFixed(2);

            const vai = calculateVAI(f1_B, f2_B);
            document.getElementById("vaiResult").innerText = vai.toFixed(2);

            const fcr = calculateFCR(f1_B, f2_B);
            document.getElementById("fcrResult").innerText = fcr.toFixed(2);

            const f2Ratio = calculateF2Ratio(f2_B);
            document.getElementById("f2RatioResult").innerText = f2Ratio.toFixed(2);

            const interpretation = generateInterpretation(f1_B, f2_B, vsa);
            document.getElementById("interpretationResult").innerText = interpretation;
        }

        // VSA 계산 (Heron's 공식 사용)
        function calculateVSA(f1, f2) {
            const a = Math.sqrt((f1[1] - f1[0]) ** 2 + (f2[1] - f2[0]) ** 2);
            const b = Math.sqrt((f1[2] - f1[1]) ** 2 + (f2[2] - f2[1]) ** 2);
            const c = Math.sqrt((f1[2] - f1[0]) ** 2 + (f2[2] - f2[0]) ** 2);
            const s = (a + b + c) / 2;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        }

        // VAI 계산
        function calculateVAI(f1, f2) {
            return (f2[1] + f1[0]) / (f1[1] + f1[0] + f2[2] + f2[0]);
        }

        // FCR 계산
        function calculateFCR(f1, f2) {
            return (f2[1] + f2[0] + f1[1] + f1[0]) / (f2[1] + f1[0]);
        }

        // F2 비율 계산
        function calculateF2Ratio(f2) {
            return f2[1] / f2[2];
        }

        // 해석 생성
        function generateInterpretation(f1_values, f2_values, vsa) {
            const normal_f2_i = 2290;
            const normal_f2_u = 870;
            const normal_f1_a = 730;
            const normal_vsa = 308600;

            let interpretations = [];

            // /i/ 모음 F2 값 해석
            if (f2_values[1] - normal_f2_i > 100) {
                interpretations.push("실험 대상자의 /i/ 모음의 F2 값은 정상 기준에 비해 높습니다. 이는 혀가 전방화되었음을 의미합니다.");
            } else if (f2_values[1] - normal_f2_i < -100) {
                interpretations.push("실험 대상자의 /i/ 모음의 F2 값은 정상 기준에 비해 낮습니다. 이는 혀가 후방화되었음을 의미합니다.");
            } else {
                interpretations.push("/i/ 모음의 F2 값은 정상 범위에 있습니다.");
            }

            // /u/ 모음 F2 값 해석
            if (f2_values[2] - normal_f2_u > 100) {
                interpretations.push("실험 대상자의 /u/ 모음의 F2 값은 정상 기준에 비해 높습니다. 이는 혀가 지나치게 전방화되었음을 의미합니다.");
            } else {
                interpretations.push("/u/ 모음의 F2 값은 정상 범위에 있습니다.");
            }

            // /a/ 모음 F1 값 해석
            if (f1_values[0] - normal_f1_a > 100) {
                interpretations.push("실험 대상자의 /a/ 모음의 F1 값은 정상 기준에 비해 높습니다. 이는 혀가 더 낮게 움직였음을 의미합니다.");
            } else if (f1_values[0] - normal_f1_a < -100) {
                interpretations.push("실험 대상자의 /a/ 모음의 F1 값은 정상 기준에 비해 낮습니다. 이는 혀가 더 높게 움직였음을 의미합니다.");
            } else {
                interpretations.push("/a/ 모음의 F1 값은 정상 범위에 있습니다.");
            }

            // VSA 해석
            const vsa_diff = vsa - normal_vsa;
            if (vsa_diff < -10000) {
                interpretations.push(`실험 대상자의 모음 삼각도 면적은 정상 기준에 비해 ${Math.abs(vsa_diff).toFixed(2)}만큼 작습니다. 이는 혀의 움직임 범위가 줄어들어 발음의 명확도가 감소할 가능성이 있음을 의미합니다.`);
            } else if (vsa_diff > 10000) {
                interpretations.push(`실험 대상자의 모음 삼각도 면적은 정상 기준에 비해 ${vsa_diff.toFixed(2)}만큼 큽니다. 이는 혀의 움직임이 증가하여 발음의 명확도가 높아졌음을 의미합니다.`);
            } else {
                interpretations.push("모음 삼각도 면적(VSA)은 정상 범위에 있습니다.");
            }

            return interpretations.join("\n");
        }
    </script>
</body>

</html>

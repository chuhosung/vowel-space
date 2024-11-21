# Vowel Space Analysis

## Introduction
This project provides a web-based application to compare vowel space areas between a normal subject (Person A) and a patient (Person B). It is designed for use by researchers, speech-language pathologists, or educators who are interested in analyzing the formant characteristics of vowel sounds for phonetic studies or speech therapy assessments.

## Features
- **Input F1 and F2 Values**: Users can manually input F1 and F2 values for the vowels /a/, /i/, and /u/ for a patient (Person B).
- **Vowel Triangle Plot**: The application generates a vowel triangle plot for both Person A (Normal) and Person B (Patient).
- **Vowel Space Metrics**: Calculates the Vowel Space Area (VSA), Vowel Articulation Index (VAI), Formant Centralization Ratio (FCR), and F2 Ratio.
- **Interpretation**: Provides a textual interpretation of how the patient's vowel space compares to the normal range, highlighting any significant differences in formant values.

## How to Use
1. **Open the Application**: The web application is hosted on GitHub Pages at the following link:
   - [https://username.github.io/vowel-space/](https://chuhosung.github.io/vowel-space/) (Replace `username` with your GitHub username)

2. **Input Data**: Enter the F1 and F2 values for Person B (the patient) for the vowels /a/, /i/, and /u/.

3. **Plot and Analyze**:
   - Click the "Plot Vowel Triangle Comparison" button.
   - Observe the vowel triangle plot comparing Person A and Person B.
   - Review the analysis metrics and interpretation provided below the plot.

## Files
- **upload.html**: The main HTML file for the web interface.
- **script.js**: JavaScript file responsible for plotting the vowel triangle and performing calculations.

## Getting Started
To use this project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/username/vowel-space.git
   ```
   Replace `username` with your GitHub username.

2. Open `upload.html` in a web browser.

## How It Works
- The application takes the formant values (F1 and F2) for the vowels /a/, /i/, /u/ for Person B and compares them with preset values for Person A (Normal).
- Using Plotly.js, it generates a vowel triangle plot that visually shows the difference between the normal and patient vowel spaces.
- Calculates VSA, VAI, FCR, and F2 Ratio based on the entered values and provides an interpretation of these metrics.

## Technical Details
- The web application is built using HTML and JavaScript, with Plotly.js for interactive graphing.
- GitHub Pages is used for hosting the web application, making it accessible from any browser without needing a local development environment.

## Future Improvements
- **CSV File Upload**: Allow users to upload CSV files for batch analysis.
- **Automatic Stability Detection**: Implement automatic detection of stable F1 and F2 values from a list to minimize human input error.

## Contributing
Contributions are welcome! Feel free to submit a pull request or create an issue to discuss changes or suggestions.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
- Special thanks to the researchers and speech-language pathologists who provided valuable feedback during the development of this tool.


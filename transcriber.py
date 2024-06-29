# Start by making sure the `assemblyai` package is installed.
# If not, you can install it by running the following command:
# pip install -U assemblyai
#
# Note: Some macOS users may need to use `pip3` instead of `pip`.

import assemblyai as aai

# Replace with your API key
aai.settings.api_key = "ENTER_YOUR_API"

# URL of the file to transcribe
FILE_URL = "./static/podcast.mp3"

config = aai.TranscriptionConfig(language_code="es")

transcriber = aai.Transcriber(config=config)

transcript = transcriber.transcribe(FILE_URL)

if transcript.status == aai.TranscriptStatus.error:
    print(transcript.error)
else:
    # Save the transcript to a file
    with open('ai_transcript.txt', 'w', encoding='utf-8') as file:
        file.write(transcript.text)


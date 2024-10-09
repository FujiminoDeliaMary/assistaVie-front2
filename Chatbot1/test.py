import vosk
import sounddevice as sd
import json
import queue

# Chemin vers le modèle Vosk pour la langue française
MODEL_PATH = "vosk-model-small-fr-0.22"

# Initialiser le modèle Vosk
model = vosk.Model(MODEL_PATH)

# File d'attente pour le flux audio
q = queue.Queue()

# Fonction callback pour capturer l'audio
def callback(indata, frames, time, status):
    q.put(bytes(indata))

# Fonction pour reconnaître la parole
def recognize_speech():
    recognizer = vosk.KaldiRecognizer(model, 16000)  # Initialiser le recognizer avec Vosk

    # Démarrer l'enregistrement audio avec sounddevice
    with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16',
                           channels=1, callback=callback):
        print("Parlez, je vous écoute...")
        while True:
            data = q.get()  # Obtenir les données audio
            if recognizer.AcceptWaveform(data):
                result = recognizer.Result()
                speech_text = json.loads(result).get('text', '')
                if speech_text:  # Si du texte est reconnu
                    print(f"Texte reconnu : {speech_text}")
                if "stop" in speech_text.lower():
                    print("Arrêt de la reconnaissance.")
                    break

# Exécuter l'application de reconnaissance vocale
recognize_speech()

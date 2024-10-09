"""
import speech_recognition as sr
import pyttsx3
from nltk.chat.util import Chat, reflections
from conversations import pairs
import sounddevice as sd

MODEL_PATH = "vosk-model-small-fr-0.22"
# Configurer la synthèse vocale
engine = pyttsx3.init()

# Configurer le chatbot NLTK

chatbot = Chat(pairs, reflections)

# Configurer la reconnaissance vocale
recognizer = sr.Recognizer()

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    with sr.Microphone() as source:
        print("Je vous écoute...")
        audio = recognizer.listen(source)
        try:
            speech_text = recognizer.recognize_sphinx(audio)
            print(f"Vous: {speech_text}")
            return speech_text.lower()
        except sr.UnknownValueError:
            print("Je n'ai pas compris.")
            return ""

def vocal_chat():
    speak("Bonjour, je suis votre assistant vocal. Dites 'au revoir' pour quitter.")
    while True:
        user_input = listen()
        if "au revoir" in user_input:
            speak("Au revoir !")
            break
        response = chatbot.respond(user_input)
        if response:
            print(f"Chatbot: {response}")
            speak(response)
        else:
            speak("Je ne suis pas sûr de comprendre.")

# Démarrer le chatbot vocal
vocal_chat()
"""
"""

import pyttsx3
from nltk.chat.util import Chat, reflections
from conversations import *
import vosk
import sounddevice as sd
import json
import queue
import time

# Chemin vers le modèle Vosk pour la langue française
MODEL_PATH = "vosk-model-small-fr-0.22"

# Initialiser le modèle Vosk
model = vosk.Model(MODEL_PATH)

# File d'attente pour le flux audio
q = queue.Queue()

# Configurer la synthèse vocale
engine = pyttsx3.init()

# Configurer le chatbot NLTK
chatbot = Chat(pairs, chatbot_flow, chatbot_responses, reflections)

# Fonction pour parler
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Fonction callback pour capturer l'audio
def callback(indata, frames, time, status):
    q.put(bytes(indata))

# Fonction pour écouter avec Vosk
def listen():
    print("Je vous écoute...")
    time.sleep(1)
    recognizer = vosk.KaldiRecognizer(model, 16000)  # Initialiser le recognizer avec Vosk
    
    # Démarrer l'enregistrement audio avec sounddevice
    with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16',
                           channels=1, callback=callback):
        print("Vous pouvez parler maintenant...")
        speech_text = ""
        while True:
            data = q.get()
            if recognizer.AcceptWaveform(data):
                result = recognizer.Result()
                speech_text = json.loads(result).get('text', '')
                if speech_text:  # Si du texte est reconnu
                    print(f"Texte reconnu : {speech_text}")
                    return speech_text.lower()  # Retourne le texte reconnu
            elif recognizer.PartialResult():  # Reconnaissance partielle
                partial_result = recognizer.PartialResult()
        return speech_text.lower()

# Fonction principale de chat vocal
def vocal_chat():
    speak("Bonjour, je suis Robert votre assistant vocal. Dites 'au revoir' pour quitter.")
    while True:
        user_input = listen()
        if "au revoir" in user_input:
            speak("Au revoir !")
            break
        response = chatbot.respond(user_input)
        if response:
            print(f"Chatbot: {response}")
            speak(response)
        else:
            speak("Je ne suis pas sûr de comprendre.")

# Démarrer le chatbot vocal
vocal_chat()
"""
"""
import pyttsx3
import vosk
import sounddevice as sd
import json
import queue
import time
import noisereduce as nr
from conversations import *
import numpy as np 
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

nltk.download('punkt')
nltk.download('stopwords')

# Chemin vers le modèle Vosk pour la langue française
MODEL_PATH = "vosk-model-small-fr-0.22"

# Initialiser le modèle Vosk
model = vosk.Model(MODEL_PATH)

# File d'attente pour le flux audio
q = queue.Queue()

# Configurer la synthèse vocale
engine = pyttsx3.init()

# Fonction pour parler
def speak(text):
    print(f"Roberto: {text}")
    engine.say(text)
    engine.runAndWait()

# Fonction callback pour capturer l'audio
def callback(indata, frames, time, status):
    # Convertir indata en tableau NumPy pour le traitement
    audio_data = np.frombuffer(indata, dtype=np.int16)
    
    # Appliquer une réduction de bruit sur l'audio capturé
    filtered_data = nr.reduce_noise(y=audio_data, sr=16000)
    
    # Remettre les données filtrées dans la file d'attente
    q.put(filtered_data.tobytes())

# Fonction pour écouter avec Vosk
def listen():
    print("Je vous écoute...")
    time.sleep(1)
    recognizer = vosk.KaldiRecognizer(model, 16000)  # Initialiser le recognizer avec Vosk
    
    # Démarrer l'enregistrement audio avec sounddevice
    with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16',
                           channels=1, callback=callback):
        print("Vous pouvez parler maintenant...")
        speech_text = ""
        while True:
            data = q.get()
            if recognizer.AcceptWaveform(data):
                result = recognizer.Result()
                speech_text = json.loads(result).get('text', '')
                if speech_text:  # Si du texte est reconnu
                    print(f"Texte reconnu : {speech_text}")
                    return speech_text.lower()  # Retourne le texte reconnu
        return speech_text.lower()

# Fonction pour gérer les réponses plus flexibles, avec détection de mots-clés
def detect_intent(user_input):
    # Listes de mots-clés pour les réponses positives et négatives
    positive_responses = ["oui", "ouais", "bien sûr", "absolument", "je pense que oui", "tout à fait"]
    negative_responses = ["non", "pas du tout", "je ne pense pas", "je ne crois pas", "je pense que non"]

    # Vérifier si l'une des réponses positives est dans la réponse utilisateur
    for word in positive_responses:
        if word in user_input:
            return "oui"
    
    # Vérifier si l'une des réponses négatives est dans la réponse utilisateur
    for word in negative_responses:
        if word in user_input:
            return "non"
    
    # Si aucune intention claire n'est détectée, retourner None
    return None

def handle_open_responses(user_input, flow):
    # Vérifier si des mots-clés spécifiques comme "fièvre", "toux", etc. sont dans la réponse
    for keyword in flow:
        if keyword in user_input:
            return flow[keyword]  # Retourner la réponse spécifique au mot-clé détecté
    return None  # Si aucune correspondance trouvée, retourner None

# Fonction pour poser la question finale
def ask_another_question():
    speak("Avez-vous une autre question ?")
    user_input = listen()
    if "oui" in user_input:
        vocal_chat()  # Relancer la conversation si l'utilisateur a une autre question
    elif "non" in user_input:
        speak("Merci pour vos questions. Au revoir !")
    else:
        # Reposer une seule fois si la réponse n'est pas claire
        speak("Je ne suis pas sûr de comprendre. Avez-vous une autre question ?")
        user_input = listen()
        if "oui" in user_input:
            vocal_chat()
        elif "non" in user_input:
            speak("Merci pour vos questions. Au revoir !")


    
# Fonction pour gérer le flow contextuel
def handle_flow(flow):
    while True:
        # Poser la question principale
        speak(flow['question'])
        user_input = listen()

        next_step = handle_open_responses(user_input, flow)

        if next_step:
            if isinstance(next_step, dict):  # Si c'est un sous-flow, continuer
                handle_flow(next_step)
            else:
                speak(next_step)  # Réponse finale
                ask_another_question()
                break  # Arrêter la boucle après avoir donné la réponse finale
        else:
            speak("Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?")
            continue  

# Fonction principale de chat vocal avec détection des mots-clés
def vocal_chat():
    global first_time 
    if first_time:
        # Afficher et dire le message de bienvenue une seule fois
        speak("Bonjour, je suis Robert, votre assistant vocal. Comment puis-je vous aider ?.")
        first_time = False  #
    
    else:
        # Si ce n'est pas la première fois, un autre message est joué
        speak("Comment puis-je vous aider à nouveau ?.")
    
    
    while True:
        user_input = listen()

        # Vérification des mots-clés pour lancer un flow spécifique
        if "grippe" in user_input:
            handle_flow(chatbot_flow["symptômes de la grippe"])
        elif "blessure" in user_input:
            handle_flow(chatbot_flow["blessure"])
        elif "au revoir" in user_input:
            speak("Au revoir !")
            break
        else:
            speak("Je ne suis pas sûr de comprendre. Pouvez-vous répéter ?")

# Démarrer le chatbot vocal
vocal_chat()
"""

import pyttsx3
import json
import time
import vosk
import sounddevice as sd
import queue
import numpy as np
import noisereduce as nr
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import string
from nltk.classify import NaiveBayesClassifier
from conversations import *


nltk.download('punkt')
nltk.download('punkt_tab')

# Configuration Vosk pour la reconnaissance vocale
MODEL_PATH = "vosk-model-small-fr-0.22"
model = vosk.Model(MODEL_PATH)
q = queue.Queue()

# Configuration de la synthèse vocale
engine = pyttsx3.init()

# Fonction de synthèse vocale
def speak(text):
    print(f"Roberto: {text}")
    engine.say(text)
    engine.runAndWait()



# Prétraitement : tokenisation et suppression des stopwords et de la ponctuation
nltk.download('punkt')
nltk.download('stopwords')

def preprocess(sentence):
    stop_words = set(stopwords.words('french'))
    tokens = word_tokenize(sentence.lower())
    tokens = [word for word in tokens if word not in string.punctuation]
    tokens = [word for word in tokens if word not in stop_words]
    return tokens

def extract_features(sentence):
    words = preprocess(sentence)
    return {word: True for word in words}

# Préparer les données d'entraînement avec les caractéristiques extraites
training_features = [(extract_features(sentence), label) for sentence, label in training_data]

# Entraîner un classificateur Naive Bayes
classifier = NaiveBayesClassifier.train(training_features)

# Fonction pour classer les intentions à partir des entrées utilisateur
def classify_intent(sentence):
    features = extract_features(sentence)
    return classifier.classify(features)



# Fonction pour gérer le flux contextuel
def handle_flow(flow):
    while True:
        speak(flow['question'])
        user_input = listen()  # Fonction qui écoute avec Vosk et retourne le texte reconnu
        
        # Traiter les réponses contextuelles
        if "oui" in user_input:
            next_step = flow.get("oui")
        elif "non" in user_input:
            next_step = flow.get("non")
        else:
            speak("Je n'ai pas compris. Pouvez-vous répéter ?")
            continue

        if isinstance(next_step, dict):
            handle_flow(next_step)
        else:
            speak(next_step)
            break

# Fonction pour écouter avec Vosk
def listen():
    print("Je vous écoute...")
    recognizer = vosk.KaldiRecognizer(model, 16000)
    with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16', channels=1, callback=callback):
        speech_text = ""
        while True:
            data = q.get()
            if recognizer.AcceptWaveform(data):
                result = recognizer.Result()
                speech_text = json.loads(result).get('text', '')
                if speech_text:
                    print(f"Texte reconnu : {speech_text}")
                    return speech_text.lower()

# Fonction callback pour capturer l'audio
def callback(indata, frames, time, status):
    audio_data = np.frombuffer(indata, dtype=np.int16)
    filtered_data = nr.reduce_noise(y=audio_data, sr=16000)
    q.put(filtered_data.tobytes())

# Fonction principale pour démarrer le chatbot vocal
def vocal_chat():
    speak("Bonjour, je suis Roberto. Comment puis-je vous aider ?")
    
    while True:
        user_input = listen()

        # Détection de l'intention avec le classificateur
        intent = classify_intent(user_input)

        if intent == "greet":
            speak("Salut ! Comment puis-je vous aider ?")
        elif intent == "ask_flu_symptoms":
            handle_flow(chatbot_flow["symptômes de la grippe"])
        elif intent == "ask_injury":
            handle_flow(chatbot_flow["blessure"])
        elif intent == "goodbye":
            speak("Au revoir !")
            break
        else:
            speak("Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?")

# Démarrer le chatbot vocal
vocal_chat()

import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC-8hLTN0H4uHivYCPE9lYpZHQYf28JyfE",
    authDomain: "live-chat-overflow.firebaseapp.com",
    databaseURL: "https://live-chat-overflow.firebaseio.com",
    projectId: "live-chat-overflow",
    storageBucket: "",
    messagingSenderId: "334742231391"
};

firebase.initializeApp(config)

const db = firebase.firestore()

export default db